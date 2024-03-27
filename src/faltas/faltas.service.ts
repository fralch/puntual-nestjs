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
        return this.prisma.faltas.findMany(
            {
                include: {
                    usuario: true
                }
            }
        );
    }

    async getOneByUserId(id: number) : Promise<Faltas[]> {
        return this.prisma.faltas.findMany({ 
            where: { usuario_id: id } ,
            include: {
                usuario: true
            }

        });
    }

    async faltas_byDates(fecha_inicio: Date, fecha_fin: Date)  {
        return this.prisma.faltas.findMany({
            where: {
                fecha: {
                    gte: new Date(fecha_inicio),
                    lte: new Date(fecha_fin),
                },
            },
            select: {
                usuario_id: true,
                usuario: {
                    select: {
                        nombre: true,
                    },
                },
                fecha: true,
                turno: true,
            },
        });

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

