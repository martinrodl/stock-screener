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
  async getAllETFs(
    skip: number = 0,
    limit: number = 10,
    sortBy: string = '',
    sortOrder: 'asc' | 'desc' = 'asc',
  ) {
    const sortField = this.getSortField(sortBy);
    const sortOrderValue = sortOrder === 'asc' ? 1 : -1;

    const count = await this.etfModel.countDocuments({}).exec();
    const pageTotal = Math.ceil(count / limit);

    const data = await this.etfModel
      .find()
      .sort({ [sortField]: sortOrderValue })
      .skip(skip)
      .limit(limit)
      .exec();

    return {
      data,
      pageTotal,
      status: 200,
    };
  }

  // Fetch a single ETF by its ID
  async getETFById(id: string): Promise<ETF> {
    const etf = await this.etfModel.findById(id).exec();
    if (!etf) {
      throw new NotFoundException(`ETF with ID ${id} not found`);
    }
    return etf;
  }

  // Fetch a single ETF by its symbol
  async getETFBySymbol(symbol: string): Promise<ETF> {
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
}
