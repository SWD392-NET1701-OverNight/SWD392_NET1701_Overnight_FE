import { z } from 'zod'
export const createProductSchema = z.object({
  productName: z.string().min(4, {
    message: 'Product name must be at least 4 characters long to ensure clarity and uniqueness.',
  }),
  description: z.string().min(4, {
    message: 'Description must be at least 4 characters long to provide enough detail.',
  }),
  categoryID: z
    .string()
    .min(1, { message: 'Category ID is required to categorize the product properly.' }),
  processPrice: z.number().min(1, { message: 'Proccess Price must be at least 1.' }),
  priceDesign: z.number().min(1, { message: 'Price Design must be at least 1.' }),
})

export const createProductSchemaBySystem = z.object({
  productName: z.string().min(4, {
    message: 'Product name must be at least 4 characters long to ensure clarity and uniqueness.',
  }),
  description: z.string().min(4, {
    message: 'Description must be at least 4 characters long to provide enough detail.',
  }),
  processPrice: z.number().min(1, { message: 'Proccess Price must be at least 1.' }),
  priceDesign: z.number().min(1, { message: 'Price Design must be at least 1.' }),
  categoryID: z
    .number()
    .min(1, { message: 'Category ID is required to categorize the product properly.' }),
  designID: z
    .number()
    .min(1, { message: 'Design ID is required to associate the product with a specific design.' }),
})
