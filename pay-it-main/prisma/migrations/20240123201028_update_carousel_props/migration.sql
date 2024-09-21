/*
  Warnings:

  - Added the required column `key` to the `Carousel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Carousel" ADD COLUMN     "key" TEXT NOT NULL;
