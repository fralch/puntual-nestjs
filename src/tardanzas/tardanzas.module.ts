import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { TardanzasController } from "./tardanzas.controller";
import { TardanzasService } from "./tardanzas.service";

@Module({
    imports: [PrismaModule],
    controllers: [TardanzasController],
    providers: [TardanzasService],
})


export class TardanzasModule {}