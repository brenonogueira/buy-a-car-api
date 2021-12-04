import { Photo } from '../entities/photo.entity';

export class CreatePhotoDto extends Photo {
  car_id: number;
  filename: string;
  path: string;
  mimetype: string;
  photo_name: string;
  user_id: number;
}
