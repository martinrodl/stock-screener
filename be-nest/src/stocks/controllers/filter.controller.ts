import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { FilterService } from '../services/filter.service';
import { Filter } from '../schemas/filter.schema';
import { CreateFilterDto } from '../dto/create-filter.dto';
import { Stock } from '../schemas/stock.schema';
import {
  FilterNumberProperty,
  FilterStringProperty,
  FilterCondition,
} from '../enums';

@ApiTags('stocks-filters')
@Controller('filters')
export class FilterController {
  constructor(private readonly filterService: FilterService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new filter' })
  @ApiBody({
    type: CreateFilterDto,
    description: 'The filter data to create',
    examples: {
      example1: {
        summary: 'A sample filter creation payload',
        value: {
          name: 'Sample Filter',
          numberCriteria: [
            {
              property: FilterNumberProperty.PRICE,
              condition: FilterCondition.LESS_THAN,
              value: 100,
            },
          ],
          stringCriteria: [
            {
              property: FilterStringProperty.EXCHANGE,
              condition: FilterCondition.EQUAL,
              value: 'NYSE',
            },
          ],
          ratioCriteria: [
            {
              numerator: FilterNumberProperty.MARKETCAP,
              denominator: FilterNumberProperty.REVENUEPERSHARE,
              condition: FilterCondition.LESS_THAN,
              value: 2,
            },
          ],
          user: '60b8d295f1dfb862d8f51d3b',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The filter has been successfully created.',
    type: Filter,
  })
  async create(@Body() createFilterDto: CreateFilterDto): Promise<Filter> {
    return this.filterService.createFilter(createFilterDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all filters' })
  @ApiResponse({
    status: 200,
    description: 'Return all filters',
    type: [Filter],
  })
  async findAll(): Promise<Filter[]> {
    return this.filterService.getAllFilters();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a filter by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the filter to retrieve',
    example: '60b8d295f1dfb862d8f51d3b',
  })
  @ApiResponse({
    status: 200,
    description: 'Return the filter with the given ID',
    type: Filter,
  })
  async findOne(@Param('id') id: string): Promise<Filter> {
    return this.filterService.getFilterById(id);
  }

  @Get('/user/:userId')
  @ApiOperation({ summary: 'Get filters by user ID' })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'User ID to retrieve filters for',
    example: '60b8d295f1dfb862d8f51d3b',
  })
  @ApiResponse({
    status: 200,
    description: 'Return the filters for the given user ID',
    type: [Filter],
  })
  async findByUser(@Param('userId') userId: string): Promise<Filter[]> {
    return this.filterService.getFiltersByUser(userId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a filter by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the filter to update',
    example: '60b8d295f1dfb862d8f51d3b',
  })
  @ApiBody({
    type: CreateFilterDto,
    description: 'The updated filter data',
    examples: {
      example1: {
        summary: 'A sample filter update payload',
        value: {
          name: 'Updated Filter',
          numberCriteria: [
            {
              property: FilterNumberProperty.PRICE,
              condition: FilterCondition.LESS_THAN,
              value: 200,
            },
          ],
          stringCriteria: [
            {
              property: FilterStringProperty.NAME,
              condition: FilterCondition.NOT_EQUAL,
              value: 'Some Name',
            },
          ],
          ratioCriteria: [
            {
              numerator: FilterNumberProperty.MARKETCAP,
              denominator: FilterNumberProperty.REVENUEPERSHARE,
              condition: FilterCondition.LESS_THAN,
              value: 1,
            },
          ],
          user: '60b8d295f1dfb862d8f51d3b',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The filter has been successfully updated.',
    type: Filter,
  })
  async update(
    @Param('id') id: string,
    @Body() updateFilterDto: Partial<CreateFilterDto>,
  ): Promise<Filter> {
    return this.filterService.updateFilterById(id, updateFilterDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a filter by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the filter to delete',
    example: '60b8d295f1dfb862d8f51d3b',
  })
  @ApiResponse({
    status: 200,
    description: 'The filter has been successfully deleted.',
  })
  async remove(@Param('id') id: string): Promise<any> {
    return this.filterService.deleteFilterById(id);
  }

  @Get(':id/apply')
  @ApiOperation({ summary: 'Apply a filter by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the filter to apply',
    example: '60b8d295f1dfb862d8f51d3b',
  })
  @ApiResponse({
    status: 200,
    description: 'Return the stocks matching the filter criteria',
    type: [Stock],
  })
  async applyFilter(@Param('id') id: string): Promise<Stock[]> {
    return this.filterService.applyFilter(id);
  }

  @Post('/apply-direct')
  @ApiOperation({ summary: 'Apply a filter directly from the payload' })
  @ApiBody({
    type: CreateFilterDto,
    description: 'The filter data to apply directly',
    examples: {
      example1: {
        summary: 'A sample filter apply directly payload',
        value: {
          name: 'Temporary Filter',
          numberCriteria: [
            {
              property: FilterNumberProperty.PRICE,
              condition: FilterCondition.GREATER_THAN,
              value: 150,
            },
          ],
          stringCriteria: [
            {
              property: FilterStringProperty.EXCHANGE,
              condition: FilterCondition.EQUAL,
              value: 'NASDAQ',
            },
          ],
          ratioCriteria: [
            {
              numerator: FilterNumberProperty.MARKETCAP,
              denominator: FilterNumberProperty.REVENUEPERSHARE,
              condition: FilterCondition.GREATER_THAN,
              value: 1.5,
            },
          ],
          user: '60b8d295f1dfb862d8f51d3b',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Return the stocks matching the filter criteria',
    type: [Stock],
  })
  async applyFilterDirectly(
    @Body() applyFilterDto: CreateFilterDto,
  ): Promise<Stock[]> {
    return this.filterService.applyFilterDirectly(
      applyFilterDto.numberCriteria,
      applyFilterDto.stringCriteria,
      applyFilterDto.ratioCriteria,
    );
  }
}
