import { Router } from 'express';
import { ProductRoutes } from '../modules/product/product.route';
const router = Router();

const moduleRoutes = [{ path: '/products', element: ProductRoutes }];

moduleRoutes.forEach((route) => router.use(route.path, route.element));

export const AllRoutes = router;
