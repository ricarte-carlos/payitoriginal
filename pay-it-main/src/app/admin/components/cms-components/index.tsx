import { Carousel } from "@/app/admin/components/cms-components/carousel/carousel-editor";
import { WhatsNew } from "./video/whats-new";

export const ComponentsList: Record<string, React.ElementType>[] = [
  { carousel: Carousel },
  { "whats-new": WhatsNew },
];

export enum EnumComponents {
  carousel = "Seção - Carrossel Hero",
  mediaLibrary = "Biblioteca de mídia",
  "whats-new" = "Seção - O que há de novo",
}
