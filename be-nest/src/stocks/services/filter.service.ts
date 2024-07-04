import { Injectable } from '@nestjs/common';
import { FilterRepository } from '../repositories/filter.repository';
import { Filter } from '../schemas/filter.schema';
import {
  CreateFilterDto,
  NumberFilterCriteriaDto,
  StringFilterCriteriaDto,
  RatioCriteriaDto,
} from '../dto';
import { FilterCondition } from '../enums';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stock, StockDocument } from '../schemas/stock.schema';

@Injectable()
export class FilterService {
  constructor(
    private readonly filterRepository: FilterRepository,
    @InjectModel(Stock.name) private stockModel: Model<StockDocument>,
  ) {}

  async createFilter(createFilterDto: CreateFilterDto): Promise<Filter> {
    return this.filterRepository.create(createFilterDto);
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
  ): Promise<Filter> {
    return this.filterRepository.updateById(id, updateFilterDto);
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
    );
    return this.stockModel.find(query).exec();
  }

  async applyFilterDirectly(
    numberCriteria?: NumberFilterCriteriaDto[],
    stringCriteria?: StringFilterCriteriaDto[],
    ratioCriteria?: RatioCriteriaDto[],
  ): Promise<Stock[]> {
    const query = this.buildQueryFromCriteria(
      numberCriteria,
      stringCriteria,
      ratioCriteria,
    );
    return this.stockModel.find(query).exec();
  }

  private buildQueryFromCriteria(
    numberCriteria?: NumberFilterCriteriaDto[],
    stringCriteria?: StringFilterCriteriaDto[],
    ratioCriteria?: RatioCriteriaDto[],
  ): any {
    const query: any = {};

    numberCriteria?.forEach((criterion) => {
      const { property, condition, value } = criterion;

      switch (condition) {
        case FilterCondition.GREATER_THAN:
          query[property] = { $gt: value };
          break;
        case FilterCondition.LESS_THAN:
          query[property] = { $lt: value };
          break;
        default:
          break;
      }
    });

    stringCriteria?.forEach((criterion) => {
      const { property, condition, value } = criterion;

      switch (condition) {
        case FilterCondition.EQUAL:
          query[property] = value;
          break;
        case FilterCondition.NOT_EQUAL:
          query[property] = { $ne: value };
          break;
        default:
          break;
      }
    });

    if (ratioCriteria) {
      ratioCriteria.forEach((criterion) => {
        const { numerator, denominator, condition, value } = criterion;
        query['$expr'] = query['$expr'] || { $and: [] };
        let exprCondition;

        switch (condition) {
          case FilterCondition.GREATER_THAN:
            exprCondition = {
              $gt: [{ $divide: [`$${numerator}`, `$${denominator}`] }, value],
            };
            break;
          case FilterCondition.LESS_THAN:
            exprCondition = {
              $lt: [{ $divide: [`$${numerator}`, `$${denominator}`] }, value],
            };
            break;
          default:
            break;
        }

        query['$expr']['$and'].push(exprCondition);
      });
    }

    return query;
  }
}
