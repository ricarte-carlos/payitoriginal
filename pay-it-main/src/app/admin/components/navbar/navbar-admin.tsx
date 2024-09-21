import type { AuthUser } from "@/lib/auth/utils";
import { NavOptionsList } from "./nav-options-list";

import { SignOutBtn } from "@/components/auth/SignOutBtn";

import { AscentIcon } from "@/components/icons";
import Link from "next/link";
import { AvatarAdmin, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenuAdmin,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type NavbarAdminProps = {
  session: AuthUser;
};

export function NavbarAdmin({ session }: NavbarAdminProps) {
  const nameExists = (session?.user.name?.length ?? 0) > 2;

  return (
    <nav className="bg-zinc-950 w-64 p-4 flex flex-col h-screen relative top-0 left-0 gap-4 animate-fade-down border-r border-neutral-900">
      <div className="flex flex-col h-full gap-4">
        <div className="flex flex-col items-left justify-between h-24 ">
          <div className="flex flex-col items-center">
            <Link href="/admin">
              <AscentIcon className="w-32 h-16" />
            </Link>
          </div>
          <hr className="w-full border-zinc-800 border-2 rounded-full" />
        </div>

        <NavOptionsList />
      </div>
      <div className="flex justify-between">
        <DropdownMenuAdmin>
          <DropdownMenuTrigger>
            <AvatarAdmin>
              <AvatarFallback>
                {nameExists
                  ? session.user.name
                      ?.split(" ")
                      .map((word) => word[0].toUpperCase())
                      .join("")
                  : "~"}
              </AvatarFallback>
            </AvatarAdmin>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <span className="font-semibold">
                {nameExists ? session.user.name : "Novo usuário"}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/admin/account">
              <DropdownMenuItem className="cursor-pointer">
                Conta
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <SignOutBtn />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuAdmin>
      </div>
    </nav>
  );
}
