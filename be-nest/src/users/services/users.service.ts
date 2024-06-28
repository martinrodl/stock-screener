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

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const existingUser = await this.usersRepository.findUserByEmail(
      registerDto.email,
    );
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }
    return this.usersRepository.createUser(registerDto);
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.usersRepository.findUserByEmail(loginDto.email);
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user._id.toString() };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async addToPortfolio(updatePortfolioDto: UpdatePortfolioDto): Promise<User> {
    return this.usersRepository.addToPortfolio(updatePortfolioDto);
  }

  async removeFromPortfolio(
    updatePortfolioDto: UpdatePortfolioDto,
  ): Promise<User> {
    return this.usersRepository.removeFromPortfolio(updatePortfolioDto);
  }

  async addToConsider(updateConsiderDto: UpdateConsiderDto): Promise<User> {
    return this.usersRepository.addToConsider(updateConsiderDto);
  }

  async removeFromConsider(
    updateConsiderDto: UpdateConsiderDto,
  ): Promise<User> {
    return this.usersRepository.removeFromConsider(updateConsiderDto);
  }

  async getPortfolioList(email: string): Promise<string[]> {
    const user = await this.usersRepository.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user.portfolioList.map((id) => id.toString());
  }

  async getConsiderList(email: string): Promise<string[]> {
    const user = await this.usersRepository.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user.considerList.map((id) => id.toString());
  }

  async findUserByEmail(email: string): Promise<UserDocument> {
    return this.usersRepository.findUserByEmail(email);
  }
}
