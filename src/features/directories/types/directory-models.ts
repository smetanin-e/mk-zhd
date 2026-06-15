export const DIRECTORY_MODELS = [
  'Wagon',
  'WagonType',
  'WagonOwner',
  'Cargo',
  'CargoOwner',
  'Station',
  'OperationType',
] as const;

export type DirectoryModel = (typeof DIRECTORY_MODELS)[number];
