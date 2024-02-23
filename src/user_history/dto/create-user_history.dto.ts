import mongoose, { ObjectId } from 'mongoose';

export class CreateUserHistoryDto {
  readonly ubid: ObjectId;
  readonly user: ObjectId;
  readonly date: Date;
  readonly detail: string;
  readonly cost: number;
}
