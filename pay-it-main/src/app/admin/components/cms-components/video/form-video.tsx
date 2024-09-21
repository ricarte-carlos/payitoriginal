"use client";

import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetVideos } from "@/hooks/get-video/hook";
import { postVideo } from "@/hooks/postVideo";
import { extractVideoId } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { YouTubeEmbed } from "@next/third-parties/google";
import { useMutation } from "@tanstack/react-query";
import { Loader, PlayCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { ButtonAdmin } from "../../ui/button";
import { InputAdmin } from "../../ui/input";
import { TextareaAdmin } from "../../ui/textarea";

export const FormVideo = () => {
  const [needsRefetch, setNeedsRefetch] = useState(false);

  const {
    data,
    refetch: RefetchVideo,
    isLoading,
    isRefetching,
  } = useGetVideos("WhatsNew");

  type Inputs = {
    title: string;
    description: string;
    link: string;
    callToAction: string;
  };

  const formSchema = z.object({
    title: z
      .string()
      .max(100, "O título deve ter no máximo 100 caracteres")
      .min(5, "O título deve ter no mínimo 5 caracteres"),
    description: z
      .string()
      .max(500, "A descrição deve ter no máximo 500 caracteres")
      .min(50, "A descrição deve ter no mínimo 50 caracteres"),
    callToAction: z.string().min(1, "Campo obrigatório"),
    link: z.string().min(1, "Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    watch,
  } = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      title: data?.title || "",
      description: data?.description || "",
      link: data?.link || "",
    },
  });

  const watchAllFields = watch();

  useEffect(() => {
    if (
      watchAllFields.title !== data?.title ||
      watchAllFields.description !== data?.description ||
      watchAllFields.link !== data?.link ||
      watchAllFields.callToAction !== data?.callToAction
    ) {
      setNeedsRefetch(true);
    } else {
      setNeedsRefetch(false);
    }
  }, [
    watchAllFields,
    data?.title,
    data?.description,
    data?.link,
    data?.callToAction,
  ]);

  const mutation = useMutation({
    mutationFn: postVideo,
    onSuccess: () => {
      RefetchVideo();
    },
  });

  const submitFormData: SubmitHandler<Inputs> = async (data) => {
    await mutation.mutate({ data, section: "WhatsNew" });
  };

  useEffect(() => {
    setValue("title", data?.title || "");
    setValue("description", data?.description || "");
    setValue("link", data?.link || "");
    setValue("callToAction", data?.callToAction || "");
  }, [
    setValue,
    data?.title,
    data?.description,
    data?.link,
    data?.callToAction,
  ]);

  return (
    <div className="flex xl:flex-col flex-col gap-8 w-full items-center justify-between mt-16">
      {isLoading && (
        <div className="w-full flex gap-8 p-8 items-center justify-center rounded-md border-neutral-800 border">
          <div className="w-full flex flex-col justify-between gap-8 ">
            <div className="flex flex-col gap-4">
              <div>
                <Label>Título</Label>
                <Skeleton className="h-12 w-full bg-zinc-900" />
              </div>

              <div>
                <Label>Descrição</Label>
                <Skeleton className="h-12 w-full bg-zinc-900" />
              </div>
              <div>
                <Label>Link</Label>
                <Skeleton className="h-12 w-full bg-zinc-900" />
              </div>

              <div>
                <Label>Call to Action</Label>
                <Skeleton className="h-12 w-full bg-zinc-900" />
              </div>
            </div>

            <Skeleton className="h-12 w-full bg-primary-ascent/40 self-end" />
          </div>
          <div className="w-full flex flex-col relative gap-2">
            <Label>Preview</Label>
            <Skeleton className="h-72 w-full bg-zinc-900" />
            <PlayCircle className="h-16 w-16 text-zinc-900 absolute inset-0 m-auto" />
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="rounded-md border-neutral-800 border w-full  flex xl:flex-row flex-col items-center justify-around p-8 gap-8">
          <form
            onSubmit={handleSubmit(submitFormData)}
            className="flex flex-col gap-4 xl:w-1/2 w-full"
          >
            <Label htmlFor="title">Título</Label>
            <InputAdmin
              type="text"
              id="title"
              {...register("title", { required: "Campo obrigatório" })}
            />
            {errors.title && (
              <p className="text-red-400 text-xs my-2">
                {errors.title.message}
              </p>
            )}

            <Label htmlFor="description">Descrição</Label>
            <TextareaAdmin
              id="description"
              {...register("description", { required: "Campo obrigatório" })}
            />
            {errors.description && (
              <p className="text-red-400 text-xs my-2">
                {errors.description.message}
              </p>
            )}

            <Label htmlFor="link">Link de call to action</Label>
            <InputAdmin
              type="text"
              id="callToAction"
              {...register("callToAction", { required: "Campo obrigatório" })}
            />
            {errors.callToAction && (
              <p className="text-red-400 text-xs my-2">
                {errors.callToAction.message}
              </p>
            )}

            <Label htmlFor="link">Link do vídeo</Label>
            <InputAdmin
              type="text"
              id="link"
              {...register("link", { required: "Campo obrigatório" })}
            />
            {errors.link && (
              <p className="text-red-400 text-xs my-2">{errors.link.message}</p>
            )}

            <ButtonAdmin
              type="submit"
              disabled={
                !(isDirty && needsRefetch) ||
                Boolean(errors.title) ||
                Boolean(errors.link) ||
                Boolean(errors.description) ||
                Boolean(errors.callToAction)
              }
            >
              {!isRefetching ? (
                "Atualizar"
              ) : (
                <Loader className="h-6 w-6 animate-spin" />
              )}
            </ButtonAdmin>
          </form>

          <div>
            <h1>Preview</h1>
            <YouTubeEmbed
              style="border-radius: 25px; border: 1px solid #BD480C;"
              videoid={extractVideoId(data?.link ?? "")}
              width={500}
              params="controls=0&start=10&end=30&modestbranding=2&rel=0&enablejsapi=1"
            />
          </div>
        </div>
      )}
    </div>
  );
};
