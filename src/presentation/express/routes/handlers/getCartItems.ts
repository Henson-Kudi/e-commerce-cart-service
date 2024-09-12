import { NextFunction, Request, Response } from 'express';
import ServiceManager from '../../../../application/services';
import expressAdapter from '../../../adapters/expressAdapter';
import { ResponseCodes } from '../../../../domain/enums/responseCode';
import GetCartItemsController from '../../../http/controllers/getCartItems.controller';

export default async function getCartItems(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await expressAdapter(
      req,
      new GetCartItemsController(ServiceManager)
    );

    if (!result.success) {
      throw result.error;
    }

    return res.status(ResponseCodes.Success).json(result);
  } catch (err) {
    next(err);
  }
}
