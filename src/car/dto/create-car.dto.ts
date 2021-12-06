import { Car } from '../entities/car.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCarDto extends Car {
  @ApiProperty()
  make: string;

  @ApiProperty()
  model: string;

  @ApiProperty()
  manufacture_year: string;

  @ApiProperty()
  model_year: string;

  @ApiProperty()
  car_description: string;

  @ApiProperty()
  userId: number;
}
