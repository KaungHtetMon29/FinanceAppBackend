import { Document } from 'mongoose';
export interface UserBalanceInterface extends Document {
  readonly ubid: number;
  readonly date: Date;
  balance: number;
  readonly user: {
    readonly uid: number;
    readonly name: string;
    readonly email: string;
  };
}
