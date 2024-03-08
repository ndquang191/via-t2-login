import React, { useEffect, useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "../ui/form";
import { Button } from "../ui/button";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import Image from "next/image";

import { useLocalStorage } from "usehooks-ts";
const FormSchema = z
	.object({
		password: z
			.string()
			.min(9)
			.refine((value) => {
				// Check for at least one number
				const hasNumber = /\d/.test(value);
				// Check for at least one uppercase letter
				const hasUpperCase = /[A-Z]/.test(value);
				// Check for at least one lowercase letter
				const hasLowerCase = /[a-z]/.test(value);
				// Check for at least one special character
				const hasSpecialChar = /[!@#$%^&*]/.test(value);

				return hasNumber && hasUpperCase && hasLowerCase && hasSpecialChar;
			}),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password == data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});
interface NewPassProps {
	open: boolean;
	setOpen: (isOpen: boolean) => void;
	// setBack: (isOpen: boolean) => void;
	username: string;
	otp: string;
	// setInfo: (userInfo: UserInfo) => void;
}

const NewPass: React.FC<NewPassProps> = ({ open, setOpen, username, otp }) => {
	const [openSucces, setOpenSuccess] = useState(false);
	const [seconds, setSeconds] = useState(-1);
	const [pass, setPass] = useState("");

	const [loggedIn, setLoggedIn] = useLocalStorage("info", { userName: "" });

	async function autoLogin() {
		let res = await fetch("https://dev-fe-exam.viajsc.com/ExamUser/login", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				userName: username,
				password: pass,
			}),
		}).then((res) => res.json());

		if (res.errorCode == 200) {
			setLoggedIn(res.content);
		}
	}
	useEffect(() => {
		let interval: string | number | NodeJS.Timeout | undefined;
		if (seconds > 0) {
			interval = setInterval(() => {
				if (seconds > 0) {
					setSeconds((prevSeconds) => prevSeconds - 1);
				} else {
					clearInterval(interval);
				}
			}, 1000);
		}
		if (seconds == 0) {
			autoLogin();
			setOpenSuccess(false);
		}

		return () => clearInterval(interval);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [seconds]);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		const response = await fetch("https://dev-fe-exam.viajsc.com/ExamUser/change-password", {
			method: "POST",
			headers: new Headers({ "content-type": "application/json" }),
			body: JSON.stringify({
				userName: username,
				password: data.password,
				confirmPassword: data.confirmPassword,
				otpCode: otp,
			}),
		}).then((res) => res.json());

		if (response.errorCode == 200) {
			setOpenSuccess(true);
			setOpen(false);
			setPass(data.password);
			setSeconds(5);
		} else {
		}
	}
	return (
		<div>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="sm:max-w-[560px] p-0">
					<DialogHeader className="bg-[#F7F8F9]">
						<DialogTitle className="p-6">THIẾT LẬP MẬT KHẨU MỚI</DialogTitle>
					</DialogHeader>
					<div className="flex items-center space-x-2 px-6 py-4">
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel className="font-normal">
												Mật khẩu mới
											</FormLabel>
											<FormControl>
												<Input
													type="password"
													className="w-full"
													placeholder="Nhập mật khẩu"
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
										<FormItem className="w-full">
											<FormLabel className="font-normal">
												Xác nhận mật khẩu mới
											</FormLabel>
											<FormControl>
												<Input
													type="password"
													className="w-full"
													placeholder="Nhập mật khẩu"
													{...field}
												/>
											</FormControl>
											<FormMessage />
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

			<Dialog open={openSucces} onOpenChange={setOpenSuccess}>
				<DialogContent className="sm:max-w-[560px] p-6">
					<div className="w-full flex justify-center">
						<Image src={"/img/dialog/approved.png"} alt="done" width={64} height={64} />
					</div>
					<div className="font-semibold text-lg text-[#10B981] w-full text-center">
						MẬT KHẨU ĐÃ ĐƯỢC THIẾT LẬP LẠI
					</div>
					<div className="  text-black w-full text-center">
						Bạn vui lòng ghi nhớ mật khẩu nhé !
					</div>
					<div className="  w-full text-center text-primary">
						Tự động đăng nhập sau {seconds} giây
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default NewPass;
