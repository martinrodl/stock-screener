import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ETFRepository } from '../repositories/etf.repository';
import { ETF, Holder } from '../schemas/etf.schema';

@Injectable()
export class ETFService {
  private readonly apiKey = process.env.API_KEY;
  constructor(
    private readonly etfRepository: ETFRepository, // Inject the repository
    private readonly httpService: HttpService, // Inject HttpService for API calls
  ) {}

  // Get all ETFs with pagination and sorting
  async getAllETFs(
    skip: number = 0,
    limit: number = 10,
    sortBy: string = '',
    sortOrder: 'asc' | 'desc' = 'asc',
  ) {
    return this.etfRepository.getAllETFs(skip, limit, sortBy, sortOrder);
  }

  // Get a single ETF by its ID
  async getETFById(id: string): Promise<ETF> {
    return this.etfRepository.getETFById(id);
  }

  // Get a single ETF by its symbol
  async getETFBySymbol(symbol: string): Promise<ETF> {
    return this.etfRepository.getETFBySymbol(symbol);
  }

  // Create a new ETF
  async createETF(etfData: ETF): Promise<ETF> {
    return this.etfRepository.createETF(etfData);
  }

  // Update an existing ETF by its ID
  async updateETFById(id: string, etfData: Partial<ETF>): Promise<ETF> {
    return this.etfRepository.updateETFById(id, etfData);
  }

  // Delete an ETF by its ID
  async deleteETFById(id: string): Promise<void> {
    return this.etfRepository.deleteETFById(id);
  }

  // Update ETF information from an external API based on the symbol
  async updateETFInformation(symbol: string): Promise<ETF> {
    const etfInfoApiUrl = `https://financialmodelingprep.com/api/v4/etf-info?symbol=${symbol}&apikey=${this.apiKey}`;
    const holderApiUrl = `https://financialmodelingprep.com/api/v3/etf-holder/${symbol}?apikey=${this.apiKey}`;

    const response = await lastValueFrom(this.httpService.get(etfInfoApiUrl));
    const etfData = response.data[0];

    const holdersResponse = await lastValueFrom(
      this.httpService.get(holderApiUrl),
    );
    const holdersData = holdersResponse.data;

    const holders: Holder[] = holdersData
      .filter((holder: any) => holder.asset !== undefined || holder.name) // Skip if both asset and name are missing
      .map((holder: any) => ({
        asset: holder.asset || '', // Save empty string if asset is missing
        name: holder.name || '', // Ensure name is at least an empty string
        isin: holder.isin || null,
        cusip: holder.cusip || null,
        sharesNumber: holder.sharesNumber,
        weightPercentage: holder.weightPercentage || 0,
        marketValue: holder.marketValue || 0,
        updated: holder.updated ? new Date(holder.updated) : new Date(),
      }));

    let etf = await this.etfRepository.getETFBySymbol(symbol).catch(() => null);

    if (!etf) {
      etf = await this.etfRepository.createETF({
        symbol,
        assetClass: etfData.assetClass,
        aum: etfData.aum,
        avgVolume: etfData.avgVolume,
        cusip: etfData.cusip,
        description: etfData.description,
        domicile: etfData.domicile,
        etfCompany: etfData.etfCompany,
        expenseRatio: etfData.expenseRatio,
        inceptionDate: etfData.inceptionDate,
        isin: etfData.isin,
        name: etfData.name,
        nav: etfData.nav,
        navCurrency: etfData.navCurrency,
        sectorsList: etfData.sectorsList,
        website: etfData.website,
        holdingsCount: etfData.holdingsCount,
        performance1y: etfData.performance1y,
        performance3y: etfData.performance3y,
        performance5y: etfData.performance5y,
        performance10y: etfData.performance10y,
        holders,
      });
    } else {
      etf = await this.etfRepository.updateETFById(etf._id, {
        performance1y: etfData.performance1y,
        performance3y: etfData.performance3y,
        performance5y: etfData.performance5y,
        performance10y: etfData.performance10y,
        holders,
      });
    }

    return etf;
  }
}
