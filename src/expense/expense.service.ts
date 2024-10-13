import { Injectable, NotFoundException } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { ExpenseDto } from 'src/expense/dtos/expense.dto';

@Injectable()
export class ExpenseService {
  private expenses = new BehaviorSubject<ExpenseDto[]>([
    {
      id: '1',
      name: 'coffee',
      description: 'Coffee',
      amount: 2.0,
      account: 'Debit Card',
      category: 'Food',
      completed: true,
    },
    {
      id: '2',
      name: 'lunch',
      description: 'Lunch',
      amount: 10.0,
      account: 'Cash',
      category: 'Food',
      completed: false,
    },
  ]);

  getAllExpenses(): ExpenseDto[] {
    return this.expenses.value;
  }

  getExpenseById(id: string): ExpenseDto {
    const expense = this.expenses.value.find((expense) => expense.id === id);
    if (!expense) {
      throw new NotFoundException('Expense not found');
    }
    return expense;
  }
}
