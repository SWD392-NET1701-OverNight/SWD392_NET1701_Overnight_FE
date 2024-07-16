import { z } from 'zod'

export const createProductSchema = z.object({
  productName: z.string().min(4, { message: 'Product name is required' }),
  description: z.string().min(4, { message: 'Description is required' }),
  categoryID: z.string().min(1, { message: 'Category is required' }),
})
export const createProductSchemaBySystem = z.object({
  productName: z.string().min(4, { message: 'Product name is required' }),
  description: z.string().min(4, { message: 'Description is required' }),
  categoryID: z.string().min(1, { message: 'Category is required' }),
  designID: z.string().min(1, { message: 'Design is required' }),
})
