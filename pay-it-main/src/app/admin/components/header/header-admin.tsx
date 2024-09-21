import type React from "react";

type Props = {
  children: React.ReactNode;
};

export const HeaderAdmin = ({ children }: Props) => {
  return (
    <div className="top-0 px-6 sticky border-b border-l border-neutral-900 flex flex-row h-28 justify-between bg-zinc-950 z-50 w-full items-center">
      {children}
    </div>
  );
};
