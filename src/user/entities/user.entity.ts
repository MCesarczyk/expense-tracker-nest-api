import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    example: 1,
    description: 'Id of the user',
  })
  id: number;

  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the user',
  })
  name: string;

  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'Email of the user',
  })
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'Password of the user',
  })
  password: string;

  @ApiProperty({
    example: '2021-10-20T00:00:00.000Z',
    description: 'Date the user was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2021-10-20T00:00:00.000Z',
    description: 'Date the user was last updated',
  })
  updatedAt: Date;
}
