import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
  ForbiddenException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FilterService } from '../services/filter.service';
import { Filter } from '../schemas/filter.schema';
import { CreateFilterDto, ApplyFilterDto } from '../dto/create-filter.dto';
import {
  IndustriesResponseDto,
  SectorsResponseDto,
  CountriesResponseDto,
} from '../dto/filter-response.dto';
import { Stock } from '../schemas/stock.schema';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CustomRequest } from '../../types/express-request.interface';

@ApiTags('stocks-filters')
@Controller('filters')
export class FilterController {
  constructor(private readonly filterService: FilterService) {}

  @Get('countries')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get unique countries' })
  @ApiResponse({
    status: 200,
    description: 'Return all unique countries',
    type: CountriesResponseDto,
  })
  async getCountries(): Promise<CountriesResponseDto> {
    const countries = await this.filterService.getUniqueCountries();
    return { countries };
  }

  @Get('sectors')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get unique sectors' })
  @ApiResponse({
    status: 200,
    description: 'Return all unique sectors',
    type: SectorsResponseDto,
  })
  async getSectors(): Promise<SectorsResponseDto> {
    const sectors = await this.filterService.getUniqueSectors();
    return { sectors };
  }

  @Get('industries')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get unique industries' })
  @ApiResponse({
    status: 200,
    description: 'Return all unique industries',
    type: IndustriesResponseDto,
  })
  async getIndustries(): Promise<IndustriesResponseDto> {
    const industries = await this.filterService.getUniqueIndustries();
    return { industries };
  }

  @Post('/apply-direct')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Apply a filter directly from the payload' })
  @ApiBody({
    type: CreateFilterDto,
    description: 'The filter data to apply directly',
  })
  @ApiResponse({
    status: 200,
    description: 'Return the stocks matching the filter criteria',
    type: [Stock],
  })
  async applyFilterDirectly(
    @Req() req: CustomRequest,
    @Body() applyFilterDto: ApplyFilterDto,
  ): Promise<Stock[]> {
    return this.filterService.applyFilterDirectly(
      applyFilterDto.numberCriteria,
      applyFilterDto.stringCriteria,
      applyFilterDto.ratioCriteria,
      applyFilterDto.multiCriteria,
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new filter' })
  @ApiBody({
    type: CreateFilterDto,
    description: 'The filter data to create',
  })
  @ApiResponse({
    status: 201,
    description: 'The filter has been successfully created.',
    type: Filter,
  })
  async create(
    @Req() req: CustomRequest,
    @Body() createFilterDto: CreateFilterDto,
  ): Promise<Filter> {
    const userId = req.user._id.toString();
    return this.filterService.createFilter(createFilterDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all filters' })
  @ApiResponse({
    status: 200,
    description: 'Return all filters',
    type: [Filter],
  })
  async findAll(): Promise<Filter[]> {
    return this.filterService.getAllFilters();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('userFilters')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get filters by user ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the filters for the given user ID',
    type: [Filter],
  })
  async findByUser(@Req() req: CustomRequest): Promise<Filter[]> {
    const userId = req.user._id.toString();
    return this.filterService.getFiltersByUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
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

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(':id')
  @HttpCode(HttpStatus.OK)
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
  })
  @ApiResponse({
    status: 200,
    description: 'The filter has been successfully updated.',
    type: Filter,
  })
  async update(
    @Req() req: CustomRequest,
    @Param('id') id: string,
    @Body() updateFilterDto: Partial<CreateFilterDto>,
  ): Promise<Filter> {
    const userId = req.user._id.toString();
    const filter = await this.filterService.getFilterById(id);
    if (filter.user.toString() !== userId) {
      throw new ForbiddenException(
        'You do not have permission to update this filter',
      );
    }
    return this.filterService.updateFilterById(id, updateFilterDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
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
  async remove(
    @Req() req: CustomRequest,
    @Param('id') id: string,
  ): Promise<any> {
    const userId = req.user._id.toString();
    const filter = await this.filterService.getFilterById(id);
    if (filter.user.toString() !== userId) {
      throw new ForbiddenException(
        'You do not have permission to delete this filter',
      );
    }
    return this.filterService.deleteFilterById(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id/apply')
  @HttpCode(HttpStatus.OK)
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
}
