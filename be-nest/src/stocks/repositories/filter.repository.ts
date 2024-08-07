import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Filter, FilterDocument } from '../schemas/filter.schema';
import { CreateFilterDto } from '../dto/create-filter.dto';

@Injectable()
export class FilterRepository {
  constructor(
    @InjectModel(Filter.name) private filterModel: Model<FilterDocument>,
  ) {}

  async create(filter: CreateFilterDto & { user: string }): Promise<Filter> {
    const createdFilter = new this.filterModel(filter);
    return createdFilter.save();
  }

  async findAll(): Promise<Filter[]> {
    return this.filterModel.find().exec();
  }

  async findById(id: string): Promise<Filter> {
    const objectId = this.toObjectId(id);
    return this.filterModel.findById(objectId).exec();
  }

  async findByUser(userId: string): Promise<Filter[]> {
    const objectId = this.toObjectId(userId);
    const filters = await this.filterModel
      .find({ user: objectId.toString() })
      .exec();
    return filters;
  }

  async updateById(
    id: string,
    updateFilterDto: Partial<CreateFilterDto>,
  ): Promise<Filter> {
    const objectId = this.toObjectId(id);
    return this.filterModel
      .findByIdAndUpdate(objectId, updateFilterDto, { new: true })
      .exec();
  }

  async deleteById(id: string): Promise<any> {
    const objectId = this.toObjectId(id);
    return this.filterModel.findByIdAndDelete(objectId).exec();
  }

  private toObjectId(id: string): Types.ObjectId {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid ObjectId: ${id}`);
    }
    return new Types.ObjectId(id);
  }
}
