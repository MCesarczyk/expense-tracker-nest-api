import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateExpenseDto } from 'src/expense/dtos/create-expense.dto';
import { ExpenseDto } from 'src/expense/dtos/expense.dto';
import { ExpenseService } from 'src/expense/expense.service';

@ApiTags('expense')
@Controller({ version: '1', path: 'expense' })
export class ExpenseController {
  constructor(private expenseService: ExpenseService) {}

  @Get('')
  @ApiOkResponse({
    type: ExpenseDto,
    isArray: true,
  })
  @ApiOperation({
    summary: 'Returns all expenses',
    tags: ['expense'],
  })
  getAll(): ExpenseDto[] {
    return this.expenseService.getAllExpenses();
  }

  @Get(':id')
  @ApiOkResponse({
    type: ExpenseDto,
  })
  @ApiOperation({
    summary: 'Returns an expense by ID',
    tags: ['expense'],
  })
  getOne(@Param('id') id: string): ExpenseDto {
    return this.expenseService.getExpenseById(id);
  }

  @Post('')
  @ApiOkResponse({
    type: CreateExpenseDto,
  })
  @ApiOperation({
    summary: 'Creates a new expense',
    tags: ['expense'],
  })
  create(@Body() expense: CreateExpenseDto): CreateExpenseDto {
    return this.expenseService.createExpense(expense);
  }
}
