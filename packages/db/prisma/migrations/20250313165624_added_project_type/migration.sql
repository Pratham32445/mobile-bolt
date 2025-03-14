-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('NEXTJS', 'REACT', 'REACT_NATIVE');

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "type" "ProjectType" NOT NULL DEFAULT 'NEXTJS';
