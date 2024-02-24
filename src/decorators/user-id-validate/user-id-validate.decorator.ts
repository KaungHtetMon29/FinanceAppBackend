import {
  ExecutionContext,
  NotAcceptableException,
  SetMetadata,
  createParamDecorator,
} from '@nestjs/common';
import { Request } from 'express';
import mongoose from 'mongoose';

export const UserIdValidate = createParamDecorator(
  (data: string[], ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const param = ctx.switchToHttp().getRequest().params;
    // console.log(param[data[0]], 'this is param');
    if (param[data[0]]) {
      //   console.log(mongoose.Types.ObjectId.isValid(`${param[data[0]]}`));
      if (!mongoose.Types.ObjectId.isValid(`${param[data[0]]}`)) {
        throw new NotAcceptableException(`Invalid id`);
      }
    } else if (param[data[0]] === undefined) {
      for (let i of data) {
        if (!mongoose.Types.ObjectId.isValid(`${request.body[i]}`)) {
          throw new NotAcceptableException(`Invalid ${i}`);
        }
      }
    }
  },
);
