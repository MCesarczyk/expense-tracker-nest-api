import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ExpenseDto } from './expense.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseDto
  implements
    Pick<
      ExpenseDto,
      'name' | 'description' | 'amount' | 'category' | 'account' | 'completed'
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
}
