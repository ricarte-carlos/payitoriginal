"use client";

import { Icons } from "@/components/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    label: "Content Manager",
    icon: Icons.Content,
    link: "/admin/content-manager",
  },
  {
    label: "Media Library",
    icon: Icons.MediaLibrary,
    link: "/admin/media-library",
  },
];

export function NavOptionsList() {
  const pathname = usePathname();

  return items.map(({ link, label, icon: Icon }) => (
    <Link
      href={link}
      key={label}
      data-active={pathname.includes(link)}
      className="p-2 gap-2 w-full flex items-center justify-center data-[active=true]:bg-nav-item/70 data-[active=true]:font-bold rounded-md transition-all duration-300 cursor-pointer  hover:bg-primary-ascent/20"
    >
      <Icon className="w-fit flex justify-center dark:text-white" />

      <p className="w-full">{label}</p>
    </Link>
  ));
}
