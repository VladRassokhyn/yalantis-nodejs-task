import { requests } from './requests.logger';
import { uncaughtException } from './uncaughtException.logger';
import { unhandledError } from './unhandledErrors.logger';
import { unhandledRejection } from './unhandledRejection.logger';

export const logger = {
  requests,
  uncaughtException,
  unhandledError,
  unhandledRejection
};