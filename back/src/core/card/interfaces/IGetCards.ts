import { ICardWithId } from "./ICard";

export interface IGetCardsReq {
    readonly limit?: number;
    readonly page?: number;
}

export interface IGetCardsRes {
    readonly xTotalCount: number;
    readonly cards: ICardWithId[];
}