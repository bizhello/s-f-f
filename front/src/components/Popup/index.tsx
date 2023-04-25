/* eslint-disable no-unused-expressions */
/* eslint-disable prettier/prettier */
import React, {
  FC,
  useEffect,
  useRef,
  useState,
} from 'react';

import { TextPopupEnum } from '../../common/enums';
import { ICard, ICardDto, IChangeCard } from '../../common/interfaces/ICard';
import { getDate, parseDateInString } from '../../utils';

interface IProps {
  valuePopup: IChangeCard;
  togglePopup: () => void;
  changeValuePopup: (value: IChangeCard) => void;
  changeCard: (card: ICard, file?: FormData) => Promise<void>;
  createCard: (
    cardDto: ICardDto,
    file?: FormData,
    idCard?: string,
  ) => Promise<ICard | null>;
}

const Popup: FC<IProps> = ({
  togglePopup,
  changeValuePopup,
  valuePopup,
  changeCard,
  createCard,
}) => {
  const { id, title, price, dateFrom, dateTo, count } = valuePopup;

  const url = id
    ? `http://localhost:5555/static/images/${id}/image.webp`
    : `defaultImageCard.png`;
  const [preview, setPreview] = useState<string>(url);
  const [file, setFile] = useState<File | null>(null);
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const { todayDate, todayMonth, todayDay } = getDate();

  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const onChangeFileInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files || e.target.files.length === 0) {
      setFile(null);

      return;
    }
    setFile(e.target.files[0]);
  };

  const handleClickButtonFile = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const closePopup = () => {
    togglePopup();
    changeValuePopup({
      id: '',
      title: '',
      price: null,
      dateFrom: null,
      dateTo: null,
      count: null,
    });
  };

  const onClickSave = async () => {
    const formData = new FormData();
    if (id) {
      if (file) {
        formData.append('image', file, 'image.jpg');
        await changeCard(valuePopup as ICard, formData);
      } else {
        await changeCard(valuePopup as ICard);
      }
    } else {
      const newCard = await createCard(valuePopup as ICardDto);
      if (newCard && file) {
        formData.append('image', file, 'image.jpg');
        await createCard(valuePopup as ICardDto, formData, newCard.id);
      }
    }

    closePopup();
  };

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  }, [file]);

  useEffect(() => {
    if (id) {
      title && price && dateFrom && dateTo && count && setIsFormValid(true);
    } else {
      title &&
        price &&
        dateFrom &&
        dateTo &&
        file &&
        count &&
        setIsFormValid(true);
    }
  }, [title, price, dateFrom, dateTo, count, file, id]);

  return (
    <article
      className="popup"
      onClick={(e) => e.target === e.currentTarget && closePopup()}
    >
      <form className="popup__form">
        <div className="popup_group">
          <label htmlFor="popup__file" style={{ color: '#878787' }}>
            {TextPopupEnum.LABEL_FILE}
          </label>
          <div className="file__group">
            <div>
              <button
                style={{ display: 'block', width: '120px' }}
                onClick={() => handleClickButtonFile()}
                type="button"
              >
                Выбрать картинку
              </button>
              <input
                ref={hiddenFileInput}
                style={{ display: 'none' }}
                type="file"
                id="popup__file"
                name="popup__file"
                multiple
                onChange={(e) => onChangeFileInput(e)}
              />
            </div>
            <img
              src={preview}
              width="120px"
              height="120px"
              alt="No photo"
              className="popup__image"
            />
          </div>
        </div>
        <div className="popup_group">
          <input
            value={title}
            onChange={(e) => changeValuePopup({ title: e.target.value })}
            className="popup__input"
            type="text"
            id="popup__title"
            name="popup__title"
          />
          <label
            htmlFor="popup__title"
            className={
              title
                ? 'popup__label popup__label-filled'
                : 'popup__label popup__label-empty'
            }
          >
            {TextPopupEnum.LABEL_TITLE}
          </label>
        </div>
        <div className="popup_group">
          <input
            value={price || ''}
            onChange={(e) => changeValuePopup({ price: +e.target.value })}
            className="popup__input"
            type="text"
            id="popup__price"
            name="popup__price"
          />
          <label
            htmlFor="popup__price"
            className={
              price
                ? 'popup__label popup__label-filled'
                : 'popup__label popup__label-empty'
            }
          >
            {TextPopupEnum.LABEL_PRICE}
          </label>
        </div>
        <div className="date">
          <p className="date__text">Дата срока годности</p>
          <div className="date__group">
            <div className="date__reverse">
              <input
                min={`${todayDate.getFullYear() - 1}-${todayMonth}-${todayDay}`}
                max={`${todayDate.getFullYear()}-${todayMonth}-${todayDay}`}
                value={parseDateInString(dateFrom)}
                onChange={(e) =>
                  changeValuePopup({ dateFrom: new Date(e.target.value) })
                }
                type="date"
                className="date__input"
              />
              <p className="date__text">От</p>
            </div>
            <div className="date__reverse">
              <input
                min={`${todayDate.getFullYear() - 1}-${todayMonth}-${todayDay}`}
                max={`${todayDate.getFullYear() + 3}-${todayMonth}-${todayDay}`}
                value={parseDateInString(dateTo)}
                onChange={(e) =>
                  changeValuePopup({ dateTo: new Date(e.target.value) })
                }
                type="date"
                className="date__input"
              />
              <p className="date__text">До</p>
            </div>
          </div>
        </div>
        <div className="popup_group">
          <input
            value={count || ''}
            onChange={(e) => changeValuePopup({ count: +e.target.value })}
            className="popup__input"
            type="text"
            id="popup__count"
            name="popup__count"
          />
          <label
            htmlFor="popup__count"
            className={
              count
                ? 'popup__label popup__label-filled'
                : 'popup__label popup__label-empty'
            }
          >
            {TextPopupEnum.LABEL_COUNT}
          </label>
        </div>
        {!isFormValid && (
          <p>
            <span style={{ color: 'red' }}>Форма не валидна</span>
          </p>
        )}
        <div className="popup__button_group">
          <button
            disabled={!isFormValid}
            className={
              !isFormValid
                ? 'popup__button popup__button-isNoValid'
                : 'popup__button'
            }
            type="button"
            onClick={() => onClickSave()}
          >
            {TextPopupEnum.SAVE}
          </button>
          <button className="popup__button" type="button" onClick={closePopup}>
            {TextPopupEnum.CLOSE}
          </button>
        </div>
      </form>
    </article>
  );
};

export default Popup;
