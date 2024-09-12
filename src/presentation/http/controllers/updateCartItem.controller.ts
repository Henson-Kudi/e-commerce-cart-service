import { CartItem } from '@prisma/client';
import { ReturnType } from '../../../domain/valueObjects/return-type';
import IContoller from './Icontroller';
import RequestObject from '../../../utils/types/requestObject';
import AppError from '../../../domain/valueObjects/error';
import { ResponseCodes } from '../../../domain/enums/responseCode';
import { ServiceManager } from '../../../application/services';

export class UpdateCartItemController
  implements IContoller<ReturnType<CartItem | null>>
{
  constructor(private readonly serviceManager: ServiceManager) {}
  handle(request: RequestObject): Promise<ReturnType<CartItem | null>> {
    const authUserId = request.headers?.user_id;

    if (!authUserId) {
      const error = new AppError('Not authorised', ResponseCodes.BadRequest);
      return Promise.resolve(
        new ReturnType(false, 'Not authorised', null, error)
      );
    }

    return this.serviceManager.updateCartItems({
      ...(request.body ?? {}),
      userId: authUserId,
    });
  }
}
