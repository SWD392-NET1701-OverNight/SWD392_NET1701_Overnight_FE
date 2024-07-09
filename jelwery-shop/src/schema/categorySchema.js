import { z } from 'zod'

export const categorySchema = z.object({
  catName: z.string().min(3, { message: 'Category name must be at least 3 characters' }),
  description: z.string().min(3, { message: 'Description must be at least 3 characters' }),
})
