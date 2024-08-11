import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Progress, ProgressDocument } from '../schemas';

@Injectable()
export class ProgressRepository {
  constructor(
    @InjectModel(Progress.name)
    private readonly progressModel: Model<ProgressDocument>,
  ) {}

  // Method to save or update progress
  async saveProgress(task: string, symbol: string): Promise<ProgressDocument> {
    return this.progressModel
      .findOneAndUpdate(
        { task },
        { $set: { symbol: symbol } },
        { new: true, upsert: true },
      )
      .exec();
  }

  // Method to get progress by task name
  async getProgress(task: string): Promise<ProgressDocument | null> {
    return this.progressModel.findOne({ task }).exec();
  }

  // Method to clear progress by task name
  async clearProgress(taskName: string): Promise<ProgressDocument | null> {
    return this.progressModel.findOneAndDelete({ taskName }).exec();
  }
}
