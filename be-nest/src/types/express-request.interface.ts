import { Request } from '@nestjs/common';
import { UserDocument } from '../users/schemas/user.schema';

export interface CustomRequest extends Request {
  user: UserDocument;
}
