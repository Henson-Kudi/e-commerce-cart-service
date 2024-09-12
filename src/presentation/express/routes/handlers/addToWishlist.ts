import { NextFunction, Request, Response } from 'express';
import AddToWishlistController from '../../../http/controllers/addToWishlist.controller';
import ServiceManager from '../../../../application/services';
import expressAdapter from '../../../adapters/expressAdapter';
import { ResponseCodes } from '../../../../domain/enums/responseCode';

export default async function addToWishlist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await expressAdapter(
      req,
      new AddToWishlistController(ServiceManager)
    );

    if (!result.success) {
      throw result.error;
    }

    return res.status(ResponseCodes.Success).json(result);
  } catch (err) {
    next(err);
  }
}
