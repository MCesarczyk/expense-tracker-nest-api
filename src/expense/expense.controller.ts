import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReqUserId } from 'src/common/decorators/req-user-decorator';
import { CreateExpenseDto } from 'src/expense/dtos/create-expense.dto';
import { UpdateExpenseDto } from 'src/expense/dtos/update-expense.dto';
import { Expense } from 'src/expense/entities/expense.entity';
import { ExpenseService } from 'src/expense/expense.service';

@Controller({ version: '1', path: 'expense' })
@ApiTags('expense')
@ApiBearerAuth()
export class ExpenseController {
  constructor(private expenseService: ExpenseService) { }

  @Post('')
  @ApiOkResponse({
    type: CreateExpenseDto,
  })
  @ApiOperation({
    summary: 'Creates a new expense',
    tags: ['expense'],
  })
  async create(@Body() expense: CreateExpenseDto) {
    return this.expenseService.createExpense(expense);
  }

  @Get('')
  @ApiOkResponse({
    type: Expense,
    isArray: true,
  })
  @ApiOperation({
    summary: 'Returns all expenses',
    tags: ['expense'],
  })
  async getAll(@ReqUserId() userId: string): Promise<Expense[]> {
    return this.expenseService.getAllExpenses(userId);
  }

  @Get(':id')
  @ApiOkResponse({
    type: Expense,
  })
  @ApiOperation({
    summary: 'Returns an expense by ID',
    tags: ['expense'],
  })
  async getOne(@ReqUserId() userId: string, @Param('id') id: string): Promise<Expense> {
    return this.expenseService.getExpenseById(userId, id);
  }

  @Put(':id')
  @ApiOkResponse({
    type: Expense,
  })
  @ApiOperation({
    summary: 'Updates an expense by ID',
    tags: ['expense'],
  })
  async update(@ReqUserId() userId: string, @Param('id') id: string, @Body() expense: UpdateExpenseDto): Promise<Expense> {
    return this.expenseService.updateExpense(userId, id, expense);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: Expense,
  })
  @ApiOperation({
    summary: 'Deletes an expense by ID',
    tags: ['expense'],
  })
  async delete(@ReqUserId() userId: string, @Param('id') id: string): Promise<Expense> {
    return this.expenseService.deleteExpense(userId, id);
  }
}
