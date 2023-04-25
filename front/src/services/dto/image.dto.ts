/* eslint-disable max-classes-per-file */

class ResCreateImageDto {
  public readonly url!: string;

  public readonly idCard!: string;
}

class ResRemoveImageDto {
  public readonly cardId!: string;
}

export { ResCreateImageDto, ResRemoveImageDto };
