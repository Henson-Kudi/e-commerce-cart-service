import { CartItem, Prisma } from '@prisma/client';
import IUseCase from '..';
import { CartItemsquery, PaginationOptions } from '../../../domain/dtos';
import { ReturnTypeWithPagination } from '../../../domain/valueObjects/return-type';
import IRepository from '../../repositories';
import setupQuery from '../helpers/setupQuery';
import setupPagination from '../helpers/setupPagination';

export default class GetCartItems extends IUseCase<
  {
    filter?: CartItemsquery;
    options?: PaginationOptions;
  },
  ReturnTypeWithPagination<CartItem[]>
> {
  constructor(private readonly repository: IRepository) {
    super();
  }

  async execute(input: {
    filter?: CartItemsquery;
    options?: PaginationOptions;
  }): Promise<ReturnTypeWithPagination<CartItem[]>> {
    const query = setupQuery(input.filter ?? {}) as Prisma.CartItemWhereInput;

    const pagination = setupPagination(input.options);

    const items = await this.repository.findCartItems({
      where: query,
      take: pagination.limit,
      skip: pagination.skip,
    });
    const total = await this.repository.countCartItems({ where: query });

    return new ReturnTypeWithPagination(true, 'Success', {
      data: items,
      ...pagination,
      total: total,
    });
  }
}
