import { z } from 'zod';
import { productBrands } from './product.constant';

const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Product name must be required',
      invalid_type_error: 'Product name must be in string',
    }),
    price: z
      .number({
        required_error: 'Product price must be required',
        invalid_type_error: 'Product price must be in number',
      })
      .positive({ message: 'Product price cannot be a negative number' }),
    image: z
      .string({
        required_error: 'Product image must be required',
        invalid_type_error: 'Product image must be in string',
      })
      .url({ message: 'Invalid image url provided' }),
    rating: z
      .number({
        required_error: 'Product ratings must be required',
        invalid_type_error: 'Product ratings must be in number',
      })
      .min(0, 'Rating must be at least 0')
      .max(5, 'Rating cannot be more than 5'),
    quantity: z
      .number({
        required_error: 'Product quantity must be required',
        invalid_type_error: 'Product quantity must be in number',
      })
      .positive({ message: 'Product quantity cannot be a negative number' }),
    description: z.string({
      required_error: 'Product description must be required',
      invalid_type_error: 'Product description must be in string',
    }),
    brand: z.enum(productBrands as [string, ...string[]], {
      required_error: 'Product brand must be required',
      invalid_type_error: "This product brand doesn't exist in our server",
    }),
    isDeleted: z.boolean().optional(),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Product name must be required',
        invalid_type_error: 'Product name must be in string',
      })
      .optional(),
    price: z
      .number({
        required_error: 'Product price must be required',
        invalid_type_error: 'Product price must be in number',
      })
      .positive({ message: 'Product price cannot be a negative number' })
      .optional(),
    image: z
      .string({
        required_error: 'Product image must be required',
        invalid_type_error: 'Product image must be in string',
      })
      .url({ message: 'Invalid image url provided' })
      .optional(),
    rating: z
      .number({
        required_error: 'Product ratings must be required',
        invalid_type_error: 'Product ratings must be in number',
      })
      .min(0, 'Rating must be at least 0')
      .max(5, 'Rating cannot be more than 5')
      .optional(),
    quantity: z
      .number({
        required_error: 'Product quantity must be required',
        invalid_type_error: 'Product quantity must be in number',
      })
      .positive({ message: 'Product quantity cannot be a negative number' })
      .optional(),
    description: z
      .string({
        required_error: 'Product description must be required',
        invalid_type_error: 'Product description must be in string',
      })
      .optional(),
    brand: z
      .enum(productBrands as [string, ...string[]], {
        required_error: 'Product brand must be required',
        invalid_type_error: "This product brand doesn't exist in our server",
      })
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const updateQuantityObjectValidationSchema = z.object({
  _id: z.string({
    required_error: `Products ID's must be required`,
    invalid_type_error: `Product ID's are must be in string`,
  }),
  quantity: z
    .number({
      required_error: `Products quantities must be required`,
      invalid_type_error: `Product quantity are must be in string`,
    })
    .positive({ message: 'Product quantity cannot be a negative number' }),
});

const updateQuantityArrayValidationSchema = z.object({
  body: z.array(updateQuantityObjectValidationSchema, {
    required_error: 'Data must be required',
  }),
});

export const ProductValidation = {
  createProductValidationSchema,
  updateProductValidationSchema,
  updateQuantityArrayValidationSchema,
};
