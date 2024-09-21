-- CreateEnum
CREATE TYPE "role" AS ENUM ('Admin', 'Edithor', 'Ascent_Admin');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "role" NOT NULL DEFAULT 'Admin';

-- CreateTable
CREATE TABLE "Carousel" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "Carousel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Carousel_id_key" ON "Carousel"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Carousel_image_key" ON "Carousel"("image");

-- CreateIndex
CREATE UNIQUE INDEX "Carousel_position_key" ON "Carousel"("position");
