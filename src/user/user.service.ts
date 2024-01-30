import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService ) {}

    async create(data : { name: string, email: string, password: string }) : Promise<User>{
        return this.prisma.user.create({ data });
    }

    async getAll() : Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async getOne(id: number) : Promise<User> {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async updateOne(id: number, data: { name: string, email: string, password: string }) : Promise<User> {
        return this.prisma.user.update({ where: { id }, data });
    }

    async deleteOne(id: number) : Promise<User> {
        return this.prisma.user.delete({ where: { id } });
    }
}