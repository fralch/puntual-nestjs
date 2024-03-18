/*
  Warnings:

  - You are about to alter the column `fecha` on the `registro_asistencias` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `registro_asistencias` MODIFY `fecha` DATETIME(3) NOT NULL;
