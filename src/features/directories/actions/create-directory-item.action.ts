'use server';

import { throwActionError } from '@/src/shared/lib/errors/actions-error-handler';
import { directoryServerRegistry } from '../registry/directory-server-registry';
import { DirectoryModel } from '../types/directory-models';

export async function createDirectoryItem(model: DirectoryModel, data: Record<string, unknown>) {
  try {
    const config = directoryServerRegistry[model];

    return config.createAction(data);
  } catch (error) {
    // Используем throwActionError для проброса ошибки
    throwActionError(error);
  }
}
