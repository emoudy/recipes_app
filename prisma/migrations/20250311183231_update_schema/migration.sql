/*
  Warnings:

  - You are about to drop the column `name` on the `ChatSession` table. All the data in the column will be lost.
  - Added the required column `name` to the `ChatSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChatSession" DROP COLUMN "name",
ADD COLUMN     "name" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" SET DATA TYPE VARCHAR(255);
