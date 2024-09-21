/*
  Warnings:

  - Added the required column `section` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `Video` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Video` required. This step will fail if there are existing NULL values in that column.
  - Made the column `link` on table `Video` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "videoSection" AS ENUM ('WhatsNew');

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "section" "videoSection" NOT NULL,
ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "link" SET NOT NULL;
