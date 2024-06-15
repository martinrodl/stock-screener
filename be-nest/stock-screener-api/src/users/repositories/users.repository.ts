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

  async addToPortfolio(updatePortfolioDto: UpdatePortfolioDto): Promise<User> {
    const user = await this.userModel
      .findOneAndUpdate(
        { email: updatePortfolioDto.email },
        {
          $addToSet: {
            portfolioList: new Types.ObjectId(updatePortfolioDto.stockId),
          },
        },
        { new: true },
      )
      .populate('portfolioList');
    if (!user) {
      throw new NotFoundException(
        `User with email ${updatePortfolioDto.email} not found`,
      );
    }
    return user;
  }

  async removeFromPortfolio(
    updatePortfolioDto: UpdatePortfolioDto,
  ): Promise<User> {
    const user = await this.userModel
      .findOneAndUpdate(
        { email: updatePortfolioDto.email },
        {
          $pull: {
            portfolioList: new Types.ObjectId(updatePortfolioDto.stockId),
          },
        },
        { new: true },
      )
      .populate('portfolioList');
    if (!user) {
      throw new NotFoundException(
        `User with email ${updatePortfolioDto.email} not found`,
      );
    }
    return user;
  }

  async addToConsider(updateConsiderDto: UpdateConsiderDto): Promise<User> {
    const user = await this.userModel
      .findOneAndUpdate(
        { email: updateConsiderDto.email },
        {
          $addToSet: {
            considerList: new Types.ObjectId(updateConsiderDto.stockId),
          },
        },
        { new: true },
      )
      .populate('considerList');
    if (!user) {
      throw new NotFoundException(
        `User with email ${updateConsiderDto.email} not found`,
      );
    }
    return user;
  }

  async removeFromConsider(
    updateConsiderDto: UpdateConsiderDto,
  ): Promise<User> {
    const user = await this.userModel
      .findOneAndUpdate(
        { email: updateConsiderDto.email },
        {
          $pull: {
            considerList: new Types.ObjectId(updateConsiderDto.stockId),
          },
        },
        { new: true },
      )
      .populate('considerList');
    if (!user) {
      throw new NotFoundException(
        `User with email ${updateConsiderDto.email} not found`,
      );
    }
    return user;
  }
}
