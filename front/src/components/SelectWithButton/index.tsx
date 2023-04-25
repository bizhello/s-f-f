/* eslint-disable prettier/prettier */
import React, { FC } from 'react';

import { SortEnum, TextEnum } from '../../common/enums';

interface IProps {
  sortedCards: SortEnum;
  changeSortedCards: (value: SortEnum) => void;
  togglePopup: () => void;
}

const SelectWithButton: FC<IProps> = ({
  togglePopup,
  sortedCards,
  changeSortedCards,
}) => {
  return (
    <section className="selectWithButton">
      <div className="selectWithButton__group selectWithButton__group-left">
        <select
          id="selectWithButton__select"
          className="selectWithButton__select"
          name="selectWithButton__select"
          value={sortedCards}
          onChange={(e) => changeSortedCards(e.target.value as SortEnum)}
        >
          <option disabled>{TextEnum.CHOOSE_SORT}</option>
          <option value={TextEnum.DATE_CREATED}>{TextEnum.DATE_CREATED}</option>
          <option value={TextEnum.DATE_END}>{TextEnum.DATE_END}</option>
          <option value={TextEnum.DATE_MAKE}>{TextEnum.DATE_MAKE}</option>
        </select>
        <label htmlFor="selectWithButton__select" className="search__label">
          {TextEnum.SORT_BY}
        </label>
      </div>
      <div className="selectWithButton__group selectWithButton__group-right">
        <p className="selectInput__text">{TextEnum.ADD_PRODUCT}</p>
        <button
          className="selectWithButton__button"
          onClick={togglePopup}
        ></button>
      </div>
    </section>
  );
};

export default SelectWithButton;
