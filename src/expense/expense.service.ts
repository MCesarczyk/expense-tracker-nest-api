import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateExpenseDto } from 'src/expense/dtos/create-expense.dto';
import { UpdateExpenseDto } from 'src/expense/dtos/update-expense.dto';

@Injectable()
export class ExpenseService {
  constructor(private readonly prisma: PrismaService) {}

  createExpense(expense: CreateExpenseDto) {
    return this.prisma.expense.create({
      data: {
        ...expense,
      },
    });
  }

  getAllExpenses() {
    return this.prisma.expense.findMany();
  }

  getExpenseById(id: string) {
    return this.prisma.expense.findUnique({
      where: {
        id,
      },
    });
  }

  updateExpense(id: string, expense: UpdateExpenseDto) {
    return this.prisma.expense.update({
      where: {
        id,
      },
      data: {
        ...expense,
      },
    });
  }

  deleteExpense(id: string) {
    return this.prisma.expense.delete({
      where: {
        id,
      },
    });
  }
}
