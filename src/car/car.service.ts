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
    return await this.prisma.car.findMany();
  }

  findOne(id: number) {
    return this.prisma.car.findUnique({
      where: {
        id,
      },
    });
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
    await this.prisma.car.delete({
      where: { id },
    });

    return {
      car: 'deleted',
    };
  }
}
