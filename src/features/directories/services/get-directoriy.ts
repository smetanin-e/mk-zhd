import { directoryRepository } from './directory.repository';

export async function getDirectory<T extends keyof typeof directoryRepository>(model: T) {
  try {
    return directoryRepository[model]();
  } catch (error) {
    //TODO ДОБАВИТЬ LOGGER
    console.log(error);
    return [];
  }
}
