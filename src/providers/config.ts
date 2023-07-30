import 'dotenv/config';
import { z } from 'zod';

const ConfigSchema = z.object({
  // Logging
  LOG_LEVEL: z.string().default('info'),

  // HTTP
  HTTP_HOST: z.string(),
  HTTP_PORT: z.preprocess(Number, z.number().int()),

  // GELF
  GELF_ADDRESS: z.string().optional()
});

function loadConfig() {
  try {
    return ConfigSchema.parse(process.env);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

export default loadConfig();
