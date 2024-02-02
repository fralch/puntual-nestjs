import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Permisos_vacasiones } from "@prisma/client";
import { Permisos_vacacionesService } from "./permisos_vacaciones.service";

@Controller("permisos_vacaciones")

export class Permisos_vacacionesController {
    constructor(private readonly permisos_vacacionesService: Permisos_vacacionesService) {}

    @Get()
    async getAll(): Promise<Permisos_vacasiones[]> {
        return this.permisos_vacacionesService.permisos_vacaciones();
    }

    @Get(":id")
    async getById(@Param("id") id: string): Promise<Permisos_vacasiones> {
        const rpt = await this.permisos_vacacionesService.permisos_vacacionesById(Number(id));
        if (!rpt) throw new BadRequestException("Permiso no encontrado");
        return rpt;
    }

    @Get("empleado/:id")
    async getByEmpleadoId(@Param("id") id: string): Promise<Permisos_vacasiones[]> {
        const rpt = await this.permisos_vacacionesService.permisos_vacacionesByEmpleadoId(Number(id));
        if (!rpt) throw new BadRequestException("Permisos no encontrados");
        return rpt;
    }

    @Post()
    async create(@Body() data: Permisos_vacasiones): Promise<Permisos_vacasiones> {
        return this.permisos_vacacionesService.createPermisos_vacaciones(data);
    }

    @Put(":id")
    async update(@Param("id") id: string, @Body() data: Permisos_vacasiones): Promise<Permisos_vacasiones> {
        const rpt = await this.permisos_vacacionesService.updatePermisos_vacaciones(Number(id), data);
        if (!rpt) throw new BadRequestException("Permiso no encontrado");
        return rpt;
    }

    @Delete(":id")
    async delete(@Param("id") id: string): Promise<Permisos_vacasiones> {
        const rpt = await this.permisos_vacacionesService.deletePermisos_vacaciones(Number(id));
        if (!rpt) throw new BadRequestException("Permiso no encontrado");
        return rpt;
    }
}

