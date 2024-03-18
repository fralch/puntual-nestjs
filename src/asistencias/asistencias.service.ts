import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {Registro_asistencias} from '@prisma/client'

@Injectable()

export class AsistenciasService {

    constructor(private prisma: PrismaService) {}

    async asistencias_getAll(): Promise<Registro_asistencias[]> {
        return this.prisma.registro_asistencias.findMany();
    }

    async asistencias_getByUserId(id: number): Promise<Registro_asistencias[]> {
        return this.prisma.registro_asistencias.findMany({
            where: {
                usuario_id: id,
            },
        });
    }

    async asistencias_byDates(fecha_inicio: Date, fecha_fin: Date) {
        return this.prisma.registro_asistencias.findMany({
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
                hora_entrada: true,
                turno: true,
                foto: true,
            },
        });
    }

    async asistencias_create(data: Registro_asistencias): Promise<Registro_asistencias> {
        return this.prisma.registro_asistencias.create({
            data,
        });
    }

    async asistencias_update(id: number, data: Registro_asistencias): Promise<Registro_asistencias> {
        return this.prisma.registro_asistencias.update({
            where: {
                id: id,
            },
            data,
        });
    }

    async asistencias_delete(id: number): Promise<Registro_asistencias> {
        return this.prisma.registro_asistencias.delete({
            where: {
                id: id,
            },
        });
    }
}