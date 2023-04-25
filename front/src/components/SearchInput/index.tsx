/* eslint-disable prettier/prettier */
import React, { FC } from 'react';

import { TextEnum } from '../../common/enums';

interface IProps {
  searchValue: string;
  changeSearchValue: (value: string) => void;
}

const SearchInput: FC<IProps> = ({ searchValue, changeSearchValue }) => {
  return (
    <section className="search">
      <input
        id="searchInput"
        name="search"
        type="search"
        className="search_input"
        placeholder={TextEnum.INPUT_HOLDER}
        value={searchValue}
        onChange={(e) => changeSearchValue(`${e.target.value}`)}
      />
      <label htmlFor="searchInput" className="search__label">
        Поиск
      </label>
    </section>
  );
};

export default SearchInput;
