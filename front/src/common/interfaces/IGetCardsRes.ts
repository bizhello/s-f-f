import { ICard } from "./ICard";

export interface IGetCardsRes {
    readonly xTotalCount: number;
    readonly cards: ICard[];
}
