import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
// import { CreatePhotoDto } from './dto/create-photo.dto';
// import { CreatePhotoDto } from './dto/create-photo.dto';
// import { UpdatePhotoDto } from './dto/update-photo.dto';
// import { Photos } from '@prisma/client';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class PhotosService {
  constructor(private prisma: PrismaService) {}

  private readonly retorno = (data) => {
    return JSON.stringify(data, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value,
    );
  };

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
    return {
      ...createData,
      url: `${process.env.APP_URL}/${createData.filename}`,
    };
    // return this.retorno(createData);
  }

  // findAll() {
  //   return `This action returns all photos`;
  // }

  async findOne(id: number) {
    const dadosDb = await this.prisma.photos.findUnique({
      where: { id },
    });
    return this.retorno(dadosDb);
  }

  async download({ id, res }: any) {
    if (id) {
      const photo = await this.findOne(id);
      // console.log(photo);
      const rowTable = JSON.parse(photo);
      console.log(rowTable);
      if (rowTable?.path) {
        const filepath = path.join(
          __dirname,
          '..',
          '..',
          `${rowTable.path}`,
          // `${rowTable.filename}`,
        );
        console.log(filepath);
        const arquivo = await new Promise<Buffer>((resolve, reject) => {
          fs.readFile(filepath, {}, (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
        });
        res.end(arquivo); //abre arquivo no navegador
      }
    }
  }

  // remove(id: number) {
  //   return `This action removes a #${id} photo`;
  // }
}
