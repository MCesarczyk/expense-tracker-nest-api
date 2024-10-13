import { ExpenseDto } from './expense.dto';

export type CreateExpenseDto = Pick<
  ExpenseDto,
  'name' | 'description' | 'amount' | 'category' | 'account'
>;
