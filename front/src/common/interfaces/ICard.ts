interface ICardDto {
  readonly title: string;
  readonly price: number;
  readonly dateFrom: Date;
  readonly dateTo: Date;
  readonly count: number;
}

interface ICard extends ICardDto {
  readonly id: string;
}

interface IChangeCard {
  id?: string;
  title?: string;
  price?: number | null;
  dateFrom?: Date | null;
  dateTo?: Date | null;
  count?: number | null;
}

export type { ICard, ICardDto, IChangeCard };
