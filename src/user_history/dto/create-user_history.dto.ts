import { IsNotEmpty } from 'class-validator';
import mongoose, { ObjectId, isValidObjectId } from 'mongoose';

export class CreateUserHistoryDto {
  @IsNotEmpty()
  readonly ubid: ObjectId;

  @IsNotEmpty()
  readonly user: ObjectId;

  @IsNotEmpty()
  readonly date: Date;

  @IsNotEmpty()
  readonly detail: string;

  @IsNotEmpty()
  readonly cost: number;

  @IsNotEmpty()
  readonly type: '+' | '-';
}
