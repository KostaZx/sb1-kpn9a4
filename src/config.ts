import { config } from 'dotenv';
import { z } from 'zod';

config();

const configSchema = z.object({
  TEBEX_WEBSTORE_ID: z.string(),
  PORT: z.string().transform(Number).default('3000'),
});

export const env = configSchema.parse(process.env);