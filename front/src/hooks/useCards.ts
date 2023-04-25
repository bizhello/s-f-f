/* eslint-disable prettier/prettier */
import { useMemo } from 'react';

import { SortEnum } from '../common/enums';
import { ICard } from '../common/interfaces/ICard';

const useSortedCards = (cards: ICard[], sort: SortEnum): ICard[] | [] => {
  const sortCards = useMemo((): ICard[] | [] => {
    if (cards.length > 0) {
      const newCards: ICard[] | [] = Object.assign([], cards);

      switch (sort) {
        case SortEnum.dataStart:
          return newCards.sort(
            (a, b) => a.dateFrom.getTime() - b.dateFrom.getTime(),
          );
        case SortEnum.dataEnd:
          return newCards.sort(
            (a, b) => a.dateTo.getTime() - b.dateTo.getTime(),
          );
        default:
          return cards;
      }
    }

    return [];
  }, [cards, sort]);

  return sortCards;
};

const useCards = (searchValue: string, cards: ICard[], sort: SortEnum ): ICard[] => {
  const sortCards = useSortedCards(cards, sort);

  const searchCards = useMemo((): ICard[] => {
    if (searchValue) {
      return sortCards?.filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    return sortCards;
  }, [searchValue, sortCards]);

  return searchCards
}

export default useCards;
