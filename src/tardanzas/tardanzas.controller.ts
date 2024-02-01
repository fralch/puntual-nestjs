import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Tardanzas } from "@prisma/client";
import { TardanzasService } from "./tardanzas.service";

@Controller("Tardanzas")

export class TardanzasController {
    constructor(private readonly tardanzasService: TardanzasService) {}

    @Get()
    async tardanzas(): Promise<Tardanzas[]> {
        return this.tardanzasService.tardanzas();
    }

    @Get(":id")
    async tardanzasByUserId(@Param("id") id: string): Promise<Tardanzas[]> {
        const rpt = await this.tardanzasService.tardanzasByUserId(Number(id));
        if (!rpt) throw new BadRequestException("Usuario no encontrado");
        return rpt;
    }

    @Post()
    async create(@Body() data: Tardanzas): Promise<Tardanzas> {
        return this.tardanzasService.createTardanzas(data);
    }

    @Put(":id")
    async update(@Param("id") id: string, @Body() data: Tardanzas): Promise<Tardanzas> {
        const rpt = await this.tardanzasService.updateTardanzas(Number(id), data);
        if (!rpt) throw new BadRequestException("Usuario no encontrado");
        return rpt;
    }

    @Delete(":id")
    async delete(@Param("id") id: string): Promise<Tardanzas> {
        const rpt = await this.tardanzasService.deleteTardanzas(Number(id));
        if (!rpt) throw new BadRequestException("Usuario no encontrado");
        return rpt;
    }
}
