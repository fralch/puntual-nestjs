import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { HorariosLaboralesModule } from './horarios_laborales/horarios_laborales.module';
import { TardanzasModule } from './tardanzas/tardanzas.module';
import { FaltasModule } from './faltas/faltas.module';
import {Permisos_vacacionesModule} from './permisos_vacaciones/permisos_vacaciones.module'

@Module({
  imports: [UserModule, HorariosLaboralesModule, TardanzasModule, FaltasModule, Permisos_vacacionesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

