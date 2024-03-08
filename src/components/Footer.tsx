import Image from "next/image";
import Link from "next/link";

const Footer = () => {
	return (
		<footer className="">
			<div className="w-full bg-primary px-[84px] py-12 md:grid grid-cols-3">
				<div className="col-span-1 ">
					<Image src={"/img/footer/Layer_1.png"} height={53} width={159} alt="logo" />

					<div className="max-w-[320px]">
						<div className="text-white text-sm font-semibold mt-4 mb-2 max-w-">
							CÔNG TY CỔ PHẦN ĐẦU TƯ VÀ PHÁT TRIỂN ỨNG DỤNG THÔNG MINH VIỆT
						</div>

						<div className="text-white text-sm">Mã số thuế : 0106494214</div>
						<div className="text-white text-sm">Ngày hoạt động : 27/03/2014</div>
						<div className="text-white text-sm">Sở kế hoạch và đầu tư thành phố Hà Nội</div>

						<div className="flex gap-2 mt-2">
							<Link href={"https://viajsc.com/"}>
								<Image
									src={"/img/footer/logo/Facebook.png"}
									width={30}
									height={30}
									alt="fb"
								/>
							</Link>
							<Link href={"https://viajsc.com/"}>
								<Image
									src={"/img/footer/logo/Instagram.png"}
									width={35}
									height={30}
									alt="fb"
								/>
							</Link>
							<Link href={"https://viajsc.com/"}>
								<Image
									src={"/img/footer/logo/TT.png"}
									width={35}
									height={30}
									alt="fb"
								/>
							</Link>
							<Link href={"https://viajsc.com/"}>
								<Image
									src={"/img/footer/logo/YT.png"}
									width={35}
									height={30}
									alt="fb"
								/>
							</Link>
							<Link href={"https://viajsc.com/"}>
								<Image
									src={"/img/footer/logo/Zalo.png"}
									width={30}
									height={30}
									alt="fb"
								/>
							</Link>
						</div>
					</div>
				</div>

				<div className="col-start-2 col-end-4 relative">
					<div className="md:flex md:absolute bottom-0 right-0 text-white gap-20">
						<div className="md:my-0 my-3">
							<div className="text-sm font-semibold">LIÊN HỆ</div>
							<div className="flex mt-3">
								<Image
									src={"/img/footer/Icons.svg"}
									width={16}
									height={16}
									alt="mail"
								/>
								<div className="text-sm font-semibold ml-1">contact@viajsc.com</div>
							</div>
							<div className="flex mt-2">
								<Image
									src={"/img/footer/Icons2.svg"}
									width={16}
									height={16}
									alt="mail"
								/>
								<div className="text-sm font-semibold ml-1">1900 9999</div>
							</div>
							<div className="flex mt-2">
								<Image
									src={"/img/footer/Icons3.svg"}
									width={16}
									height={16}
									alt="mail"
								/>
								<div className="text-sm font-semibold ml-1">
									16, Ngõ 204, Trần Duy Hưng, Trung Hòa, Cầu Giấy, HN
								</div>
							</div>

							<Image
								className="mt-2"
								src={"/img/footer/icon-bct.png"}
								width={91}
								height={34}
								alt="mail"
							/>
						</div>

						<div className="md:my-0 my-3">
							<div className="text-sm font-semibold">TẢI ỨNG DỤNG</div>

							<div className="mt-3 flex gap-3">
								<Link href={"viajsc.com"}>
									<Image
										src={"/img/footer/Group5150.png"}
										width={80}
										height={80}
										alt="qr"
									/>
								</Link>

								<div className="">
									<Link href={"viajsc.com"}>
										<Image
											src={"/img/footer/apple.png"}
											width={110}
											height={80}
											alt="qr"
										/>
									</Link>
									<Link href={"viajsc.com"}>
										<Image
											className="mt-2"
											src={"/img/footer/appleReal.png"}
											width={110}
											height={80}
											alt="qr"
										/>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="w-full  bg-primary px-[84px] text-white py-4">
				<div className="text-center mb-2 font-semibold">CHÍNH SÁCH BẢO MẬT</div>
				<div className="text-center">Copyright © 2021 VIA JSC. All rights reserved.</div>
			</div>
		</footer>
	);
};

export default Footer;
