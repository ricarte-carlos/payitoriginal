"use client";
import { ComponentsList } from "@/app/admin/components/cms-components/index";
import { useGetUserCollections } from "@/hooks/get-colletions/hook";
import { redirect } from "next/navigation";

type CMSProps = {
  userId: string;
  params: { tabs: string[] };
};

export const CMS = ({ userId, params }: CMSProps) => {
  const { data, isLoading } = useGetUserCollections(userId);
  const activeTab = params.tabs[1];

  if (data && !isLoading) {
    if (data.length > 0 && params.tabs.length < 2) {
      redirect(`/admin/content-manager/${data[0].name.toLowerCase()}`);
    } else if (
      !data.some(
        (collection) =>
          collection.name.toLowerCase() === activeTab.toLowerCase(),
      )
    ) {
      redirect("/admin/");
    }
  }

  const Component = ComponentsList.find(
    (component) => component[activeTab] !== undefined,
  )?.[activeTab];

  return (
    <div>
      {data &&
        (Component ? (
          <Component />
        ) : (
          <div className="container h-screen w-full flex justify-center items-center gap-2">
            <p className="text-2xl">Componente não encontrado</p>
            <div className="flex items-center">
              <p className="text-4xl">✊</p>
              <p className="text-5xl">😔</p>
            </div>
          </div>
        ))}
    </div>
  );
};
