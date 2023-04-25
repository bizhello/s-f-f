import {
  // IsInt,
  IsOptional,
} from 'class-validator';

import { IGetCardsReq } from '../../interfaces/IGetCards';

class ReqGetCardsDto implements IGetCardsReq {
  @IsOptional()
  public readonly limit?: number;

  @IsOptional()
  public readonly page?: number;

}

export default ReqGetCardsDto;
