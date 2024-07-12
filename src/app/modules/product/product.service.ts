import QueryBuilder from '../../builder/QueryBuilder';
import {
  excludedProductQueryField,
  productSearchableFields,
} from './product.constant';
import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(
    Product.find({ isDeleted: false }),
    query,
  )
    .search(productSearchableFields)
    .filter(excludedProductQueryField)
    .priceRange()
    .paginate(1, 10)
    .sort();
  const result = await productQuery.modelQuery;
  // console.log(result.length, query);
  return result;
};

const getProductsForSearchBoxFromDB = async (
  query: Record<string, unknown>,
) => {
  const resultQuery = new QueryBuilder(
    Product.find({ isDeleted: false }, { name: 1 }),
    query,
  )
    .search(productSearchableFields)
    .paginate(1, 6);
  const result = await resultQuery.modelQuery;

  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findOne({ _id: id, isDeleted: false });
  return result;
};

const updateProductIntoDB = async (id: string, payload: Partial<TProduct>) => {
  const result = await Product.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteProductFromDB = async (id: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const result = await Product.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return null;
};

export const ProductService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getProductsForSearchBoxFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
