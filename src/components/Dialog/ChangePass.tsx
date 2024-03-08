"use client";

import React, { useRef, useState } from "react";
import {
	Dialog,
	DialogTrigger,
	DialogFooter,
	DialogDescription,
	DialogContent,
	DialogTitle,
	DialogHeader,
	DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "../ui/form";
import SetOTP from "./SetOPT";

const FormSchema = z.object({
	username: z
		.string()
		.email("Địa chỉ email không hợp lệ")
		.or(
			z.string().regex(/^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-6|8-9]|9\d)\d{7}$/, {
				message: "Số điện thoại không hợp lệ",
			})
		),
});
const ChangePass = () => {
	const [open, setOpen] = useState(false);
	const [openNext, setOpenNext] = useState(false);

	const [info, setInfo] = useState({ username: "", otp: "" });

	const dialogRef = useRef(null);
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			username: "",
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		console.log(data.username);

		const res = await fetch(
			`https://dev-fe-exam.viajsc.com/examUser/get-otp-change-password?username=${data.username}`,
			{
				method: "GET",
			}
		).then((res) => res.json());

		console.log(res);
		if (res.errorCode == 200) {
			const otp = await fetch(
				`https://dev-fe-exam.viajsc.com/OtpViewerConntroller/get-otp?username=${data.username}`,
				{
					method: "GET",
				}
			)
				.then((res) => res.json())
				.catch((err) => console.log(err));

			console.log(otp);
			setInfo({ username: data.username, otp: otp.error });
			setOpen(false);
			setOpenNext(true);
		} else {
			console.log("sai");
		}
	}
	return (
		<div>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger
					onEnded={() => {
						console.log("closing");
					}}
					ref={dialogRef}
					asChild
				>
					<div>Quên mật khẩu</div>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[560px] p-0">
					<DialogHeader className="bg-[#F7F8F9]">
						<DialogTitle className="p-6">YÊU CẦU THAY ĐỔI MẬT KHẨU</DialogTitle>
					</DialogHeader>
					<div className="flex items-center space-x-2 px-6 py-4">
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
								<FormField
									control={form.control}
									name="username"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel className="font-normal">
												Email/ Số điện thoại
											</FormLabel>
											<FormControl>
												<Input
													className="w-full"
													placeholder="Nhập email hoặc số điện thoại..."
													{...field}
												/>
											</FormControl>
											<FormMessage />
											<FormDescription className="text-center pt-4 text-black font-normal w-[70%] relative translate-x-[25%]">
												Bạn vui lòng kiểm tra hòm thư đến hoặc mục tin
												nhắn trên điện thoại để lấy mã OTP
											</FormDescription>
										</FormItem>
									)}
								/>
								<div className="w-full flex justify-center">
									<Button type="submit" className="self-center">
										Gửi yêu cầu
									</Button>
								</div>
							</form>
						</Form>
					</div>
				</DialogContent>
			</Dialog>
			<SetOTP
				open={openNext}
				setOpen={setOpenNext}
				setBack={setOpen}
				username={info.username}
				otp={info.otp}
				setInfo={setInfo}
			/>
		</div>
	);
};

export default ChangePass;
