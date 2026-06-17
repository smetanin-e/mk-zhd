import { CargoOwnerServerConfig } from '../cargo-owner/cargo-owner-server.config';
import { CargoServerConfig } from '../cargo/cargo-server.config';
import { OperationTypeServerConfig } from '../operation-type/operation-type-server.config';
import { StationServerConfig } from '../station/station-server.config';
import { DirectoryModel } from '../types/directory-models';
import { WagonOwnerServerConfig } from '../wagon-owner/wagon-owner-server.config';
import { WagonTypeServerConfig } from '../wagon-type/wagon-type-server.config';
import { WagonServerConfig } from '../wagon/wagon-server.config';

export const directoryServerRegistry = {
  WagonType: WagonTypeServerConfig,
  WagonOwner: WagonOwnerServerConfig,
  Station: StationServerConfig,
  Wagon: WagonServerConfig,
  Cargo: CargoServerConfig,
  CargoOwner: CargoOwnerServerConfig,
  OperationType: OperationTypeServerConfig,
} satisfies Partial<Record<DirectoryModel, unknown>>;
