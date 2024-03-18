import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Registro_asistencias } from "@prisma/client";
import { AsistenciasService } from "./asistencias.service";

@Controller("Asistencias")

export class AsistenciasController {

    constructor(private readonly asistenciasService: AsistenciasService) {}

    @Get()
    async asistencias(): Promise<Registro_asistencias[]> {
        return this.asistenciasService.asistencias_getAll();
    }

    @Get(":id")
    async asistenciasByUserId(@Param("id") id: string): Promise<Registro_asistencias[]> {
        const rpt = await this.asistenciasService.asistencias_getByUserId(Number(id));
        if (!rpt) throw new BadRequestException("Usuario no encontrado");
        return rpt;
    }

    @Post()
    async create(@Body() data: Registro_asistencias): Promise<Registro_asistencias> {
        return this.asistenciasService.asistencias_create(data);
    }

    @Post('/byDates')
    async asistenciasByDates(@Body() data: { fecha_inicio: Date, fecha_fin: Date }) {
        return this.asistenciasService.asistencias_byDates(data.fecha_inicio, data.fecha_fin);
       
    }
}