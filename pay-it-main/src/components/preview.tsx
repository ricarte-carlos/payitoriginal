"use client";
import { useGetVideos } from "@/hooks/get-video/hook";
import { MotionDiv } from "@/lib/framer";
import { cn, extractVideoId } from "@/lib/utils";
import { YouTubeEmbed } from "@next/third-parties/google";
import Link from "next/link";
import { usePostHog } from "posthog-js/react";
import { useMediaQuery, useWindowSize } from "usehooks-ts";
import { Button } from "./ui/button";

export function Preview() {
  const posthog = usePostHog();
  const { data } = useGetVideos("WhatsNew");
  const lg = useMediaQuery("(min-width: 1024px)");
  const md = useMediaQuery("(min-width: 768px)");
  const sm = useMediaQuery("(min-width: 640px)");
  const { width } = useWindowSize();

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 50 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: 0.2 },
      }}
      viewport={{ once: true, margin: "-64px" }}
      className={"dark:bg-gray-600/40 bg-[#FBFBFB] py-1"}
    >
      <div
        className={cn(
          "my-20 container lg:gap-x-12",
          "grid grid-areas-preview-layout-mobile grid-cols-preview-layout-mobile grid-rows-preview-layout-mobile",
          "lg:grid-areas-preview-layout-desktop lg:grid-cols-preview-layout-desktop lg:grid-rows-preview-layout-desktop",
        )}
      >
        <h3 className="text-3xl font-bold grid-in-title mb-4">{data?.title}</h3>
        <p className="grid-in-description mb-4">{data?.description}</p>
        <Button
          className="rounded-3xl grid-in-button mt-6"
          size="lg"
          variant="default"
          asChild
          onClick={() =>
            posthog?.capture("button_video_section", {
              link: data?.callToAction,
            })
          }
        >
          <Link href={data?.callToAction ?? ""} target="_blank">
            Veja mais
          </Link>
        </Button>
        <div className="grid-in-video">
          {data?.link && (
            <div className="w-full flex lg:justify-end md:justify-center justify-center mb-6">
              <YouTubeEmbed
                videoid={extractVideoId(data?.link)}
                style={cn(
                  "border-radius: 30px; height: 100%;",
                  lg && "width: 1280px;",
                  md && "width: 1024px;",
                  sm && "width: 640px;",
                  width > 375 && !lg && !md && !sm && "width: 320px;",
                  width <= 375 && "width: 300px;",
                )}
              />
            </div>
          )}
        </div>
      </div>
    </MotionDiv>
  );
}
