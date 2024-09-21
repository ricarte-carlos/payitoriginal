"use client";

import { REACT_QUERY_KEYS } from "@/app/admin/enums/query-keys";
import { useGetContentLibraryMedias } from "@/hooks/get-content-library/hook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ky from "ky";
import { useState } from "react";
import { toast } from "sonner";
import { EnumComponents } from "..";
import { HeaderAdmin } from "../../header/header-admin";
import { ButtonAdmin } from "../../ui/button";
import {
  Tooltip,
  TooltipAdminProvider,
  TooltipContent,
  TooltipTrigger,
} from "../../ui/tooltip";
import { MediaImageCard } from "./image-card";

export const MediaLibraryList = () => {
  const { data: medias } = useGetContentLibraryMedias();
  const [selected, setSelected] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      await ky.delete("/api/uploadthing", {
        json: { key: selected },
      });
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [REACT_QUERY_KEYS.GET_CONTENT_LIBRARY_MEDIA],
      });

      setSelected([]);
    },
  });

  return (
    <div>
      <HeaderAdmin>
        <div>
          <h1 className="capitalize text-3xl font-medium">
            {EnumComponents.mediaLibrary}
          </h1>
          <p>Gerencie suas mídias</p>
        </div>

        <div className="gap-2 flex">
          <ButtonAdmin
            variant="secondary"
            size="lg"
            onClick={() => {
              if (!medias) return;
              if (selected.length === medias.length) return setSelected([]);
              setSelected(medias?.map((media) => media.key));
            }}
          >
            SELECIONAR TUDO
          </ButtonAdmin>

          <TooltipAdminProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger>
                <ButtonAdmin
                  disabled={selected.length === 0}
                  variant="destructive"
                  size="lg"
                  onClick={() => {
                    if (selected.length === 0)
                      return toast.error(
                        "Selecione ao menos um item para deletar",
                      );
                    mutation.mutate();
                  }}
                >
                  REMOVER
                </ButtonAdmin>
              </TooltipTrigger>
              <TooltipContent>Remover mídias selecionadas</TooltipContent>
            </Tooltip>
          </TooltipAdminProvider>
        </div>
      </HeaderAdmin>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 container py-8 gap-8">
        {medias?.map((media) => {
          return (
            <MediaImageCard
              image={media}
              key={media.key}
              isDeleting={mutation.isPending}
              selectedActions={{ setSelected, selected }}
            />
          );
        })}
      </div>
    </div>
  );
};
