import { useLocalStorage } from "usehooks-ts";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";

interface SignUpFailedProps {
	open: boolean;
	setOpen: (openSuccess: boolean) => void;
	// content: any;
}
const SignUpFailed: React.FC<SignUpFailedProps> = ({ open, setOpen }) => {
	return (
		<div>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="sm:max-w-[560px] p-6 pb-10">
					<div className="w-full flex justify-center">
						<Image src={"/img/dialog/denied.png"} alt="done" width={64} height={64} />
					</div>
					<div className="font-semibold text-lg text-[#DC2626] w-full text-center">
						ĐĂNG KÝ KHÔNG THÀNH CÔNG
					</div>
					<div className=" text-black w-full flex justify-center">
						<div className="w-3/5">
							Thông tin bạn đăng ký có thể đã trùng với một tài khoản khác trong hệ thống
						</div>
					</div>

					<div className="w-full flex gap-6 mt-6 justify-center">
						<Button
							className="bg-[#E7EAEE] text-black font-semibold"
							onClick={() => setOpen(false)}
						>
							<ChevronLeft className="mr-2" />
							Bỏ qua đăng ký
						</Button>
						<Button
							className="bg-[#19B88B] text-white font-semibold"
							onClick={() => setOpen(false)}
						>
							Thử lại
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default SignUpFailed;
