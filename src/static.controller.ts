// static.controller.ts
import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('uploads')
export class StaticController {
    @Get()
    getFiles() {
        return 'Hello from static controller';
    }
    @Get(':filename')
    getFile(@Param('filename') filename: string, @Res() res: Response) {
      const filePath = join(process.cwd(), 'uploads', filename);
      const stream = createReadStream(filePath);
      stream.pipe(res);
    }
}
