export class Wishlist {
  constructor(
    public userId: string,
    public items: WishlistItem[]
  ) {}
}

export class WishlistItem {
  constructor(public productId: string) {}
}
