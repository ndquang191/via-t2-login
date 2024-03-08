import Image from "next/image";
import React, { useEffect } from "react";
import LoginForm from "./LoginForm";
import ChangePassDialog from "./Dialog/ChangePass";
import { useLocalStorage } from "usehooks-ts";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

const Header = () => {
	const [loggedIn, setLoggedIn] = useLocalStorage("info", { userName: "" });

	useEffect(() => {
		console.log(loggedIn);
	}, [loggedIn]);
	return (
		<div className="relative w-full h-[418px] bg-banner bg-cover ">
			{loggedIn.userName == "" ? (
				<div className="max-w-[748px] relative top-[75px] sm:ml-[45%] mx-5">
					<div className="font-semibold text-white mb-4 text-lg">ĐĂNG NHẬP NGAY !</div>
					<LoginForm />

					<div className="mt-3 text-end text-white cursor-pointer hover:text-white-500">
						<ChangePassDialog />
					</div>
				</div>
			) : (
				<div className="relative top-[70px] ml-[30%] mr-8">
					<div className="flex justify-between gap-16 ">
						<div className="w-full">
							<div className="text-white font-semibold text-lg mb-2">
								TÌM KIẾM NỘI DUNG
							</div>
							<div className="bg-white p-7">
								<Label htmlFor="searchbox" className="">
									Nhập thông tin cần tìm
								</Label>
								<div className="flex justify-between align-middle mt-3 gap-5">
									<Input
										height={44}
										id="searchbox"
										type="text"
										placeholder="Tên người dùng, số điện thoại hoặc email"
									/>

									<Button className="px-5 bg-[#FDBA4D] ">Tìm</Button>
								</div>
							</div>
						</div>

						<div className="">
							<div className="text-white font-semibold text-lg mb-2">
								<span>{String(loggedIn.userName).toUpperCase()}</span>
							</div>
							<div className="w-full flex justify-center">
								<Image
									height={102}
									width={107}
									src={"/img/flydog.jpeg"}
									alt="ava"
									style={{ objectFit: "fill" }}
								/>
							</div>
							<div className="w-full flex justify-center">
								<Button
									className="mt-4 bg-[#FDBA4D]"
									onClick={() => setLoggedIn({ userName: "" })}
								>
									THOÁT
								</Button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Header;
