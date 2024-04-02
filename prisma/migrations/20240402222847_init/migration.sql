-- AlterTable
ALTER TABLE `registro_asistencias` MODIFY `hora_entrada` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `usuarios` MODIFY `correo` VARCHAR(191) NULL,
    MODIFY `direccion` VARCHAR(191) NULL;
