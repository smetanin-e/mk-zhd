'use server';

import { directoryServerRegistry } from '../registry/directory-server-registry';
import { DirectoryModel } from '../types/directory-models';

export async function createDirectoryItem(model: DirectoryModel, data: Record<string, unknown>) {
  try {
    const config = directoryServerRegistry[model];

    return config.createAction(data);
  } catch (error) {
    console.error(error);
  }
}
