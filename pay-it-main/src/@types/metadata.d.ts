import type { Metadata } from "next";

export type GenerateMetadata = ({
  params: { locale: string },
}) => Metadata | Promise<Metadata>;
