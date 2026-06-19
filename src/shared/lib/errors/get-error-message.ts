// shared/lib/errors/get-error-message.ts

import { AppError } from './app-error';

export function getErrorMessage(error: unknown): string {
  if (error instanceof AppError) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message || 'Произошла ошибка при создании';
  }

  return 'Произошла неизвестная ошибка';
}
