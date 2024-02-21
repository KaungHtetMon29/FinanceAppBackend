import { Mongoose } from 'mongoose';
import { UserBalanceSchema } from './schema/user.schema';

export const userBalanceProviders = [
  {
    provide: 'USER_BALANCE_MODEL',
    useFactory: (mongoose: Mongoose) =>
      mongoose.model('UserBalance', UserBalanceSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
