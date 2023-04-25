/* eslint-disable prettier/prettier */
import React, { FC } from "react";
import { NavLink } from "react-router-dom";

const Error: FC = () => {

  return (
    <section className="error">
      <h2 className="error__title">404</h2>
      <p className="error__text">Страница не найдена</p>
      <div>
        <NavLink className="error__back" style={{ marginRight: '50px' }} to="./">На главную страницу</NavLink>
        <NavLink className="error__back" to="/login">На страницу входа</NavLink>
      </div>
    </section>
  )
}

export default Error;
