import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { Usuarios } from "@prisma/client";

@Controller("Usuarios")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAll(): Promise<Usuarios[]> {
        return this.userService.getAll();
    }

    @Get(":id")
    async getById(@Param("id") id: string): Promise<Usuarios> {
        const rpt = await this.userService.getOne(Number(id));
        if (!rpt) throw new BadRequestException("Usuario no encontrado");
        return rpt;
    }

    @Post()
    async create(@Body() data: Usuarios): Promise<Usuarios> {
        // verificar si el dni ya existe
        const user = await this.userService.findByDNI(data.dni);
        if (user) throw new BadRequestException("El usuario ya existe");
        return this.userService.create(data);
    }

    @Put(":id")
    async update(@Param("id") id: string, @Body() data: { name: string, email: string, password: string }): Promise<Usuarios> {
        const rpt = await this.userService.updateOne(Number(id), data);
        if (!rpt) throw new BadRequestException("Usuario no encontrado");
        return rpt;
    }

    @Delete(":id")
    async delete(@Param("id") id: string): Promise<Usuarios> {
        const rpt = await this.userService.deleteOne(Number(id));
        if (!rpt) throw new BadRequestException("Usuario no encontrado");
        return rpt;
    }
}