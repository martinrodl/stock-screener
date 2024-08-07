import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Stock, StockDocument } from '../schemas';

@Injectable()
export class StocksRepository {
  constructor(
    @InjectModel(Stock.name) private readonly stockModel: Model<StockDocument>,
  ) {}

  async findOne(symbol: string): Promise<StockDocument> {
    return this.stockModel.findOne({ symbol }).exec();
  }

  async findById(id: string): Promise<StockDocument> {
    return this.stockModel.findById(id).exec();
  }

  async findAll(query: any = {}): Promise<Stock[]> {
    console.log('query ', query);
    return this.stockModel.find(query).exec();
  }

  async create(stock: Stock): Promise<Stock> {
    const newStock = new this.stockModel(stock);
    return newStock.save();
  }

  async update(symbol: string, stock: Partial<Stock>): Promise<Stock> {
    console.log('stock ', stock);
    return this.stockModel
      .findOneAndUpdate({ symbol }, stock, { new: true, upsert: true })
      .exec();
  }

  async delete(symbol: string): Promise<Stock> {
    return this.stockModel.findOneAndDelete({ symbol }).exec();
  }

  async insertMany(stocks: Stock[]): Promise<Stock[]> {
    const promises = stocks.map((stock) =>
      this.stockModel
        .updateOne({ symbol: stock.symbol }, stock, { upsert: true })
        .exec(),
    );
    await Promise.all(promises);
    return this.findAll();
  }

  async getUniqueCountries(): Promise<string[]> {
    return this.stockModel.distinct('country').exec();
  }

  async getUniqueSectors(): Promise<string[]> {
    return this.stockModel.distinct('sector').exec();
  }

  async getUniqueIndustries(): Promise<string[]> {
    return this.stockModel.distinct('industry').exec();
  }

  async *getStockStream(): AsyncIterable<Stock> {
    const cursor = this.stockModel.find().cursor();
    for await (const stock of cursor) {
      yield stock;
    }
  }

  async aggregate(pipeline: any[]): Promise<any[]> {
    return this.stockModel.aggregate(pipeline).exec();
  }

  async findByIdOrSymbol(identifier: string): Promise<Stock> {
    if (Types.ObjectId.isValid(identifier)) {
      return this.stockModel.findById(identifier).exec();
    }
    return this.stockModel.findOne({ symbol: identifier }).exec();
  }

  async updateActualValues(
    stockId: string,
    actualValues: Partial<Stock['actualValues']>,
  ): Promise<StockDocument> {
    return this.stockModel
      .findByIdAndUpdate(stockId, { $set: { actualValues } }, { new: true })
      .exec();
  }
}
