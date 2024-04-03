/*
  Warnings:

  - You are about to drop the column `description` on the `Permission` table. All the data in the column will be lost.
  - Added the required column `desc` to the `Permission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Permission` DROP COLUMN `description`,
    ADD COLUMN `desc` VARCHAR(191) NOT NULL;
