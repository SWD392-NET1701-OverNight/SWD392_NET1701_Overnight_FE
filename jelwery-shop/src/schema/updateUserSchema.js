import { z } from 'zod'
export const updateUserSchema = z.object({
  fullName: z.string().min(6, { message: 'Full name must be at least 6 characters' }),
  phoneNum: z.string().min(10, { message: 'Phone number must be at least 10 characters' }),
  address: z.string().min(6, { message: 'Address must be at least 6 characters' }),
  email: z.string().email({ message: 'Invalid email' }),
})
