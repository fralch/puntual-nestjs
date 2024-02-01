import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { HorariosLaboralesModule } from './horarios_laborales/horarios_laborales.module';
import { TardanzasModule } from './tardanzas/tardanzas.module';
import { FaltasModule } from './faltas/faltas.module';

@Module({
  imports: [UserModule, HorariosLaboralesModule, TardanzasModule, FaltasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

