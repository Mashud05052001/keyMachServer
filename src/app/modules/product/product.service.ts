import QueryBuilder from '../../builder/QueryBuilder';
import {
  excludedProductQueryField,
  productSearchableFields,
} from './product.constant';
import { TProduct, TUpdateProps } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getProductsCountFromDB = async () => {
  const result = await Product.countDocuments();
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
  // const noOfTotalProducts = await Product.countDocuments();
  // console.log(result.length, query);
  // return { noOfTotalProducts, data: result };
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

const updateProductQuantityWhileOrderingIntoDB = async (
  payload: TUpdateProps[],
) => {
  try {
    await Promise.all(
      payload.map(async (item) => {
        return await Product.findByIdAndUpdate(item._id, {
          $inc: { quantity: -item.quantity },
        });
      }),
    );
    return 'Successfully updated data';
  } catch (error) {
    console.error('Error updating products:', error);
    throw error;
  }
};

export const ProductService = {
  createProductIntoDB,
  getProductsCountFromDB,
  getAllProductsFromDB,
  getProductsForSearchBoxFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
  updateProductQuantityWhileOrderingIntoDB,
};
