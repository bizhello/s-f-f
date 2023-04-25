import { ErrorsNameEnum, MessagesEnum } from '@app/common/enums';
import {
  ICard,
  ICardWithId,
  IChangeCard,
} from '@app/core/card/interfaces/ICard';
import { Card, TCardDocument } from '@app/schemas/card.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IGetCardsReq, IGetCardsRes } from './interfaces/IGetCards';

@Injectable()
export default class CardService {
  constructor(
    @InjectModel(Card.name) private cardModel: Model<TCardDocument>,
  ) { }

  public async getTotalCards(): Promise<number> {

    return await this.cardModel.find().count()
  }

  public async getCards({ limit, page }: IGetCardsReq): Promise<IGetCardsRes> {
    const cardsFromBD = await this.cardModel.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const xTotalCount = await this.cardModel.find().count()

    const cards = cardsFromBD.map((card) => {
      const { id, title, price, dateFrom, dateTo, count } = card;

      return { id, title, price, dateFrom, dateTo, count };
    });

    return { xTotalCount, cards };
  }

  public async createCard(createCardDto: ICard): Promise<ICardWithId> {
    const card = await this.cardModel.create(createCardDto);
    const { id, title, price, dateFrom, dateTo, count } = card;

    return { id, title, price, dateFrom, dateTo, count };
  }

  public async deleteCard(id: Types.ObjectId): Promise<{ message: string }> {
    const card = await this.cardModel.findById(id);
    if (!card) {
      throw new HttpException(
        MessagesEnum.CARD_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.cardModel.deleteOne({ _id: id });

    return { message: MessagesEnum.CARD_DELETE };
  }

  public async incrementCard(id: Types.ObjectId): Promise<{ status: string }> {
    const card = await this.cardModel.findById(id);
    card.count += 1;
    await card.save();
    if (!card) {
      throw new HttpException(
        MessagesEnum.CARD_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return { status: 'Ок' };
  }

  public async decrementCard(id: Types.ObjectId): Promise<{ status: string }> {
    try {
      const card = await this.cardModel.findById(id);
      card.count -= 1;
      await card.save();
      if (!card) {
        throw new HttpException(
          MessagesEnum.CARD_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }

      return { status: 'Ок' };
    } catch (error) {
      if (error.name === ErrorsNameEnum.VALIDATION) {
        throw new HttpException(MessagesEnum.MIN_COUNT, HttpStatus.CONFLICT);
      }
    }
  }

  public async changeCard(
    userId: Types.ObjectId,
    changeCardDto: IChangeCard,
  ): Promise<ICardWithId> {
    const card = await this.cardModel.findByIdAndUpdate(userId, changeCardDto, {
      new: true,
      runValidators: true,
    });

    if (!card) {
      throw new HttpException(
        MessagesEnum.CARD_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    const { id, title, price, dateFrom, dateTo, count } = card;

    return { id, title, price, dateFrom, dateTo, count };
  }
}
