import { CargoOwnerServerConfig } from '../../cargo-owner/server.config';
import { CargoServerConfig } from '../../cargo/server.config';
import { OperationTypeServerConfig } from '../../operation-type/server.config';
import { StationServerConfig } from '../../station/server.config';
import { DirectoryModel } from '../types/directory-models';
import { WagonOwnerServerConfig } from '../../wagon-owner/server.config';
import { WagonTypeServerConfig } from '../../wagon-type/server.config';
import { WagonServerConfig } from '../../wagon/server.config';

export const directoryServerRegistry = {
  WagonType: WagonTypeServerConfig,
  WagonOwner: WagonOwnerServerConfig,
  Station: StationServerConfig,
  Wagon: WagonServerConfig,
  Cargo: CargoServerConfig,
  CargoOwner: CargoOwnerServerConfig,
  OperationType: OperationTypeServerConfig,
} satisfies Partial<Record<DirectoryModel, unknown>>;
