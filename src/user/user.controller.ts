import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
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
        const rpt = await this.userService.getOne(Number(id));
        console.log(rpt);
        if (!rpt)  throw new BadRequestException("User not found");
        
        return rpt;
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
        try {
            return await this.userService.deleteOne(id);
        } catch (error) {
            throw new BadRequestException("User not found");
        }
    }
}