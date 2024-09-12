// Define how data will be transfered
export interface CreateCartItemDTO {
  productId: string;
  userId: string;
  quantity: number;
}

export interface CartItemsquery {
  id?: number | number[];
  userId?: string | string[];
  productId?: string | string[];
}

export interface CreateWishlistItemDTO {
  productId: string;
  userId: string;
}

export interface WishlistItemsquery {
  id?: number | number[];
  userId?: string | string[];
  productId?: string | string[];
}

export type PaginationOptions = {
  page?: number;
  limit?: number;
};
