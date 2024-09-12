import { NextFunction, Request, Response } from 'express';
import ServiceManager from '../../../../application/services';
import expressAdapter from '../../../adapters/expressAdapter';
import { ResponseCodes } from '../../../../domain/enums/responseCode';
import GetWishlistItemsController from '../../../http/controllers/getWishlistItems.controller';

export default async function getWishlistItems(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await expressAdapter(
      req,
      new GetWishlistItemsController(ServiceManager)
    );

    if (!result.success) {
      throw result.error;
    }

    return res.status(ResponseCodes.Success).json(result);
  } catch (err) {
    next(err);
  }
}
