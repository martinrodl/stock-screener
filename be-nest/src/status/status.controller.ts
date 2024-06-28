import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StatusService } from './status.service';
import { Response } from 'express';

@ApiTags('status')
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  getStatus(@Res() res: Response) {
    try {
      const status = this.statusService.getStatus();
      res.status(HttpStatus.OK).json(status);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Internal Server Error');
    }
  }
}
