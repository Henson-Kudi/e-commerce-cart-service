import { CartItem } from '@prisma/client';
import IUseCase from '..';
import { CreateCartItemDTO } from '../../../domain/dtos';
import { ReturnType } from '../../../domain/valueObjects/return-type';
import IMessageBroker from '../../providers';
import IRepository from '../../repositories';
import { cartItemUpdated } from '../../../utils/kafkaTopics.json';
import logger from '../../../utils/logger';
import { CreateCartItemSchema } from '../../../utils/joi';
import AppError from '../../../domain/valueObjects/error';
import { ResponseCodes } from '../../../domain/enums/responseCode';

export default class UpdateCartItem extends IUseCase<
  CreateCartItemDTO,
  ReturnType<CartItem | null>
> {
  constructor(
    private readonly repository: IRepository,
    private readonly messageBroker: IMessageBroker
  ) {
    super();
  }
  async execute(
    input: CreateCartItemDTO
  ): Promise<ReturnType<CartItem | null>> {
    // Validate input (if qty is zero, would throw error)
    await this.validate(CreateCartItemSchema, input);

    // Ensure item exist
    const found = await this.repository.findCartItem({
      where: {
        productId_userId: {
          productId: input.productId,
          userId: input.userId,
        },
      },
    });

    if (!found) {
      return new ReturnType(
        false,
        'Item not found',
        null,
        new AppError('Item not found', ResponseCodes.NotFound)
      );
    }

    const updated = await this.repository.updateCartItem({
      where: {
        productId_userId: {
          productId: input.productId,
          userId: input.userId,
        },
      },
      data: {
        quantity: input.quantity,
      },
    });

    // publish updated message
    try {
      this.messageBroker.publish({
        topic: cartItemUpdated,
        message: JSON.stringify(updated),
      });
    } catch (err) {
      logger.error((err as Error).message, err);
    }

    return new ReturnType(true, 'Success', updated);
  }
}
