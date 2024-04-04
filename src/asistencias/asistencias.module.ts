import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { AsistenciasController } from "./asistencias.controller";
import { AsistenciasService } from "./asistencias.service";


@Module({
    imports: [PrismaModule],
    controllers: [AsistenciasController],
    providers: [AsistenciasService],
})


export class AsistenciasModule {}