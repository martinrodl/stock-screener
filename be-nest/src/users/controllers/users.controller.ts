import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Put,
  Delete,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from '../services';
import {
  RegisterDto,
  LoginDto,
  UpdatePortfolioDto,
  UpdateConsiderDto,
} from '../dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('users')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  async register(@Body() registerDto: RegisterDto) {
    return this.usersService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  async login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Put('portfolio')
  @ApiOperation({ summary: 'Add a stock to portfolio list' })
  async addToPortfolio(@Body() updatePortfolioDto: UpdatePortfolioDto) {
    return this.usersService.addToPortfolio(updatePortfolioDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Delete('portfolio')
  @ApiOperation({ summary: 'Remove a stock from portfolio list' })
  async removeFromPortfolio(@Body() updatePortfolioDto: UpdatePortfolioDto) {
    return this.usersService.removeFromPortfolio(updatePortfolioDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Put('consider')
  @ApiOperation({ summary: 'Add a stock to consider list' })
  async addToConsider(@Body() updateConsiderDto: UpdateConsiderDto) {
    return this.usersService.addToConsider(updateConsiderDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Delete('consider')
  @ApiOperation({ summary: 'Remove a stock from consider list' })
  async removeFromConsider(@Body() updateConsiderDto: UpdateConsiderDto) {
    return this.usersService.removeFromConsider(updateConsiderDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('portfolio')
  @ApiOperation({ summary: 'Get portfolio list' })
  async getPortfolioList(@Query('email') email: string) {
    return this.usersService.getPortfolioList(email);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('consider')
  @ApiOperation({ summary: 'Get consider list' })
  async getConsiderList(@Query('email') email: string) {
    return this.usersService.getConsiderList(email);
  }
}
