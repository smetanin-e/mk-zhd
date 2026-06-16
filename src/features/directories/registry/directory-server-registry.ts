import { DirectoryModel } from '../types/directory-models';
import { createWagonType } from '../wagon-type/wagon-type.service';

export const directoryServerRegistry = {
  WagonType: {
    createAction: createWagonType,
  },
} satisfies Partial<Record<DirectoryModel, unknown>>;

//TODO ВРЕМЕННО - пока не заполнятся все поля DirectoryModel
export type ServerDirectoryModel = keyof typeof directoryServerRegistry;
