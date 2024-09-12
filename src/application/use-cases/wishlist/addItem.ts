import { WishlistItem } from '@prisma/client';
import IUseCase from '..';
import { CreateWishlistItemDTO } from '../../../domain/dtos';
import { ReturnType } from '../../../domain/valueObjects/return-type';
import { CreateWishlistItemSchema } from '../../../utils/joi';
import IRepository from '../../repositories';
import IMessageBroker from '../../providers';
import { wishlistItemAdded } from '../../../utils/kafkaTopics.json';
import logger from '../../../utils/logger';

export default class AddItemToWishlistUseCase extends IUseCase<
  CreateWishlistItemDTO,
  ReturnType<WishlistItem>
> {
  constructor(
    private readonly repository: IRepository,
    private readonly messageBroker: IMessageBroker
  ) {
    super();
  }

  async execute(
    input: CreateWishlistItemDTO
  ): Promise<ReturnType<WishlistItem>> {
    // validate input
    await this.validate(CreateWishlistItemSchema, input);

    // check if Wishlist item alreadtn exists
    const wishlistItem = await this.repository.findWishlistItem({
      where: {
        userId_productId: {
          userId: input.userId,
          productId: input.productId,
        },
      },
    });

    // if item exists, returun item
    if (wishlistItem) {
      return new ReturnType(true, 'Success', wishlistItem);
    }

    // create item
    const item = await this.repository.createWishlistItem({
      data: input,
    });

    // publish Wishlist item added event
    try {
      this.messageBroker.publish({
        topic: wishlistItemAdded,
        message: JSON.stringify(item),
      });
    } catch (err) {
      logger.error((err as Error).message, err);
    }
    // return item
    return new ReturnType(true, 'Success', item);
  }
}
