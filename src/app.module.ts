import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { HorariosLaboralesModule } from './horarios_laborales/horarios_laborales.module';

@Module({
  imports: [UserModule, HorariosLaboralesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

