import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Expense } from '../entities/expense.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseDto
  implements
    Pick<
      Expense,
      | 'name'
      | 'description'
      | 'amount'
      | 'category'
      | 'account'
      | 'completed'
      | 'date'
      | 'userId'
    >
{
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Expense 1',
    description: 'Name of the expense',
    required: true,
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Description of expense 1',
    description: 'Description of the expense',
    required: true,
  })
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 100,
    description: 'Amount of the expense',
    required: true,
  })
  amount: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Food',
    description: 'Category of the expense',
    required: true,
  })
  category: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Cash',
    description: 'Account used for the expense',
    required: true,
  })
  account: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example: false,
    description: 'Whether th expense is completed',
    required: true,
  })
  completed: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '2021-10-20T00:00:00.000Z',
    description: 'Date the expense was created',
    required: true,
  })
  date: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '1',
    description: 'Id of the user who created the expense',
    required: true,
  })
  userId: string;
}
