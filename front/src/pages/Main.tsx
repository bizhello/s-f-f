/* eslint-disable prettier/prettier */
import '../assets/App.css';
import 'react-toastify/dist/ReactToastify.css';

import React, { FC, useCallback, useEffect, useState, useRef } from 'react';
import { Navigate, useLoaderData } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
// eslint-disable-next-line import/no-extraneous-dependencies
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { SortEnum } from '../common/enums'
import { ICard, ICardDto, IChangeCard } from '../common/interfaces/ICard';
import Card from '../components/Card';
import Popup from '../components/Popup';
import SearchInput from '../components/SearchInput';
import SelectWithButton from '../components/SelectWithButton';
import useCards from '../hooks/useCards';
import usePopup from '../hooks/usePopup';
import AuthService from '../services/AuthService';
import CardService from '../services/CardService';
import ImageService from '../services/ImageService';
import { getPageCount } from '../utils/pages';
import IError from '../common/interfaces/IError';
import Loader from '../components/Loader'
import WithAuth from '../components/HOC/WithAuth';

const Main: FC = () => {

  const currentUser = useLoaderData();

  const { isOpenPopup, togglePopup } = usePopup();

  const limitCards = 10 //Лимит загрузки карточек
  const [totalPages, setTotalPages] = useState<number>(0) //Всего страниц с карточками
  const [pageCards, setPageCards] = useState<number>(1) //Страница загрузи карточек

  const laseElement = useRef();
  const observer = useRef();

  const [isAuth, setIsAuth] = useState<boolean>(true);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [valuePopup, setValuePopup] = useState<IChangeCard>({
    id: '',
    title: '',
    price: null,
    dateFrom: null,
    dateTo: null,
    count: null,
  });
  const [cards, setCards] = useState<ICard[] | []>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [sortedCards, setSortedCards] = useState<SortEnum>(SortEnum.dataCreatedAt);

  const checkAuth = useCallback(async () => {
    try {
      await AuthService.checkAuth();
      setIsAuth(true);
    } catch (error) {
      setIsAuth(false);
    }
  }, [])

  const changeSearchValue = useCallback((value: string): void => {
    setSearchValue(value);
  }, []);

  const changeSortedCards = useCallback((value: SortEnum): void => {
    setSortedCards(value)
  }, [])

  const searchCards = useCards(searchValue, cards, sortedCards)

  const createCard = useCallback(async (cardDto: ICardDto, file?: FormData, idCard?: string): Promise<ICard | null> => {
    try {
      await checkAuth()
      if (file && idCard) {
        await ImageService.createImageCard(idCard, file);
        setCards([...cards, { ...cardDto, id: idCard }]);

        return null;
      }
      const newCard = await CardService.createCard(cardDto);

      return newCard;
    } catch (error) {
      const err = error as IError;
      if (err.statusCode === 409) {
        toast(err.message);
      } else {
        toast("Не удалось создать товар");
      }

      return null;
    }
  }, [cards, checkAuth])

  const changeCard = useCallback(async (card: ICard, file?: FormData): Promise<void> => {
    try {
      await checkAuth()
      if (file) {
        await ImageService.createImageCard(card.id, file);
      } else {
        await CardService.changeCard(card);
      }
      const indexCard = cards.findIndex(
        (item) => item.id === card.id
      );
      const copyCards = cards.slice(0);
      copyCards[indexCard] = card;
      setCards(copyCards)
    } catch (e) {
      toast("Не удалось изменить товар!");
    }
  }, [cards, checkAuth])

  const decrementCard = useCallback(async (idCard: string): Promise<void> => {
    try {
      await checkAuth()
      await CardService.decrementCard(idCard);
      const newCards = cards.map((card) => {
        let newCount = card.count;
        if (card.id === idCard) {
          newCount -= 1;
        }

        return { ...card, count: newCount }
      })

      setCards(newCards || null)
    } catch (e) {
      toast("Не удалось уменьшить кол-во товара!");
    }
  }, [cards, checkAuth])

  const incrementCard = useCallback(async (idCard: string): Promise<void> => {
    try {
      await checkAuth()
      await CardService.incrementCard(idCard);
      const newCards = cards.map((card) => {
        let newCount = card.count;
        if (card.id === idCard) {
          newCount += 1;
        }

        return { ...card, count: newCount }
      })

      setCards(newCards || null)
    } catch (e) {
      toast("Не удалось увеличить кол-во товара!");
    }
  }, [cards, checkAuth])

  const removeCard = useCallback(async (idCard: string): Promise<void> => {
    try {
      await checkAuth()
      // eslint-disable-next-line promise/catch-or-return
      Promise.all([CardService.removeCard(idCard), ImageService.removeCardImage(idCard)])
      setCards(cards.filter(card => card.id !== idCard))
    } catch {
      toast("Не удалось удалить товара!");
    }
  }, [cards, checkAuth])

  const changeValuePopup = useCallback((value: IChangeCard): void => {
    setValuePopup({ ...valuePopup, ...value })
  }, [valuePopup])

  const fetchCardsPagination = useCallback(async (): Promise<void> => {
    try {
      setIsLoad(true);
      const res = await CardService.getCardsPagination(limitCards, pageCards);
      setCards([...cards, ...res.cards]);
      setTotalPages(getPageCount(res.xTotalCount, limitCards))
    } catch (error) {
      console.log('error: ', error)
      toast("Не удалось загрузить товара!");
    } finally {
      setIsLoad(false);
    }
  }, [pageCards, cards])

  useEffect(() => {
    currentUser && fetchCardsPagination()
  }, [pageCards])

  useEffect(() => {
    if (isLoad) return
    if (observer.current) observer.current.disconnect();
    const callback = (entries, oberver) => {
      if (entries[0].isIntersecting && pageCards < totalPages) {
        setPageCards(pageCards + 1)
      }
    }
    observer.current = new IntersectionObserver(callback);
    observer.current.observe(laseElement.current);
  }, [isLoad])

  if (!currentUser || !isAuth) {
    return <Navigate to="/login" replace />;
  }

  return (
    <WithAuth currentUser={currentUser}>
      <main className='main'>
        <SearchInput changeSearchValue={changeSearchValue} searchValue={searchValue} />
        <SelectWithButton togglePopup={togglePopup} sortedCards={sortedCards} changeSortedCards={changeSortedCards} />
        <TransitionGroup>
          {searchCards && searchCards.map(card => (
            <CSSTransition
              key={card.id}
              timeout={500}
              classNames="card">
              <Card togglePopup={togglePopup} changeValuePopup={changeValuePopup} card={card} incrementCard={incrementCard} decrementCard={decrementCard} removeCard={removeCard} />
            </CSSTransition>
          ))}
        </TransitionGroup>
        {isLoad && <Loader />}
        {!isLoad && searchCards?.length === 0 && <h2 style={{ margin: '2em' }}>Товар не найден</h2>}
        {isOpenPopup && <Popup togglePopup={togglePopup} changeValuePopup={changeValuePopup} valuePopup={valuePopup} changeCard={changeCard} createCard={createCard} />}
        <ToastContainer />
        <div ref={laseElement} style={{ height: '2em' }} />
      </main>
    </WithAuth>
  );
}

export default Main;
