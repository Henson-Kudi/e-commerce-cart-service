import { WishlistItem, Prisma } from '@prisma/client';
import IUseCase from '..';
import { WishlistItemsquery, PaginationOptions } from '../../../domain/dtos';
import { ReturnTypeWithPagination } from '../../../domain/valueObjects/return-type';
import IRepository from '../../repositories';
import setupQuery from '../helpers/setupQuery';
import setupPagination from '../helpers/setupPagination';

export default class GetWishlistItems extends IUseCase<
  {
    filter?: WishlistItemsquery;
    options?: PaginationOptions;
  },
  ReturnTypeWithPagination<WishlistItem[]>
> {
  constructor(private readonly repository: IRepository) {
    super();
  }

  async execute(input: {
    filter?: WishlistItemsquery;
    options?: PaginationOptions;
  }): Promise<ReturnTypeWithPagination<WishlistItem[]>> {
    const query = setupQuery(
      input.filter ?? {}
    ) as Prisma.WishlistItemWhereInput;

    const pagination = setupPagination(input.options);

    const items = await this.repository.findWishlistItems({
      where: query,
      take: pagination.limit,
      skip: pagination.skip,
    });
    const total = await this.repository.countWishlistItems({ where: query });

    return new ReturnTypeWithPagination(true, 'Success', {
      data: items,
      ...pagination,
      total: total,
    });
  }
}
