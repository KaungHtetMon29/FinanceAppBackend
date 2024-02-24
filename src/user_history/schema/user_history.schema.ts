import mongoose from 'mongoose';
import { UserSchema } from 'src/users/schema/user.schema';

export const userHistorySchema = new mongoose.Schema({
  ubid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserBalance',
    required: true,
  },
  //   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  detail: { type: String, required: true },
  cost: { type: Number, required: true },
  type: { type: String, enum: ['+', '-'], required: true },
});
