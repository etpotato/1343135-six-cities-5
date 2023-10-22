import { inject, injectable } from 'inversify';
import { types, DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { OfferService } from './offer-service.interface.js';
import { OfferEntity } from './offer.entity.js';
import { Component } from '../../types/component.enum.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { CityValue } from '../../types/city.enum.js';
import { Pagination } from '../../types/pagination.js';
import { DefaultPaginationParams, RATING_PRESICION } from './consts.js';
import { AddCommentDto } from './dto/add-comment.dto.js';
import { floatToPrecision } from '../../utils/number.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
  ) {}

  public async create(dto: CreateOfferDto) {
    const offer = (
      await this.offerModel.create({...dto, author: dto.authorId })
    ).populate('author');

    return offer;
  }

  public async findById(id: string) {
    return await this.offerModel.findById(id).populate('author');
  }

  public async update(id: OfferEntity['id'], dto: UpdateOfferDto) {
    return await this.offerModel
      .findByIdAndUpdate(id, dto, { new: true })
      .populate('author') as DocumentType<OfferEntity>;
  }

  public async exists(id: OfferEntity['id']) {
    return await this.findById(id) !== null;
  }

  public async delete(id: OfferEntity['id']) {
    await this.offerModel.findByIdAndRemove(id);
  }

  public async find(pagination?: Pagination) {
    const calculatedOffset = pagination?.offset ?? DefaultPaginationParams.offet;
    const calculatedLimit = pagination?.limit ?? DefaultPaginationParams.limit;

    if (calculatedLimit === 0) {
      return [];
    }

    return this.offerModel
      .find()
      .sort({ createdAt: -1 })
      .skip(calculatedOffset)
      .limit(calculatedLimit);
  }

  public async findPremiumForCity(city: CityValue, pagination?: Pagination) {
    const calculatedOffset = pagination?.offset ?? DefaultPaginationParams.offet;
    const calculatedLimit = pagination?.limit ?? DefaultPaginationParams.limitPremium;

    if (calculatedLimit === 0) {
      return [];
    }

    return this.offerModel
      .find({ city, isPremium: true })
      .sort({ createdAt: -1 })
      .skip(calculatedOffset)
      .limit(calculatedLimit);
  }

  public async addComment(dto: AddCommentDto) {
    const offer = await this.offerModel.findById(dto.offerId);

    if (!offer) {
      throw new Error('Offer not found');
    }

    const newRating = ((offer.commentCount * offer.rating) + dto.rating) / (offer.commentCount + 1);
    const newRatingFixed = floatToPrecision(newRating, RATING_PRESICION);

    return this.offerModel
      .findByIdAndUpdate(
        dto.offerId,
        {
          $inc: { commentCount: 1 },
          rating: newRatingFixed
        },
      );
  }
}
