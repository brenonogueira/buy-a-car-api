import { Photos } from '@prisma/client';

export class Photo implements Photos {
  id: number;
  car_id: number;
  user_id: number;
  photo_name: string;
  filename: string;
  path: string;
  mimetype: string;
  created_at: Date;
  updated_at: Date;
}
