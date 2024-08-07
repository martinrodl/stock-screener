import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // console.log('Data before transformation:', data);
        const transformedData = this.transformResponse(data);
        // console.log('Data after transformation:', transformedData);
        return transformedData;
      }),
    );
  }

  private transformResponse(data: any) {
    if (Array.isArray(data)) {
      return data.map((item) => this.transformItem(item));
    }
    return this.transformItem(data);
  }

  private transformItem(item: any) {
    if (item && item._doc) {
      const transformedItem = { ...item._doc, id: item._doc._id.toString() };
      delete transformedItem._id;
      return transformedItem;
    }
    return item;
  }
}
