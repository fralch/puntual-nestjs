import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Permisos_vacasiones } from '@prisma/client';

@Injectable()

export class Permisos_vacacionesService {
    constructor(private prisma: PrismaService) {}

    async permisos_vacaciones(): Promise<Permisos_vacasiones[]> {
        return this.prisma.permisos_vacasiones.findMany();
    }

    async permisos_vacacionesById(id: number): Promise<Permisos_vacasiones> {
        return this.prisma.permisos_vacasiones.findUnique({where: { id}});
    }

    async permisos_vacacionesByEmpleadoId(usuario_id: number): Promise<Permisos_vacasiones[]> {
        return this.prisma.permisos_vacasiones.findMany({where: { usuario_id } });
    }

    async createPermisos_vacaciones(data: Permisos_vacasiones): Promise<Permisos_vacasiones> {
        return this.prisma.permisos_vacasiones.create({
            data,
        });
    }

    async updatePermisos_vacaciones(id: number, data: Permisos_vacasiones): Promise<Permisos_vacasiones> {
        return this.prisma.permisos_vacasiones.update({
            where: {
                id: id,
            },
            data,
        });
    }

    async deletePermisos_vacaciones(id: number): Promise<Permisos_vacasiones> {
        return this.prisma.permisos_vacasiones.delete({
            where: {
                id: id,
            },
        });
    }
}