import { Prisma } from '@prisma/client';
import IUseCase from '..';
import { WishlistItemsquery } from '../../../domain/dtos';
import { ReturnType } from '../../../domain/valueObjects/return-type';
import IMessageBroker from '../../providers';
import IRepository from '../../repositories';
import setupQuery from '../helpers/setupQuery';
import { wishlistItemsRemoved } from '../../../utils/kafkaTopics.json';
import logger from '../../../utils/logger';

export default class RemoveWishlistItems extends IUseCase<
  WishlistItemsquery,
  ReturnType<{ count: number }>
> {
  constructor(
    private readonly repository: IRepository,
    private readonly messageBroker: IMessageBroker
  ) {
    super();
  }
  async execute(
    input: WishlistItemsquery
  ): Promise<ReturnType<{ count: number }>> {
    const query = setupQuery(input) as Prisma.WishlistItemWhereInput;

    const items = await this.repository.findWishlistItems({ where: query });

    const deleted = await this.repository.removeWishlistItems({
      where: query,
    });

    // publish deleted message
    try {
      this.messageBroker.publish({
        topic: wishlistItemsRemoved,
        message: JSON.stringify(items),
      });
    } catch (err) {
      logger.error((err as Error).message, err);
    }

    return new ReturnType(true, 'Success', deleted);
  }
}
