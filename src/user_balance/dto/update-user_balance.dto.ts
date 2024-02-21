import { PartialType } from '@nestjs/mapped-types';
import { CreateUserBalanceDto } from './create-user_balance.dto';

export class UpdateUserBalanceDto extends PartialType(CreateUserBalanceDto) {}
