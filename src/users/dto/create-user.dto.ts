import { IsEmail, IsString, IsStrongPassword, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Userame must be a string' })
  username: string;

  @IsString()
  @Length(8, 20)
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password should contain at least one lowercase letter, one uppercase letter, one number, and one symbol',
    },
  )
  password: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;
}
