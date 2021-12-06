import { Car as cars } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

export class Car implements cars {
  id: number;
  make: string;
  manufacture_year: string;
  model_year: string;
  model: string;
  car_value: Decimal;
  car_description: string;
  created_at: Date;
  updated_at: Date;
  userId: number;
}
