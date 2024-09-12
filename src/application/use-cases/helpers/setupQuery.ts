import { CartItemsquery } from '../../../domain/dtos';

export default function setupQuery(filter: CartItemsquery) {
  const query: Record<string, unknown> = {};

  if (filter.id) {
    query.id = Array.isArray(filter.id)
      ? {
          in: filter.id,
        }
      : filter.id;
  }

  if (filter.productId) {
    query.productId = Array.isArray(filter.productId)
      ? {
          in: filter.productId,
        }
      : filter.productId;
  }

  if (filter.userId) {
    query.userId = Array.isArray(filter.userId)
      ? {
          in: filter.userId,
        }
      : filter.userId;
  }

  return query;
}
