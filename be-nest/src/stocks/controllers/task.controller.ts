import { Controller, Get, HttpStatus, HttpException } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { CronService } from '../services';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly cronService: CronService) {}

  @Get('update-all-stock-values')
  @ApiOperation({ summary: 'Trigger update of all stock values' })
  @ApiResponse({
    status: 202,
    description: 'Update process has been initiated',
  })
  async updateAllStockValues() {
    try {
      this.cronService.updateAllStockValues();
      return { message: 'Update process has been initiated' };
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('update-stocks-list')
  @ApiOperation({ summary: 'Manually trigger the update of stock lists' })
  @ApiResponse({
    status: 202,
    description: 'Task to update stock lists has been launched',
  })
  async updateStocksList() {
    try {
      this.cronService.updateStocksList();
      return { message: 'Task to update stock lists has been launched' };
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('update-statements')
  @ApiOperation({
    summary: 'Manually trigger the update of financial statements',
  })
  @ApiResponse({
    status: 202,
    description: 'Task to update financial statements has been launched',
  })
  async handleStatementsUpdate() {
    try {
      this.cronService.handleStatementsUpdateCron();
      return {
        message: 'Task to update financial statements has been launched',
      };
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('update-metrics')
  @ApiOperation({ summary: 'Manually trigger the update of metrics' })
  @ApiResponse({
    status: 202,
    description: 'Task to update metrics has been launched',
  })
  async handleMetricsUpdate() {
    try {
      this.cronService.handleMetricsUpdateCron();
      return { message: 'Task to update metrics has been launched' };
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('update-outlook')
  @ApiOperation({ summary: 'Manually trigger the update of outlook data' })
  @ApiResponse({
    status: 202,
    description: 'Task to update outlook has been launched',
  })
  async handleOutlookUpdate() {
    try {
      this.cronService.handleOutlookUpdateCron();
      return { message: 'Task to update outlook has been launched' };
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('update-counted')
  @ApiOperation({ summary: 'Manually trigger the update of counted data' })
  @ApiResponse({
    status: 202,
    description: 'Task to update counted has been launched',
  })
  async handleCountedUpdate() {
    try {
      this.cronService.handleCountedUpdateCron();
      return { message: 'Task to update counted has been launched' };
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
