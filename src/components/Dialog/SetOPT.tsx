"use client";

import React, { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { AlertCircle, Check, ChevronLeft, Flashlight } from "lucide-react";
import { cn } from "@/lib/utils";
import NewPass from "./NewPass";

const COUNTDOWN = 180;
interface UserInfo {
	username: string;
	otp: string;
}

interface SetOTPProps {
	open: boolean;
	setOpen: (isOpen: boolean) => void;
	setBack: (isOpen: boolean) => void;
	username: string;
	otp: string;
	setInfo: (userInfo: UserInfo) => void;
}
const SetOTP: React.FC<SetOTPProps> = ({ open, setOpen, setBack, username, otp, setInfo }) => {
	const [seconds, setSeconds] = useState(COUNTDOWN); // 3 minutes
	const [firstTry, setFirstTry] = useState(true);
	const [openNext, setOpenNext] = useState(false);
	const [otpArr, setOtpArr] = useState(["", "", "", "", "", ""]);
	const inputRefs = useRef([]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (seconds > 0) {
				setSeconds((prevSeconds) => prevSeconds - 1);
			} else {
				clearInterval(interval);
				// Optional: You can perform any action when the countdown reaches 0 here
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [seconds]);

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	};

	useEffect(() => {
		setSeconds(COUNTDOWN);
		setFirstTry(true);
	}, [open]);

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		setOtpArr((prev) => {
			prev[index] = e.target.value;
			return prev;
		});

		if (Number(e.target.value) >= 10 || (e.target.value.length > 1 && e.target.value.startsWith("0")))
			e.target.value = String(Number(e.target.value) % 10);

		if (e.target.value !== "" && index < 5) {
			inputRefs.current[index + 1].focus();
		}
	};

	const handleBack = () => {
		setOpen(false);
		setBack(true);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
		if (event.key >= "0" && event.key <= "9") {
			// Allow numbers
		} else if (event.key === "Backspace") {
			// Handle Backspace key

			if (event.target.value === "" && index > 0) {
				inputRefs.current[index - 1].focus();
			}
		} else {
			event.preventDefault();
		}
	};

	async function requestOTP() {
		const res = await fetch(
			`https://dev-fe-exam.viajsc.com/examUser/get-otp-change-password?username=${username}`,
			{
				method: "GET",
			}
		).then((res) => res.json());

		if (res.errorCode == 200) {
			const otp = await fetch(
				`https://dev-fe-exam.viajsc.com/OtpViewerConntroller/get-otp?username=${username}`,
				{
					method: "GET",
				}
			)
				.then((res) => res.json())
				.catch((err) => console.log("OTP err : ", err));

			setInfo({ username, otp: otp.error });
		} else {
			console.log("sai");
		}
		setSeconds(COUNTDOWN);
		console.log("OTP CREATED");
	}

	async function handleSubmit() {
		let otp = otpArr.join("");

		const res = await fetch(
			`https://dev-fe-exam.viajsc.com/ExamUser/validate-otp-change-password?userName=${username}&otpCode=${otp}`,
			{ method: "GET" }
		)
			.then((res) => res.json())
			.catch((err) => console.log("Validate err : ", err));

		if (res.errorCode == 200) {
			setOpenNext(true);
			setOpen(false);
		} else {
			requestOTP();
			setFirstTry(false);
		}
	}

	return (
		<div>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="sm:max-w-[560px] p-0">
					<DialogHeader className="bg-[#F7F8F9]">
						<DialogTitle className="p-6">
							NHẬP MÃ OTP <span className="font-extralight text-xs">{otp}</span>
						</DialogTitle>
					</DialogHeader>
					<div className="space-x-2 px-6">
						{firstTry ? (
							<div className="w-full text-[#10B981] text-center font-semibold">
								MÃ OTP ĐÃ ĐƯỢC GỬI ĐẾN SỐ ĐIỆN THOẠI/ EMAIL
							</div>
						) : (
							<div className="w-full flex justify-center">
								<div className="p-2.5 bg-[#FFF2F2] text-[#ECAD48]">
									<AlertCircle
										width={24}
										height={24}
										className="text-[#ECAD48] inline mr-2 relative bottom-0.5"
									/>
									Mã khôi phục không đúng.{" "}
									<span
										onClick={requestOTP}
										className="text-blue-400 cursor-pointer"
									>
										{" "}
										Gửi lại mã
									</span>
								</div>
							</div>
						)}
						{seconds != 0 ? (
							<div className="w-full text-center text-[#ECAD48] my-5">
								Thời gian còn lại : {formatTime(seconds)} phút
							</div>
						) : (
							<div className="w-full text-center text-[#ECAD48] my-5">
								Mã OTP hết hiệu lực. Yêu cầu gửi lại mã
							</div>
						)}

						<div className="flex justify-around gap-2 my-5">
							{otpArr.map((otp, index) => (
								<Input
									ref={(el) => (inputRefs.current[index] = el)}
									key={index}
									disabled={seconds === 0}
									type="number"
									onChange={(e) => handleOnChange(e, index)}
									onKeyDown={(e) => handleKeyDown(e, index)}
									className={cn(
										"border-2 border-[#E7EAEE] rounded-sm h-[66px] w-[66px] text-center font-extrabold text-lg",
										firstTry ? "text-[#059669]" : "text-[#ECAD48]"
									)}
								/>
							))}
						</div>
						{firstTry && (
							<div className="text-center my-4">
								Không nhận được mã OTP
								<span onClick={requestOTP} className="text-blue-400 cursor-pointer">
									{" "}
									Gửi lại mã
								</span>
							</div>
						)}
						<div className="w-full flex justify-center gap-5 mb-10">
							<Button
								className="bg-slate-300 text-black font-semibold rounded-sm"
								onClick={handleBack}
							>
								<ChevronLeft height={16} width={16} />
								Trở về
							</Button>
							<Button
								disabled={otpArr.includes("")}
								type="submit"
								className="self-center rounded-sm"
								onClick={handleSubmit}
							>
								<Check height={16} width={16} className="mr-2" />
								Thay đổi mật khẩu
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>

			<NewPass open={openNext} setOpen={setOpenNext} otp={otp} username={username} />
		</div>
	);
};

export default SetOTP;