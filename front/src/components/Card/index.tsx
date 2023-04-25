/* eslint-disable prettier/prettier */
import React, { FC, useMemo } from 'react';

import { TextEnum } from '../../common/enums';
import { ICard, IChangeCard } from '../../common/interfaces/ICard';
import { dateReverse, parseDateInString } from '../../utils';

interface IProps {
  children?: JSX.Element | JSX.Element[];
  togglePopup: () => void;
  changeValuePopup: (value: IChangeCard) => void;
  card: ICard;
  decrementCard: (idCard: string) => Promise<void>;
  incrementCard: (idCard: string) => Promise<void>;
  removeCard: (idCard: string) => Promise<void>;
}

const Card: FC<IProps> = ({
  togglePopup,
  changeValuePopup,
  card,
  incrementCard,
  decrementCard,
  removeCard,
}) => {
  const { id, title, price, dateFrom, dateTo, count } = card;

  const onChangeCard = () => {
    changeValuePopup({
      ...card,
    });
    togglePopup();
  };

  const isDateValid = useMemo(() => {

    const difference = new Date(dateTo).getTime() - Date.now();

    return !(difference < 550383924);
  }, [dateTo]);

  return (
    <article className={isDateValid ? 'card' : 'card card-isError'}>
      <img
        className="card__image"
        src={`http://localhost:5555/static/images/${id}/image.webp`}
        alt="Фотография товара"
        width="104px"
        height="142px"
      />
      <div className="card__group">
        <h4 className="card__description">{TextEnum.DESIGNATION}</h4>
        <p className="card__value">{title}</p>
      </div>
      <div className="card__group">
        <h4 className="card__description">{TextEnum.PRICE}</h4>
        <p className="card__value">{price} руб</p>
      </div>
      <div className="card__group">
        <h4 className="card__description">{TextEnum.EXPIRATION_DATE}</h4>
        <p className="card__value">
          {dateReverse(parseDateInString(dateFrom))} -{' '}
          {dateReverse(parseDateInString(dateTo))}
        </p>
      </div>
      <div className="card__group">
        <h4 className="card__description">{TextEnum.COUNT}</h4>
        <p className="card__value">{count} шт</p>
      </div>
      <div className="card__group">
        <button
          className="card__control card__control-plus"
          onClick={() => incrementCard(id)}
        />
        <button
          className="card__control card__control-minus"
          onClick={() => decrementCard(id)}
        />
      </div>
      <div className="card__group">
        <button
          className="card__control card__control-change"
          onClick={() => onChangeCard()}
        />
        <button
          className="card__control card__control-delete"
          onClick={() => removeCard(id)}
        />
      </div>
    </article>
  );
};

export default Card;
