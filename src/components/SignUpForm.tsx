"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Checkbox } from "./ui/checkbox";
import { z } from "zod";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
	SelectGroup,
	SelectLabel,
} from "./ui/select";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormLabel, FormItem, FormDescription, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import SignUpSuccess from "./Dialog/SignUpSuccess";
import SignUpFailed from "./Dialog/SignUpFailed";

const schema = z
	.object({
		shopName: z.string().min(1, "Required").max(255),
		phone: z.string().regex(/^(03[2-9]|05[2689]|07[06789]|08[1-9]|09[0-46-9])\d{7}$/),
		email: z.string().email().or(z.string().optional()),
		password: z
			.string()
			.min(9)
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{9,}$/),
		confirmPassword: z.string(),
		address: z.string().optional(),
		subDistrict: z.string().optional(),
		district: z.string().optional(),
		city: z.string().optional(),
		termAgreement: z.boolean(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

export type SignUpField = z.infer<typeof schema>;

const SignUpForm = () => {
	const [successDialog, setSuccessDialog] = useState(false);
	const [failedDialog, setFailedDialog] = useState(false);
	const [content, setContent] = useState({});

	const form = useForm<SignUpField>({
		resolver: zodResolver(schema),
		defaultValues: {
			shopName: "",
			phone: "",
			email: "",
			password: "",
			confirmPassword: "",
			address: "",
			subDistrict: "",
			district: "",
			city: "",
			termAgreement: false,
		},
	});

	async function onSubmit(values: SignUpField) {
		console.log(1);
		const response = await fetch("https://dev-fe-exam.viajsc.com/ExamUser/register-user", {
			method: "POST",
			headers: new Headers({ "content-type": "application/json" }),
			body: JSON.stringify({
				username: values.phone,
				shopname: values.shopName,
				phoneNumber: values.phone,
				email: values.email,
				password: values.password,
				confirmPassword: values.confirmPassword,
				address: values.address,
				wards: values.subDistrict,
				district: values.district,
				province: values.city,
				acceptTerm: values.termAgreement,
			}),
		}).then((res) => res.json());

		console.log(response);

		if (response.errorCode == 200) {
			setSuccessDialog(true);
			setContent(response.content);
		} else {
			setFailedDialog(true);
		}
	}
	return (
		<div className="w-full">
			<div className="text-2xl font-semibold text-primary text-center mb-6">ĐĂNG KÝ TÀI KHOẢN</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
					<div className="grid sm:grid-cols-3 gap-3 mt-4">
						<FormField
							control={form.control}
							name="shopName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Tên cửa hàng <span className="text-primary">*</span>
									</FormLabel>
									<FormControl>
										<Input
											className="border-2 border-input p-2 rounded w-full mt-1"
											placeholder="Nhập tên cửa hàng"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Số điện thoại <span className="text-primary">*</span>
									</FormLabel>
									<FormControl>
										<Input
											className="border-2 border-input p-2 rounded w-full mt-1"
											placeholder="Nhập số điện thoại"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											className="border-2 border-input p-2 rounded w-full mt-1"
											placeholder="Nhập email..."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="grid sm:grid-cols-2 gap-8 mt-4">
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Mật khẩu <span className="text-primary">*</span>
									</FormLabel>
									<FormControl>
										<Input
											type="password"
											className="border-2 border-input p-2 rounded w-full mt-1"
											placeholder="Nhập mật khẩu..."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Xác nhận mật khẩu <span className="text-primary">*</span>
									</FormLabel>
									<FormControl>
										<Input
											type="password"
											className="border-2 border-input p-2 rounded w-full mt-1"
											placeholder="Xác nhận mật khẩu..."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="grid sm:grid-cols-1 mt-4">
						<FormField
							control={form.control}
							name="address"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Địa chỉ</FormLabel>
									<FormControl>
										<Input
											type="text"
											className="border-2 border-input p-2 rounded w-full mt-1"
											placeholder="Nhập địa chỉ"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="grid sm:grid-cols-3 gap-3 mt-4">
						<FormField
							control={form.control}
							name="subDistrict"
							render={({ field }) => (
								<FormItem className="w-full relative">
									<FormLabel>Phường/ Xã</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl className="w-full ">
											<SelectTrigger>
												<SelectValue placeholder="Chọn Phường/ Xã" />
											</SelectTrigger>
										</FormControl>
										<SelectContent className="popover-content-width-same-as-its-trigger">
											<SelectItem className="w-full" value="m@example.com">
												m@example.com
											</SelectItem>
											<SelectItem className="w-full" value="m@google.com">
												m@google.com
											</SelectItem>
											<SelectItem className="w-full" value="m@support.com">
												m@support.com
											</SelectItem>
										</SelectContent>
									</Select>

									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="district"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Quận/ Huyện</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Chọn Quận/ Huyện" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="m@example.com">
												m@example.com
											</SelectItem>
											<SelectItem value="m@google.com">
												m@google.com
											</SelectItem>
											<SelectItem value="m@support.com">
												m@support.com
											</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="city"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Thành phố</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Chọn Thành phố" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="m@example.com">
												m@example.com
											</SelectItem>
											<SelectItem value="m@google.com">
												m@google.com
											</SelectItem>
											<SelectItem value="m@support.com">
												m@support.com
											</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="sm:flex justify-between mt-6">
						<div className="relative top-2 flex">
							<FormField
								control={form.control}
								name="termAgreement"
								render={({ field }) => (
									<FormItem className="flex">
										<FormControl>
											<Checkbox
												className="border-primary text-primary font-bold border-2 relative top-1"
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>

										<FormMessage />
										<div className="ml-2 mr-1 relative bottom-2">
											<FormLabel>Tôi đã đọc và đồng ý với</FormLabel>
										</div>
									</FormItem>
								)}
							/>
							<span className="text-primary cursor-pointer">
								Chính sách bảo mật thông tin
							</span>
						</div>
						<Button
							type="submit"
							className="w-[141px] h-[43px] rounded-sm bg-[#FDBA4D] text-white cursor-pointer font-bold sm:mt-0 my-4 "
						>
							Đăng ký ngay
						</Button>
					</div>
				</form>
			</Form>

			<SignUpSuccess open={successDialog} setOpen={setSuccessDialog} content={content} />
			<SignUpFailed open={failedDialog} setOpen={setFailedDialog} />
		</div>
	);
};

export default SignUpForm;
