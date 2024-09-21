"use client";

import { states } from "@/constants/brazil";
import { UsersRound } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import { Icons } from "./icons";
import * as PopoverComponent from "./ui/popover";
import * as TooltipComponent from "./ui/tooltip";

export function BrazilStates() {
  const isMobile = useMediaQuery("(max-width: 640px)");

  const Tooltip = isMobile
    ? PopoverComponent.Popover
    : TooltipComponent.Tooltip;
  const TooltipTrigger = isMobile
    ? PopoverComponent.PopoverTrigger
    : TooltipComponent.TooltipTrigger;
  const TooltipContent = isMobile
    ? PopoverComponent.PopoverContent
    : TooltipComponent.TooltipContent;
  const TooltipArrow = isMobile
    ? PopoverComponent.PopoverArrow
    : TooltipComponent.TooltipArrow;

  return Object.entries(states).map(([state, { data, path, sideOffset }]) => {
    if (!data) {
      return (
        <path
          key={state}
          className="fill-muted-foreground/50"
          d={path}
          strokeWidth={0.5}
        />
      );
    }

    return (
      <TooltipComponent.TooltipProvider key={state} delayDuration={150}>
        <Tooltip>
          <TooltipTrigger asChild>
            <path
              className="fill-primary hover:fill-secondary stroke-black transition-colors"
              d={path}
              strokeWidth={0.5}
            />
          </TooltipTrigger>
          <TooltipContent sideOffset={isMobile ? 0 : sideOffset}>
            <div className="flex items-center gap-1 mb-2">
              <Icons.Company className="size-4 text-purple-500" />

              <span className="mr-4">Empresas</span>
              <span className="text-purple-500 ml-auto tabular-nums">
                {data.companies}
              </span>
            </div>
            <div className="flex gap-1 items-center">
              <UsersRound className="size-4 text-purple-500" />

              <span className="mr-4">Micro empresas</span>
              <span className="text-purple-500 ml-auto tabular-nums">
                {data.micro}
              </span>
            </div>
            <TooltipArrow />
          </TooltipContent>
        </Tooltip>
      </TooltipComponent.TooltipProvider>
    );
  });
}
