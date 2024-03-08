import Image from "next/image";
import React from "react";

const Item = ({ img, name }: any) => {
	return (
		<div className="w-full border border-white bg-white p-2 cursor-pointer  hover:border-primary">
			<div className="h-10 w-full relative">
				<Image
					alt="Mountains"
					src={"/img/service/" + img + ".png"}
					fill
					style={{ objectFit: "contain" }}
					sizes="(max-height: 40px) 100vh"
				/>
			</div>

			<div className="text-[#0D0F11] text-lg font-semibold text-center mt-1">{name}</div>
		</div>
	);
};

const ServicesList = () => {
	return (
		<div className="bg-[#F7F8F9] w-[352px] p-6">
			<div className="text-xl font-semibold text-center">DỊCH VỤ CỦA CHÚNG TÔI</div>

			<div className="my-6 flex gap-6">
				<Item img={"g_box"} name="VIA_EXPRESS" />
				<Item img={"g_clock"} name="VIA_FAST" />
			</div>
			<div className="my-6 flex gap-6">
				<Item img={"g_car"} name="VIA_SUPER" />
				<Item img={"g_leaf"} name="VIA_FRESH" />
			</div>
			<div className="my-6 flex gap-6">
				<Item img={"g_plane"} name="VIA_INTERNATIONAL" />
			</div>
		</div>
	);
};

export default ServicesList;
