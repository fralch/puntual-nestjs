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