import { WishlistItem } from '@prisma/client';
import {
  ReturnType,
  ReturnTypeWithPagination,
} from '../../../domain/valueObjects/return-type';
import IContoller from './Icontroller';
import RequestObject from '../../../utils/types/requestObject';
import AppError from '../../../domain/valueObjects/error';
import { ResponseCodes } from '../../../domain/enums/responseCode';
import { ServiceManager } from '../../../application/services';

export default class GetWishlistItemsController
  implements IContoller<ReturnTypeWithPagination<WishlistItem[]>>
{
  constructor(private readonly serviceManager: ServiceManager) {}
  handle(
    request: RequestObject
  ): Promise<ReturnTypeWithPagination<WishlistItem[]>> {
    const authUserId = request.headers?.userId;

    if (!authUserId) {
      const error = new AppError('Not authorised', ResponseCodes.BadRequest);
      return Promise.resolve(
        new ReturnType(false, 'Not authorised', undefined, error)
      );
    }

    return this.serviceManager.getWishlistItems({
      filter: {
        userId: authUserId,
      },
      options: {
        ...(request.query ?? {}),
      },
    });
  }
}
