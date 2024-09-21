"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useGetUserCollections } from "@/hooks/get-colletions/hook";
import { useAuthContext } from "@/providers/auth-context-provider";
import { Loader } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ContentManagerSkeletonArray = Array.from({ length: 5 }).map((_, i) => i);

export function ContentManager() {
  const pathname = usePathname();

  const { session } = useAuthContext();

  const { data, isLoading } = useGetUserCollections(session?.user?.id || "");

  return (
    <div
      data-active={pathname.includes("/content-manager")}
      className="bg-[#0e0e11] w-52 h-screen top-0 data-[active=true]:flex flex-col hidden p-4 gap-4 animate-fade-right -z-10 animate-duration-100"
    >
      <div className="flex flex-col justify-between h-24 pt-2">
        <p className="text-primary-ascent text-lg font-semibold ">Conteúdo</p>
        <hr className="w-full border-zinc-700 border-2 rounded-full" />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold">COLEÇÕES</p>
        <div className="text-sm py-1 px-2 font-semibold bg-orange-400 rounded-md flex items-center justify-center size-8">
          {isLoading ? (
            <Loader className="animate-spin" />
          ) : (
            <p>{data?.length}</p>
          )}
        </div>
      </div>
      <div className="inline-block">
        <ul className="list-disc w-fit list-inside text-center flex flex-col gap-4">
          {isLoading
            ? ContentManagerSkeletonArray.map((key) => (
                <div className="flex gap-2 items-center" key={key}>
                  <Skeleton className="w-2 h-2 rounded-full bg-zinc-800" />
                  <Skeleton className="w-32 h-4 rounded-full bg-zinc-800" />
                </div>
              ))
            : data?.map(
                (collection) =>
                  collection.permission && (
                    <li
                      key={collection.id}
                      data-active={pathname.includes(
                        collection.name.toLowerCase(),
                      )}
                      className="data-[active=true]:text-primary-ascent self-start"
                    >
                      <Link
                        href={collection.name.toLowerCase()}
                        className="text-sm font-semibold"
                      >
                        {collection.name.toLowerCase()}
                      </Link>
                    </li>
                  ),
              )}
        </ul>
      </div>
    </div>
  );
}
