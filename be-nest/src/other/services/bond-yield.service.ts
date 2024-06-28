import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { OtherRepository } from '../repositories/other.repository';

@Injectable()
export class BondYieldService {
  private readonly logger = new Logger(BondYieldService.name);
  private readonly apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly otherRepository: OtherRepository,
  ) {
    this.apiKey = this.configService.get<string>('ALPHAVANTAGE_KEY');
  }

  async fetchAndSaveBondYield(): Promise<void> {
    const url = `https://www.alphavantage.co/query?function=TREASURY_YIELD&interval=monthly&maturity=20year&apikey=${this.apiKey}`;

    try {
      const response = await firstValueFrom(this.httpService.get(url));
      const data = response.data;
      const currentYield = data.data[0].value;
      if (currentYield) {
        await this.otherRepository.saveCurrentYield(currentYield);
        this.logger.log(`Bond yield data saved: ${currentYield}`);
      } else {
        this.logger.warn('Bond yield data not found in response');
      }
    } catch (error) {
      this.logger.error('Error fetching bond yield data:', error.message);
    }
  }

  async fetchBondYield(): Promise<number | null> {
    const other = await this.otherRepository.findLatest();
    return other ? other.currentYield : null;
  }
}
