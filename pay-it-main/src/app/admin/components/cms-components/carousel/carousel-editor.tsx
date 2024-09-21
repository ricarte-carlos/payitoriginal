"use client";

import { Cropper, type CropperRef } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { toast } from "sonner";

import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { useUploadThing } from "@/lib/uploadthing";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  CheckIcon,
  ImageIcon,
  ImagePlus,
  Laptop,
  Loader,
  PlusCircleIcon,
  PlusIcon,
  X,
} from "lucide-react";

import { EnumComponents } from "..";

import { useGetContentLibraryMedias } from "@/hooks/get-content-library/hook";
import { useGetSlides } from "@/hooks/get-slides/hook";
import { postNewSlide } from "@/hooks/postSlide";
import { dataURItoFile } from "@/lib/utils";
import { usePublished } from "@/store/published";
import { useMutation } from "@tanstack/react-query";
import ky from "ky";
import Image from "next/image";
import { HeaderAdmin } from "../../header/header-admin";
import { ButtonAdmin } from "../../ui/button";
import {
  DialogAdmin,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../../ui/dialog";
import { DragableImageList } from "./draggable-list";

export type SlideProps = {
  file?: File;
  title: string;
  description: string;
  id: string;
  image?: string;
  link: string;
  key?: string;
  isSaved?: boolean;
};

export const Carousel = () => {
  const [slides, setSlides] = useState<SlideProps[]>([]);
  const [lastSlide, setLastSlide] = useState<SlideProps>();
  const [slidesRemoveQueue, setSlidesRemoveQueue] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { data, refetch: refetchSlides } = useGetSlides();
  const { isPublished, setIsPublished } = usePublished();
  const [modalsState, setModalsState] = useState(false);

  const cropperRef = useRef<CropperRef>(null);

  const { data: galery, refetch: refetchGalery } =
    useGetContentLibraryMedias(50);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setIsPublished(false);
      setSlides((prev) => [
        ...prev,
        {
          file: acceptedFiles[0],
          title: "",
          description: "",
          link: "",
          id: crypto.randomUUID(),
          isSaved: false,
        },
      ]);
    },
    [setIsPublished],
  );

  const mutation = useMutation({
    mutationFn: postNewSlide,
    onSuccess: () => {
      refetchSlides();
    },
  });

  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader");

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  const handleConfirm = () => {
    setModalsState(false);
    const result = cropperRef.current?.getCanvas()?.toDataURL();

    if (result) {
      if (result.startsWith("data:image")) {
        const newfile = dataURItoFile(result, "placeholder.png");
        handleNewFile(newfile);
      } else {
        fetch(result)
          .then(async (response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const blob = await response.blob();
            const newfile = new File(
              [blob],
              slides.at(-1)?.file?.name || "placeholder.png",
              { type: blob.type },
            );

            handleNewFile(newfile);
          })
          .catch((error) => {
            console.error("Fetch error:", error);
          });
      }
    } else {
      console.error("No URL provided");
    }

    setLastSlide(undefined);
    toast.success("Slide selecionado com sucesso");
  };

  function handleNewFile(newfile: File) {
    const actual = slides[slides.length - 1];
    const index = slides.findIndex((slide) => slide.id === actual.id);
    const newFiles = [...slides];
    newFiles[index] = { ...newFiles[index], file: newfile, image: "" };
    setSlides(newFiles);
  }

  function handleUpload(
    uploadResponse: Awaited<ReturnType<typeof startUpload>>,
    slide: SlideProps,
  ) {
    if (uploadResponse) {
      const [{ key, url }] = uploadResponse;

      mutation.mutate({
        title: slide.title,
        description: slide.description,
        key: key,
        position: slides.indexOf(slide),
        image: url,
        link: slide.link,
        publishedAt: new Date(),
      });
      toast.success(`${slide.file?.name} publicado com sucesso`);
    }
  }

  const handleSimpleUpdate = (slide: SlideProps) => {
    mutation.mutate({
      title: slide.title,
      description: slide.description,
      position: slides.indexOf(slide),
      publishedAt: new Date(),
      key: slide.key ? slide.key : "",
      link: slide.link ? slide.link : "",
      image: slide.image ? slide.image : "",
    });
  };

  const handleDeletion = async () => {
    await Promise.all(
      slidesRemoveQueue.map(async (key) => {
        await ky.delete("/api/carousel", {
          json: { key },
        });
      }),
    );
  };

  const handleInsertion = async () => {
    await Promise.all(
      slides.map(async (slide) => {
        if (slide.file) {
          const uploadResponse = await startUpload([slide.file]);

          handleUpload(uploadResponse, slide);
        } else {
          handleSimpleUpdate(slide);
        }
      }),
    );
  };

  useEffect(() => {
    if (!slides.at(-1)?.file || slides.at(-1)?.image === "") return;
    const lastSlide = slides.at(-1);
    if (!lastSlide) return;

    if (lastSlide?.file) {
      const urlObj = URL.createObjectURL(lastSlide.file);
      setLastSlide({ ...lastSlide, image: urlObj });
    } else {
      if (lastSlide?.image) {
        setLastSlide({
          ...lastSlide,
          image: lastSlide?.image,
        });
      }
    }

    return () => {
      if (lastSlide?.image) {
        URL.revokeObjectURL(lastSlide.image);
      }
    };
  }, [slides]);

  useEffect(() => {
    setSlides([]);

    data?.map((slide) => {
      setSlides((prev) => [
        ...prev,
        {
          id: slide.id,
          title: slide.title || "",
          description: slide.description || "",
          image: slide.image,
          link: slide.link || "",
          key: slide.key,
          isSaved: true,
        },
      ]);
    });
  }, [data]);

  return (
    <div className="flex flex-col gap-8 items-center">
      <HeaderAdmin>
        <div className="w-full">
          <h1 className="capitalize text-3xl font-medium">
            {EnumComponents.carousel}
          </h1>
          <p>
            <span className="text-primary-ascent">{slides.length}</span> slides
            encontrados
          </p>
        </div>

        {/* HANDLE ALL TYPE OF INSERTIONS, IF HAVE DELETIONS, NEWEST SLIDES OR PREVIOUS SLIDES */}

        <div className="flex gap-4 w-full">
          <div className="w-full flex flex-col gap-1">
            <ButtonAdmin
              disabled={isUploading}
              className={
                "w-full active:scale-95 focus-visible:scale-100 transition-all duration-300 ease-in-out"
              }
              onClick={async () => {
                if (isPublished)
                  return toast.error("Você não tem nada para publicar");
                setIsUploading(true);

                if (slidesRemoveQueue.length > 0) {
                  await handleDeletion();
                }

                await handleInsertion();

                setIsUploading(false);
                setIsPublished(true);
                refetchGalery();
                refetchSlides();
                setSlidesRemoveQueue([]);
              }}
            >
              <div className="flex gap-8 items-center">
                <Loader className={isUploading ? "animate-spin" : "hidden"} />
                {isUploading ? <span>Publicando</span> : <span>Publicar</span>}
              </div>
            </ButtonAdmin>

            {!isPublished ? (
              <div className="rounded-xs text-red-300 flex items-center">
                <p>Você tem alterações a publicar</p>
                <X className="size-4 ml-2" />
              </div>
            ) : (
              <div className="rounded-xs text-green-300 flex items-center">
                <p>Suas alterações estão publicadas</p>
                <CheckIcon className="size-4 ml-2" />
              </div>
            )}
          </div>

          <DialogAdmin
            open={modalsState}
            onOpenChange={(open) => {
              setModalsState(open);
            }}
          >
            <DialogTrigger asChild>
              <ButtonAdmin
                disabled={isUploading}
                variant="secondary"
                className="flex items-center gap-2 w-full active:scale-95 focus-visible:scale-100 transition-all duration-300 ease-in-out"
              >
                <PlusIcon size={18} />
                Inserir slide
              </ButtonAdmin>
            </DialogTrigger>
            <DialogContent className="box-border items-center p-8 max-h-screen">
              <div className="flex w-full items-center justify-center gap-12 select-none overflow-y-auto">
                {lastSlide ? (
                  <Cropper
                    ref={cropperRef}
                    className="h-[600px] w-max-[360px]"
                    src={lastSlide?.image || ""}
                    aspectRatio={{ maximum: 16 / 9, minimum: 16 / 9 }}
                  />
                ) : (
                  <div
                    {...getRootProps()}
                    className="w-full h-96 border-2 border-dashed border-primary-ascent/50 rounded-md flex flex-col gap-4 items-center justify-center cursor-pointer hover:border-primary-ascent tramsition-all duration-300 ease-linear group"
                  >
                    <input {...getInputProps()} />

                    <ImagePlus
                      size={80}
                      className="text-white group-hover:scale-125 transition-all duration-200 ease-in-out group-hover:text-primary-ascent/70"
                    />
                    <p className="text-center text-3xl">
                      Arraste e solte uma imagem ou procure no seu computador
                    </p>
                    <p className="text-primary-ascent">
                      O tamanho do arquivo pode ser até 128MB
                    </p>
                  </div>
                )}

                <div className="w-1/4 px-4 flex flex-col gap-4 items-center justify-center">
                  <h1 className="text-3xl text-start self-start">Imagem</h1>
                  <h4>
                    Por favor adicione apenas imagens do tipo JPEG, PNG e SVG.
                  </h4>
                  <div
                    {...getRootProps()}
                    className="flex bg-primary-ascent cursor-pointer hover:bg-primary-ascent/70 rounded-md p-2 px-4 gap-4 w-full"
                  >
                    <input {...getInputProps()} />

                    <Laptop />
                    <p className="text-center text-balance ">Meu computador</p>
                  </div>
                  <DialogAdmin>
                    <DialogTrigger asChild>
                      <ButtonAdmin
                        variant="default"
                        className="items-start gap-4 justify-start w-full"
                        onClick={() => {
                          setLastSlide(undefined);
                          if (lastSlide) {
                            setSlides((prev) => [
                              ...prev.filter(
                                (slide) => slide !== slides.at(-1),
                              ),
                            ]);
                          }
                        }}
                      >
                        <ImageIcon />
                        <p className="text-center font-semibold text-balance">
                          Galeria
                        </p>
                      </ButtonAdmin>
                    </DialogTrigger>
                    <DialogContent>
                      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 container lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {galery?.map((media) => {
                          return (
                            <DialogClose asChild key={media.key}>
                              <div className="flex flex-col gap-4 items-center relative h-52 w-full border rounded-lg hover:border-white transition-all duration-200 group cursor-pointer">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSlides((prev) => [
                                      ...prev,
                                      {
                                        id: crypto.randomUUID(),
                                        file: undefined,
                                        title: "",
                                        description: "",
                                        link: "",
                                        key: media.key,
                                        image: media.url,
                                      },
                                    ]);
                                    setModalsState(false);
                                    setIsPublished(false);
                                  }}
                                >
                                  <Image
                                    src={media.url}
                                    fill
                                    alt="media-library-item"
                                    className="rounded-lg object-cover group-hover:brightness-50"
                                  />

                                  <PlusCircleIcon
                                    className="absolute inset-0 m-auto text-white filter rounded-full self-center group-hover:flex hidden"
                                    size={32}
                                  />
                                </button>
                              </div>
                            </DialogClose>
                          );
                        })}
                      </div>
                    </DialogContent>
                  </DialogAdmin>

                  <div className="w-full flex justify-between">
                    <ButtonAdmin
                      variant="secondary"
                      onClick={() => {
                        setLastSlide(undefined);

                        if (lastSlide) {
                          setSlides((prev) => [
                            ...prev.filter((slide) => slide !== slides.at(-1)),
                          ]);
                        }

                        setModalsState(false);
                      }}
                    >
                      descartar
                    </ButtonAdmin>
                    <ButtonAdmin
                      onClick={() => {
                        handleConfirm();
                      }}
                      className="px-8 active:scale-95 focus-visible:scale-100 transition-all duration-300 ease-in-out"
                    >
                      Salvar
                    </ButtonAdmin>
                  </div>
                </div>
              </div>
            </DialogContent>
          </DialogAdmin>
        </div>
      </HeaderAdmin>

      <div className="flex flex-col h-full w-full gap-8 container">
        <div>
          <DragableImageList
            slides={slides}
            setSlides={setSlides}
            isUploading={isUploading}
            setSlidesRemoveQueue={setSlidesRemoveQueue}
          />
        </div>
      </div>
    </div>
  );
};
