import { CartItem } from '@prisma/client';
import IUseCase from '..';
import { CreateCartItemDTO } from '../../../domain/dtos';
import { ReturnType } from '../../../domain/valueObjects/return-type';
import { CreateCartItemSchema } from '../../../utils/joi';
import IRepository from '../../repositories';
import IMessageBroker from '../../providers';
import {
  cartItemUpdated,
  cartItemAdded,
} from '../../../utils/kafkaTopics.json';
import logger from '../../../utils/logger';

export default class AddItemToCartUseCase extends IUseCase<
  CreateCartItemDTO,
  ReturnType<CartItem>
> {
  constructor(
    private readonly repository: IRepository,
    private readonly messageBroker: IMessageBroker
  ) {
    super();
  }

  async execute(input: CreateCartItemDTO): Promise<ReturnType<CartItem>> {
    // validate input
    await this.validate(CreateCartItemSchema, input);

    // check if cart item alreadtn exists
    const cartItem = await this.repository.findCartItem({
      where: {
        productId_userId: {
          userId: input.userId,
          productId: input.productId,
        },
      },
    });

    // if item exists, increment/change quantity
    if (cartItem) {
      const updatedCartItem = await this.repository.updateCartItem({
        where: {
          id: cartItem.id,
        },
        data: {
          quantity: cartItem.quantity + input.quantity,
        },
      });

      // publish cart item updated event
      try {
        this.messageBroker.publish({
          topic: cartItemUpdated,
          message: JSON.stringify(updatedCartItem),
        });
      } catch (err) {
        logger.error((err as Error).message, err);
      }

      return new ReturnType(true, 'Success', updatedCartItem);
    }

    // create item
    const item = await this.repository.createCartItem({
      data: input,
    });

    // publish cart item added event
    try {
      this.messageBroker.publish({
        topic: cartItemAdded,
        message: JSON.stringify(item),
      });
    } catch (err) {
      logger.error((err as Error).message, err);
    }
    // return item
    return new ReturnType(true, 'Success', item);
  }
}
