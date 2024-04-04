import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Faltas } from '@prisma/client'
import { FaltasService } from "./faltas.service";

@Controller("Faltas")

export class FaltasController {
    constructor(private readonly faltasService: FaltasService) {}

    @Get()
    async faltas(): Promise<Faltas[]> {
        return this.faltasService.getAll();
    }

    @Get(":id")
    async faltasByUserId(@Param("id") id: string): Promise<Faltas[]> {
        const rpt = await this.faltasService.getOneByUserId(Number(id));
        if (!rpt) throw new BadRequestException("Usuario no encontrado");
        return rpt;
    }

    @Post()
    async create(@Body() data: Faltas){
        return this.faltasService.create(data);
    }

    @Post("/byDates")
    async faltasByDates(@Body() data: { fecha_inicio: Date, fecha_fin: Date }){
        return this.faltasService.faltas_byDates(data.fecha_inicio, data.fecha_fin);
    }

    @Put(":id")
    async update(@Param("id") id: string, @Body() data: { fecha: Date, justificada: boolean }): Promise<Faltas> {
        const rpt = await this.faltasService.updateOne(Number(id), data);
        if (!rpt) throw new BadRequestException("Usuario no encontrado");
        return rpt;
    }

    @Delete(":id")
    async delete(@Param("id") id: string): Promise<Faltas> {
        const rpt = await this.faltasService.deleteOne(Number(id));
        if (!rpt) throw new BadRequestException("Usuario no encontrado");
        return rpt;
    }
}
