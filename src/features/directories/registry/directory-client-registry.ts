import { ZodType } from 'zod';
import { DirectoryModel } from '../types/directory-models';
import { WagonTypeClientConfig } from '../../wagon-type/client.config';
import { WagonOwnerClientConfig } from '../../wagon-owner/client.config';
import { StationClientConfig } from '../../station/client.config';
import { WagonClientConfig } from '../../wagon/client.config';

import { CargoOwnerClientConfig } from '../../cargo-owner/client.config';
import { CargoClientConfig } from '../../cargo/client.config';
import { OperationTypeClientConfig } from '../../operation-type/client.config';

export const directoryClientRegistry = {
  WagonType: WagonTypeClientConfig,
  WagonOwner: WagonOwnerClientConfig,
  Station: StationClientConfig,
  Wagon: WagonClientConfig,
  Cargo: CargoClientConfig,
  CargoOwner: CargoOwnerClientConfig,
  OperationType: OperationTypeClientConfig,
} satisfies Partial<Record<DirectoryModel, { createSchema: ZodType; updateSchema?: ZodType }>>;
