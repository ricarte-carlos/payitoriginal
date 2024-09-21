"use client";

import { MotionDiv, MotionHeader } from "@/lib/framer";
import { useHashChange } from "@/store/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Icons } from "./icons";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
  handleCloseSheet,
} from "./ui/sheet";

const navItems = [
  {
    label: "Home",
    href: "home",
  },
  {
    label: "Sobre",
    href: "sobre",
  },
  {
    label: "Gestores",
    href: "gestores",
  },
  {
    label: "Ser Payit",
    href: "ser-payit",
  },
  {
    label: "Parceiros",
    href: "parceiros",
  },
  {
    label: "Novidades",
    href: "novidades",
  },
];

export function SiteHeader() {
  return (
    <MotionHeader
      initial={{ y: -200 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7 }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-24 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="mr-6">
            <Icons.Logo className="h-auto w-36" />
          </Link>
        </div>
        <MobileNav />
        <div className="hidden md:flex">
          <MainNav />
          <ModeToggle />
        </div>
      </div>
    </MotionHeader>
  );
}

export function MainNav() {
  const { addRouter, router } = useHashChange();
  const [activeButtons, setActiveButtons] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
  ]);

  function onScroll() {
    const scrollPos = window.scrollY;

    const sectionPositions = [
      document.getElementById("home")?.offsetTop,
      document.getElementById("sobre")?.offsetTop,
      document.getElementById("gestores")?.offsetTop,
      document.getElementById("ser-payit")?.offsetTop,
      document.getElementById("parceiros")?.offsetTop,
      document.getElementById("novidades")?.offsetTop,
    ];

    const newActiveButtons = activeButtons.map(() => false);

    if (sectionPositions) {
      sectionPositions.forEach((sectionPos, index) => {
        if (sectionPos && scrollPos >= sectionPos - 150) {
          if (newActiveButtons.includes(true)) {
            newActiveButtons[newActiveButtons.indexOf(true)] = false;
          }
          newActiveButtons[index] = true;
        }
      });
    }

    setActiveButtons(newActiveButtons);
    addRouter(navItems[newActiveButtons.indexOf(true)].href);
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
  }, []);

  function navigationClick(link: string) {
    const href = document.getElementById(link);
    addRouter(link);
    href?.scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <MotionDiv
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="mr-4 hidden md:flex"
    >
      <nav className="flex items-center gap-6">
        {navItems.map((item) => (
          <button
            type="button"
            key={item.href}
            data-active={router === item.href}
            className="text-foreground/60 hover:text-foreground/80 data-[active=true]:text-foreground  flex flex-col"
            onClick={() => navigationClick(item.href)}
          >
            {item.label}
            <hr
              data-active={router === item.href}
              className="data-[active=false]:w-0 data-[active=true]:w-full rounded-full h-1 bg-primary-ascent transit data-[active=true]:opacity-100 opacity-0 transition-all duration-500 ease-in"
            />
          </button>
        ))}
      </nav>
    </MotionDiv>
  );
}

export function MobileNav() {
  const [activeButtons, setActiveButtons] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
  ]);

  function onScroll() {
    const scrollPos = window.scrollY;

    const sectionPositions = [
      document.getElementById("home")?.offsetTop,
      document.getElementById("sobre")?.offsetTop,
      document.getElementById("gestores")?.offsetTop,
      document.getElementById("ser-payit")?.offsetTop,
      document.getElementById("parceiros")?.offsetTop,
      document.getElementById("novidades")?.offsetTop,
    ];

    const newActiveButtons = activeButtons.map(() => false);

    if (sectionPositions) {
      sectionPositions.forEach((sectionPos, index) => {
        if (sectionPos && scrollPos >= sectionPos - 150) {
          if (newActiveButtons.includes(true)) {
            newActiveButtons[newActiveButtons.indexOf(true)] = false;
          }
          newActiveButtons[index] = true;
        }
      });
    }

    setActiveButtons(newActiveButtons);
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
  }, []);

  function navigationClick(link: string) {
    const href = document.getElementById(link);
    href?.scrollIntoView({
      behavior: "smooth",
    });
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Icons.Menu className="size-6" />
          <span className="sr-only">Abrir/Fechar Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="pl-0 w-screen md:hidden">
        <div className="flex flex-col gap-8 items-center justify-center h-full">
          {navItems?.map((item) => (
            <button
              key={item.href}
              type="button"
              className="text-2xl font-bold"
              onClick={() => {
                handleCloseSheet();
                navigationClick(item.href);
              }}
            >
              {item.label}
            </button>
          ))}
          <ModeToggle />
        </div>
        <SheetClose className="absolute top-8 right-8">
          <Icons.X className="size-6" />
          <span className="sr-only">Fechar</span>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
