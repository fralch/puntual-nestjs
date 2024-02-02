import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { Permisos_vacacionesController } from "./permisos_vacaciones.controller";
import { Permisos_vacacionesService } from "./permisos_vacaciones.service";

@Module({
    imports: [PrismaModule],
    controllers: [Permisos_vacacionesController],
    providers: [Permisos_vacacionesService],
})

export class Permisos_vacacionesModule {}