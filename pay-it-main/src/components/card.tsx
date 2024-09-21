"use client";

import { reviews } from "@/constants/reviews";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export function Card() {
  return (
    <div>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={16}
        slidesPerView={1.2}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.name}>
            <div className="p-3 h-52 border bg-white dark:bg-gray-600/40 flex flex-col justify-evenly rounded-md gap-2">
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-secondary">{review.title}</p>
                <p className="text-sm text-balance">{review.description}</p>
              </div>
              <div className="flex gap-2">
                <Image
                  src={review.img}
                  alt={review.name}
                  width={50}
                  height={50}
                  className="rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {review.position}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
