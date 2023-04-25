/* eslint-disable max-classes-per-file */
import { ICard } from '../../common/interfaces/ICard';

class ResCardDto implements ICard {
  public readonly id!: string;

  public readonly title!: string;

  public readonly price!: number;

  public readonly dateFrom!: Date;

  public readonly dateTo!: Date;

  public readonly count!: number;
}

class ResMessageCardDto {
  public readonly ['name']!: string;
}

export { ResCardDto, ResMessageCardDto };
