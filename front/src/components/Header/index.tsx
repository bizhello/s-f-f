/* eslint-disable prettier/prettier */
import React, { FC } from 'react';

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const Header: FC<IProps> = ({ children }) => {

  return (
    <header className="header">
      {children}
    </header>
  );
};

export default Header;
