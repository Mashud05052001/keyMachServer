import { Schema, model } from 'mongoose';
import { TProduct } from './product.interface';
import { productBrands } from './product.constant';
/*
  name: string;
  price: number;
  description: string;
  quantiry: number;
  rating: number;
  brand: TKeyboardBrand;
  image: string;
 */

const productSchema = new Schema<TProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    rating: { type: Number, required: true },
    quantity: { type: Number, required: true },
    description: { type: String, required: true },
    brand: { type: String, enum: { values: productBrands }, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const Product = model<TProduct>('Product', productSchema);
