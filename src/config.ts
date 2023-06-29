import 'dotenv/config';

const throwError = (message: string): never => {
    throw new Error(message);
};

export const COMPANY_ID = process.env.COMPANY_ID ?? throwError('Missing COMPANY_ID');