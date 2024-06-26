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

    @Post("/byDates")
    async tardanzasByDates(@Body() data: { fecha_inicio: Date, fecha_fin: Date }){
        return this.tardanzasService.tarnzasByDates(data.fecha_inicio, data.fecha_fin);
    }

    @Post("/countByDatesAndUserId")
    async CountMinTardanzasByDatesAndUserId(@Body() data: { fecha_inicio: Date, fecha_fin: Date, id: number }) {
        
        return this.tardanzasService.CountMinTardanzasByDatesAndUserId(data.fecha_inicio, data.fecha_fin, data.id);
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
