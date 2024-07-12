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
router.get('/search', ProductController.getProductsForSearchBox);
router.get('/:id', ProductController.getSingleProduct);

router.patch(
  '/:id',
  validateRequest(ProductValidation.updateProductValidationSchema),
  ProductController.updateProduct,
);
router.delete('/:id', ProductController.deleteProduct);

export const ProductRoutes = router;
