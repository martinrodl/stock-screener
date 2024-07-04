import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Filter, FilterDocument } from '../schemas/filter.schema';
import { CreateFilterDto } from '../dto/create-filter.dto';

@Injectable()
export class FilterRepository {
  constructor(
    @InjectModel(Filter.name) private filterModel: Model<FilterDocument>,
  ) {}

  async create(filter: CreateFilterDto): Promise<Filter> {
    const createdFilter = new this.filterModel(filter);
    return createdFilter.save();
  }

  async findAll(): Promise<Filter[]> {
    return this.filterModel.find().exec();
  }

  async findById(id: string): Promise<Filter> {
    return this.filterModel.findById(id).exec();
  }

  async findByUser(userId: string): Promise<Filter[]> {
    return this.filterModel.find({ user: userId }).exec();
  }

  async updateById(
    id: string,
    updateFilterDto: Partial<CreateFilterDto>,
  ): Promise<Filter> {
    return this.filterModel
      .findByIdAndUpdate(id, updateFilterDto, { new: true })
      .exec();
  }

  async deleteById(id: string): Promise<any> {
    return this.filterModel.findByIdAndDelete(id).exec();
  }

  // Additional logic for applying filters to stocks can be added here
}
