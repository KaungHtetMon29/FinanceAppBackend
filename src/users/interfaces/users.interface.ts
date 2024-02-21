import { Document } from 'mongoose';
export interface User extends Document {
  readonly uid: number;
  readonly name: string;
  readonly email: string;
  readonly password: string;
}
