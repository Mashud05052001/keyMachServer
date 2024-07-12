/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductService } from './product.service';

const createProduct = catchAsync(async (req, res, next) => {
  const data = req?.body;
  const result = await ProductService.createProductIntoDB(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is created successfully',
    data: result,
  });
});

const getAllProducts = catchAsync(async (req, res, next) => {
  const query = req?.query;
  const result = await ProductService.getAllProductsFromDB(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Products are retrieved successfully',
    data: result,
  });
});

const getProductsForSearchBox = catchAsync(async (req, res, next) => {
  const query = req?.query;
  const result = await ProductService.getProductsForSearchBoxFromDB(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Products are retrieved successfully',
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res, next) => {
  const id = req.params?.id;
  const result = await ProductService.getSingleProductFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is retrieved successfully',
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res, next) => {
  const id = req.params?.id;
  const data = req.body;
  const result = await ProductService.updateProductIntoDB(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is updated successfully',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res, next) => {
  const id = req.params?.id;
  const result = await ProductService.deleteProductFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is deleted successfully',
    data: result,
  });
});

export const ProductController = {
  createProduct,
  getAllProducts,
  getProductsForSearchBox,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
