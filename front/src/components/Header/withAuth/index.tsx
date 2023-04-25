/* eslint-disable prettier/prettier */
import React, { FC, useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";

import { TextEnum } from '../../../common/enums';
import Header from '..';
import MenuPopup from '../../MenuPopup';
import { IRegistryRes } from '../../../common/interfaces/IAuth';
import AuthService from '../../../services/AuthService';

interface currentUser {
  currentUser: IRegistryRes;
}

const HeaderWithAuth: FC<currentUser> = ({ currentUser }) => {
  const navigate = useNavigate();

  const [isMenuPopup, setIsMenuPopup] = useState<boolean>(false);

  const logout = useCallback(async () => {
    try {
      await AuthService.checkAuth();
      await AuthService.logout();
      navigate("/login");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Не удалось выйти');
    } finally {
      localStorage.clear();
    }
  }, [])

  return (
    <Header>
      <div className="header__group header__group-menu-with-title">
        <button className="header__menu" onClick={() => (setIsMenuPopup(prev => !prev))} />
        <h3 className="header__title">{TextEnum.TITLE}</h3>
      </div>
      {isMenuPopup && <MenuPopup />}
      <p className="header__text">
        {TextEnum.WELCOME}{' '}
        <span
          style={{ fontSize: '1.2em', marginLeft: '18px', fontWeight: '700' }}
        >
          {'' || currentUser.firstName}
        </span>
      </p>
      <button
        className="item__button"
        style={{ backgroundColor: 'red', border: 'none', width: '70px' }}
        onClick={() => logout()}
      >
        {TextEnum.EXIT}
      </button>
    </Header >
  );
};

export default HeaderWithAuth;
