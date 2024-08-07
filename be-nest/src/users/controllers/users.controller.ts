import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Put,
  Delete,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from '../services';
import {
  RegisterDto,
  LoginDto,
  UpdatePortfolioDto,
  UpdateConsiderDto,
} from '../dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CustomRequest } from '../../types/express-request.interface';

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
  @Post('logout')
  @ApiOperation({ summary: 'Logout a user' })
  async logout(@Req() req: CustomRequest) {
    const user = req.user;
    return this.usersService.logout(user.email);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Put('portfolio')
  @ApiOperation({ summary: 'Add a stock to portfolio list' })
  async addToPortfolio(
    @Req() req: CustomRequest,
    @Body() updatePortfolioDto: UpdatePortfolioDto,
  ) {
    const user = req.user;
    return this.usersService.addToPortfolio(
      user._id.toString(),
      updatePortfolioDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Delete('portfolio')
  @ApiOperation({ summary: 'Remove a stock from portfolio list' })
  async removeFromPortfolio(
    @Req() req: CustomRequest,
    @Body() updatePortfolioDto: UpdatePortfolioDto,
  ) {
    const user = req.user;
    return this.usersService.removeFromPortfolio(
      user._id.toString(),
      updatePortfolioDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Put('consider')
  @ApiOperation({ summary: 'Add a stock to consider list' })
  async addToConsider(
    @Req() req: CustomRequest,
    @Body() updateConsiderDto: UpdateConsiderDto,
  ) {
    const user = req.user;
    return this.usersService.addToConsider(
      user._id.toString(),
      updateConsiderDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Delete('consider')
  @ApiOperation({ summary: 'Remove a stock from consider list' })
  async removeFromConsider(
    @Req() req: CustomRequest,
    @Body() updateConsiderDto: UpdateConsiderDto,
  ) {
    const user = req.user;
    return this.usersService.removeFromConsider(
      user._id.toString(),
      updateConsiderDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('portfolio')
  @ApiOperation({ summary: 'Get portfolio list' })
  async getPortfolioList(@Req() req: CustomRequest) {
    const user = req.user;
    return this.usersService.getPortfolioList(user._id.toString());
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('consider')
  @ApiOperation({ summary: 'Get consider list' })
  async getConsiderList(@Req() req: CustomRequest) {
    const user = req.user;
    return this.usersService.getConsiderList(user._id.toString());
  }
}
