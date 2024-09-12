import 'dotenv/config';
import { NODE_ENV } from './domain/enums/utils';
// Inject all your environment variables here
/* eslint-disable no-process-env */
export default {
  PORT: process.env.PORT || 6000,
  NODE_ENV: process.env.NODE_ENV || NODE_ENV.DEVELOPMENT,
};
