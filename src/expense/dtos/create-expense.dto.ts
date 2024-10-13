import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ExpenseDto } from './expense.dto';

export class CreateExpenseDto
  implements
    Pick<
      ExpenseDto,
      'name' | 'description' | 'amount' | 'category' | 'account' | 'completed'
    >
{
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  account: string;

  @IsBoolean()
  @IsNotEmpty()
  completed: boolean;
}
