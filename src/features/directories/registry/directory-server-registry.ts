import { StationServerConfig } from '../station/station-server.config';
import { DirectoryModel } from '../types/directory-models';
import { WagonOwnerServerConfig } from '../wagon-owner/wagon-owner-server.config';
import { WagonTypeServerConfig } from '../wagon-type/wagon-type-server.config';

export const directoryServerRegistry = {
  WagonType: WagonTypeServerConfig,
  WagonOwner: WagonOwnerServerConfig,
  Station: StationServerConfig,
} satisfies Partial<Record<DirectoryModel, unknown>>;

//TODO ВРЕМЕННО - пока не заполнятся все поля DirectoryModel
export type ServerDirectoryModel = keyof typeof directoryServerRegistry;
