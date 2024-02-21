import * as mongoose from 'mongoose';
export const UserSchema = new mongoose.Schema({
  uid: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
});
