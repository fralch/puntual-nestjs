import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { FaltasController } from "./faltas.controller";
import { FaltasService } from "./faltas.service";

@Module({
    imports: [PrismaModule],
    controllers: [FaltasController],
    providers: [FaltasService],
})

export class FaltasModule {}