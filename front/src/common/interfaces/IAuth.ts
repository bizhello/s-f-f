interface IRegistryReq {
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
}

interface IRegistryRes {
  readonly id: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
}

interface ILoginReq {
  readonly email: string;
  readonly password: string;
  readonly remember: boolean;
}

interface ILoginRes {
  readonly id: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly accessToken: string;
}

export type { ILoginReq, ILoginRes, IRegistryReq, IRegistryRes };
