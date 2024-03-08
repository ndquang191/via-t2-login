import { useLocalStorage } from "usehooks-ts";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import Image from "next/image";

interface SignUpSuccessProps {
	open: boolean;
	setOpen: (openSuccess: boolean) => void;
	content: any;
}
const SignUpSuccess: React.FC<SignUpSuccessProps> = ({ open, setOpen, content }) => {
	const [loggedIn, setLoggedIn] = useLocalStorage("info", { userName: "" });
	return (
		<div>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="sm:max-w-[560px] p-6 pb-10">
					<div className="w-full flex justify-center">
						<Image src={"/img/dialog/approved.png"} alt="done" width={64} height={64} />
					</div>
					<div className="font-semibold text-lg text-[#10B981] w-full text-center">
						ĐĂNG KÝ THÀNH CÔNG
					</div>
					<div className="  text-black w-full text-center">Để sử dụng dịch vụ thu hộ</div>
					<div className="  text-black w-full text-center">
						bạn có muốn Ký kết hợp đồng điện tử ngay ?
					</div>

					<div className="w-full flex gap-6 mt-6 justify-center">
						<Button
							className="bg-[#E7EAEE] text-black font-semibold"
							onClick={() => setLoggedIn(content)}
						>
							Đăng nhập
						</Button>
						<Button
							className="bg-[#19B88B] text-white font-semibold"
							onClick={() => setOpen(false)}
						>
							Ký kết hợp đồng
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default SignUpSuccess;
