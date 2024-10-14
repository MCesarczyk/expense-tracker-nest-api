import { ApiProperty } from '@nestjs/swagger';

export class ExpenseDto {
  @ApiProperty({
    example: '1',
    description: 'Id of the expense',
  })
  id: string;

  @ApiProperty({
    example: 'Expense 1',
    description: 'Name of the expense',
  })
  name: string;

  @ApiProperty({
    example: 'Description of expense 1',
    description: 'Description of the expense',
  })
  description: string;

  @ApiProperty({
    example: 100,
    description: 'Amount of the expense',
  })
  amount: number;

  @ApiProperty({
    example: 'Food',
    description: 'Category of the expense',
  })
  category: string;

  @ApiProperty({
    example: 'Cash',
    description: 'Account used for the expense',
  })
  account: string;

  @ApiProperty({
    example: false,
    description: 'Whether th expense is completed',
  })
  completed: boolean;
}
