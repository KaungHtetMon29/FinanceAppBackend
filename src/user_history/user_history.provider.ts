import { Mongoose } from 'mongoose';
import { userHistorySchema } from './schema/user_history.schema';

export const userHistoryProviders = [
  {
    provide: 'USER_HISTORY_MODEL',
    useFactory: (mongoose: Mongoose) =>
      mongoose.model('UserHistory', userHistorySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
