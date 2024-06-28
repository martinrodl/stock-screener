import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Other, OtherDocument } from '../schemas/other.schema';

@Injectable()
export class OtherRepository {
  constructor(
    @InjectModel(Other.name) private readonly otherModel: Model<OtherDocument>,
  ) {}

  async findLatest(): Promise<Other> {
    return this.otherModel.findOne().sort({ date: -1 }).exec();
  }

  async saveCurrentYield(currentYield: number): Promise<Other> {
    const newOther = new this.otherModel({ date: new Date(), currentYield });
    return newOther.save();
  }
}
