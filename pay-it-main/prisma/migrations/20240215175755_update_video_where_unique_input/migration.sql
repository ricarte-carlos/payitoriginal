/*
  Warnings:

  - A unique constraint covering the columns `[section]` on the table `Video` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Video_section_key" ON "Video"("section");
