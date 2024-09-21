import { REACT_QUERY_KEYS } from "@/app/admin/enums/query-keys";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useQueryClient } from "@tanstack/react-query";
import ky from "ky";
import { Loader, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type MediaProps = {
  image: { key: string; url: string };
  selectedActions: {
    setSelected: React.Dispatch<React.SetStateAction<string[]>>;
    selected: string[];
  };
  isDeleting: boolean;
};

export const MediaImageCard = ({
  image,
  selectedActions,
  isDeleting,
}: MediaProps) => {
  const queryClient = useQueryClient();
  const [singleDeletion, setSingleDeletion] = useState(false);
  async function removeFile(keyToRemove: string) {
    setSingleDeletion(true);
    await ky.delete("/api/uploadthing", {
      json: { key: keyToRemove },
    });

    queryClient
      .refetchQueries({
        queryKey: [REACT_QUERY_KEYS.GET_CONTENT_LIBRARY_MEDIA],
      })
      .then(() => {
        setSingleDeletion(false);
      });
  }

  return (
    <div className="flex flex-col gap-4 items-center relative h-52 w-full border rounded-lg hover:border-white transition-all duration-200">
      <Image
        src={image.url}
        fill
        alt="media-library-item"
        className="rounded-lg object-cover "
      />
      <Checkbox
        className="absolute top-2 left-2 border-2 size-6 data-[state=checked]:bg-primary-ascent border-primary-ascent transition-all duration-300"
        checked={selectedActions.selected.includes(image.key)}
        onCheckedChange={() => {
          selectedActions.setSelected((prev) => {
            if (prev.includes(image.key)) {
              return prev.filter((item) => item !== image.key);
            }
            return [...prev, image.key];
          });
        }}
      />
      {
        <Button
          data-isDeleting={
            (isDeleting && selectedActions.selected.includes(image.key)) ||
            singleDeletion
          }
          disabled={isDeleting}
          onClick={() => {
            removeFile(image.key);
          }}
          className="bg-red-500 rounded-full hover:cursor-pointer  p-2 hover:bg-red-400 hover:scale-110 transition-all duration-300 absolute inset-0 m-auto data-[isDeleting=true]:bg-transparent"
        >
          <Trash
            size={24}
            className={
              (isDeleting && selectedActions.selected.includes(image.key)) ||
              singleDeletion
                ? "hidden"
                : "block text-white"
            }
          />
          <Loader
            className={
              (isDeleting && selectedActions.selected.includes(image.key)) ||
              singleDeletion
                ? "animate-spin text-primary-ascent opacity-100"
                : "hidden"
            }
            size={48}
          />
        </Button>
      }
    </div>
  );
};
