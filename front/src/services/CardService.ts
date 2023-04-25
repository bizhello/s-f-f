/* eslint-disable prettier/prettier */
import { ICard, ICardDto } from "../common/interfaces/ICard"
import IError from "../common/interfaces/IError";
import { IGetCardsRes } from "../common/interfaces/IGetCardsRes";
import api from "../configs/api";
import { ResCardDto, ResMessageCardDto } from "./dto/card.dto";

export default class CardService {
  // public static async getCards(): Promise<ResCardDto[]> {
  //   const response: Response = await fetch(`${api.baseUrl}cards`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": `Bearer ${localStorage.getItem('access-token')}`
  //     },
  //   })

  //   if (!response.ok) {
  //     return Promise.reject(response.json());
  //   }

  //   return response.json();
  // }

  public static async getCardsPagination(limit = 10, page = 1): Promise<IGetCardsRes> {
    const response: Response = await fetch(`${api.baseUrl}cards?limit=${limit}&page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('access-token')}`
      },
    })

    if (!response.ok) {
      return Promise.reject(await response.json());
    }

    return response.json();
  }

  public static async incrementCard(idCard: string): Promise<ResMessageCardDto> {
    const response = await fetch(`${api.baseUrl}cards/${idCard}/increment`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('access-token')}`
      },
    })

    if (!response.ok) {
      return Promise.reject(response.json());
    }

    return response.json();
  }

  public static async decrementCard(idCard: string): Promise<ResMessageCardDto> {
    const response = await fetch(`${api.baseUrl}cards/${idCard}/decrement`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('access-token')}`
      },
    })

    if (!response.ok) {
      return Promise.reject(response.json());
    }

    return response.json();
  }

  public static async removeCard(idCard: string): Promise<ResMessageCardDto> {
    const response = await fetch(`${api.baseUrl}cards/${idCard}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('access-token')}`
      },
    })

    if (!response.ok) {
      return Promise.reject(response.json());
    }

    return response.json();
  }

  public static async changeCard(card: ICard): Promise<ResCardDto> {
    const { id, title, price, dateFrom, dateTo, count } = card;
    const response = await fetch(`${api.baseUrl}cards/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('access-token')}`
      },
      body: JSON.stringify({ title, price, dateFrom, dateTo, count })
    })

    if (!response.ok) {
      return Promise.reject(response.json());
    }

    return response.json();
  }

  public static async createCard(body: ICardDto): Promise<ResCardDto> {
    const response = await fetch(`${api.baseUrl}cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('access-token')}`
      },
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      return Promise.reject(await response.json());
    }

    return await response.json();
  }

}
