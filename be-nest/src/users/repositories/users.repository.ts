import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { RegisterDto, UpdatePortfolioDto, UpdateConsiderDto } from '../dto';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(registerDto: RegisterDto): Promise<User> {
    const newUser = new this.userModel(registerDto);
    return newUser.save();
  }

  async findUserByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }

  async findUserById(id: string): Promise<UserDocument> {
    return this.userModel
      .findById(id)
      .populate({
        path: 'portfolioList',
        model: 'Stock',
      })
      .populate({
        path: 'considerList',
        model: 'Stock',
      })
      .exec();
  }

  async addToPortfolio(
    userId: string,
    updatePortfolioDto: UpdatePortfolioDto,
  ): Promise<User> {
    const user = await this.userModel
      .findByIdAndUpdate(
        userId,
        {
          $addToSet: {
            portfolioList: new Types.ObjectId(updatePortfolioDto.stockId),
          },
        },
        { new: true },
      )
      .populate('portfolioList');
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }

  async removeFromPortfolio(
    userId: string,
    updatePortfolioDto: UpdatePortfolioDto,
  ): Promise<User> {
    const user = await this.userModel
      .findByIdAndUpdate(
        userId,
        {
          $pull: {
            portfolioList: new Types.ObjectId(updatePortfolioDto.stockId),
          },
        },
        { new: true },
      )
      .populate('portfolioList');
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }

  async addToConsider(
    userId: string,
    updateConsiderDto: UpdateConsiderDto,
  ): Promise<User> {
    const user = await this.userModel
      .findByIdAndUpdate(
        userId,
        {
          $addToSet: {
            considerList: new Types.ObjectId(updateConsiderDto.stockId),
          },
        },
        { new: true },
      )
      .populate('considerList');
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }

  async removeFromConsider(
    userId: string,
    updateConsiderDto: UpdateConsiderDto,
  ): Promise<User> {
    const user = await this.userModel
      .findByIdAndUpdate(
        userId,
        {
          $pull: {
            considerList: new Types.ObjectId(updateConsiderDto.stockId),
          },
        },
        { new: true },
      )
      .populate('considerList');
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }
}
