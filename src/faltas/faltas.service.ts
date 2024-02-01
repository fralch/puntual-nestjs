import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Faltas } from '@prisma/client'

@Injectable()

export class FaltasService {
    constructor(private prisma: PrismaService) {}

    async create(data: Faltas) : Promise<Faltas> {
        return this.prisma.faltas.create({ data });
    }

    async getAll() : Promise<Faltas[]> {
        return this.prisma.faltas.findMany();
    }

    async getOneByUserId(id: number) : Promise<Faltas[]> {
        return this.prisma.faltas.findMany({ where: { usuario_id: id } });
    }

    async updateOne(id: number, data: { fecha: Date, justificada: boolean }) : Promise<Faltas> {
        return this.prisma.faltas.update({ where: { id }, data });
    }

    async deleteOne(id: number) : Promise<Faltas> {
        return this.prisma.faltas.delete({ where: { id } });
    }

    async findByDate(fecha: Date) : Promise<Faltas> {
        return this.prisma.faltas.findFirst({ where: { fecha } });
    }
}

