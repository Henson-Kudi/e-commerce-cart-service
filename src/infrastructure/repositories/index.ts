import { Prisma, CartItem, WishlistItem } from '@prisma/client';
import IRepository from '../../application/repositories';
import database from '../database';

// Implementation of all database repositories defined in application/repositories
export default class Repository implements IRepository {
  createCartItem(data: Prisma.CartItemCreateArgs): Promise<CartItem> {
    return database.cartItem.create(data);
  }
  updateCartItem(data: Prisma.CartItemUpdateArgs): Promise<CartItem> {
    return database.cartItem.update(data);
  }

  removeCartItems(
    query: Prisma.CartItemDeleteManyArgs
  ): Promise<Prisma.BatchPayload> {
    return database.cartItem.deleteMany(query);
  }

  removeCartItemsById(ids: number[]): Promise<Prisma.BatchPayload> {
    return database.cartItem.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
  clearCart(userId: string): Promise<Prisma.BatchPayload> {
    return database.cartItem.deleteMany({
      where: {
        userId: userId,
      },
    });
  }
  getCartByUserId(userId: string): Promise<CartItem[]> {
    return database.cartItem.findMany({
      where: {
        userId: userId,
      },
    });
  }

  findCartItem(query: Prisma.CartItemFindUniqueArgs): Promise<CartItem | null> {
    return database.cartItem.findUnique(query);
  }

  findCartItems(query: Prisma.CartItemFindManyArgs): Promise<CartItem[]> {
    return database.cartItem.findMany(query);
  }

  countCartItems(query: Prisma.CartItemCountArgs): Promise<number> {
    return database.cartItem.count(query);
  }

  // Wishlist / Favorites
  createWishlistItem(
    data: Prisma.WishlistItemCreateArgs
  ): Promise<WishlistItem> {
    return database.wishlistItem.create(data);
  }
  updateWishlistItem(
    data: Prisma.WishlistItemUpdateArgs
  ): Promise<WishlistItem> {
    return database.wishlistItem.update(data);
  }
  removeWishlistItems(
    query: Prisma.WishlistItemDeleteManyArgs
  ): Promise<Prisma.BatchPayload> {
    return database.wishlistItem.deleteMany(query);
  }

  removeWishlistItemsById(ids: number[]): Promise<Prisma.BatchPayload> {
    return database.wishlistItem.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
  clearWishlist(userId: string): Promise<Prisma.BatchPayload> {
    return database.wishlistItem.deleteMany({
      where: {
        userId: userId,
      },
    });
  }
  getWishlistByUserId(userId: string): Promise<WishlistItem[]> {
    return database.wishlistItem.findMany({
      where: {
        userId: userId,
      },
    });
  }

  findWishlistItem(
    query: Prisma.WishlistItemFindUniqueArgs
  ): Promise<WishlistItem | null> {
    return database.wishlistItem.findUnique(query);
  }

  findWishlistItems(
    query: Prisma.WishlistItemFindManyArgs
  ): Promise<WishlistItem[]> {
    return database.wishlistItem.findMany(query);
  }

  countWishlistItems(query: Prisma.WishlistItemCountArgs): Promise<number> {
    return database.wishlistItem.count(query);
  }
}
