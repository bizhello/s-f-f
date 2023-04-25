interface IChangeUser {
  readonly email?: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly password?: string;
}

interface IUser {
  readonly id: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly password: string;
}

interface IUserInfo {
  readonly id: string;
  readonly firstName: string;
}

export type { IChangeUser, IUser, IUserInfo };
