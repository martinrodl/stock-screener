// src/stocks/counted/interfaces/actual-values-repository.interface.ts
import { ActualValuesDocument } from '../schemas/actual-values.schema';

export interface IActualValuesRepository {
  updateValues(
    stockId: string,
    values: Partial<ActualValuesDocument>,
  ): Promise<ActualValuesDocument>;
}
