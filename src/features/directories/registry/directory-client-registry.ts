import { ZodType } from 'zod';
import { DirectoryModel } from '../types/directory-models';
import { WagonTypeClientConfig } from '../wagon-type/wagon-type-client.config';
import { WagonOwnerClientConfig } from '../wagon-owner/wagon-owner-client.config';
import { StationClientConfig } from '../station/station-client.config';

export const directoryClientRegistry = {
  WagonType: WagonTypeClientConfig,
  WagonOwner: WagonOwnerClientConfig,
  Station: StationClientConfig,
} satisfies Partial<Record<DirectoryModel, { createSchema: ZodType; updateSchema?: ZodType }>>;
