import { z } from 'zod'

export const feedbackSchema = z.object({
  productID: z.string({ message: 'Please select a product' }),
  rate: z
    .number()
    .int()
    .min(1, { message: 'Please rate the product' })
    .max(5, { message: 'Please rate the product' }),
  content: z.string().min(3, { message: 'Feedback must be at least 3 characters' }),
})
