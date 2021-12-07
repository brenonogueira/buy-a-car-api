import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCarDto) {
    return await this.prisma.car.create({ data });
  }

  async findAll() {
    const findCars = await this.prisma.car.findMany({
      select: {
        id: true,
        model: true,
        car_description: true,
        car_value: true,
        make: true,
        manufacture_year: true,
        model_year: true,
        photos: true,
        user: {
          select: {
            name: true,
            phone: true,
            email: true,
          },
        },
      },
    });

    const array_carrs = findCars.map((car) => {
      return {
        id: car.id,
        model: car.model,
        make: car.make,
        model_year: car.model_year,
        manufacture_year: car.manufacture_year,
        car_value: car.car_value,
        car_description: car.car_description,
        user_name: car.user.name,
        user_phone: car.user.phone,
        user_email: car.user.email,
        photos: car.photos.map((car) => {
          return {
            url: `${process.env.APP_URL}/photos/uploads/${car.filename}`,
          };
        }),
      };
    });

    // const array_fotos = findCars.photos.map((foto) => {
    //   return {
    //     url: `http://localhost:3333/photos/uploads/${foto.filename}`,
    //   };
    // });

    return array_carrs;
  }

  async findOne(id: number) {
    const findOneCar = await this.prisma.car.findUnique({
      where: {
        id,
      },
      select: {
        model: true,
        car_description: true,
        car_value: true,
        make: true,
        manufacture_year: true,
        model_year: true,
        photos: true,
        user: {
          select: {
            name: true,
            phone: true,
            email: true,
          },
        },
      },
    });

    console.log(findOneCar);

    const array_fotos = findOneCar.photos.map((foto) => {
      return {
        url: `${process.env.APP_URL}/photos/uploads/${foto.filename}`,
      };
    });

    return {
      array_fotos,
      model: findOneCar.model,
      make: findOneCar.make,
      manufacture_year: findOneCar.manufacture_year,
      model_year: findOneCar.model_year,
      car_value: findOneCar.car_value,
      car_description: findOneCar.car_description,
      user_name: findOneCar.user.name,
      user_phone: findOneCar.user.phone,
      user_email: findOneCar.user.email,
    };
  }

  async update(id: number, data: UpdateCarDto) {
    return await this.prisma.car.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: number) {
    return await this.prisma.car.delete({
      where: { id },
    });
  }
}
