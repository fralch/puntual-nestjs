import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import fs from 'fs';
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

    async asistencias_create(id: number, horaString: string, turno: string, foto: string) {
        let fechaActual = new Date();
        fechaActual.setTime(fechaActual.getTime() - (5 * 60 * 60 * 1000));
        
        // Formatear la fecha y hora actual
        let fechaActualFormateada = fechaActual.toISOString().slice(0, 19).replace('T', ' ');
        
        // Formatear la fecha corta actual
        let fechaCortaActual = fechaActual.toISOString().slice(0, 10);
        
        // Obtener la hora actual
        let hora = fechaActualFormateada.slice(11, 13);
        
        // Obtener los minutos actuales
        let min = fechaActualFormateada.slice(14, 16);
        
        // Obtener el día de la semana
        let dias = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let fecha_dia = dias[fechaActual.getDay()];
         
        // console.log(fechaActual);
        // console.log(fechaActualFormateada);
        // console.log(fechaCortaActual);
        // console.log(hora);
        // console.log(min);
        // console.log(fecha_dia);

        const fotosave= foto.replace(/^data:image\/png;base64,/, "");
        fs.writeFileSync(`./fotos/${id}-${fechaCortaActual}-${hora}-${min}.png`, fotosave, 'base64');

        return this.prisma.registro_asistencias.create({
        data: {
            fecha: fechaActual,
            hora_entrada: horaString,
            usuario_id: id,
            turno: turno,
            foto: foto,
        },
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