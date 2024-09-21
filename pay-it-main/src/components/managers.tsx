"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { managers } from "@/constants/managers";

import { MotionDiv } from "@/lib/framer";
import { cn } from "mizuhara/utils";
import Image from "next/image";
// import required modules
import { Autoplay, Pagination } from "swiper/modules";

export function Managers() {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 50 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: 0.2 },
      }}
      viewport={{ once: true, margin: "-64px" }}
      className="container my-20 flex flex-col gap-12 scroll-m-32"
      id="gestores"
    >
      <div className="flex flex-col gap-4">
        <h3 className="text-3xl font-bold">Nossos gestores</h3>
      </div>
      <div>
        <Swiper
          pagination={true}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
          spaceBetween={16}
          slidesPerView={1.3}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          centeredSlides={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 16,
              centeredSlides: false,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 16,
              centeredSlides: false,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 16,
              centeredSlides: false,
            },
          }}
        >
          {managers.map((manager, index) => (
            <SwiperSlide key={manager.name}>
              <div className="flex flex-col justify-center items-center p-2 h-96 rounded-md border bg-white dark:bg-gray-600/40 ">
                <Image
                  className={cn(
                    "rounded-full w-28 h-28  object-cover ",
                    index === 0 ? "object-top" : "object-center",
                  )}
                  src={manager.img}
                  alt={manager.name}
                  width={100}
                  height={100}
                />
                <div className="flex flex-col text-center gap-3">
                  <div>
                    <p className="text-secondary font-medium text-lg">
                      {manager.name}
                    </p>
                    <p className="text-sm">{manager.position}</p>
                  </div>
                  <div>
                    <p className="text-xs">{manager.description}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </MotionDiv>
  );
}
