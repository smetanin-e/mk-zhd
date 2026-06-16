'use server';

import {
  directoryServerRegistry,
  ServerDirectoryModel,
} from '../registry/directory-server-registry';

export async function createDirectoryItem(
  model: ServerDirectoryModel,
  data: Record<string, unknown>,
) {
  try {
    const config = directoryServerRegistry[model];

    return config.createAction(data);
  } catch (error) {
    console.error(error);
  }
}
