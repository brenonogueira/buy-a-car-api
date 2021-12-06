import {
  Controller,
  Get,
  Post,
  // Body,
  // Patch,
  Param,
  // Delete,
  // UseGuards,
  // HttpStatus,
  // HttpCode,
  UseInterceptors,
  Query,
  UploadedFile,
  Res,
  StreamableFile,
  // Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { extname, join } from 'path';
import { multerOptions } from 'src/multercfg/multer.config';
import { PhotosService } from './photos.service';
// import { CreatePhotoDto } from './dto/create-photo.dto';
// import { UpdatePhotoDto } from './dto/update-photo.dto';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { Response } from 'express';
@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename(req: any, file: any, cb: any) {
          // Calling the callback passing the random name generated with the original extension name
          return cb(null, `${uuid()}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadFile(
    @Query('car_id') car_id: number,
    @Query('user_id') user_id: number,
    @Query('photo_name') photo_name: string,
    @Param('id') id: number,
    @UploadedFile() file,
  ) {
    return this.photosService.upload({
      id,
      user_id,
      car_id,
      photo_name,
      ...file,
    });
  }

  @Get('uploads/:path')
  async getImage(@Param('path') path, @Res() res: Response) {
    res.sendFile(path, { root: 'uploads' });
  }

  uploadImg(@UploadedFile() file) {
    return {
      url: `http://localhost:3333/${file.path}`,
    };
  }

  @Get('download')
  async download(
    // @Query('key') key: string,
    @Query('photo_name') photo_name: string,
    @Query('id') id: number,
    @Res() res,
  ) {
    return await this.photosService.download({
      id: +id,
      res,
      photo_name,
    });
  }

  // @Get('package')
  // getFile(): StreamableFile {
  //   const file = createReadStream(
  //     join(
  //       process.cwd(),
  //       ,
  //     ),
  //   );
  //   return new StreamableFile(file);
  // }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.photosService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePhotoDto: UpdatePhotoDto) {
  //   return this.photosService.update(+id, updatePhotoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.photosService.remove(+id);
  // }
}
