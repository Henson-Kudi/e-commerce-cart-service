import { Prisma } from '@prisma/client';
import IUseCase from '..';
import { CartItemsquery } from '../../../domain/dtos';
import { ReturnType } from '../../../domain/valueObjects/return-type';
import IMessageBroker from '../../providers';
import IRepository from '../../repositories';
import setupQuery from '../helpers/setupQuery';
import { cartItemsRemoved } from '../../../utils/kafkaTopics.json';
import logger from '../../../utils/logger';

export default class RemoveCartItems extends IUseCase<
  CartItemsquery,
  ReturnType<{ count: number }>
> {
  constructor(
    private readonly repository: IRepository,
    private readonly messageBroker: IMessageBroker
  ) {
    super();
  }
  async execute(input: CartItemsquery): Promise<ReturnType<{ count: number }>> {
    const query = setupQuery(input) as Prisma.CartItemWhereInput;

    const items = await this.repository.findCartItems({ where: query });

    const deleted = await this.repository.removeCartItems({
      where: query,
    });

    // publish deleted message
    try {
      this.messageBroker.publish({
        topic: cartItemsRemoved,
        message: JSON.stringify(items),
      });
    } catch (err) {
      logger.error((err as Error).message, err);
    }

    return new ReturnType(true, 'Success', deleted);
  }
}
