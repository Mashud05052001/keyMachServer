import { Router } from 'express';
// Pleast put first alphabet smallercase carefully
import { ProductController } from './product.scontroller';
import validateRequest from '../../middleware/validateRequest';
import { ProductValidation } from './product.validation';

const router = Router();

router.post(
  '/create-product',
  validateRequest(ProductValidation.createProductValidationSchema),
  ProductController.createProduct,
);
router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getSingleProduct);
router.get('/productsCount/count', ProductController.getProductsCount);
router.get('/search', ProductController.getProductsForSearchBox);

router.patch(
  '/:id',
  validateRequest(ProductValidation.updateProductValidationSchema),
  ProductController.updateProduct,
);
router.delete('/:id', ProductController.deleteProduct);
router.put(
  '/',
  validateRequest(ProductValidation.updateQuantityArrayValidationSchema),
  ProductController.updateProductQuantityWhileOrdering,
);

export const ProductRoutes = router;
