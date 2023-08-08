import 'dotenv/config';
import { z } from 'zod';
import log from './log';

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
  if (process.env.NODE_ENV === 'test') {
    return {} as z.infer<typeof ConfigSchema>;
  }

  try {
    return ConfigSchema.parse(process.env);
  } catch (err) {
    if (err instanceof Error) {
      log.error('Failed to parse configuration', { stack: err.stack });
    }

    process.exit(1);
  }
}

export default loadConfig();
