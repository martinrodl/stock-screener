import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, firstValueFrom } from 'rxjs';
import { ETFRepository } from '../repositories/etf.repository';
import { ETF, Holder } from '../schemas/etf.schema';

@Injectable()
export class ETFService {
  private readonly apiKey = process.env.API_KEY;

  constructor(
    private readonly etfRepository: ETFRepository, // Inject the repository
    private readonly httpService: HttpService, // Inject HttpService for API calls
  ) {}

  private getSortField(sortBy: string): string {
    const sortFieldsMap = {
      expenseRatio: 'expenseRatio',
      '1y': 'performance1y',
      '3y': 'performance3y',
      '5y': 'performance5y',
      '10y': 'performance10y',
    };
    return sortFieldsMap[sortBy] || 'name';
  }

  async updatePerformanceMetrics(symbol: string): Promise<ETF> {
    const performanceApiUrl = `https://financialmodelingprep.com/api/v3/stock-price-change/${symbol}?apikey=${this.apiKey}`;
    const response = await lastValueFrom(
      this.httpService.get(performanceApiUrl),
    );
    const performanceDataArray = response.data;

    if (
      !Array.isArray(performanceDataArray) ||
      performanceDataArray.length === 0
    ) {
      throw new NotFoundException(
        `Performance data for symbol ${symbol} not found`,
      );
    }

    const performanceData = performanceDataArray[0];

    if (!performanceData) {
      throw new NotFoundException(
        `Performance data for symbol ${symbol} not found`,
      );
    }

    const performanceMetrics = {
      performance1y: performanceData['1Y'],
      performance3y: performanceData['3Y'],
      performance5y: performanceData['5Y'],
      performance10y: performanceData['10Y'],
    };

    const etf = await this.etfRepository.getETFBySymbol(symbol);
    if (!etf) {
      throw new NotFoundException(`ETF with symbol ${symbol} not found`);
    }

    return this.etfRepository.updateETFById(etf.id, performanceMetrics);
  }

  async getAllETFs(
    skip: number = 0,
    limit: number = 10,
    sortBy: string = '',
    sortOrder: 'asc' | 'desc' = 'asc',
    sector?: string,
    minWeight?: number,
    shareSymbol?: string, // New parameter for filtering by specific share
  ) {
    const sortField = this.getSortField(sortBy);
    const sortOrderValue = sortOrder === 'asc' ? 1 : -1;

    // Build the query object
    const query: any = {};

    // Add sector filtering if specified
    if (sector && minWeight !== undefined) {
      query['sectorsList'] = {
        $elemMatch: {
          industry: sector,
          exposure: { $gte: minWeight },
        },
      };
    }

    // Add share symbol filtering if specified
    if (shareSymbol) {
      query['holders'] = {
        $elemMatch: {
          asset: shareSymbol,
        },
      };
    }

    const count = await this.etfRepository.countDocuments(query); // No need for .exec()
    const pageTotal = Math.ceil(count / limit);

    const data = await this.etfRepository.getFilteredETFs(
      query,
      sortField,
      sortOrderValue,
      skip,
      limit,
    );

    return {
      data,
      pageTotal,
      status: 200,
    };
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

    const etfInfoResponse = await lastValueFrom(
      this.httpService.get(etfInfoApiUrl),
    );
    const etfData = etfInfoResponse.data[0];

    const holdersResponse = await lastValueFrom(
      this.httpService.get(holderApiUrl),
    );
    const holdersData = holdersResponse.data;

    const holders: Holder[] = holdersData
      .filter((holder: any) => holder.asset !== undefined || holder.name)
      .map((holder: any) => ({
        asset: holder.asset || '',
        name: holder.name || '',
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
        holders,
        performance1y: null,
        performance3y: null,
        performance5y: null,
        performance10y: null,
      });
    } else {
      etf = await this.etfRepository.updateETFById(etf._id, {
        holders,
      });
    }

    // Update the performance metrics
    return this.updatePerformanceMetrics(symbol);
  }

  async getDistinctIndustries(): Promise<string[]> {
    return this.etfRepository.getDistinctIndustries();
  }
}
