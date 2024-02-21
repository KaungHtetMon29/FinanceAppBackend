import * as mongoose from 'mongoose';
import { UserSchema } from 'src/users/schema/user.schema';
export const UserBalanceSchema = new mongoose.Schema({
  ubid: { type: Number, required: true, unique: true },
  user: { type: UserSchema, required: true },
  date: { type: Date, required: true },
  balance: { type: Number, required: true },
});
