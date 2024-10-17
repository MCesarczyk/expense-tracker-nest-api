import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getExpenseById(id: string) {
    const expense = await this.prisma.expense.findUnique({
      where: {
        id,
      },
    });

    if (!expense) {
      throw new NotFoundException('Expense not found');
    }

    return expense;
  }

  async updateExpense(id: string, expense: UpdateExpenseDto) {
    await this.getExpenseById(id);

    return await this.prisma.expense.update({
      where: {
        id,
      },
      data: {
        ...expense,
      },
    });
  }

  async deleteExpense(id: string) {
    await this.getExpenseById(id);

    return await this.prisma.expense.delete({
      where: {
        id,
      },
    });
  }
}
