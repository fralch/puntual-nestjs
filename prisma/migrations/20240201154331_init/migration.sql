-- CreateTable
CREATE TABLE `Usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dni` INTEGER NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `cargo` VARCHAR(191) NOT NULL,
    `celular` INTEGER NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `direccion` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Usuarios_dni_key`(`dni`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Horarios_laborales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `entrada_manana` VARCHAR(191) NOT NULL,
    `salida_manana` VARCHAR(191) NOT NULL,
    `entrada_tarde` VARCHAR(191) NOT NULL,
    `salida_tarde` VARCHAR(191) NOT NULL,
    `usuario_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Registro_asistencias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` VARCHAR(191) NOT NULL,
    `hora_entrada` VARCHAR(191) NOT NULL,
    `hora_salida` VARCHAR(191) NOT NULL,
    `usuario_id` INTEGER NOT NULL,
    `turno` VARCHAR(191) NOT NULL,
    `foto` VARCHAR(191) NOT NULL,
    `horas_trabajadas` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tardanzas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(3) NOT NULL,
    `turno` VARCHAR(191) NOT NULL,
    `minutos` INTEGER NOT NULL,
    `usuario_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Faltas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(3) NOT NULL,
    `turno` VARCHAR(191) NOT NULL,
    `usuario_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Permisos_vacasiones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha_inicio` DATETIME(3) NOT NULL,
    `fecha_fin` DATETIME(3) NOT NULL,
    `motivo` VARCHAR(191) NOT NULL,
    `usuario_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Horarios_laborales` ADD CONSTRAINT `Horarios_laborales_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Registro_asistencias` ADD CONSTRAINT `Registro_asistencias_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tardanzas` ADD CONSTRAINT `Tardanzas_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Faltas` ADD CONSTRAINT `Faltas_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Permisos_vacasiones` ADD CONSTRAINT `Permisos_vacasiones_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
