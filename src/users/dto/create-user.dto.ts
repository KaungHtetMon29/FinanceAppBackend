import { Exclude } from 'class-transformer';

export class CreateUserDto {
  readonly name: string;
  readonly age: string;
  readonly email: string;
  readonly password: string;
}
