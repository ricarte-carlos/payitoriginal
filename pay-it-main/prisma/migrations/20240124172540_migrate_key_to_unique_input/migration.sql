/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `Carousel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Carousel_key_key" ON "Carousel"("key");
