import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCardDto, UpdateCardDto } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // {
    //   id: uuid(),
    //   brand: 'Toyota',
    //   model: 'Corolla',
    // },
  ];
  public findAll() {
    return this.cars;
  }
  public findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) {
      throw new NotFoundException(`Car whit id '${id}' not found`);
    }
    return car;
  }
  public createCer(createCardDto: CreateCardDto) {
    const car: Car = {
      id: uuid(),
      ...createCardDto,
    };
    this.cars.push(car);
    return car;
  }
  public updateCar(id: string, updateCardDto: UpdateCardDto) {
    let carBD = this.findOneById(id);
    if (updateCardDto.id && updateCardDto.id !== id) {
      throw new BadRequestException(`Car id ${id} is not valid inside body`);
    }
    this.cars = this.cars.map((car: Car) => {
      if (car.id === id) {
        carBD = {
          ...carBD,
          ...updateCardDto,
          id,
        };
        return carBD;
      }
      return car;
    });
    return carBD;
  }
  public deleteCar(id: string) {
    const carBD = this.findOneById(id);
    this.cars = this.cars.filter((car) => car.id !== carBD.id);
    // return carBD;
  }
  public fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars;
  }
}
