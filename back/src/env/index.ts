import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  HOST: z.string(),
  USER: z.string(),
  PASSWORD: z.string(),
  DATABASE_NAME: z.string(),
  DATABASE_PORT: z.coerce.number().default(3306),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data