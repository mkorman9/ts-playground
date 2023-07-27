import 'dotenv/config';

const throwError = (message: string): never => {
  throw new Error(message);
};

export default {
  HTTP_HOST: process.env.HTTP_HOST || throwError('Missing HTTP_HOST'),
  HTTP_PORT: parseInt(process.env.HTTP_PORT || '') || throwError('Missing HTTP_PORT')
};
