import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {Tardanzas} from '@prisma/client'

@Injectable()

export class TardanzasService {
  constructor(private prisma: PrismaService) {}

  async tardanzas(): Promise<Tardanzas[]> {
    return this.prisma.tardanzas.findMany(
      {
        include: {
          usuario: true,
        },
      }
    );
  }

  async tardanzasByUserId(id: number): Promise<Tardanzas[]> {
    return this.prisma.tardanzas.findMany({
      where: {
        usuario_id: id,
      },
      include: {
        usuario: true,
      },
    });
  }

  async tarnzasByDates(fecha_inicio: Date, fecha_fin: Date) {
    return this.prisma.tardanzas.findMany({
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

  async createTardanzas(data: Tardanzas): Promise<Tardanzas> {
    return this.prisma.tardanzas.create({
      data,
    });
  }

  async updateTardanzas(id: number, data: Tardanzas): Promise<Tardanzas> {
    return this.prisma.tardanzas.update({
      where: {
        id: id,
      },
      data,
    });
  }

  async deleteTardanzas(id: number): Promise<Tardanzas> {
    return this.prisma.tardanzas.delete({
      where: {
        id: id,
      },
    });
  }
}