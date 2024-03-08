"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { MutableRefObject, useRef } from "react";

const Slide = () => {
	let sliderRef = useRef(null);
	var settings = {
		dots: false,
		infinite: true,
		speed: 500,
		arrows: false,
		slidesToShow: 6,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	};

	const next = () => {
		if (sliderRef.current != null) sliderRef.current.slickNext();
	};

	const prev = () => {
		if (sliderRef.current != null) sliderRef.current.slickPrev();
	};
	return (
		<div className="bg-[#F7F8F9] py-[48px] px-[78px]">
			<div className="text-center text-primary text-3xl font-semibold mb-[54px]">
				KHÁCH HÀNG TIÊU BIỂU
			</div>
			<div className="">
				<Slider ref={sliderRef} {...settings}>
					<div className="item h-[80px] flex justify-center content-center">
						<div className="h-[45px] w-full relative top-3">
							<Image
								alt="Mountains"
								src={"/img/slide/1.png"}
								fill
								style={{ objectFit: "contain" }}
								sizes="(max-height: 45px)"
							/>
						</div>
					</div>
					<div className="item h-[80px]">
						<div className="h-11 w-full relative top-3">
							<Image
								alt="Mountains"
								src={"/img/slide/2.png"}
								fill
								style={{ objectFit: "contain" }}
								sizes="(max-height: 45px) 100vh"
							/>
						</div>
					</div>{" "}
					<div className="item h-[80px]">
						<div className="h-[70px] w-full relative">
							<Image
								alt="Mountains"
								src={"/img/slide/5.png"}
								fill
								style={{ objectFit: "contain" }}
								sizes="(max-height: 70px) 100vh"
							/>
						</div>
					</div>{" "}
					<div className="item h-[80px]">
						<div className="h-10 w-full relative top-4">
							<Image
								alt="Mountains"
								src={"/img/slide/6.png"}
								fill
								style={{ objectFit: "contain" }}
								sizes="(max-height: 45px) 100vh"
							/>
						</div>
					</div>{" "}
					<div className="item h-[80px]">
						<div className="h-11 w-full relative top-3">
							<Image
								alt="Mountains"
								src={"/img/slide/3.png"}
								fill
								style={{ objectFit: "contain" }}
								sizes="(max-height:45px) 100vh"
							/>
						</div>
					</div>{" "}
					<div className="item h-[80px]">
						<div className="h-20 w-full relative">
							<Image
								alt="Mountains"
								src={"/img/slide/4.png"}
								fill
								style={{ objectFit: "contain" }}
								sizes="(max-height: 45px) 100vh"
							/>
						</div>
					</div>{" "}
				</Slider>

				<div className="flex justify-between relative">
					<div className="relative bottom-14" onClick={() => prev()}>
						<Image src={"/img/slide/left.png"} alt="right" height={16} width={8} />
					</div>
					<div className="relative bottom-14" onClick={() => next()}>
						<Image src={"/img/slide/right.png"} alt="right" height={16} width={10} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Slide;
