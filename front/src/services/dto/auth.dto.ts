/* eslint-disable max-classes-per-file */
/* eslint-disable prettier/prettier */
import { ILoginReq, ILoginRes, IRegistryReq, IRegistryRes } from "../../common/interfaces/IAuth";

class ReqRegistryDto implements IRegistryReq {
  public readonly email!: string;

  public readonly password!: string;

  public readonly firstName!: string;

  public readonly lastName!: string;
}
class ResRegistryDto implements IRegistryRes {
  public readonly id!: string;

  public readonly email!: string;

  public readonly firstName!: string;

  public readonly lastName!: string;
}


class ReqLoginDto implements ILoginReq {
  public readonly email!: string;

  public readonly password!: string;

  public readonly remember!: boolean;
}

class ResLoginDto implements ILoginRes {
  public readonly id!: string;

  public readonly email!: string;

  public readonly firstName!: string;

  public readonly lastName!: string;

  public readonly accessToken!: string;
}

export { ReqLoginDto, ReqRegistryDto, ResLoginDto, ResRegistryDto }
