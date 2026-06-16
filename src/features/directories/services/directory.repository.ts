import {
  Cargo,
  CargoOwner,
  OperationType,
  Station,
  Wagon,
  WagonOwner,
  WagonType,
} from '@/generated/prisma/client';
import { prisma } from '@/src/shared/lib/prisma';
import { serializePrisma } from '@/src/shared/lib/serialize-prisma';

type DirectoryRepository = {
  Wagon: () => Promise<Wagon[]>;
  WagonType: () => Promise<WagonType[]>;
  WagonOwner: () => Promise<WagonOwner[]>;
  Cargo: () => Promise<Cargo[]>;
  CargoOwner: () => Promise<CargoOwner[]>;
  Station: () => Promise<Station[]>;
  OperationType: () => Promise<OperationType[]>;
};

export const directoryRepository: DirectoryRepository = {
  WagonType: () => prisma.wagonType.findMany(),
  Wagon: async () => {
    const wagons = await prisma.wagon.findMany();

    return serializePrisma(wagons);
  },
  WagonOwner: () => prisma.wagonOwner.findMany(),
  CargoOwner: () => prisma.cargoOwner.findMany(),
  Cargo: () => prisma.cargo.findMany(),
  Station: () => prisma.station.findMany(),
  OperationType: () => prisma.operationType.findMany(),
};
