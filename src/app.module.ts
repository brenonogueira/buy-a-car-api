import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarModule } from './car/car.module';
import { AuthModule } from './auth/auth.module';
import { PhotosModule } from './photos/photos.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CarModule, AuthModule, PhotosModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
