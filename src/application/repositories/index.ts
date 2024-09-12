import { CartItem, Prisma, WishlistItem } from '@prisma/client';

// Define interfaces for your repositories. How to communicate with your database
export default interface IRepository {
  createCartItem(data: Prisma.CartItemCreateArgs): Promise<CartItem>;
  updateCartItem(data: Prisma.CartItemUpdateArgs): Promise<CartItem>;
  removeCartItems(
    query: Prisma.CartItemDeleteManyArgs
  ): Promise<Prisma.BatchPayload>;
  removeCartItemsById(ids: number[]): Promise<Prisma.BatchPayload>;
  clearCart(userId: string): Promise<Prisma.BatchPayload>;
  getCartByUserId(userId: string): Promise<CartItem[]>;
  findCartItems(query: Prisma.CartItemFindManyArgs): Promise<CartItem[]>;
  countCartItems(query: Prisma.CartItemCountArgs): Promise<number>;
  findCartItem(query: Prisma.CartItemFindUniqueArgs): Promise<CartItem | null>;

  createWishlistItem(
    data: Prisma.WishlistItemCreateArgs
  ): Promise<WishlistItem>;
  updateWishlistItem(
    data: Prisma.WishlistItemUpdateArgs
  ): Promise<WishlistItem>;
  removeWishlistItems(
    query: Prisma.WishlistItemDeleteManyArgs
  ): Promise<Prisma.BatchPayload>;
  removeWishlistItemsById(ids: number[]): Promise<Prisma.BatchPayload>;
  clearWishlist(userId: string): Promise<Prisma.BatchPayload>;
  getWishlistByUserId(userId: string): Promise<WishlistItem[]>;
  findWishlistItems(
    query: Prisma.WishlistItemFindManyArgs
  ): Promise<WishlistItem[]>;
  countWishlistItems(query: Prisma.WishlistItemCountArgs): Promise<number>;
  findWishlistItem(
    query: Prisma.WishlistItemFindUniqueArgs
  ): Promise<WishlistItem | null>;
}
