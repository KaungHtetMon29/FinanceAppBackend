import * as mongoose from 'mongoose';
export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
});
