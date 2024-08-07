import { beApi as api } from './beApi'
const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        stocksControllerGetStocks: build.query<
            StocksControllerGetStocksApiResponse,
            StocksControllerGetStocksApiArg
        >({
            query: () => ({ url: `/be-nest-stocks/api/stocks` }),
        }),
        stocksControllerGetStock: build.query<
            StocksControllerGetStockApiResponse,
            StocksControllerGetStockApiArg
        >({
            query: (queryArg) => ({ url: `/be-nest-stocks/api/stocks/${queryArg['symbol']}` }),
        }),
        stocksControllerUpdateStocksList: build.mutation<
            StocksControllerUpdateStocksListApiResponse,
            StocksControllerUpdateStocksListApiArg
        >({
            query: (queryArg) => ({
                url: `/be-nest-stocks/api/stocks/updatestocklist`,
                method: 'POST',
                body: queryArg.updateStockListDto,
            }),
        }),
        stocksControllerUpdateStockValues: build.mutation<
            StocksControllerUpdateStockValuesApiResponse,
            StocksControllerUpdateStockValuesApiArg
        >({
            query: (queryArg) => ({
                url: `/be-nest-stocks/api/stocks/update/${queryArg['symbol']}`,
                method: 'POST',
                params: { periodType: queryArg.periodType },
            }),
        }),
        stocksControllerUpdateCountedStockValues: build.mutation<
            StocksControllerUpdateCountedStockValuesApiResponse,
            StocksControllerUpdateCountedStockValuesApiArg
        >({
            query: (queryArg) => ({
                url: `/be-nest-stocks/api/stocks/update/counted/${queryArg['symbol']}`,
                method: 'POST',
                params: { periodType: queryArg.periodType },
            }),
        }),
        stocksControllerGetMetrics: build.query<
            StocksControllerGetMetricsApiResponse,
            StocksControllerGetMetricsApiArg
        >({
            query: (queryArg) => ({
                url: `/be-nest-stocks/api/stocks/metrics/${queryArg.identifier}`,
                params: { periodType: queryArg.periodType },
            }),
        }),
        stocksControllerGetStatements: build.query<
            StocksControllerGetStatementsApiResponse,
            StocksControllerGetStatementsApiArg
        >({
            query: (queryArg) => ({
                url: `/be-nest-stocks/api/stocks/statements/${queryArg.identifier}`,
                params: { periodType: queryArg.periodType },
            }),
        }),
        stocksControllerGetGroupStatements: build.query<
            StocksControllerGetGroupStatementsApiResponse,
            StocksControllerGetGroupStatementsApiArg
        >({
            query: (queryArg) => ({
                url: `/be-nest-stocks/api/stocks/groupstatements/${queryArg['symbol']}`,
                params: { periodType: queryArg.periodType },
            }),
        }),
        stocksControllerGetProfile: build.query<
            StocksControllerGetProfileApiResponse,
            StocksControllerGetProfileApiArg
        >({
            query: (queryArg) => ({
                url: `/be-nest-stocks/api/stocks/${queryArg['symbol']}/profile`,
            }),
        }),
        stocksControllerGetGroupMetrics: build.query<
            StocksControllerGetGroupMetricsApiResponse,
            StocksControllerGetGroupMetricsApiArg
        >({
            query: (queryArg) => ({
                url: `/be-nest-stocks/api/stocks/groupmetrics/${queryArg['symbol']}`,
                params: { periodType: queryArg.periodType },
            }),
        }),
        fmpControllerFetchAndSaveStatements: build.mutation<
            FmpControllerFetchAndSaveStatementsApiResponse,
            FmpControllerFetchAndSaveStatementsApiArg
        >({
            query: (queryArg) => ({
                url: `/be-nest-stocks/api/fmp/${queryArg['symbol']}/update-statements`,
                method: 'POST',
            }),
        }),
        fmpControllerFetchAndSaveMetrics: build.mutation<
            FmpControllerFetchAndSaveMetricsApiResponse,
            FmpControllerFetchAndSaveMetricsApiArg
        >({
            query: (queryArg) => ({
                url: `/be-nest-stocks/api/fmp/${queryArg['symbol']}/update-metrics`,
                method: 'POST',
            }),
        }),
        fmpControllerFetchAndSaveRarings: build.mutation<
            FmpControllerFetchAndSaveRaringsApiResponse,
            FmpControllerFetchAndSaveRaringsApiArg
        >({
            query: (queryArg) => ({
                url: `/be-nest-stocks/api/fmp/${queryArg['symbol']}/update-analyst-ratings`,
                method: 'POST',
            }),
        }),
        fmpControllerFetchAndSaveOutlook: build.mutation<
            FmpControllerFetchAndSaveOutlookApiResponse,
            FmpControllerFetchAndSaveOutlookApiArg
        >({
            query: (queryArg) => ({
                url: `/be-nest-stocks/api/fmp/${queryArg['symbol']}/update-outlook`,
                method: 'POST',
            }),
        }),
        fmpControllerGetCombinedData: build.query<
            FmpControllerGetCombinedDataApiResponse,
            FmpControllerGetCombinedDataApiArg
        >({
            query: (queryArg) => ({ url: `/be-nest-stocks/api/fmp/${queryArg['symbol']}/combine` }),
        }),
        filterControllerGetCountries: build.query<
            FilterControllerGetCountriesApiResponse,
            FilterControllerGetCountriesApiArg
        >({
            query: () => ({ url: `/be-nest-stocks/api/filters/countries` }),
        }),
        filterControllerGetSectors: build.query<
            FilterControllerGetSectorsApiResponse,
            FilterControllerGetSectorsApiArg
        >({
            query: () => ({ url: `/be-nest-stocks/api/filters/sectors` }),
        }),
        filterControllerGetIndustries: build.query<
            FilterControllerGetIndustriesApiResponse,
            FilterControllerGetIndustriesApiArg
        >({
            query: () => ({ url: `/be-nest-stocks/api/filters/industries` }),
        }),
        filterControllerCreate: build.mutation<
            FilterControllerCreateApiResponse,
            FilterControllerCreateApiArg
        >({
            query: (queryArg) => ({
                url: `/be-nest-stocks/api/filters`,
                method: 'POST',
                body: queryArg.createFilterDto,
            }),
        }),
        filterControllerFindAll: build.query<
            FilterControllerFindAllApiResponse,
            FilterControllerFindAllApiArg
        >({
            query: () => ({ url: `/be-nest-stocks/api/filters` }),
        }),
        filterControllerFindByUser: build.query<
            FilterControllerFindByUserApiResponse,
            FilterControllerFindByUserApiArg
        >({
            query: () => ({ url: `/be-nest-stocks/api/filters/userFilters` }),
        }),
        filterControllerFindOne: build.query<
            FilterControllerFindOneApiResponse,
            FilterControllerFindOneApiArg
        >({
            query: (queryArg) => ({ url: `/be-nest-stocks/api/filters/${queryArg.id}` }),
        }),
        filterControllerUpdate: build.mutation<
            FilterControllerUpdateApiResponse,
            FilterControllerUpdateApiArg
        >({
            query: (queryArg) => ({
                url: `/be-nest-stocks/api/filters/${queryArg.id}`,
                method: 'PUT',
                body: queryArg.createFilterDto,
            }),
        }),
        filterControllerRemove: build.mutation<
            FilterControllerRemoveApiResponse,
            FilterControllerRemoveApiArg
        >({
            query: (queryArg) => ({
                url: `/be-nest-stocks/api/filters/${queryArg.id}`,
                method: 'DELETE',
            }),
        }),
        filterControllerApplyFilter: build.query<
            FilterControllerApplyFilterApiResponse,
            FilterControllerApplyFilterApiArg
        >({
            query: (queryArg) => ({ url: `/be-nest-stocks/api/filters/${queryArg.id}/apply` }),
        }),
        filterControllerApplyFilterDirectly: build.mutation<
            FilterControllerApplyFilterDirectlyApiResponse,
            FilterControllerApplyFilterDirectlyApiArg
        >({
            query: (queryArg) => ({
                url: `/be-nest-stocks/api/filters/apply-direct`,
                method: 'POST',
                body: queryArg.createFilterDto,
            }),
        }),
        bondYieldControllerGetBondYield: build.query<
            BondYieldControllerGetBondYieldApiResponse,
            BondYieldControllerGetBondYieldApiArg
        >({
            query: () => ({ url: `/be-nest-stocks/api/bond-yield` }),
        }),
        bondYieldControllerUpdateBondYield: build.mutation<
            BondYieldControllerUpdateBondYieldApiResponse,
            BondYieldControllerUpdateBondYieldApiArg
        >({
            query: () => ({ url: `/be-nest-stocks/api/bond-yield/update`, method: 'POST' }),
        }),
        usersControllerRegister: build.mutation<
            UsersControllerRegisterApiResponse,
            UsersControllerRegisterApiArg
        >({
            query: (queryArg) => ({
                url: `/be-nest-stocks/api/user/register`,
                method: 'POST',
                body: queryArg.registerDto,
            }),
        }),
        usersControllerLogin: build.mutation<
            UsersControllerLoginApiResponse,
            UsersControllerLoginApiArg
        >({
            query: (queryArg) => ({
                url: `/be-nest-stocks/api/user/login`,
                method: 'POST',
                body: queryArg.loginDto,
            }),
        }),
        usersControllerLogout: build.mutation<
            UsersControllerLogoutApiResponse,
            UsersControllerLogoutApiArg
        >({
            query: () => ({ url: `/be-nest-stocks/api/user/logout`, method: 'POST' }),
        }),
        usersControllerAddToPortfolio: build.mutation<
            UsersControllerAddToPortfolioApiResponse,
            UsersControllerAddToPortfolioApiArg
        >({
            query: (queryArg) => ({
                url: `/be-nest-stocks/api/user/portfolio`,
                method: 'PUT',
                body: queryArg.updatePortfolioDto,
            }),
        }),
        usersControllerRemoveFromPortfolio: build.mutation<
            UsersControllerRemoveFromPortfolioApiResponse,
            UsersControllerRemoveFromPortfolioApiArg
        >({
            query: (queryArg) => ({
                url: `/be-nest-stocks/api/user/portfolio`,
                method: 'DELETE',
                body: queryArg.updatePortfolioDto,
            }),
        }),
        usersControllerGetPortfolioList: build.query<
            UsersControllerGetPortfolioListApiResponse,
            UsersControllerGetPortfolioListApiArg
        >({
            query: () => ({ url: `/be-nest-stocks/api/user/portfolio` }),
        }),
        usersControllerAddToConsider: build.mutation<
            UsersControllerAddToConsiderApiResponse,
            UsersControllerAddToConsiderApiArg
        >({
            query: (queryArg) => ({
                url: `/be-nest-stocks/api/user/consider`,
                method: 'PUT',
                body: queryArg.updateConsiderDto,
            }),
        }),
        usersControllerRemoveFromConsider: build.mutation<
            UsersControllerRemoveFromConsiderApiResponse,
            UsersControllerRemoveFromConsiderApiArg
        >({
            query: (queryArg) => ({
                url: `/be-nest-stocks/api/user/consider`,
                method: 'DELETE',
                body: queryArg.updateConsiderDto,
            }),
        }),
        usersControllerGetConsiderList: build.query<
            UsersControllerGetConsiderListApiResponse,
            UsersControllerGetConsiderListApiArg
        >({
            query: () => ({ url: `/be-nest-stocks/api/user/consider` }),
        }),
        statusControllerGetStatus: build.query<
            StatusControllerGetStatusApiResponse,
            StatusControllerGetStatusApiArg
        >({
            query: () => ({ url: `/be-nest-stocks/api/status` }),
        }),
    }),
    overrideExisting: false,
})
export { injectedRtkApi as beGeneratedApi }
export type StocksControllerGetStocksApiResponse = unknown
export type StocksControllerGetStocksApiArg = void
export type StocksControllerGetStockApiResponse = unknown
export type StocksControllerGetStockApiArg = {
    symbol: string
}
export type StocksControllerUpdateStocksListApiResponse = unknown
export type StocksControllerUpdateStocksListApiArg = {
    updateStockListDto: UpdateStockListDto
}
export type StocksControllerUpdateStockValuesApiResponse = unknown
export type StocksControllerUpdateStockValuesApiArg = {
    symbol: string
    periodType: 'annual' | 'quarterly'
}
export type StocksControllerUpdateCountedStockValuesApiResponse = unknown
export type StocksControllerUpdateCountedStockValuesApiArg = {
    symbol: string
    periodType: string
}
export type StocksControllerGetMetricsApiResponse = unknown
export type StocksControllerGetMetricsApiArg = {
    identifier: string
    periodType: 'annual' | 'quarterly'
}
export type StocksControllerGetStatementsApiResponse = unknown
export type StocksControllerGetStatementsApiArg = {
    identifier: string
    periodType: 'annual' | 'quarterly'
}
export type StocksControllerGetGroupStatementsApiResponse = unknown
export type StocksControllerGetGroupStatementsApiArg = {
    symbol: string
    periodType: 'annual' | 'quarterly'
}
export type StocksControllerGetProfileApiResponse = unknown
export type StocksControllerGetProfileApiArg = {
    symbol: string
}
export type StocksControllerGetGroupMetricsApiResponse = unknown
export type StocksControllerGetGroupMetricsApiArg = {
    symbol: string
    periodType: 'annual' | 'quarterly'
}
export type FmpControllerFetchAndSaveStatementsApiResponse = unknown
export type FmpControllerFetchAndSaveStatementsApiArg = {
    symbol: string
}
export type FmpControllerFetchAndSaveMetricsApiResponse = unknown
export type FmpControllerFetchAndSaveMetricsApiArg = {
    symbol: string
}
export type FmpControllerFetchAndSaveRaringsApiResponse = unknown
export type FmpControllerFetchAndSaveRaringsApiArg = {
    symbol: string
}
export type FmpControllerFetchAndSaveOutlookApiResponse = unknown
export type FmpControllerFetchAndSaveOutlookApiArg = {
    symbol: string
}
export type FmpControllerGetCombinedDataApiResponse = unknown
export type FmpControllerGetCombinedDataApiArg = {
    symbol: string
}
export type FilterControllerGetCountriesApiResponse =
    /** status 200 Return all unique countries */ CountriesResponseDto
export type FilterControllerGetCountriesApiArg = void
export type FilterControllerGetSectorsApiResponse =
    /** status 200 Return all unique sectors */ SectorsResponseDto
export type FilterControllerGetSectorsApiArg = void
export type FilterControllerGetIndustriesApiResponse =
    /** status 200 Return all unique industries */ IndustriesResponseDto
export type FilterControllerGetIndustriesApiArg = void
export type FilterControllerCreateApiResponse =
    /** status 201 The filter has been successfully created. */ Filter
export type FilterControllerCreateApiArg = {
    /** The filter data to create */
    createFilterDto: CreateFilterDto
}
export type FilterControllerFindAllApiResponse = /** status 200 Return all filters */ Filter[]
export type FilterControllerFindAllApiArg = void
export type FilterControllerFindByUserApiResponse =
    /** status 200 Return the filters for the given user ID */ Filter[]
export type FilterControllerFindByUserApiArg = void
export type FilterControllerFindOneApiResponse =
    /** status 200 Return the filter with the given ID */ Filter
export type FilterControllerFindOneApiArg = {
    /** ID of the filter to retrieve */
    id: string
}
export type FilterControllerUpdateApiResponse =
    /** status 200 The filter has been successfully updated. */ Filter
export type FilterControllerUpdateApiArg = {
    /** ID of the filter to update */
    id: string
    /** The updated filter data */
    createFilterDto: CreateFilterDto
}
export type FilterControllerRemoveApiResponse = unknown
export type FilterControllerRemoveApiArg = {
    /** ID of the filter to delete */
    id: string
}
export type FilterControllerApplyFilterApiResponse =
    /** status 200 Return the stocks matching the filter criteria */ Stock[]
export type FilterControllerApplyFilterApiArg = {
    /** ID of the filter to apply */
    id: string
}
export type FilterControllerApplyFilterDirectlyApiResponse =
    /** status 200 Return the stocks matching the filter criteria */ Stock[]
export type FilterControllerApplyFilterDirectlyApiArg = {
    /** The filter data to apply directly */
    createFilterDto: CreateFilterDto
}
export type BondYieldControllerGetBondYieldApiResponse = unknown
export type BondYieldControllerGetBondYieldApiArg = void
export type BondYieldControllerUpdateBondYieldApiResponse = unknown
export type BondYieldControllerUpdateBondYieldApiArg = void
export type UsersControllerRegisterApiResponse = unknown
export type UsersControllerRegisterApiArg = {
    registerDto: RegisterDto
}
export type UsersControllerLoginApiResponse = unknown
export type UsersControllerLoginApiArg = {
    loginDto: LoginDto
}
export type UsersControllerLogoutApiResponse = unknown
export type UsersControllerLogoutApiArg = void
export type UsersControllerAddToPortfolioApiResponse = unknown
export type UsersControllerAddToPortfolioApiArg = {
    updatePortfolioDto: UpdatePortfolioDto
}
export type UsersControllerRemoveFromPortfolioApiResponse = unknown
export type UsersControllerRemoveFromPortfolioApiArg = {
    updatePortfolioDto: UpdatePortfolioDto
}
export type UsersControllerGetPortfolioListApiResponse = unknown
export type UsersControllerGetPortfolioListApiArg = void
export type UsersControllerAddToConsiderApiResponse = unknown
export type UsersControllerAddToConsiderApiArg = {
    updateConsiderDto: UpdateConsiderDto
}
export type UsersControllerRemoveFromConsiderApiResponse = unknown
export type UsersControllerRemoveFromConsiderApiArg = {
    updateConsiderDto: UpdateConsiderDto
}
export type UsersControllerGetConsiderListApiResponse = unknown
export type UsersControllerGetConsiderListApiArg = void
export type StatusControllerGetStatusApiResponse = unknown
export type StatusControllerGetStatusApiArg = void
export type UpdateStockListDto = {
    /** Update the stock list for a specific stock exchange */
    stockExchange:
        | 'NYSE'
        | 'NASDAQ'
        | 'AMEX'
        | 'EURONEXT'
        | 'TSX'
        | 'LSE'
        | 'SSE'
        | 'HKEX'
        | 'TSE'
        | 'ASX'
        | 'BSE'
        | 'NSE'
}
export type CountriesResponseDto = {
    /** List of unique countries */
    countries: string[]
}
export type SectorsResponseDto = {
    /** List of unique sectors */
    sectors: string[]
}
export type IndustriesResponseDto = {
    /** List of unique industries */
    industries: string[]
}
export type NumberFilterCriteria = {
    /** Numeric property to filter by */
    property:
        | 'pe'
        | 'price'
        | 'marketCap'
        | 'actualValues.capeRatio'
        | 'actualValues.intrinsicValueZeroGrowth'
        | 'actualValues.intrinsicValueAverageGrowth5y'
        | 'actualValues.intrinsicValueLastYearGrowth'
        | 'actualValues.peterlynchValue'
        | 'actualValues.sharesOutstanding'
        | 'actualValues.sharesOutstanding5y'
        | 'actualValues.roe5y'
        | 'actualValues.roic5y'
        | 'actualValues.averageProfitGrowth5y'
        | 'actualValues.averageDividendGrowth5y'
        | 'actualValues.averageNetIncomeGrowth5y'
        | 'actualValues.averageProfitMargin5y'
        | 'actualValues.debtPerShare'
        | 'actualValues.dividendYield5y'
        | 'actualValues.dividendPayoutRatio5y'
        | 'actualValues.buybackYield'
        | 'actualValues.similarCompanies'
        | 'actualValues.averagePESimilarCompanies'
        | 'actualValues.averagePE5y'
        | 'actualValues.freeCashFlow'
        | 'lastAnnualIncomeGrowthMetrics.growthRevenue'
        | 'lastAnnualIncomeGrowthMetrics.growthCostOfRevenue'
        | 'lastAnnualIncomeGrowthMetrics.growthGrossProfit'
        | 'lastAnnualIncomeGrowthMetrics.growthGrossProfitRatio'
        | 'lastAnnualIncomeGrowthMetrics.growthResearchAndDevelopmentExpenses'
        | 'lastAnnualIncomeGrowthMetrics.growthGeneralAndAdministrativeExpenses'
        | 'lastAnnualIncomeGrowthMetrics.growthSellingAndMarketingExpenses'
        | 'lastAnnualIncomeGrowthMetrics.growthOtherExpenses'
        | 'lastAnnualIncomeGrowthMetrics.growthOperatingExpenses'
        | 'lastAnnualIncomeGrowthMetrics.growthCostAndExpenses'
        | 'lastAnnualIncomeGrowthMetrics.growthInterestExpense'
        | 'lastAnnualIncomeGrowthMetrics.growthDepreciationAndAmortization'
        | 'lastAnnualIncomeGrowthMetrics.growthEBITDA'
        | 'lastAnnualIncomeGrowthMetrics.growthEBITDARatio'
        | 'lastAnnualIncomeGrowthMetrics.growthOperatingIncome'
        | 'lastAnnualIncomeGrowthMetrics.growthOperatingIncomeRatio'
        | 'lastAnnualIncomeGrowthMetrics.growthTotalOtherIncomeExpensesNet'
        | 'lastAnnualIncomeGrowthMetrics.growthIncomeBeforeTax'
        | 'lastAnnualIncomeGrowthMetrics.growthIncomeBeforeTaxRatio'
        | 'lastAnnualIncomeGrowthMetrics.growthIncomeTaxExpense'
        | 'lastAnnualIncomeGrowthMetrics.growthNetIncome'
        | 'lastAnnualIncomeGrowthMetrics.growthNetIncomeRatio'
        | 'lastAnnualIncomeGrowthMetrics.growthEPS'
        | 'lastAnnualIncomeGrowthMetrics.growthEPSDiluted'
        | 'lastAnnualIncomeGrowthMetrics.growthWeightedAverageShsOut'
        | 'lastAnnualIncomeGrowthMetrics.growthWeightedAverageShsOutDil'
        | 'lastAnnualKeyMetrics.revenuePerShare'
        | 'lastAnnualKeyMetrics.netIncomePerShare'
        | 'lastAnnualKeyMetrics.operatingCashFlowPerShare'
        | 'lastAnnualKeyMetrics.freeCashFlowPerShare'
        | 'lastAnnualKeyMetrics.cashPerShare'
        | 'lastAnnualKeyMetrics.bookValuePerShare'
        | 'lastAnnualKeyMetrics.tangibleBookValuePerShare'
        | 'lastAnnualKeyMetrics.shareholdersEquityPerShare'
        | 'lastAnnualKeyMetrics.interestDebtPerShare'
        | 'lastAnnualKeyMetrics.enterpriseValue'
        | 'lastAnnualKeyMetrics.priceToBookRatio'
        | 'lastAnnualKeyMetrics.priceToSalesRatio'
        | 'lastAnnualKeyMetrics.pocfRatio'
        | 'lastAnnualKeyMetrics.pfcfRatio'
        | 'lastAnnualKeyMetrics.pbRatio'
        | 'lastAnnualKeyMetrics.ptbRatio'
        | 'lastAnnualKeyMetrics.evToSales'
        | 'lastAnnualKeyMetrics.evToEBITDA'
        | 'lastAnnualKeyMetrics.evToOperatingCashFlow'
        | 'lastAnnualKeyMetrics.evToFreeCashFlow'
        | 'lastAnnualKeyMetrics.earningsYield'
        | 'lastAnnualKeyMetrics.freeCashFlowYield'
        | 'lastAnnualKeyMetrics.debtToEquity'
        | 'lastAnnualKeyMetrics.debtToAssets'
        | 'lastAnnualKeyMetrics.netDebtToEBITDA'
        | 'lastAnnualKeyMetrics.currentRatio'
        | 'lastAnnualKeyMetrics.interestCoverage'
        | 'lastAnnualKeyMetrics.incomeQuality'
        | 'lastAnnualKeyMetrics.dividendYield'
        | 'lastAnnualKeyMetrics.payoutRatio'
        | 'lastAnnualKeyMetrics.sgaRevenue'
        | 'lastAnnualKeyMetrics.rdRevenue'
        | 'lastAnnualKeyMetrics.intangiblesTotalAssets'
        | 'lastAnnualKeyMetrics.capexToOperatingCashFlow'
        | 'lastAnnualKeyMetrics.capexToTotalRevenue'
        | 'lastAnnualKeyMetrics.capexToEBITDA'
        | 'lastAnnualKeyMetrics.stockBasedCompensationToRevenue'
        | 'lastAnnualKeyMetrics.grahamNumber'
        | 'lastAnnualKeyMetrics.roic'
        | 'lastAnnualKeyMetrics.returnOnTangibleAssets'
        | 'lastAnnualKeyMetrics.grahamNetNet'
        | 'lastAnnualKeyMetrics.workingCapital'
        | 'lastAnnualKeyMetrics.tangibleAssetValue'
        | 'lastAnnualKeyMetrics.netCurrentAssetValue'
        | 'lastAnnualKeyMetrics.investedCapital'
        | 'lastAnnualKeyMetrics.averageReceivables'
        | 'lastAnnualKeyMetrics.averagePayables'
        | 'lastAnnualKeyMetrics.averageInventory'
        | 'lastAnnualKeyMetrics.daysSalesOutstanding'
        | 'lastAnnualKeyMetrics.daysPayablesOutstanding'
        | 'lastAnnualKeyMetrics.daysOfInventoryOnHand'
        | 'lastAnnualKeyMetrics.receivablesTurnover'
        | 'lastAnnualKeyMetrics.payablesTurnover'
        | 'lastAnnualKeyMetrics.inventoryTurnover'
        | 'lastAnnualKeyMetrics.roe'
        | 'lastAnnualKeyMetrics.capexPerShare'
        | 'lastAnnualProfitGrowthMetrics.growthDeferredIncomeTax'
        | 'lastAnnualProfitGrowthMetrics.growthStockBasedCompensation'
        | 'lastAnnualProfitGrowthMetrics.growthChangeInWorkingCapital'
        | 'lastAnnualProfitGrowthMetrics.growthAccountsReceivables'
        | 'lastAnnualProfitGrowthMetrics.growthInventory'
        | 'lastAnnualProfitGrowthMetrics.growthAccountsPayables'
        | 'lastAnnualProfitGrowthMetrics.growthOtherWorkingCapital'
        | 'lastAnnualProfitGrowthMetrics.growthOtherNonCashItems'
        | 'lastAnnualProfitGrowthMetrics.growthNetCashProvidedByOperatingActivities'
        | 'lastAnnualProfitGrowthMetrics.growthInvestmentsInPropertyPlantAndEquipment'
        | 'lastAnnualProfitGrowthMetrics.growthAcquisitionsNet'
        | 'lastAnnualProfitGrowthMetrics.growthPurchasesOfInvestments'
        | 'lastAnnualProfitGrowthMetrics.growthSalesMaturitiesOfInvestments'
        | 'lastAnnualProfitGrowthMetrics.growthOtherInvestingActivities'
        | 'lastAnnualProfitGrowthMetrics.growthNetCashUsedForInvestingActivities'
        | 'lastAnnualProfitGrowthMetrics.growthDebtRepayment'
        | 'lastAnnualProfitGrowthMetrics.growthCommonStockIssued'
        | 'lastAnnualProfitGrowthMetrics.growthCommonStockRepurchased'
        | 'lastAnnualProfitGrowthMetrics.growthDividends'
        | 'lastAnnualProfitGrowthMetrics.growthOtherFinancingActivities'
        | 'lastAnnualProfitGrowthMetrics.growthNetCashUsedProvidedByFinancingActivities'
        | 'lastAnnualProfitGrowthMetrics.growthEffectOfForexChangesOnCash'
        | 'lastAnnualProfitGrowthMetrics.growthNetChangeInCash'
        | 'lastAnnualProfitGrowthMetrics.growthCashAtEndOfYear'
        | 'lastAnnualProfitGrowthMetrics.growthCashAtBeginningOfYear'
        | 'lastAnnualProfitGrowthMetrics.growthOperatingCashFlow'
        | 'lastAnnualProfitGrowthMetrics.growthCapitalExpenditure'
        | 'lastAnnualProfitGrowthMetrics.growthFreeCashFlow'
        | 'lastAnnualBalanceSheetStatement.totalAssets'
        | 'lastAnnualBalanceSheetStatement.totalLiabilities'
        | 'lastAnnualBalanceSheetStatement.totalShareholderEquity'
        | 'lastAnnualBalanceSheetStatement.cashAndCashEquivalents'
        | 'lastAnnualBalanceSheetStatement.shortTermInvestments'
        | 'lastAnnualBalanceSheetStatement.receivables'
        | 'lastAnnualBalanceSheetStatement.otherCurrentAssets'
        | 'lastAnnualBalanceSheetStatement.totalCurrentAssets'
        | 'lastAnnualBalanceSheetStatement.propertyPlantAndEquipment'
        | 'lastAnnualBalanceSheetStatement.goodwill'
        | 'lastAnnualBalanceSheetStatement.intangibleAssets'
        | 'lastAnnualBalanceSheetStatement.longTermInvestments'
        | 'lastAnnualBalanceSheetStatement.otherAssets'
        | 'lastAnnualBalanceSheetStatement.totalNonCurrentAssets'
        | 'lastAnnualBalanceSheetStatement.shortTermDebt'
        | 'lastAnnualBalanceSheetStatement.otherCurrentLiabilities'
        | 'lastAnnualBalanceSheetStatement.totalCurrentLiabilities'
        | 'lastAnnualBalanceSheetStatement.longTermDebt'
        | 'lastAnnualBalanceSheetStatement.otherNonCurrentLiabilities'
        | 'lastAnnualBalanceSheetStatement.totalNonCurrentLiabilities'
        | 'lastAnnualCashFlowStatement.netIncome'
        | 'lastAnnualCashFlowStatement.depreciationAndAmortization'
        | 'lastAnnualCashFlowStatement.deferredIncomeTax'
        | 'lastAnnualCashFlowStatement.stockBasedCompensation'
        | 'lastAnnualCashFlowStatement.changeInWorkingCapital'
        | 'lastAnnualCashFlowStatement.accountsReceivable'
        | 'lastAnnualCashFlowStatement.inventory'
        | 'lastAnnualCashFlowStatement.accountsPayable'
        | 'lastAnnualCashFlowStatement.otherWorkingCapital'
        | 'lastAnnualCashFlowStatement.otherNonCashItems'
        | 'lastAnnualCashFlowStatement.netCashProvidedByOperatingActivities'
        | 'lastAnnualCashFlowStatement.investmentsInPropertyPlantAndEquipment'
        | 'lastAnnualCashFlowStatement.acquisitionsNet'
        | 'lastAnnualCashFlowStatement.purchasesOfInvestments'
        | 'lastAnnualCashFlowStatement.salesMaturitiesOfInvestments'
        | 'lastAnnualCashFlowStatement.otherInvestingActivities'
        | 'lastAnnualCashFlowStatement.netCashUsedForInvestingActivities'
        | 'lastAnnualCashFlowStatement.debtRepayment'
        | 'lastAnnualCashFlowStatement.commonStockIssued'
        | 'lastAnnualCashFlowStatement.commonStockRepurchased'
        | 'lastAnnualCashFlowStatement.dividendsPaid'
        | 'lastAnnualCashFlowStatement.otherFinancingActivities'
        | 'lastAnnualCashFlowStatement.netCashProvidedByFinancingActivities'
        | 'lastAnnualCashFlowStatement.effectOfForexChangesOnCash'
        | 'lastAnnualCashFlowStatement.netChangeInCash'
        | 'lastAnnualCashFlowStatement.cashAtEndOfYear'
        | 'lastAnnualCashFlowStatement.cashAtBeginningOfYear'
    /** Condition to apply for the numeric property */
    condition: 'greater_than' | 'less_than'
    /** Value to compare against the property with the specified condition */
    value: number
}
export type StringFilterCriteria = {
    /** String property to filter by */
    property: 'symbol' | 'name' | 'exchange'
    /** Condition to apply for the string property */
    condition: 'equal' | 'not_equal'
    /** String value to compare against the property */
    value: string
}
export type RatioCriteria = {
    /** Numerator property for the ratio */
    numerator:
        | 'pe'
        | 'price'
        | 'marketCap'
        | 'actualValues.capeRatio'
        | 'actualValues.intrinsicValueZeroGrowth'
        | 'actualValues.intrinsicValueAverageGrowth5y'
        | 'actualValues.intrinsicValueLastYearGrowth'
        | 'actualValues.peterlynchValue'
        | 'actualValues.sharesOutstanding'
        | 'actualValues.sharesOutstanding5y'
        | 'actualValues.roe5y'
        | 'actualValues.roic5y'
        | 'actualValues.averageProfitGrowth5y'
        | 'actualValues.averageDividendGrowth5y'
        | 'actualValues.averageNetIncomeGrowth5y'
        | 'actualValues.averageProfitMargin5y'
        | 'actualValues.debtPerShare'
        | 'actualValues.dividendYield5y'
        | 'actualValues.dividendPayoutRatio5y'
        | 'actualValues.buybackYield'
        | 'actualValues.similarCompanies'
        | 'actualValues.averagePESimilarCompanies'
        | 'actualValues.averagePE5y'
        | 'actualValues.freeCashFlow'
        | 'lastAnnualIncomeGrowthMetrics.growthRevenue'
        | 'lastAnnualIncomeGrowthMetrics.growthCostOfRevenue'
        | 'lastAnnualIncomeGrowthMetrics.growthGrossProfit'
        | 'lastAnnualIncomeGrowthMetrics.growthGrossProfitRatio'
        | 'lastAnnualIncomeGrowthMetrics.growthResearchAndDevelopmentExpenses'
        | 'lastAnnualIncomeGrowthMetrics.growthGeneralAndAdministrativeExpenses'
        | 'lastAnnualIncomeGrowthMetrics.growthSellingAndMarketingExpenses'
        | 'lastAnnualIncomeGrowthMetrics.growthOtherExpenses'
        | 'lastAnnualIncomeGrowthMetrics.growthOperatingExpenses'
        | 'lastAnnualIncomeGrowthMetrics.growthCostAndExpenses'
        | 'lastAnnualIncomeGrowthMetrics.growthInterestExpense'
        | 'lastAnnualIncomeGrowthMetrics.growthDepreciationAndAmortization'
        | 'lastAnnualIncomeGrowthMetrics.growthEBITDA'
        | 'lastAnnualIncomeGrowthMetrics.growthEBITDARatio'
        | 'lastAnnualIncomeGrowthMetrics.growthOperatingIncome'
        | 'lastAnnualIncomeGrowthMetrics.growthOperatingIncomeRatio'
        | 'lastAnnualIncomeGrowthMetrics.growthTotalOtherIncomeExpensesNet'
        | 'lastAnnualIncomeGrowthMetrics.growthIncomeBeforeTax'
        | 'lastAnnualIncomeGrowthMetrics.growthIncomeBeforeTaxRatio'
        | 'lastAnnualIncomeGrowthMetrics.growthIncomeTaxExpense'
        | 'lastAnnualIncomeGrowthMetrics.growthNetIncome'
        | 'lastAnnualIncomeGrowthMetrics.growthNetIncomeRatio'
        | 'lastAnnualIncomeGrowthMetrics.growthEPS'
        | 'lastAnnualIncomeGrowthMetrics.growthEPSDiluted'
        | 'lastAnnualIncomeGrowthMetrics.growthWeightedAverageShsOut'
        | 'lastAnnualIncomeGrowthMetrics.growthWeightedAverageShsOutDil'
        | 'lastAnnualKeyMetrics.revenuePerShare'
        | 'lastAnnualKeyMetrics.netIncomePerShare'
        | 'lastAnnualKeyMetrics.operatingCashFlowPerShare'
        | 'lastAnnualKeyMetrics.freeCashFlowPerShare'
        | 'lastAnnualKeyMetrics.cashPerShare'
        | 'lastAnnualKeyMetrics.bookValuePerShare'
        | 'lastAnnualKeyMetrics.tangibleBookValuePerShare'
        | 'lastAnnualKeyMetrics.shareholdersEquityPerShare'
        | 'lastAnnualKeyMetrics.interestDebtPerShare'
        | 'lastAnnualKeyMetrics.enterpriseValue'
        | 'lastAnnualKeyMetrics.priceToBookRatio'
        | 'lastAnnualKeyMetrics.priceToSalesRatio'
        | 'lastAnnualKeyMetrics.pocfRatio'
        | 'lastAnnualKeyMetrics.pfcfRatio'
        | 'lastAnnualKeyMetrics.pbRatio'
        | 'lastAnnualKeyMetrics.ptbRatio'
        | 'lastAnnualKeyMetrics.evToSales'
        | 'lastAnnualKeyMetrics.evToEBITDA'
        | 'lastAnnualKeyMetrics.evToOperatingCashFlow'
        | 'lastAnnualKeyMetrics.evToFreeCashFlow'
        | 'lastAnnualKeyMetrics.earningsYield'
        | 'lastAnnualKeyMetrics.freeCashFlowYield'
        | 'lastAnnualKeyMetrics.debtToEquity'
        | 'lastAnnualKeyMetrics.debtToAssets'
        | 'lastAnnualKeyMetrics.netDebtToEBITDA'
        | 'lastAnnualKeyMetrics.currentRatio'
        | 'lastAnnualKeyMetrics.interestCoverage'
        | 'lastAnnualKeyMetrics.incomeQuality'
        | 'lastAnnualKeyMetrics.dividendYield'
        | 'lastAnnualKeyMetrics.payoutRatio'
        | 'lastAnnualKeyMetrics.sgaRevenue'
        | 'lastAnnualKeyMetrics.rdRevenue'
        | 'lastAnnualKeyMetrics.intangiblesTotalAssets'
        | 'lastAnnualKeyMetrics.capexToOperatingCashFlow'
        | 'lastAnnualKeyMetrics.capexToTotalRevenue'
        | 'lastAnnualKeyMetrics.capexToEBITDA'
        | 'lastAnnualKeyMetrics.stockBasedCompensationToRevenue'
        | 'lastAnnualKeyMetrics.grahamNumber'
        | 'lastAnnualKeyMetrics.roic'
        | 'lastAnnualKeyMetrics.returnOnTangibleAssets'
        | 'lastAnnualKeyMetrics.grahamNetNet'
        | 'lastAnnualKeyMetrics.workingCapital'
        | 'lastAnnualKeyMetrics.tangibleAssetValue'
        | 'lastAnnualKeyMetrics.netCurrentAssetValue'
        | 'lastAnnualKeyMetrics.investedCapital'
        | 'lastAnnualKeyMetrics.averageReceivables'
        | 'lastAnnualKeyMetrics.averagePayables'
        | 'lastAnnualKeyMetrics.averageInventory'
        | 'lastAnnualKeyMetrics.daysSalesOutstanding'
        | 'lastAnnualKeyMetrics.daysPayablesOutstanding'
        | 'lastAnnualKeyMetrics.daysOfInventoryOnHand'
        | 'lastAnnualKeyMetrics.receivablesTurnover'
        | 'lastAnnualKeyMetrics.payablesTurnover'
        | 'lastAnnualKeyMetrics.inventoryTurnover'
        | 'lastAnnualKeyMetrics.roe'
        | 'lastAnnualKeyMetrics.capexPerShare'
        | 'lastAnnualProfitGrowthMetrics.growthDeferredIncomeTax'
        | 'lastAnnualProfitGrowthMetrics.growthStockBasedCompensation'
        | 'lastAnnualProfitGrowthMetrics.growthChangeInWorkingCapital'
        | 'lastAnnualProfitGrowthMetrics.growthAccountsReceivables'
        | 'lastAnnualProfitGrowthMetrics.growthInventory'
        | 'lastAnnualProfitGrowthMetrics.growthAccountsPayables'
        | 'lastAnnualProfitGrowthMetrics.growthOtherWorkingCapital'
        | 'lastAnnualProfitGrowthMetrics.growthOtherNonCashItems'
        | 'lastAnnualProfitGrowthMetrics.growthNetCashProvidedByOperatingActivities'
        | 'lastAnnualProfitGrowthMetrics.growthInvestmentsInPropertyPlantAndEquipment'
        | 'lastAnnualProfitGrowthMetrics.growthAcquisitionsNet'
        | 'lastAnnualProfitGrowthMetrics.growthPurchasesOfInvestments'
        | 'lastAnnualProfitGrowthMetrics.growthSalesMaturitiesOfInvestments'
        | 'lastAnnualProfitGrowthMetrics.growthOtherInvestingActivities'
        | 'lastAnnualProfitGrowthMetrics.growthNetCashUsedForInvestingActivities'
        | 'lastAnnualProfitGrowthMetrics.growthDebtRepayment'
        | 'lastAnnualProfitGrowthMetrics.growthCommonStockIssued'
        | 'lastAnnualProfitGrowthMetrics.growthCommonStockRepurchased'
        | 'lastAnnualProfitGrowthMetrics.growthDividends'
        | 'lastAnnualProfitGrowthMetrics.growthOtherFinancingActivities'
        | 'lastAnnualProfitGrowthMetrics.growthNetCashUsedProvidedByFinancingActivities'
        | 'lastAnnualProfitGrowthMetrics.growthEffectOfForexChangesOnCash'
        | 'lastAnnualProfitGrowthMetrics.growthNetChangeInCash'
        | 'lastAnnualProfitGrowthMetrics.growthCashAtEndOfYear'
        | 'lastAnnualProfitGrowthMetrics.growthCashAtBeginningOfYear'
        | 'lastAnnualProfitGrowthMetrics.growthOperatingCashFlow'
        | 'lastAnnualProfitGrowthMetrics.growthCapitalExpenditure'
        | 'lastAnnualProfitGrowthMetrics.growthFreeCashFlow'
        | 'lastAnnualBalanceSheetStatement.totalAssets'
        | 'lastAnnualBalanceSheetStatement.totalLiabilities'
        | 'lastAnnualBalanceSheetStatement.totalShareholderEquity'
        | 'lastAnnualBalanceSheetStatement.cashAndCashEquivalents'
        | 'lastAnnualBalanceSheetStatement.shortTermInvestments'
        | 'lastAnnualBalanceSheetStatement.receivables'
        | 'lastAnnualBalanceSheetStatement.otherCurrentAssets'
        | 'lastAnnualBalanceSheetStatement.totalCurrentAssets'
        | 'lastAnnualBalanceSheetStatement.propertyPlantAndEquipment'
        | 'lastAnnualBalanceSheetStatement.goodwill'
        | 'lastAnnualBalanceSheetStatement.intangibleAssets'
        | 'lastAnnualBalanceSheetStatement.longTermInvestments'
        | 'lastAnnualBalanceSheetStatement.otherAssets'
        | 'lastAnnualBalanceSheetStatement.totalNonCurrentAssets'
        | 'lastAnnualBalanceSheetStatement.shortTermDebt'
        | 'lastAnnualBalanceSheetStatement.otherCurrentLiabilities'
        | 'lastAnnualBalanceSheetStatement.totalCurrentLiabilities'
        | 'lastAnnualBalanceSheetStatement.longTermDebt'
        | 'lastAnnualBalanceSheetStatement.otherNonCurrentLiabilities'
        | 'lastAnnualBalanceSheetStatement.totalNonCurrentLiabilities'
        | 'lastAnnualCashFlowStatement.netIncome'
        | 'lastAnnualCashFlowStatement.depreciationAndAmortization'
        | 'lastAnnualCashFlowStatement.deferredIncomeTax'
        | 'lastAnnualCashFlowStatement.stockBasedCompensation'
        | 'lastAnnualCashFlowStatement.changeInWorkingCapital'
        | 'lastAnnualCashFlowStatement.accountsReceivable'
        | 'lastAnnualCashFlowStatement.inventory'
        | 'lastAnnualCashFlowStatement.accountsPayable'
        | 'lastAnnualCashFlowStatement.otherWorkingCapital'
        | 'lastAnnualCashFlowStatement.otherNonCashItems'
        | 'lastAnnualCashFlowStatement.netCashProvidedByOperatingActivities'
        | 'lastAnnualCashFlowStatement.investmentsInPropertyPlantAndEquipment'
        | 'lastAnnualCashFlowStatement.acquisitionsNet'
        | 'lastAnnualCashFlowStatement.purchasesOfInvestments'
        | 'lastAnnualCashFlowStatement.salesMaturitiesOfInvestments'
        | 'lastAnnualCashFlowStatement.otherInvestingActivities'
        | 'lastAnnualCashFlowStatement.netCashUsedForInvestingActivities'
        | 'lastAnnualCashFlowStatement.debtRepayment'
        | 'lastAnnualCashFlowStatement.commonStockIssued'
        | 'lastAnnualCashFlowStatement.commonStockRepurchased'
        | 'lastAnnualCashFlowStatement.dividendsPaid'
        | 'lastAnnualCashFlowStatement.otherFinancingActivities'
        | 'lastAnnualCashFlowStatement.netCashProvidedByFinancingActivities'
        | 'lastAnnualCashFlowStatement.effectOfForexChangesOnCash'
        | 'lastAnnualCashFlowStatement.netChangeInCash'
        | 'lastAnnualCashFlowStatement.cashAtEndOfYear'
        | 'lastAnnualCashFlowStatement.cashAtBeginningOfYear'
    /** Denominator property for the ratio */
    denominator:
        | 'pe'
        | 'price'
        | 'marketCap'
        | 'actualValues.capeRatio'
        | 'actualValues.intrinsicValueZeroGrowth'
        | 'actualValues.intrinsicValueAverageGrowth5y'
        | 'actualValues.intrinsicValueLastYearGrowth'
        | 'actualValues.peterlynchValue'
        | 'actualValues.sharesOutstanding'
        | 'actualValues.sharesOutstanding5y'
        | 'actualValues.roe5y'
        | 'actualValues.roic5y'
        | 'actualValues.averageProfitGrowth5y'
        | 'actualValues.averageDividendGrowth5y'
        | 'actualValues.averageNetIncomeGrowth5y'
        | 'actualValues.averageProfitMargin5y'
        | 'actualValues.debtPerShare'
        | 'actualValues.dividendYield5y'
        | 'actualValues.dividendPayoutRatio5y'
        | 'actualValues.buybackYield'
        | 'actualValues.similarCompanies'
        | 'actualValues.averagePESimilarCompanies'
        | 'actualValues.averagePE5y'
        | 'actualValues.freeCashFlow'
        | 'lastAnnualIncomeGrowthMetrics.growthRevenue'
        | 'lastAnnualIncomeGrowthMetrics.growthCostOfRevenue'
        | 'lastAnnualIncomeGrowthMetrics.growthGrossProfit'
        | 'lastAnnualIncomeGrowthMetrics.growthGrossProfitRatio'
        | 'lastAnnualIncomeGrowthMetrics.growthResearchAndDevelopmentExpenses'
        | 'lastAnnualIncomeGrowthMetrics.growthGeneralAndAdministrativeExpenses'
        | 'lastAnnualIncomeGrowthMetrics.growthSellingAndMarketingExpenses'
        | 'lastAnnualIncomeGrowthMetrics.growthOtherExpenses'
        | 'lastAnnualIncomeGrowthMetrics.growthOperatingExpenses'
        | 'lastAnnualIncomeGrowthMetrics.growthCostAndExpenses'
        | 'lastAnnualIncomeGrowthMetrics.growthInterestExpense'
        | 'lastAnnualIncomeGrowthMetrics.growthDepreciationAndAmortization'
        | 'lastAnnualIncomeGrowthMetrics.growthEBITDA'
        | 'lastAnnualIncomeGrowthMetrics.growthEBITDARatio'
        | 'lastAnnualIncomeGrowthMetrics.growthOperatingIncome'
        | 'lastAnnualIncomeGrowthMetrics.growthOperatingIncomeRatio'
        | 'lastAnnualIncomeGrowthMetrics.growthTotalOtherIncomeExpensesNet'
        | 'lastAnnualIncomeGrowthMetrics.growthIncomeBeforeTax'
        | 'lastAnnualIncomeGrowthMetrics.growthIncomeBeforeTaxRatio'
        | 'lastAnnualIncomeGrowthMetrics.growthIncomeTaxExpense'
        | 'lastAnnualIncomeGrowthMetrics.growthNetIncome'
        | 'lastAnnualIncomeGrowthMetrics.growthNetIncomeRatio'
        | 'lastAnnualIncomeGrowthMetrics.growthEPS'
        | 'lastAnnualIncomeGrowthMetrics.growthEPSDiluted'
        | 'lastAnnualIncomeGrowthMetrics.growthWeightedAverageShsOut'
        | 'lastAnnualIncomeGrowthMetrics.growthWeightedAverageShsOutDil'
        | 'lastAnnualKeyMetrics.revenuePerShare'
        | 'lastAnnualKeyMetrics.netIncomePerShare'
        | 'lastAnnualKeyMetrics.operatingCashFlowPerShare'
        | 'lastAnnualKeyMetrics.freeCashFlowPerShare'
        | 'lastAnnualKeyMetrics.cashPerShare'
        | 'lastAnnualKeyMetrics.bookValuePerShare'
        | 'lastAnnualKeyMetrics.tangibleBookValuePerShare'
        | 'lastAnnualKeyMetrics.shareholdersEquityPerShare'
        | 'lastAnnualKeyMetrics.interestDebtPerShare'
        | 'lastAnnualKeyMetrics.enterpriseValue'
        | 'lastAnnualKeyMetrics.priceToBookRatio'
        | 'lastAnnualKeyMetrics.priceToSalesRatio'
        | 'lastAnnualKeyMetrics.pocfRatio'
        | 'lastAnnualKeyMetrics.pfcfRatio'
        | 'lastAnnualKeyMetrics.pbRatio'
        | 'lastAnnualKeyMetrics.ptbRatio'
        | 'lastAnnualKeyMetrics.evToSales'
        | 'lastAnnualKeyMetrics.evToEBITDA'
        | 'lastAnnualKeyMetrics.evToOperatingCashFlow'
        | 'lastAnnualKeyMetrics.evToFreeCashFlow'
        | 'lastAnnualKeyMetrics.earningsYield'
        | 'lastAnnualKeyMetrics.freeCashFlowYield'
        | 'lastAnnualKeyMetrics.debtToEquity'
        | 'lastAnnualKeyMetrics.debtToAssets'
        | 'lastAnnualKeyMetrics.netDebtToEBITDA'
        | 'lastAnnualKeyMetrics.currentRatio'
        | 'lastAnnualKeyMetrics.interestCoverage'
        | 'lastAnnualKeyMetrics.incomeQuality'
        | 'lastAnnualKeyMetrics.dividendYield'
        | 'lastAnnualKeyMetrics.payoutRatio'
        | 'lastAnnualKeyMetrics.sgaRevenue'
        | 'lastAnnualKeyMetrics.rdRevenue'
        | 'lastAnnualKeyMetrics.intangiblesTotalAssets'
        | 'lastAnnualKeyMetrics.capexToOperatingCashFlow'
        | 'lastAnnualKeyMetrics.capexToTotalRevenue'
        | 'lastAnnualKeyMetrics.capexToEBITDA'
        | 'lastAnnualKeyMetrics.stockBasedCompensationToRevenue'
        | 'lastAnnualKeyMetrics.grahamNumber'
        | 'lastAnnualKeyMetrics.roic'
        | 'lastAnnualKeyMetrics.returnOnTangibleAssets'
        | 'lastAnnualKeyMetrics.grahamNetNet'
        | 'lastAnnualKeyMetrics.workingCapital'
        | 'lastAnnualKeyMetrics.tangibleAssetValue'
        | 'lastAnnualKeyMetrics.netCurrentAssetValue'
        | 'lastAnnualKeyMetrics.investedCapital'
        | 'lastAnnualKeyMetrics.averageReceivables'
        | 'lastAnnualKeyMetrics.averagePayables'
        | 'lastAnnualKeyMetrics.averageInventory'
        | 'lastAnnualKeyMetrics.daysSalesOutstanding'
        | 'lastAnnualKeyMetrics.daysPayablesOutstanding'
        | 'lastAnnualKeyMetrics.daysOfInventoryOnHand'
        | 'lastAnnualKeyMetrics.receivablesTurnover'
        | 'lastAnnualKeyMetrics.payablesTurnover'
        | 'lastAnnualKeyMetrics.inventoryTurnover'
        | 'lastAnnualKeyMetrics.roe'
        | 'lastAnnualKeyMetrics.capexPerShare'
        | 'lastAnnualProfitGrowthMetrics.growthDeferredIncomeTax'
        | 'lastAnnualProfitGrowthMetrics.growthStockBasedCompensation'
        | 'lastAnnualProfitGrowthMetrics.growthChangeInWorkingCapital'
        | 'lastAnnualProfitGrowthMetrics.growthAccountsReceivables'
        | 'lastAnnualProfitGrowthMetrics.growthInventory'
        | 'lastAnnualProfitGrowthMetrics.growthAccountsPayables'
        | 'lastAnnualProfitGrowthMetrics.growthOtherWorkingCapital'
        | 'lastAnnualProfitGrowthMetrics.growthOtherNonCashItems'
        | 'lastAnnualProfitGrowthMetrics.growthNetCashProvidedByOperatingActivities'
        | 'lastAnnualProfitGrowthMetrics.growthInvestmentsInPropertyPlantAndEquipment'
        | 'lastAnnualProfitGrowthMetrics.growthAcquisitionsNet'
        | 'lastAnnualProfitGrowthMetrics.growthPurchasesOfInvestments'
        | 'lastAnnualProfitGrowthMetrics.growthSalesMaturitiesOfInvestments'
        | 'lastAnnualProfitGrowthMetrics.growthOtherInvestingActivities'
        | 'lastAnnualProfitGrowthMetrics.growthNetCashUsedForInvestingActivities'
        | 'lastAnnualProfitGrowthMetrics.growthDebtRepayment'
        | 'lastAnnualProfitGrowthMetrics.growthCommonStockIssued'
        | 'lastAnnualProfitGrowthMetrics.growthCommonStockRepurchased'
        | 'lastAnnualProfitGrowthMetrics.growthDividends'
        | 'lastAnnualProfitGrowthMetrics.growthOtherFinancingActivities'
        | 'lastAnnualProfitGrowthMetrics.growthNetCashUsedProvidedByFinancingActivities'
        | 'lastAnnualProfitGrowthMetrics.growthEffectOfForexChangesOnCash'
        | 'lastAnnualProfitGrowthMetrics.growthNetChangeInCash'
        | 'lastAnnualProfitGrowthMetrics.growthCashAtEndOfYear'
        | 'lastAnnualProfitGrowthMetrics.growthCashAtBeginningOfYear'
        | 'lastAnnualProfitGrowthMetrics.growthOperatingCashFlow'
        | 'lastAnnualProfitGrowthMetrics.growthCapitalExpenditure'
        | 'lastAnnualProfitGrowthMetrics.growthFreeCashFlow'
        | 'lastAnnualBalanceSheetStatement.totalAssets'
        | 'lastAnnualBalanceSheetStatement.totalLiabilities'
        | 'lastAnnualBalanceSheetStatement.totalShareholderEquity'
        | 'lastAnnualBalanceSheetStatement.cashAndCashEquivalents'
        | 'lastAnnualBalanceSheetStatement.shortTermInvestments'
        | 'lastAnnualBalanceSheetStatement.receivables'
        | 'lastAnnualBalanceSheetStatement.otherCurrentAssets'
        | 'lastAnnualBalanceSheetStatement.totalCurrentAssets'
        | 'lastAnnualBalanceSheetStatement.propertyPlantAndEquipment'
        | 'lastAnnualBalanceSheetStatement.goodwill'
        | 'lastAnnualBalanceSheetStatement.intangibleAssets'
        | 'lastAnnualBalanceSheetStatement.longTermInvestments'
        | 'lastAnnualBalanceSheetStatement.otherAssets'
        | 'lastAnnualBalanceSheetStatement.totalNonCurrentAssets'
        | 'lastAnnualBalanceSheetStatement.shortTermDebt'
        | 'lastAnnualBalanceSheetStatement.otherCurrentLiabilities'
        | 'lastAnnualBalanceSheetStatement.totalCurrentLiabilities'
        | 'lastAnnualBalanceSheetStatement.longTermDebt'
        | 'lastAnnualBalanceSheetStatement.otherNonCurrentLiabilities'
        | 'lastAnnualBalanceSheetStatement.totalNonCurrentLiabilities'
        | 'lastAnnualCashFlowStatement.netIncome'
        | 'lastAnnualCashFlowStatement.depreciationAndAmortization'
        | 'lastAnnualCashFlowStatement.deferredIncomeTax'
        | 'lastAnnualCashFlowStatement.stockBasedCompensation'
        | 'lastAnnualCashFlowStatement.changeInWorkingCapital'
        | 'lastAnnualCashFlowStatement.accountsReceivable'
        | 'lastAnnualCashFlowStatement.inventory'
        | 'lastAnnualCashFlowStatement.accountsPayable'
        | 'lastAnnualCashFlowStatement.otherWorkingCapital'
        | 'lastAnnualCashFlowStatement.otherNonCashItems'
        | 'lastAnnualCashFlowStatement.netCashProvidedByOperatingActivities'
        | 'lastAnnualCashFlowStatement.investmentsInPropertyPlantAndEquipment'
        | 'lastAnnualCashFlowStatement.acquisitionsNet'
        | 'lastAnnualCashFlowStatement.purchasesOfInvestments'
        | 'lastAnnualCashFlowStatement.salesMaturitiesOfInvestments'
        | 'lastAnnualCashFlowStatement.otherInvestingActivities'
        | 'lastAnnualCashFlowStatement.netCashUsedForInvestingActivities'
        | 'lastAnnualCashFlowStatement.debtRepayment'
        | 'lastAnnualCashFlowStatement.commonStockIssued'
        | 'lastAnnualCashFlowStatement.commonStockRepurchased'
        | 'lastAnnualCashFlowStatement.dividendsPaid'
        | 'lastAnnualCashFlowStatement.otherFinancingActivities'
        | 'lastAnnualCashFlowStatement.netCashProvidedByFinancingActivities'
        | 'lastAnnualCashFlowStatement.effectOfForexChangesOnCash'
        | 'lastAnnualCashFlowStatement.netChangeInCash'
        | 'lastAnnualCashFlowStatement.cashAtEndOfYear'
        | 'lastAnnualCashFlowStatement.cashAtBeginningOfYear'
    /** Condition to apply for the ratio */
    condition: 'greater_than' | 'less_than'
    /** Value to compare the calculated ratio against */
    value: number
}
export type MultiCriteria = {
    /** Type of multi-criteria filter */
    type: 'country' | 'sector' | 'industry'
    /** Values for the multi-criteria filter */
    values: string[]
}
export type ObjectId = {}
export type Filter = {
    /** Name of the filter */
    name: string
    /** Criteria for filtering with number properties */
    numberCriteria: NumberFilterCriteria[]
    /** Criteria for filtering with string properties */
    stringCriteria: StringFilterCriteria[]
    /** Criteria for filtering based on ratios of number properties */
    ratioCriteria: RatioCriteria[]
    /** Criteria for filtering with multi-select properties */
    multiCriteria: MultiCriteria[]
    /** MongoDB User ID that owns the filter */
    user: ObjectId
}
export type FilterNumberProperty =
    | 'pe'
    | 'price'
    | 'marketCap'
    | 'actualValues.capeRatio'
    | 'actualValues.intrinsicValueZeroGrowth'
    | 'actualValues.intrinsicValueAverageGrowth5y'
    | 'actualValues.intrinsicValueLastYearGrowth'
    | 'actualValues.peterlynchValue'
    | 'actualValues.sharesOutstanding'
    | 'actualValues.sharesOutstanding5y'
    | 'actualValues.roe5y'
    | 'actualValues.roic5y'
    | 'actualValues.averageProfitGrowth5y'
    | 'actualValues.averageDividendGrowth5y'
    | 'actualValues.averageNetIncomeGrowth5y'
    | 'actualValues.averageProfitMargin5y'
    | 'actualValues.debtPerShare'
    | 'actualValues.dividendYield5y'
    | 'actualValues.dividendPayoutRatio5y'
    | 'actualValues.buybackYield'
    | 'actualValues.similarCompanies'
    | 'actualValues.averagePESimilarCompanies'
    | 'actualValues.averagePE5y'
    | 'actualValues.freeCashFlow'
    | 'lastAnnualIncomeGrowthMetrics.growthRevenue'
    | 'lastAnnualIncomeGrowthMetrics.growthCostOfRevenue'
    | 'lastAnnualIncomeGrowthMetrics.growthGrossProfit'
    | 'lastAnnualIncomeGrowthMetrics.growthGrossProfitRatio'
    | 'lastAnnualIncomeGrowthMetrics.growthResearchAndDevelopmentExpenses'
    | 'lastAnnualIncomeGrowthMetrics.growthGeneralAndAdministrativeExpenses'
    | 'lastAnnualIncomeGrowthMetrics.growthSellingAndMarketingExpenses'
    | 'lastAnnualIncomeGrowthMetrics.growthOtherExpenses'
    | 'lastAnnualIncomeGrowthMetrics.growthOperatingExpenses'
    | 'lastAnnualIncomeGrowthMetrics.growthCostAndExpenses'
    | 'lastAnnualIncomeGrowthMetrics.growthInterestExpense'
    | 'lastAnnualIncomeGrowthMetrics.growthDepreciationAndAmortization'
    | 'lastAnnualIncomeGrowthMetrics.growthEBITDA'
    | 'lastAnnualIncomeGrowthMetrics.growthEBITDARatio'
    | 'lastAnnualIncomeGrowthMetrics.growthOperatingIncome'
    | 'lastAnnualIncomeGrowthMetrics.growthOperatingIncomeRatio'
    | 'lastAnnualIncomeGrowthMetrics.growthTotalOtherIncomeExpensesNet'
    | 'lastAnnualIncomeGrowthMetrics.growthIncomeBeforeTax'
    | 'lastAnnualIncomeGrowthMetrics.growthIncomeBeforeTaxRatio'
    | 'lastAnnualIncomeGrowthMetrics.growthIncomeTaxExpense'
    | 'lastAnnualIncomeGrowthMetrics.growthNetIncome'
    | 'lastAnnualIncomeGrowthMetrics.growthNetIncomeRatio'
    | 'lastAnnualIncomeGrowthMetrics.growthEPS'
    | 'lastAnnualIncomeGrowthMetrics.growthEPSDiluted'
    | 'lastAnnualIncomeGrowthMetrics.growthWeightedAverageShsOut'
    | 'lastAnnualIncomeGrowthMetrics.growthWeightedAverageShsOutDil'
    | 'lastAnnualKeyMetrics.revenuePerShare'
    | 'lastAnnualKeyMetrics.netIncomePerShare'
    | 'lastAnnualKeyMetrics.operatingCashFlowPerShare'
    | 'lastAnnualKeyMetrics.freeCashFlowPerShare'
    | 'lastAnnualKeyMetrics.cashPerShare'
    | 'lastAnnualKeyMetrics.bookValuePerShare'
    | 'lastAnnualKeyMetrics.tangibleBookValuePerShare'
    | 'lastAnnualKeyMetrics.shareholdersEquityPerShare'
    | 'lastAnnualKeyMetrics.interestDebtPerShare'
    | 'lastAnnualKeyMetrics.enterpriseValue'
    | 'lastAnnualKeyMetrics.priceToBookRatio'
    | 'lastAnnualKeyMetrics.priceToSalesRatio'
    | 'lastAnnualKeyMetrics.pocfRatio'
    | 'lastAnnualKeyMetrics.pfcfRatio'
    | 'lastAnnualKeyMetrics.pbRatio'
    | 'lastAnnualKeyMetrics.ptbRatio'
    | 'lastAnnualKeyMetrics.evToSales'
    | 'lastAnnualKeyMetrics.evToEBITDA'
    | 'lastAnnualKeyMetrics.evToOperatingCashFlow'
    | 'lastAnnualKeyMetrics.evToFreeCashFlow'
    | 'lastAnnualKeyMetrics.earningsYield'
    | 'lastAnnualKeyMetrics.freeCashFlowYield'
    | 'lastAnnualKeyMetrics.debtToEquity'
    | 'lastAnnualKeyMetrics.debtToAssets'
    | 'lastAnnualKeyMetrics.netDebtToEBITDA'
    | 'lastAnnualKeyMetrics.currentRatio'
    | 'lastAnnualKeyMetrics.interestCoverage'
    | 'lastAnnualKeyMetrics.incomeQuality'
    | 'lastAnnualKeyMetrics.dividendYield'
    | 'lastAnnualKeyMetrics.payoutRatio'
    | 'lastAnnualKeyMetrics.sgaRevenue'
    | 'lastAnnualKeyMetrics.rdRevenue'
    | 'lastAnnualKeyMetrics.intangiblesTotalAssets'
    | 'lastAnnualKeyMetrics.capexToOperatingCashFlow'
    | 'lastAnnualKeyMetrics.capexToTotalRevenue'
    | 'lastAnnualKeyMetrics.capexToEBITDA'
    | 'lastAnnualKeyMetrics.stockBasedCompensationToRevenue'
    | 'lastAnnualKeyMetrics.grahamNumber'
    | 'lastAnnualKeyMetrics.roic'
    | 'lastAnnualKeyMetrics.returnOnTangibleAssets'
    | 'lastAnnualKeyMetrics.grahamNetNet'
    | 'lastAnnualKeyMetrics.workingCapital'
    | 'lastAnnualKeyMetrics.tangibleAssetValue'
    | 'lastAnnualKeyMetrics.netCurrentAssetValue'
    | 'lastAnnualKeyMetrics.investedCapital'
    | 'lastAnnualKeyMetrics.averageReceivables'
    | 'lastAnnualKeyMetrics.averagePayables'
    | 'lastAnnualKeyMetrics.averageInventory'
    | 'lastAnnualKeyMetrics.daysSalesOutstanding'
    | 'lastAnnualKeyMetrics.daysPayablesOutstanding'
    | 'lastAnnualKeyMetrics.daysOfInventoryOnHand'
    | 'lastAnnualKeyMetrics.receivablesTurnover'
    | 'lastAnnualKeyMetrics.payablesTurnover'
    | 'lastAnnualKeyMetrics.inventoryTurnover'
    | 'lastAnnualKeyMetrics.roe'
    | 'lastAnnualKeyMetrics.capexPerShare'
    | 'lastAnnualProfitGrowthMetrics.growthDeferredIncomeTax'
    | 'lastAnnualProfitGrowthMetrics.growthStockBasedCompensation'
    | 'lastAnnualProfitGrowthMetrics.growthChangeInWorkingCapital'
    | 'lastAnnualProfitGrowthMetrics.growthAccountsReceivables'
    | 'lastAnnualProfitGrowthMetrics.growthInventory'
    | 'lastAnnualProfitGrowthMetrics.growthAccountsPayables'
    | 'lastAnnualProfitGrowthMetrics.growthOtherWorkingCapital'
    | 'lastAnnualProfitGrowthMetrics.growthOtherNonCashItems'
    | 'lastAnnualProfitGrowthMetrics.growthNetCashProvidedByOperatingActivities'
    | 'lastAnnualProfitGrowthMetrics.growthInvestmentsInPropertyPlantAndEquipment'
    | 'lastAnnualProfitGrowthMetrics.growthAcquisitionsNet'
    | 'lastAnnualProfitGrowthMetrics.growthPurchasesOfInvestments'
    | 'lastAnnualProfitGrowthMetrics.growthSalesMaturitiesOfInvestments'
    | 'lastAnnualProfitGrowthMetrics.growthOtherInvestingActivities'
    | 'lastAnnualProfitGrowthMetrics.growthNetCashUsedForInvestingActivities'
    | 'lastAnnualProfitGrowthMetrics.growthDebtRepayment'
    | 'lastAnnualProfitGrowthMetrics.growthCommonStockIssued'
    | 'lastAnnualProfitGrowthMetrics.growthCommonStockRepurchased'
    | 'lastAnnualProfitGrowthMetrics.growthDividends'
    | 'lastAnnualProfitGrowthMetrics.growthOtherFinancingActivities'
    | 'lastAnnualProfitGrowthMetrics.growthNetCashUsedProvidedByFinancingActivities'
    | 'lastAnnualProfitGrowthMetrics.growthEffectOfForexChangesOnCash'
    | 'lastAnnualProfitGrowthMetrics.growthNetChangeInCash'
    | 'lastAnnualProfitGrowthMetrics.growthCashAtEndOfYear'
    | 'lastAnnualProfitGrowthMetrics.growthCashAtBeginningOfYear'
    | 'lastAnnualProfitGrowthMetrics.growthOperatingCashFlow'
    | 'lastAnnualProfitGrowthMetrics.growthCapitalExpenditure'
    | 'lastAnnualProfitGrowthMetrics.growthFreeCashFlow'
    | 'lastAnnualBalanceSheetStatement.totalAssets'
    | 'lastAnnualBalanceSheetStatement.totalLiabilities'
    | 'lastAnnualBalanceSheetStatement.totalShareholderEquity'
    | 'lastAnnualBalanceSheetStatement.cashAndCashEquivalents'
    | 'lastAnnualBalanceSheetStatement.shortTermInvestments'
    | 'lastAnnualBalanceSheetStatement.receivables'
    | 'lastAnnualBalanceSheetStatement.otherCurrentAssets'
    | 'lastAnnualBalanceSheetStatement.totalCurrentAssets'
    | 'lastAnnualBalanceSheetStatement.propertyPlantAndEquipment'
    | 'lastAnnualBalanceSheetStatement.goodwill'
    | 'lastAnnualBalanceSheetStatement.intangibleAssets'
    | 'lastAnnualBalanceSheetStatement.longTermInvestments'
    | 'lastAnnualBalanceSheetStatement.otherAssets'
    | 'lastAnnualBalanceSheetStatement.totalNonCurrentAssets'
    | 'lastAnnualBalanceSheetStatement.shortTermDebt'
    | 'lastAnnualBalanceSheetStatement.otherCurrentLiabilities'
    | 'lastAnnualBalanceSheetStatement.totalCurrentLiabilities'
    | 'lastAnnualBalanceSheetStatement.longTermDebt'
    | 'lastAnnualBalanceSheetStatement.otherNonCurrentLiabilities'
    | 'lastAnnualBalanceSheetStatement.totalNonCurrentLiabilities'
    | 'lastAnnualCashFlowStatement.netIncome'
    | 'lastAnnualCashFlowStatement.depreciationAndAmortization'
    | 'lastAnnualCashFlowStatement.deferredIncomeTax'
    | 'lastAnnualCashFlowStatement.stockBasedCompensation'
    | 'lastAnnualCashFlowStatement.changeInWorkingCapital'
    | 'lastAnnualCashFlowStatement.accountsReceivable'
    | 'lastAnnualCashFlowStatement.inventory'
    | 'lastAnnualCashFlowStatement.accountsPayable'
    | 'lastAnnualCashFlowStatement.otherWorkingCapital'
    | 'lastAnnualCashFlowStatement.otherNonCashItems'
    | 'lastAnnualCashFlowStatement.netCashProvidedByOperatingActivities'
    | 'lastAnnualCashFlowStatement.investmentsInPropertyPlantAndEquipment'
    | 'lastAnnualCashFlowStatement.acquisitionsNet'
    | 'lastAnnualCashFlowStatement.purchasesOfInvestments'
    | 'lastAnnualCashFlowStatement.salesMaturitiesOfInvestments'
    | 'lastAnnualCashFlowStatement.otherInvestingActivities'
    | 'lastAnnualCashFlowStatement.netCashUsedForInvestingActivities'
    | 'lastAnnualCashFlowStatement.debtRepayment'
    | 'lastAnnualCashFlowStatement.commonStockIssued'
    | 'lastAnnualCashFlowStatement.commonStockRepurchased'
    | 'lastAnnualCashFlowStatement.dividendsPaid'
    | 'lastAnnualCashFlowStatement.otherFinancingActivities'
    | 'lastAnnualCashFlowStatement.netCashProvidedByFinancingActivities'
    | 'lastAnnualCashFlowStatement.effectOfForexChangesOnCash'
    | 'lastAnnualCashFlowStatement.netChangeInCash'
    | 'lastAnnualCashFlowStatement.cashAtEndOfYear'
    | 'lastAnnualCashFlowStatement.cashAtBeginningOfYear'
export type FilterNumberCondition = 'greater_than' | 'less_than'
export type NumberFilterCriteriaDto = {
    property: FilterNumberProperty
    condition: FilterNumberCondition
    /** Value to compare against the property with the specified condition */
    value: number
}
export type FilterStringProperty = 'symbol' | 'name' | 'exchange'
export type FilterStringCondition = 'equal' | 'not_equal'
export type StringFilterCriteriaDto = {
    property: FilterStringProperty
    condition: FilterStringCondition
    /** String value to compare against the property */
    value: string
}
export type RatioCriteriaDto = {
    numerator: FilterNumberProperty
    denominator: FilterNumberProperty
    condition: FilterNumberCondition
    /** Value to compare the calculated ratio against */
    value: number
}
export type MultiCriteriaDto = {
    /** Type of multi-criteria filter */
    type: 'country' | 'sector' | 'industry'
    /** Values for the multi-criteria filter */
    values: string[]
}
export type CreateFilterDto = {
    /** Name of the filter */
    name: string
    /** Criteria for filtering with number properties */
    numberCriteria: NumberFilterCriteriaDto[]
    /** Criteria for filtering with string properties */
    stringCriteria: StringFilterCriteriaDto[]
    /** Criteria for filtering based on ratios of number properties */
    ratioCriteria: RatioCriteriaDto[]
    /** Criteria for filtering with multi-select properties */
    multiCriteria: MultiCriteriaDto[]
}
export type IncomeGrowthMetrics = {}
export type ProfitGrowthMetrics = {}
export type KeyMetrics = {}
export type BalanceSheetStatement = {}
export type CashFlowStatement = {}
export type IncomeStatement = {}
export type ActualValues = {}
export type Profile = {}
export type Stock = {
    /** The symbol of the stock */
    symbol: string
    /** The name of the stock */
    name: string
    /** The exchange where the stock is listed */
    exchange: string
    /** The price-to-earnings ratio of the stock */
    pe: number
    /** The current price of the stock */
    price: number
    /** The market capitalization of the stock */
    marketCap: number
    /** The country where the stock is based */
    country: string
    /** The sector of the stock */
    sector: string
    /** The industry of the stock */
    industry: string
    /** The last annual income growth metrics associated with the stock */
    lastAnnualIncomeGrowthMetrics: IncomeGrowthMetrics
    /** The last annual profit growth metrics associated with the stock */
    lastAnnualProfitGrowthMetrics: ProfitGrowthMetrics
    /** The last key metrics associated with the stock */
    lastAnnualKeyMetrics: KeyMetrics
    /** The last annual balance sheet statement associated with the stock */
    lastAnnualBalanceSheetStatement: BalanceSheetStatement
    /** The last annual cash flow statement associated with the stock */
    lastAnnualCashFlowStatement: CashFlowStatement
    /** The last annual income statement associated with the stock */
    lastAnnualIncomeStatement: IncomeStatement
    /** The actual values associated with the stock */
    actualValues: ActualValues
    /** The profile values associated with the stock */
    profile: Profile
}
export type RegisterDto = {
    name: string
    email: string
    password: string
}
export type LoginDto = {
    email: string
    password: string
}
export type UpdatePortfolioDto = {
    stockId: string
}
export type UpdateConsiderDto = {
    stockId: string
}
export const {
    useStocksControllerGetStocksQuery,
    useLazyStocksControllerGetStocksQuery,
    useStocksControllerGetStockQuery,
    useLazyStocksControllerGetStockQuery,
    useStocksControllerUpdateStocksListMutation,
    useStocksControllerUpdateStockValuesMutation,
    useStocksControllerUpdateCountedStockValuesMutation,
    useStocksControllerGetMetricsQuery,
    useLazyStocksControllerGetMetricsQuery,
    useStocksControllerGetStatementsQuery,
    useLazyStocksControllerGetStatementsQuery,
    useStocksControllerGetGroupStatementsQuery,
    useLazyStocksControllerGetGroupStatementsQuery,
    useStocksControllerGetProfileQuery,
    useLazyStocksControllerGetProfileQuery,
    useStocksControllerGetGroupMetricsQuery,
    useLazyStocksControllerGetGroupMetricsQuery,
    useFmpControllerFetchAndSaveStatementsMutation,
    useFmpControllerFetchAndSaveMetricsMutation,
    useFmpControllerFetchAndSaveRaringsMutation,
    useFmpControllerFetchAndSaveOutlookMutation,
    useFmpControllerGetCombinedDataQuery,
    useLazyFmpControllerGetCombinedDataQuery,
    useFilterControllerGetCountriesQuery,
    useLazyFilterControllerGetCountriesQuery,
    useFilterControllerGetSectorsQuery,
    useLazyFilterControllerGetSectorsQuery,
    useFilterControllerGetIndustriesQuery,
    useLazyFilterControllerGetIndustriesQuery,
    useFilterControllerCreateMutation,
    useFilterControllerFindAllQuery,
    useLazyFilterControllerFindAllQuery,
    useFilterControllerFindByUserQuery,
    useLazyFilterControllerFindByUserQuery,
    useFilterControllerFindOneQuery,
    useLazyFilterControllerFindOneQuery,
    useFilterControllerUpdateMutation,
    useFilterControllerRemoveMutation,
    useFilterControllerApplyFilterQuery,
    useLazyFilterControllerApplyFilterQuery,
    useFilterControllerApplyFilterDirectlyMutation,
    useBondYieldControllerGetBondYieldQuery,
    useLazyBondYieldControllerGetBondYieldQuery,
    useBondYieldControllerUpdateBondYieldMutation,
    useUsersControllerRegisterMutation,
    useUsersControllerLoginMutation,
    useUsersControllerLogoutMutation,
    useUsersControllerAddToPortfolioMutation,
    useUsersControllerRemoveFromPortfolioMutation,
    useUsersControllerGetPortfolioListQuery,
    useLazyUsersControllerGetPortfolioListQuery,
    useUsersControllerAddToConsiderMutation,
    useUsersControllerRemoveFromConsiderMutation,
    useUsersControllerGetConsiderListQuery,
    useLazyUsersControllerGetConsiderListQuery,
    useStatusControllerGetStatusQuery,
    useLazyStatusControllerGetStatusQuery,
} = injectedRtkApi
