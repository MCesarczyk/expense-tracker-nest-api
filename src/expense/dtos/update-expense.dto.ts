import { CreateExpenseDto } from './create-expense.dto';

export type UpdateExpenseDto = Partial<Omit<CreateExpenseDto, 'id'>>;
