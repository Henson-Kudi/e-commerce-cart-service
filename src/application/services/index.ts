import {
  CartItemsquery,
  CreateCartItemDTO,
  CreateWishlistItemDTO,
  PaginationOptions,
  WishlistItemsquery,
} from '../../domain/dtos';
import { MessageBroker } from '../../infrastructure/providers';
import Repository from '../../infrastructure/repositories';
import AddItemToCartUseCase from '../use-cases/cart/addItem';
import GetCartItems from '../use-cases/cart/findItems';
import RemoveCartItems from '../use-cases/cart/removeItem';
import UpdateCartItem from '../use-cases/cart/updateItem';
import AddItemToWishlistUseCase from '../use-cases/wishlist/addItem';
import GetWishlistItems from '../use-cases/wishlist/findItems';
import RemoveWishlistItems from '../use-cases/wishlist/removeItem';

// This file should bring your usecases together. eg: userService could be a combination of all user related use cases
export class ServiceManager {
  private readonly repository = new Repository();
  private readonly messageBroker = new MessageBroker();

  // Add your services here
  addCartItem(params: CreateCartItemDTO) {
    return new AddItemToCartUseCase(
      this.repository,
      this.messageBroker
    ).execute(params);
  }

  getCartItems(params: {
    filter?: CartItemsquery;
    options?: PaginationOptions;
  }) {
    return new GetCartItems(this.repository).execute(params);
  }

  deleteCartItems(params: CartItemsquery) {
    return new RemoveCartItems(this.repository, this.messageBroker).execute(
      params
    );
  }

  updateCartItems(params: CreateCartItemDTO) {
    return new UpdateCartItem(this.repository, this.messageBroker).execute(
      params
    );
  }

  // Wishlist
  addWishlistItem(params: CreateWishlistItemDTO) {
    return new AddItemToWishlistUseCase(
      this.repository,
      this.messageBroker
    ).execute(params);
  }

  getWishlistItems(params: {
    filter?: WishlistItemsquery;
    options?: PaginationOptions;
  }) {
    return new GetWishlistItems(this.repository).execute(params);
  }

  deleteWishlistItems(params: WishlistItemsquery) {
    return new RemoveWishlistItems(this.repository, this.messageBroker).execute(
      params
    );
  }
}

export default new ServiceManager();
