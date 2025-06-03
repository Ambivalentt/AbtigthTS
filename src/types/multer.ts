import { Request } from 'express';

export interface MulterRequest<T> extends Request {
  file?: Express.Multer.File;
  body: T;
}
