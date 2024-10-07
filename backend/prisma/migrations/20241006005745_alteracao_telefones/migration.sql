/*
  Warnings:

  - You are about to drop the column `numero` on the `telefone` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `telefone` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `telefone` DROP COLUMN `numero`,
    DROP COLUMN `tipo`,
    ADD COLUMN `telefoneCelular` VARCHAR(191) NULL,
    ADD COLUMN `telefoneResidencial` VARCHAR(191) NULL;
