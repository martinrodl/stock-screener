import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { ETF } from '../schemas/etf.schema';

@Injectable()
export class ETFRepository {
  constructor(
    @InjectModel(ETF.name) private readonly etfModel: Model<ETF & Document>,
  ) {}

  // Fetch all ETFs with pagination and sorting
  async getFilteredETFs(
    query: any,
    sortField: string,
    sortOrder: 1 | -1, // Specify that sortOrder is either 1 or -1
    skip: number,
    limit: number,
  ) {
    return this.etfModel
      .find(query)
      .sort({ [sortField]: sortOrder }) // Use an object for sorting
      .skip(skip)
      .limit(limit)
      .select({
        _id: 1,
        symbol: 1,
        __v: 1,
        name: 1,
        expenseRatio: 1,
        performance1y: 1,
        performance3y: 1,
        performance5y: 1,
        performance10y: 1,
      })
      .exec();
  }

  // Fetch a single ETF by its ID
  async getETFById(id: string): Promise<ETF & Document> {
    const etf = await this.etfModel.findById(id).exec();
    if (!etf) {
      throw new NotFoundException(`ETF with ID ${id} not found`);
    }
    return etf;
  }

  // Fetch a single ETF by its symbol
  async getETFBySymbol(symbol: string): Promise<ETF & Document> {
    const etf = await this.etfModel.findOne({ symbol }).exec();
    if (!etf) {
      throw new NotFoundException(`ETF with symbol ${symbol} not found`);
    }
    return etf;
  }

  // Create a new ETF
  async createETF(etfData: ETF): Promise<ETF> {
    const createdETF = new this.etfModel(etfData);
    return createdETF.save();
  }

  // Update an existing ETF by its ID
  async updateETFById(id: string, etfData: Partial<ETF>): Promise<ETF> {
    const updatedETF = await this.etfModel
      .findByIdAndUpdate(id, etfData, {
        new: true,
      })
      .exec();
    if (!updatedETF) {
      throw new NotFoundException(`ETF with ID ${id} not found`);
    }
    return updatedETF;
  }

  // Delete an ETF by its ID
  async deleteETFById(id: string): Promise<void> {
    const result = await this.etfModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`ETF with ID ${id} not found`);
    }
  }

  // Helper function to get the correct sort field
  private getSortField(sortBy: string): string {
    const sortFieldsMap = {
      expenseRatio: 'expenseRatio',
      '1y': 'performance1y',
      '3y': 'performance3y',
      '5y': 'performance5y',
      '10y': 'performance10y',
    };

    return sortFieldsMap[sortBy] || 'name';
  }

  async countDocuments(query: any): Promise<number> {
    return this.etfModel.countDocuments(query).exec();
  }

  async getDistinctIndustries(): Promise<string[]> {
    return this.etfModel.distinct('sectorsList.industry').exec() as Promise<
      string[]
    >;
  }
}
