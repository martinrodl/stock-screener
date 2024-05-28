import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { StatusService } from './status.service';
import { Response } from 'express';

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
