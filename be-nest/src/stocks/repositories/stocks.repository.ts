import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stock, StockDocument } from '../schemas';

@Injectable()
export class StocksRepository {
  constructor(
    @InjectModel(Stock.name) private readonly stockModel: Model<StockDocument>,
  ) {}

  async findOne(symbol: string): Promise<Stock> {
    return this.stockModel.findOne({ symbol }).exec();
  }

  async findAll(): Promise<Stock[]> {
    return this.stockModel.find().exec();
  }

  async create(stock: Stock): Promise<Stock> {
    const newStock = new this.stockModel(stock);
    return newStock.save();
  }

  async update(symbol: string, stock: Partial<Stock>): Promise<Stock> {
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

  async *getStockStream(): AsyncIterable<Stock> {
    const cursor = this.stockModel.find().cursor();
    for await (const stock of cursor) {
      yield stock;
    }
  }
}
