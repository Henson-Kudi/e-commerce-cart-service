export class Cart {
  constructor(
    public userId: string,
    public items: CartItem[]
  ) {}
}

export class CartItem {
  constructor(
    public productId: string,
    public quantity: number
  ) {}
}
