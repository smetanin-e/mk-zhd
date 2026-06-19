/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { redirect } from 'next/navigation';
import { AppError, ConflictError, NotFoundError, UnauthorizedError } from './app-error';
import { logger } from '../logger';

export type ActionResult<T = any> = {
  success: boolean;
  data?: T;
  message: string;
  code?: string;
};

// функция для обработки ошибок с выбрасыванием
export function throwActionError(error: unknown, redirectOnUnauthorized: boolean = true): never {
  // Логируем ошибку
  logger.error(`[Action Error]:`, error);

  // Если ошибка кастомная
  if (error instanceof AppError) {
    // Если не авторизован и нужно редиректить
    if (error instanceof UnauthorizedError && redirectOnUnauthorized) {
      redirect('/auth/login');
    }

    // Пробрасываем кастомную ошибку дальше
    throw error;
  }

  // Ошибка Prisma
  if (error instanceof Error && error.name === 'PrismaClientKnownRequestError') {
    // @ts-ignore
    if (error.code === 'P2002') {
      throw new ConflictError('Запись с такими данными уже существует');
    }
    // @ts-ignore
    if (error.code === 'P2025') {
      throw new NotFoundError('Запись не найдена');
    }
  }

  // Ошибка валидации Zod
  if (error instanceof Error && error.name === 'ZodError') {
    throw new AppError('Ошибка валидации данных', 400, 'VALIDATION_ERROR');
  }

  // Неизвестная ошибка
  throw new AppError('Произошла ошибка при выполнении операции', 500, 'UNKNOWN_ERROR');
}

// функция для случаев, когда нужно вернуть результат без выбрасывания
export async function handleActionError<T>(
  error: unknown,
  redirectOnUnauthorized: boolean = true,
): Promise<ActionResult<T>> {
  // Логируем ошибку
  logger.error(`[API Error]:`, error);

  // Если ошибка кастомная
  if (error instanceof AppError) {
    // Если не авторизован и нужно редиректить
    if (error instanceof UnauthorizedError && redirectOnUnauthorized) {
      redirect('/auth/login');
    }

    return {
      success: false,
      message: error.message,
      code: error.code,
    };
  }

  // Ошибка Prisma
  if (error instanceof Error && error.name === 'PrismaClientKnownRequestError') {
    // @ts-ignore
    if (error.code === 'P2002') {
      return {
        success: false,
        message: 'Запись с такими данными уже существует',
        code: 'DUPLICATE_ERROR',
      };
    }
  }

  // Неизвестная ошибка
  return {
    success: false,
    message: 'Произошла ошибка при выполнении операции',
    code: 'UNKNOWN_ERROR',
  };
}
