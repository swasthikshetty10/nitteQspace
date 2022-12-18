/*
  Warnings:

  - You are about to drop the column `thread_id` on the `Thread` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Post` MODIFY `content` TEXT NULL;

-- AlterTable
ALTER TABLE `Thread` DROP COLUMN `thread_id`;
