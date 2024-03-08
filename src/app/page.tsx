"use client";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import SignUpForm from "@/components/SignUpForm";
import ServicesList from "@/components/ServicesList";
import Slide from "@/components/Slide";
import Footer from "@/components/Footer";
import { useLocalStorage } from "usehooks-ts";
import { useEffect, useState } from "react";

export default function Home() {
	const [loggedIn, setLoggedIn] = useLocalStorage("info", { userName: "" });
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(false);
	}, []);

	return (
		!loading && (
			<main className="w-100%">
				<Header />
				<div className="bg-white block min-h-[calc(100vh-418px)] w-full py-14">
					<div className="bg-white max-w-[1280px] mx-auto md:flex justify-between">
						<div className="md:w-[62%] w-full px-4 relative">
							{loggedIn.userName === "" ? (
								<SignUpForm />
							) : (
								<div className="h-full relative">
									<div className="mt-[20%] w-full text-center font-semibold text-2xl text-[#DCA245]">
										BẠN ĐÃ ĐĂNG NHẬP THÀNH CÔNG
									</div>

									<div className="font-semibold text-[16px] mt-5 w-full text-center">
										Chào mừng{" "}
										<span className="font-bold text-primary">
											{loggedIn.userName}
										</span>{" "}
										đã quay trở lại với hệ thống
									</div>
								</div>
							)}
						</div>
						<div className="relative y md:w-[38%] w-full flex md:justify-end justify-center align-middle">
							<div className="relative right-0 bottom-0">
								<ServicesList />
							</div>
						</div>
					</div>
				</div>

				<Slide />
				<Footer />
			</main>
		)
	);
}
