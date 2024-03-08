"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalStorage } from "usehooks-ts";
import { FormEvent, useEffect, useState } from "react";

const schema = z.object({
	email: z
		.string()
		.email()
		.or(
			z.string().regex(/^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-6|8-9]|9\d)\d{7}$/, {
				message: "Số điện thoại không hợp lệ",
			})
		),
	password: z.string(),
});

type LoginField = z.infer<typeof schema>;

const LoginForm = () => {
	const [loggedIn, setLoggedIn] = useLocalStorage("info", { userName: "" });
	const [mess, setMess] = useState("");

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginField>({
		resolver: zodResolver(schema),
	});

	useEffect(() => {
		console.log(mess);
	}, [mess]);
	const onSubmit = async (data: any) => {
		const result = await fetch("https://dev-fe-exam.viajsc.com/ExamUser/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username: data.email, password: data.password }),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Login failed");
				}
				return response.json();
			})
			.catch((error) => {
				// Handle errors
				console.error("Error logging in:", error.message);
				throw error;
			});

		if (result.errorCode == 200) {
			setLoggedIn(result.content);
			console.log("DONE");
		} else {
			setMess(result.error);
		}
	};

	const handleOnChage = (e: FormEvent) => {
		if (mess != "") setMess("");
	};
	return (
		<div className="bg-white p-7 rounded ">
			<form
				onChange={(e) => handleOnChage(e)}
				action=""
				className="md:flex gap-2"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="max-w-[290px]">
					<label htmlFor="email">Số điện thoại hoặc Email</label>
					<input
						id="email"
						className="border-2 border-input p-2 rounded w-full"
						type="text"
						placeholder="Nhập số điện thoại hoặc Email..."
						{...register("email")}
					/>
				</div>

				<div className="max-w-[250px]">
					<label htmlFor="pw">Mật khẩu</label>
					<input
						id="pw"
						className="border-2 border-input p-2 rounded w-full"
						type="password"
						placeholder="Nhập mật khẩu..."
						{...register("password")}
						required
					/>
				</div>

				<button
					disabled={isSubmitting}
					type="submit"
					className="block w-[120px] h-[45px] text-center bg-primary text-white rounded relative top-[22px]"
				>
					Đăng nhập
				</button>
			</form>

			<div className="text-red-500 mt-1 text-sm">{mess}</div>
		</div>
	);
};

export default LoginForm;
