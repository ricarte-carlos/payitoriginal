-- DropIndex
DROP INDEX "Video_section_key";

-- AlterTable
ALTER TABLE "Video" ALTER COLUMN "callToAction" DROP NOT NULL;
