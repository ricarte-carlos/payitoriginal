"use client";

import { useGetSlides } from "@/hooks/get-slides/hook";
import { cn } from "mizuhara/utils";
import Image from "next/image";

import Link from "next/link";
import { usePostHog } from "posthog-js/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Presentation } from "./presentation";
import { Button } from "./ui/button";

export function Carousel() {
  const posthog = usePostHog();
  const { data } = useGetSlides();

  return (
    <div
      id="home"
      className="sm:relative animate-fade-right scroll-m-32 select-none md:h-dvh w-full"
    >
      <Swiper
        modules={[Autoplay]}
        className={cn("mySwiper md:h-4/5 relative")}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        allowTouchMove={false}
        breakpoints={{
          640: {},
        }}
      >
        {data?.map((item) => (
          <SwiperSlide key={item.id} className="relative">
            <Image
              className="object-cover w-full h-full"
              src={item.image}
              alt={item.title ?? "Carousel Image"}
              width={1280}
              height={720}
              priority
            />
            <div
              key={item.id}
              className={cn(
                (item.title || item.description) && "bg-black/30",
                "absolute bottom-0 left-0 w-full text-white text-left gap-4 flex items-center md:items-start py-3 md:pt-8 animate-fade animate-duration-1000 animate-delay-200 h-20 sm:h-32 md:h-52",
              )}
            >
              <div
                className={cn(
                  item.link ? "flex-row justify-between" : "flex-row",
                  "container flex items-center",
                )}
              >
                <div>
                  <p
                    className={cn(
                      item.title && item.title.length > 20
                        ? "text-base"
                        : "text-xl",
                      "font-bold md:text-5xl break-words text-pretty ",
                    )}
                  >
                    {item.title}
                  </p>

                  <p
                    className={cn(
                      item.title && item.title.length > 30
                        ? "text-xs"
                        : "md:text-2xl text-base",
                      "font-medium break-words text-pretty ",
                    )}
                  >
                    {item.description}
                  </p>
                </div>
                {item.link && (
                  <Button
                    asChild
                    variant="default"
                    className="items-center flex w-fit md:w-60"
                    onClick={() =>
                      posthog?.capture("button_carousel", { link: item.link })
                    }
                  >
                    <Link href={item.link} target="_blank">
                      SAIBA MAIS
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Presentation />
    </div>
  );
}
