import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Horarios_laborales } from '@prisma/client';

@Injectable()
export class HorariosLaboralesService {
    constructor(private prisma: PrismaService ) {}

    async create(data : Horarios_laborales) : Promise<Horarios_laborales>{
        return this.prisma.horarios_laborales.create({ data });
    }

    async getAll() : Promise<Horarios_laborales[]> {
        return this.prisma.horarios_laborales.findMany();
    }

    async getOne(id: number) : Promise<Horarios_laborales> {
        return this.prisma.horarios_laborales.findUnique({ where: { id } });
    }

    async updateOne(id: number, data: Horarios_laborales) : Promise<Horarios_laborales> {
        return this.prisma.horarios_laborales.update({ where: { id }, data });
    }

    async deleteOne(id: number) : Promise<Horarios_laborales> {
        return this.prisma.horarios_laborales.delete({ where: { id } });
    }
}