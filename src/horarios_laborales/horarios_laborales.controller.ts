import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Horarios_laborales } from '@prisma/client';
import { HorariosLaboralesService } from "./horarios_laborales.service";


@Controller("HorariosLaborales")
export class HorariosLaboralesController {
    constructor(private readonly horariosLaboralesSerices: HorariosLaboralesService) {}

    @Get()
    async getAll(): Promise<Horarios_laborales[]> {
        return this.horariosLaboralesSerices.getAll();
         
    }

    @Get(":id")
    async getById(@Param("id") id: string): Promise<Horarios_laborales> {
        const rpt = await this.horariosLaboralesSerices.getOne(Number(id));
        if (!rpt) throw new BadRequestException("Horario no encontrado");
        return rpt;
    }

    @Post()
    async create(@Body() data: Horarios_laborales): Promise<Horarios_laborales> {
        const check = await this.horariosLaboralesSerices.findByUsuarioId(data.usuario_id);
        if (check.length > 0) throw new BadRequestException("El usuario ya tiene un horario laboral");
        return this.horariosLaboralesSerices.create(data);
    }

    @Put(":id")
    async update(@Param("id") id: string, @Body() data: Horarios_laborales): Promise<Horarios_laborales> {
        const rpt = await this.horariosLaboralesSerices.updateOne(Number(id), data);
        if (!rpt) throw new BadRequestException("Horario no encontrado");
        return rpt;
    }

    @Delete(":id")
    async delete(@Param("id") id: string): Promise<Horarios_laborales> {
        const rpt = await this.horariosLaboralesSerices.deleteOne(Number(id));
        if (!rpt) throw new BadRequestException("Horario no encontrado");
        return rpt;
    }
}