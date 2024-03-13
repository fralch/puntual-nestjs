import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Usuarios } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService ) {}

    async create(data : Usuarios) : Promise<Usuarios>{
        return this.prisma.usuarios.create({ data });
    }

    async getAll() : Promise<Usuarios[]> {
        return this.prisma.usuarios.findMany();
    }

    async getOne(id: number) : Promise<Usuarios> {
        return this.prisma.usuarios.findUnique({ where: { id } });
    }

    async updateOne(id: number, data: { name: string, email: string, password: string }) : Promise<Usuarios> {
        return this.prisma.usuarios.update({ where: { id }, data });
    }

    async deleteOne(id: number) : Promise<Usuarios> {
        return this.prisma.usuarios.delete({ where: { id } });
    }

    async findByDNI(dni: number) : Promise<Usuarios> {
        return this.prisma.usuarios.findFirst({ where: { dni: Number(dni)} });
    }
}