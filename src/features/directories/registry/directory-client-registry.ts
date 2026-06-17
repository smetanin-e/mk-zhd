import { ZodType } from 'zod';
import { DirectoryModel } from '../types/directory-models';
import { WagonTypeClientConfig } from '../wagon-type/wagon-type-client.config';
import { WagonOwnerClientConfig } from '../wagon-owner/wagon-owner-client.config';
import { StationClientConfig } from '../station/station-client.config';
import { WagonClientConfig } from '../wagon/wagon-client.config';
import { CargoClientConfig } from '../cargo/cargo-client.config';
import { CargoOwnerClientConfig } from '../cargo-owner/cargo-owner-client.config';
import { OperationTypeClientConfig } from '../operation-type/operation-type-client.config';

export const directoryClientRegistry = {
  WagonType: WagonTypeClientConfig,
  WagonOwner: WagonOwnerClientConfig,
  Station: StationClientConfig,
  Wagon: WagonClientConfig,
  Cargo: CargoClientConfig,
  CargoOwner: CargoOwnerClientConfig,
  OperationType: OperationTypeClientConfig,
} satisfies Partial<Record<DirectoryModel, { createSchema: ZodType; updateSchema?: ZodType }>>;
