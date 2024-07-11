import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(3),
  // .min(6, { message: 'Password must be at least 6 characters' })
  // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{6,}$/, {
  //   message:
  //     'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  // }),
})
