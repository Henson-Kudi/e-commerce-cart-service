// You can modify this file the way you like but make sure to export the router as default so that it initialised in index.ts
import { Router } from 'express';
import getCartItems from './handlers/getCartItems';
import addToCart from './handlers/addToCart';
import updateCartItem from './handlers/updateCartItem';
import removeFromCart from './handlers/removeFromCart';
import getWishlistItems from './handlers/getWishlistItems';
import addToWishlist from './handlers/addToWishlist';
import removeFromWishlist from './handlers/removeFromWishlist';

const router = Router();

// Define your routes here
router
  .route('/cart')
  .get(getCartItems)
  .post(addToCart)
  .put(updateCartItem)
  .delete(removeFromCart);

router
  .route('/wish-list')
  .get(getWishlistItems)
  .post(addToWishlist)
  .delete(removeFromWishlist);

export default router;
