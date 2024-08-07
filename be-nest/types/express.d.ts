import { Request } from '@nestjs/common';
import { User } from '../src/users/schemas/user.schema'; // Adjust the import as necessary

export interface CustomRequest extends Request {
  user: User;
}
