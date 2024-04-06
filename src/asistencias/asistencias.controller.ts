import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from 'express';
import { Registro_asistencias } from "@prisma/client";
import { AsistenciasService } from "./asistencias.service";

import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      const ext = path.parse(file.originalname).ext;
      const filename = `${uuidv4()}${ext}`;
      cb(null, filename);
    },
  });
  

@Controller("Asistencias")

export class AsistenciasController {

    constructor(private readonly asistenciasService: AsistenciasService) {}

    @Get()
    async asistencias(): Promise<Registro_asistencias[]> {
        return this.asistenciasService.asistencias_getAll();
    }

    @Get(":id")
    async asistenciasByUserId(@Param("id") id: string): Promise<Registro_asistencias[]> {
        const rpt = await this.asistenciasService.asistencias_getByUserId(Number(id));
        if (!rpt) throw new BadRequestException("Usuario no encontrado");
        return rpt;
    }

    @Post()
    @UseInterceptors(FileInterceptor('foto', { storage }))
    async create(@UploadedFile() foto: Express.Multer.File, @Body() data: Omit<Registro_asistencias, 'foto'>) {
      const fotoPath = foto.path;
      return this.asistenciasService.asistencias_create(
        Number(data.usuario_id),
        data.turno,
        fotoPath
      );
    }

    @Post('/byDates')
    async asistenciasByDates(@Body() data: { fecha_inicio: Date, fecha_fin: Date }) {
        return this.asistenciasService.asistencias_byDates(data.fecha_inicio, data.fecha_fin);
       
    }
}