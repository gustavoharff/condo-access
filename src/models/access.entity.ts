import { Car } from "./car.entity";

export type Access = {
  id: string;
  carId: string;
  car: Car;
  date: Date;
}
