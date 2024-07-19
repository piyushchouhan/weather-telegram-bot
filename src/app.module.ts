import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramService } from './telegram/telegram.service';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [AuthModule, AdminModule],
  controllers: [AppController],
  providers: [AppService, TelegramService],
})
export class AppModule {}
