import {
  Controller,
  // Get,
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
  // Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/multercfg/multer.config';
import { PhotosService } from './photos.service';
// import { CreatePhotoDto } from './dto/create-photo.dto';
// import { UpdatePhotoDto } from './dto/update-photo.dto';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post(':id/upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadFile(
    @Query('car_id') car_id: number,
    @Query('user_id') user_id: number,
    @Query('photo_name') photo_name: string,
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.photosService.upload({
      user_id,
      car_id,
      photo_name,
      ...file,
    });
  }

  // @Get()
  // findAll() {
  //   return this.photosService.findAll();
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
