import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "@prisma/client";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAll() {
        return this.userService.getAll();
    }

    @Get(":id")
    async getOne(@Param("id") id: string){
        return this.userService.getOne(Number(id));
    }

    @Post()
    async create(@Body() data: User) {
        return this.userService.create(data);
    }

    @Put()
    async updateOne(@Body() data: User) {
        return this.userService.updateOne(data.id, data);
    }

    @Delete()
    async deleteOne(id: number) {
        return this.userService.deleteOne(id);
    }
}