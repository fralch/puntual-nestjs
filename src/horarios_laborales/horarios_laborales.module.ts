import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { HorariosLaboralesController } from "./horarios_laborales.controller";
import { HorariosLaboralesService } from "./horarios_laborales.service";

@Module({
    imports: [PrismaModule],
    controllers: [HorariosLaboralesController],
    providers: [HorariosLaboralesService],
})
export class HorariosLaboralesModule {}
