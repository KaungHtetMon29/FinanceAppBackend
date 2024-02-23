import { ObjectId } from 'mongoose';

export class CreateUserBalanceDto {
  readonly ubid: number;
  readonly date: Date;
  readonly balance: number;
  readonly user: ObjectId;
}
