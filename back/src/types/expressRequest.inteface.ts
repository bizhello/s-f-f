import { Request } from 'express';
import { Types } from 'mongoose';

interface IExpressRequest extends Request {
  userId?: Types.ObjectId | null;
}

export default IExpressRequest;
