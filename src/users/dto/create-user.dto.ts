import { Exclude } from 'class-transformer';

export class CreateUserDto {
  readonly uid: number;
  readonly name: string;
  readonly email: string;
  readonly password: string;
}
