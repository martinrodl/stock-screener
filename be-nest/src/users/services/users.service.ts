import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersRepository } from '../repositories';
import { User, UserDocument } from '../schemas';
import {
  RegisterDto,
  LoginDto,
  UpdatePortfolioDto,
  UpdateConsiderDto,
} from '../dto';
import { Stock } from '../../stocks/schemas'; // Import the Stock schema

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    registerDto: RegisterDto,
  ): Promise<{ accessToken: string; name: string; email: string }> {
    const existingUser = await this.usersRepository.findUserByEmail(
      registerDto.email,
    );
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }
    const user = await this.usersRepository.createUser(registerDto);
    const payload = {
      email: user.email,
      sub: user._id.toString(),
      name: user.name,
    };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken, name: user.name, email: user.email };
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; name: string; email: string }> {
    const user = await this.usersRepository.findUserByEmail(loginDto.email);
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      email: user.email,
      sub: user._id.toString(),
      name: user.name,
    };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken, name: user.name, email: user.email };
  }

  async logout(email: string): Promise<void> {
    // Implement your logout logic here.
    // For example, you could invalidate the user's JWT token by adding it to a blacklist.
  }

  async addToPortfolio(
    userId: string,
    updatePortfolioDto: UpdatePortfolioDto,
  ): Promise<User> {
    return this.usersRepository.addToPortfolio(userId, updatePortfolioDto);
  }

  async removeFromPortfolio(
    userId: string,
    updatePortfolioDto: UpdatePortfolioDto,
  ): Promise<User> {
    return this.usersRepository.removeFromPortfolio(userId, updatePortfolioDto);
  }

  async addToConsider(
    userId: string,
    updateConsiderDto: UpdateConsiderDto,
  ): Promise<User> {
    return this.usersRepository.addToConsider(userId, updateConsiderDto);
  }

  async removeFromConsider(
    userId: string,
    updateConsiderDto: UpdateConsiderDto,
  ): Promise<User> {
    return this.usersRepository.removeFromConsider(userId, updateConsiderDto);
  }

  async getPortfolioList(userId: string): Promise<Stock[]> {
    const user = await this.usersRepository.findUserById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user.portfolioList as unknown as Stock[]; // Convert to unknown first then to Stock[]
  }

  async getConsiderList(userId: string): Promise<Stock[]> {
    const user = await this.usersRepository.findUserById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user.considerList as unknown as Stock[]; // Convert to unknown first then to Stock[]
  }

  async findUserByEmail(email: string): Promise<UserDocument> {
    return this.usersRepository.findUserByEmail(email);
  }
}
