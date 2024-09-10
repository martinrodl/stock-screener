import { Injectable, ForbiddenException } from '@nestjs/common';
import { FilterRepository } from '../repositories/filter.repository';
import { StocksRepository } from '../repositories/stocks.repository';
import { Filter } from '../schemas/filter.schema';
import {
  CreateFilterDto,
  NumberFilterCriteriaDto,
  StringFilterCriteriaDto,
  RatioCriteriaDto,
  MultiCriteriaDto,
} from '../dto';
import { FilterNumberCondition, FilterStringCondition } from '../enums';
import { Stock } from '../schemas/stock.schema';

@Injectable()
export class FilterService {
  constructor(
    private readonly filterRepository: FilterRepository,
    private readonly stocksRepository: StocksRepository,
  ) {}

  async createFilter(
    createFilterDto: CreateFilterDto,
    userId: string,
  ): Promise<Filter> {
    const filterData = {
      ...createFilterDto,
      user: userId,
    };
    const createdFilter = await this.filterRepository.create(filterData);
    return createdFilter;
  }

  async getAllFilters(): Promise<Filter[]> {
    return this.filterRepository.findAll();
  }

  async getFilterById(id: string): Promise<Filter> {
    return this.filterRepository.findById(id);
  }

  async deleteFilterById(id: string): Promise<any> {
    return this.filterRepository.deleteById(id);
  }

  async getFiltersByUser(userId: string): Promise<Filter[]> {
    return this.filterRepository.findByUser(userId);
  }

  async updateFilterById(
    id: string,
    updateFilterDto: Partial<CreateFilterDto>,
    userId: string,
  ): Promise<Filter> {
    const filter = await this.filterRepository.findById(id);
    if (!filter) {
      throw new ForbiddenException('Filter not found');
    }
    if (filter.user.toString() !== userId) {
      throw new ForbiddenException(
        'You do not have permission to update this filter',
      );
    }

    const updatedFilterData = {
      ...updateFilterDto,
      user: filter.user, // Ensure the user field is not updated
    };

    return this.filterRepository.updateById(id, updatedFilterData);
  }

  async applyFilter(filterId: string): Promise<Stock[]> {
    const filter = await this.filterRepository.findById(filterId);
    if (!filter) {
      throw new Error('Filter not found');
    }

    const query = this.buildQueryFromCriteria(
      filter.numberCriteria,
      filter.stringCriteria,
      filter.ratioCriteria,
      filter.multiCriteria,
    );
    return this.stocksRepository.findAll(query);
  }

  async applyFilterDirectly(
    numberCriteria?: NumberFilterCriteriaDto[],
    stringCriteria?: StringFilterCriteriaDto[],
    ratioCriteria?: RatioCriteriaDto[],
    multiCriteria?: MultiCriteriaDto[],
  ): Promise<Stock[]> {
    const query = this.buildQueryFromCriteria(
      numberCriteria,
      stringCriteria,
      ratioCriteria,
      multiCriteria,
    );
    return this.stocksRepository.findAll(query);
  }

  private buildQueryFromCriteria(
    numberCriteria?: NumberFilterCriteriaDto[],
    stringCriteria?: StringFilterCriteriaDto[],
    ratioCriteria?: RatioCriteriaDto[],
    multiCriteria?: MultiCriteriaDto[],
  ): any {
    const query: any = {};

    // Handle number criteria
    const numberConditions: any[] = [];
    numberCriteria?.forEach((criterion) => {
      const { property, condition, value } = criterion;

      let matchCondition;
      switch (condition) {
        case FilterNumberCondition.GREATER_THAN:
          matchCondition = { $gt: value };
          break;
        case FilterNumberCondition.LESS_THAN:
          matchCondition = { $lt: value };
          break;
        default:
          break;
      }

      if (matchCondition) {
        if (property.includes('.')) {
          const [root, nested] = property.split('.');
          numberConditions.push({ [`${root}.${nested}`]: matchCondition });
        } else {
          numberConditions.push({ [property]: matchCondition });
        }
      }
    });

    // Apply number conditions using $and if there are multiple conditions
    if (numberConditions.length > 0) {
      query.$and = query.$and || [];
      query.$and.push(...numberConditions);
    }

    // Handle string criteria
    stringCriteria?.forEach((criterion) => {
      const { property, condition, value } = criterion;

      if (value !== null && value !== undefined && value !== '') {
        let stringCondition;
        switch (condition) {
          case FilterStringCondition.EQUAL:
            stringCondition = value;
            break;
          case FilterStringCondition.NOT_EQUAL:
            stringCondition = { $ne: value };
            break;
          default:
            break;
        }

        if (stringCondition) {
          query[property] = stringCondition;
        }
      }
    });

    // Handle ratio criteria
    if (ratioCriteria) {
      ratioCriteria.forEach((criterion) => {
        const { numerator, denominator, condition, value } = criterion;

        query.$expr = query.$expr || { $and: [] };
        let exprCondition;

        switch (condition) {
          case FilterNumberCondition.GREATER_THAN:
            exprCondition = {
              $gt: [
                {
                  $cond: {
                    if: { $eq: [`$${denominator}`, 0] },
                    then: null,
                    else: { $divide: [`$${numerator}`, `$${denominator}`] },
                  },
                },
                value,
              ],
            };
            break;
          case FilterNumberCondition.LESS_THAN:
            exprCondition = {
              $lt: [
                {
                  $cond: {
                    if: { $eq: [`$${denominator}`, 0] },
                    then: null,
                    else: { $divide: [`$${numerator}`, `$${denominator}`] },
                  },
                },
                value,
              ],
            };
            break;
          default:
            break;
        }

        if (exprCondition) {
          query.$expr.$and.push(exprCondition);
        }
      });
    }

    // Handle multi-criteria
    if (multiCriteria) {
      multiCriteria.forEach(({ type, values }) => {
        if (values && values.length > 0) {
          query[type] = { $in: values };
        }
      });
    }

    return query;
  }

  async getUniqueCountries(): Promise<string[]> {
    return this.stocksRepository.getUniqueCountries();
  }

  async getUniqueSectors(): Promise<string[]> {
    return this.stocksRepository.getUniqueSectors();
  }

  async getUniqueIndustries(): Promise<string[]> {
    return this.stocksRepository.getUniqueIndustries();
  }
}
