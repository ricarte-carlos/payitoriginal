"use client";

import type React from "react";
import { forwardRef, useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useObjectURL } from "@/hooks/use-object-url";
import { usePublished } from "@/store/published";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import {
  ArrowUpDown,
  CheckCircle,
  ImageIcon,
  SettingsIcon,
  Trash,
  XCircle,
} from "lucide-react";
import { cn } from "mizuhara/utils";
import Image from "next/image";
import {
  DragDropContext,
  Draggable,
  type DraggableProvidedDragHandleProps,
  type DraggableStateSnapshot,
  Droppable,
  type OnDragEndResponder,
} from "react-beautiful-dnd";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { ButtonAdmin } from "../../ui/button";
import type { SlideProps } from "./carousel-editor";

type ImagePreviewProps = {
  slide: SlideProps;
  index: number;
  dragHandleProps: DraggableProvidedDragHandleProps | NonNullable<unknown>;
  snapshot: DraggableStateSnapshot;
  removeFile: (id: string, key: string) => void;
  updatedSlidesData: (data: Inputs & { id: string }) => void;
};

type Inputs = {
  title: string;
  description: string;
  link: string;
};

const formSchema = z.object({
  title: z.string().max(36, "O titulo deve ter no máximo 36 caracteres"),
  description: z
    .string()
    .max(100, "A descrição deve ter no máximo 100 caracteres"),
  link: z.string().optional(),
});

const ImagePreview = forwardRef<HTMLDivElement, ImagePreviewProps>(
  (
    {
      index,
      slide,
      dragHandleProps,
      snapshot,
      removeFile,
      updatedSlidesData,

      ...props
    },
    ref,
    // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
  ) => {
    const { setIsPublished } = usePublished();
    const url = useObjectURL(slide.file);
    const image = slide.image ? slide.image : url;
    const [formVisible, setFormVisible] = useState(false);

    const {
      register,
      handleSubmit,
      watch,
      formState: { errors, isDirty },
      setValue,
    } = useForm<Inputs>({
      resolver: zodResolver(formSchema),
      mode: "all",
      defaultValues: {
        title: slide.title ?? "",
        description: slide.description ?? "",
        link: slide.link ?? "",
      },
    });

    const submitFormData: SubmitHandler<Inputs> = (data) => {
      updatedSlidesData({ ...data, id: slide.id });

      setIsPublished(false);
    };

    const watchAllFields = watch();

    useEffect(() => {
      if (isDirty) {
        setIsPublished(false);
      }
    }, [isDirty, setIsPublished]);

    useEffect(() => {
      setValue("title", slide.title);
      setValue("description", slide.description);
      setValue("link", slide.link);
    }, [slide.title, slide.description, slide.link, setValue]);

    return (
      <div
        ref={ref}
        {...dragHandleProps}
        {...props}
        className={cn(
          "flex bg-zinc-950 outline-1 outline rounded-md w-fit self-center justify-between items-center flex-col xl:flex-row relative outline-neutral-800 transition-all duration-300",
          formVisible && "min-h-[430px]",
          snapshot.isDragging
            ? "shadow-lg shadow-black cursor-grabbing max-h-64"
            : "shadow-none",
        )}
      >
        {snapshot.isDragging && (
          <div className="size-full flex items-center justify-center">
            <p className="text-2xl">Reposicionando slide {index + 1}</p>
          </div>
        )}
        <form
          onSubmit={handleSubmit(submitFormData)}
          className={cn(
            "w-full bg-zinc-950 p-8 flex-col h-full rounded-sm justify-around gap-2 absolute hidden z-0 xl:flex xl:z-30 xl:static",
            formVisible && "z-50 flex absolute",
            snapshot.isDragging && "!hidden",
          )}
        >
          <div className="flex flex-col gap-2">
            <label className="text-white font-semibold" htmlFor="title">
              Titulo
            </label>
            <Input
              placeholder="Digite o titulo"
              id="title"
              className={cn(
                "bg-zinc-900",
                errors.title && "focus-visible:ring-red-500",
              )}
              {...register("title")}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white font-semibold" htmlFor="description">
              Descrição
            </label>
            <Textarea
              placeholder="Digite a descrição"
              id="description"
              className={cn(
                "resize-none bg-zinc-900",
                errors.description && "focus-visible:ring-red-500",
              )}
              {...register("description")}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              className="text-white font-semibold"
              htmlFor="call-to-action"
            >
              Link de call to action
            </label>
            <Input
              placeholder="Digite o link"
              id="call-to-action"
              {...register("link")}
              className="bg-zinc-900"
            />
            {errors.link && (
              <p className="text-red-500 text-sm">{errors.link.message}</p>
            )}
          </div>

          <div className="flex gap-8">
            <ButtonAdmin
              type="submit"
              className=" text-white w-fit"
              onClick={() => {
                setFormVisible(false);
              }}
            >
              Salvar
            </ButtonAdmin>

            {slide.title !== watchAllFields.title ||
            slide.description !== watchAllFields.description ||
            slide.link !== watchAllFields.link ? (
              <div
                className="flex items-center gap-2 text-red-400 animate-fade"
                key={`${slide.id}not-saved`}
              >
                <XCircle size={16} />
                <p>Não salvo</p>
              </div>
            ) : (
              <div
                className="flex items-center gap-2 text-green-400 animate-fade"
                key={`${slide.id}saved`}
              >
                <CheckCircle size={16} />
                <p>Salvo</p>
              </div>
            )}
          </div>
        </form>

        <div
          className={cn(
            "relative group flex flex-row justify-around w-full z-10 xl:p-8",
            snapshot.isDragging && "hidden",
          )}
        >
          <div className="w-full relative rounded-md">
            <Image
              width={1920}
              height={1080}
              src={image ?? "/placeholder.png"}
              alt="image"
              className={
                "xl:object-cover rounded-md group-hover:filter group-hover:brightness-50 transition-all duration-300 border"
              }
            />
            <div className="absolute flex flex-col gap-4 bg-neutral-950/40 bottom-0 p-4 w-full min-h-24 max-w-full">
              <h1 className="text-2xl font-bold textt-pretty break-words ">
                {watchAllFields.title || slide.title}
              </h1>
              <p className="text-xs font-semibold textt-pretty break-words">
                {watchAllFields.description || slide.description}
              </p>
            </div>
          </div>

          <div className="flex-row gap-8 absolute self-center inset-0 hidden group-hover:flex items-center justify-center">
            <AlertDialog>
              <AlertDialogTrigger>
                <Trash
                  size={48}
                  className="bg-red-500 rounded-full hover:cursor-pointer text-white p-2 hover:bg-red-400 hover:scale-110 transition-all duration-300"
                />
              </AlertDialogTrigger>
              <AlertDialogContent className="flex flex-col bg-zinc-900">
                <p>Você deseja realmente deletar este slide?</p>
                <div className="flex self-end gap-2">
                  <AlertDialogCancel asChild>
                    <ButtonAdmin variant="secondary">Cancelar</ButtonAdmin>
                  </AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <ButtonAdmin
                      variant="default"
                      className="bg-primary-ascent hover:bg-primary-ascent/70"
                      onClick={() => {
                        removeFile(slide.id, slide.key ?? "");
                      }}
                    >
                      Confirmar
                    </ButtonAdmin>
                  </AlertDialogAction>
                </div>
              </AlertDialogContent>
            </AlertDialog>

            <ButtonAdmin
              className="rounded-full w-fit p-2 xl:hidden"
              onClick={() => {
                setFormVisible(true);
              }}
            >
              <SettingsIcon size={24} />
            </ButtonAdmin>
          </div>
        </div>
      </div>
    );
  },
);

ImagePreview.displayName = "ImagePreview";

type DraggableImageListProps = {
  slides: SlideProps[];
  setSlides: React.Dispatch<React.SetStateAction<SlideProps[]>>;
  isUploading?: boolean;
  setSlidesRemoveQueue: React.Dispatch<React.SetStateAction<string[]>>;
};

export const DragableImageList = ({
  slides,
  setSlides,
  isUploading,
  setSlidesRemoveQueue,
}: DraggableImageListProps) => {
  const { isPublished, setIsPublished } = usePublished();
  const dragEnded: OnDragEndResponder = (param) => {
    setIsPublished(false);
    const { source, destination } = param;
    const _arr = [...slides];

    const _item = _arr.splice(source.index, 1)[0];

    _arr.splice(destination?.index ?? 0, 0, _item);
    setSlides(_arr);
  };

  async function removeFile(slideToRemove: string, keyToRemove: string) {
    setSlides((prev) => prev.filter((slide) => slide.id !== slideToRemove));
    setIsPublished(false);
    setSlidesRemoveQueue((prev) => [...prev, keyToRemove]);
  }

  function updatedSlidesData({
    id,
    title,
    description,
    link,
  }: Inputs & { id: string }) {
    setSlides((prev) =>
      prev.map((slide) => {
        if (slide.id === id) {
          slide.title = title;
          slide.description = description;
          slide.link = link;
          slide.isSaved = false;
        }
        return slide;
      }),
    );
  }

  const SlidesListSkeleton = Array.from({ length: 3 }).map((_, i) => i);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col w-full justify-between">
        {slides.length > 0 && (
          <div className="flex text-white items-center p-2 rounded-md gap-2">
            <p className=" text-lg">Arraste e solte para ordenar os slides</p>
            <ArrowUpDown className="size-6 text-primary-ascent" />
          </div>
        )}
      </div>

      <DragDropContext onDragEnd={dragEnded}>
        <Droppable
          droppableId={"images"}
          type="COLUMN"
          direction="vertical"
          ignoreContainerClipping
          isCombineEnabled
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex gap-16 flex-col relative mb-96"
            >
              {isUploading &&
                SlidesListSkeleton.map((item: number) => {
                  return (
                    <div
                      className="h-full w-full animate-fade-down animate-duration-1000 "
                      key={`slides-skeleton${item}`}
                    >
                      <div className="h-72 flex gap-8">
                        <div className="w-full p-6 flex flex-col gap-4 items-center justify-center">
                          <p className="self-start">Titulo</p>
                          <Skeleton className="h-12 w-full bg-zinc-900" />
                          <p className="self-start">Descrição</p>
                          <Skeleton className="h-12 w-full bg-zinc-900" />
                          <Skeleton className="h-12 w-20 self-start bg-primary-ascent" />
                        </div>
                        <div className="w-full">
                          <Skeleton className="h-full w-full relative bg-primary-ascent/10">
                            <ImageIcon
                              className="absolute inset-0 m-auto"
                              size={48}
                            />
                          </Skeleton>
                        </div>
                      </div>
                    </div>
                  );
                })}

              {!isUploading &&
                slides.map((slide, index) => {
                  return (
                    <Draggable
                      key={slide.id}
                      index={index}
                      draggableId={`image-${slide.id}`}
                    >
                      {(_provided, _snapshot) => (
                        <ImagePreview
                          removeFile={removeFile}
                          updatedSlidesData={updatedSlidesData}
                          slide={slide}
                          index={index}
                          ref={_provided.innerRef}
                          dragHandleProps={
                            _provided.dragHandleProps
                              ? _provided.dragHandleProps
                              : {}
                          }
                          {..._provided.draggableProps}
                          snapshot={_snapshot}
                        />
                      )}
                    </Draggable>
                  );
                })}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
