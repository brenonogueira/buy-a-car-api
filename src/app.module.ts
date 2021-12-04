import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarModule } from './car/car.module';
import { AuthModule } from './auth/auth.module';
import { PhotosModule } from './photos/photos.module';

@Module({
  imports: [CarModule, AuthModule, PhotosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
