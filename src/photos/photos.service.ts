import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
// import { CreatePhotoDto } from './dto/create-photo.dto';
// import { CreatePhotoDto } from './dto/create-photo.dto';
// import { UpdatePhotoDto } from './dto/update-photo.dto';
// import { Photos } from '@prisma/client';

@Injectable()
export class PhotosService {
  constructor(private prisma: PrismaService) {}

  async upload(body: any) {
    const data: any = {
      car_id: +body.car_id,
      user_id: +body.user_id,
      photo_name: body.photo_name,
      filename: body.filename,
      path: body.path,
      mimetype: body.mimetype,
      // size: parseInt(params.size),
    };
    const createData = await this.prisma.photos.create({ data });
    return createData;
    // return this.retorno(createData);
  }

  // findAll() {
  //   return `This action returns all photos`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} photo`;
  // }

  // update(id: number, data: any) {
  //   return `This action updates a #${id} photo`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} photo`;
  // }
}
