import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Faltas } from '@prisma/client'
import {Registro_asistencias} from '@prisma/client'

@Injectable()

export class FaltasService {
    constructor(private prisma: PrismaService) {}

    async create(array_usuario)  {
        let fechaActual = new Date();
        fechaActual.setTime(fechaActual.getTime() - (5 * 60 * 60 * 1000));
        let fechaActualFormateada = fechaActual.toISOString().slice(0, 19).replace('T', ' ');
        let hora = fechaActualFormateada.slice(11, 13);
        let turno = hora < '12' ? 'M' : 'T';
        for (let i = 0; i < array_usuario.length; i++) {
            await this.prisma.faltas.create({
                data: {
                    usuario_id: array_usuario[i],
                    fecha: new Date(),
                    turno: turno
                },
            });
        }
        return 1; 
    }

    async getAll()  {
        const faltas_all = await this.prisma.faltas.findMany(
            {
                include: {
                    usuario: true
                }
            }
        );

        if(faltas_all.length === 0) {
            const asistencia = await this.prisma.registro_asistencias.findMany();
            const usuarios = await this.prisma.usuarios.findMany();
            
            const usuariosSinAsistencia = usuarios.filter(usuario => !asistencia.some(asistencia => asistencia.usuario_id === usuario.id)).map(usuario => usuario.id);
            this.create(usuariosSinAsistencia);
            
        }
        return faltas_all;
        

     
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

