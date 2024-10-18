import { Injectable, NotFoundException } from '@nestjs/common';
import { Expense } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateExpenseDto } from 'src/expense/dtos/create-expense.dto';
import { UpdateExpenseDto } from 'src/expense/dtos/update-expense.dto';

@Injectable()
export class ExpenseService {
  constructor(private readonly prisma: PrismaService) { }

  async createExpense(expense: CreateExpenseDto) {
    return this.prisma.expense.create({
      data: {
        ...expense,
      },
    });
  }

  async getAllExpenses(userId: string): Promise<Expense[]> {
    return this.prisma.expense.findMany({
      where: {
        userId,
      },
    });
  }

  async getExpenseById(userId: string, id: string) {
    const expense = await this.prisma.expense.findUnique({
      where: {
        userId,
        id,
      },
    });

    if (!expense) {
      throw new NotFoundException('Expense not found');
    }

    return expense;
  }

  async updateExpense(userId: string, id: string, expense: UpdateExpenseDto) {
    await this.getExpenseById(userId, id);

    return await this.prisma.expense.update({
      where: {
        userId,
        id,
      },
      data: {
        ...expense,
      },
    });
  }

  async deleteExpense(userId: string, id: string) {
    await this.getExpenseById(userId, id);

    return await this.prisma.expense.delete({
      where: {
        userId,
        id,
      },
    });
  }
}
