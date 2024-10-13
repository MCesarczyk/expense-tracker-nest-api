import { Injectable, NotFoundException } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { CreateExpenseDto } from 'src/expense/dtos/create-expense.dto';
import { ExpenseDto } from 'src/expense/dtos/expense.dto';
import { sampleExpenses } from 'src/expense/expense.fixture';

@Injectable()
export class ExpenseService {
  private expenses = new BehaviorSubject<ExpenseDto[]>(sampleExpenses);

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

  createExpense(expense: CreateExpenseDto): CreateExpenseDto {
    this.expenses.next([
      ...this.expenses.value,
      {
        id: String(this.expenses.value.length + 1),
        ...expense,
      },
    ]);
    return expense;
  }
}
