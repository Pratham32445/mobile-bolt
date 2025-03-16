-- CreateEnum
CREATE TYPE "PromptType" AS ENUM ('USER', 'MODEL');

-- CreateTable
CREATE TABLE "Prompt" (
    "Id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "type" "PromptType" NOT NULL,

    CONSTRAINT "Prompt_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "Prompt" ADD CONSTRAINT "Prompt_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
