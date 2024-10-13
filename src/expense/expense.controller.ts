import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateExpenseDto } from 'src/expense/dtos/create-expense.dto';
import { ExpenseDto } from 'src/expense/dtos/expense.dto';
import { ExpenseService } from 'src/expense/expense.service';

@Controller('expense')
export class ExpenseController {
  constructor(private expenseService: ExpenseService) {}

  @Get('')
  getAll(): ExpenseDto[] {
    return this.expenseService.getAllExpenses();
  }

  @Get(':id')
  getOne(@Param('id') id: string): ExpenseDto {
    return this.expenseService.getExpenseById(id);
  }

  @Post('')
  create(@Body() expense: CreateExpenseDto): CreateExpenseDto {
    return this.expenseService.createExpense(expense);
  }
}
