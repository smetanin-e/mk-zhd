import { UserRole } from '@/generated/prisma/enums';
import { generateSalt, hashPassword } from '@/src/shared/lib/auth/password-utils';
import { prisma } from '@/src/shared/lib/prisma';

async function clearData() {
  console.log('Clearing database...');

  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE 
      "Wagon",
      "WagonType",
      "WagonOwner",
      "InsideStation",
      "OutsideStation",
      "Cargo",
      "User"
    RESTART IDENTITY CASCADE;
  `);
}

async function seedUsers() {
  console.log('Seeding users...');

  const salt = generateSalt();
  const password = await hashPassword('12345678', salt);

  await prisma.user.create({
    data: {
      login: 'Admin',
      password,
      salt,
      surname: 'Сметанин',
      firstName: 'Евгений',
      secondName: 'Евгеньевич',
      role: UserRole.ADMIN,
    },
  });
}

async function seedWagonTypes() {
  console.log('Seeding wagon types...');

  return await prisma.wagonType.createMany({
    data: [
      { name: 'Полувагон' },
      { name: 'Хоппер' },
      { name: 'Цистерна' },
      { name: 'Крытый' },
      { name: 'Платформа' },
    ],
  });
}

async function seedWagonOwners() {
  console.log('Seeding wagon owners...');

  return await prisma.wagonOwner.createMany({
    data: [{ name: 'РЖД' }, { name: 'Металлоинвест' }, { name: 'НОВАТЭК' }, { name: 'СУЭК' }],
  });
}

async function seedWagons() {
  console.log('Seeding wagons...');

  // Получаем ID типов и владельцев
  const types = await prisma.wagonType.findMany();
  const owners = await prisma.wagonOwner.findMany();

  // Примерные характеристики вагонов
  const wagons = [
    {
      number: '23749545',
      typeId: types[0].id,
      ownerId: owners[0].id,
      barPackage: 2.5,
      capacity: 70.0,
      volume: 60.0,
    },
    {
      number: '55320982',
      typeId: types[1].id,
      ownerId: owners[1].id,
      barPackage: 2.7,
      capacity: 64.3,
      volume: 54.9,
    },
    {
      number: '70812345',
      typeId: types[2].id,
      ownerId: owners[2].id,
      barPackage: 3.1,
      capacity: 66.5,
      volume: 50.2,
    },
  ];

  for (const wagon of wagons) {
    await prisma.wagon.create({ data: wagon });
  }
}

async function seedInsideStations() {
  console.log('Seeding inside stations...');

  return await prisma.insideStation.createMany({
    data: [
      { name: 'Погрузка-1' },
      { name: 'Погрузка-2' },
      { name: 'Разгрузка-1' },
      { name: 'Разгрузка-2' },
      { name: 'Сортировочная' },
    ],
  });
}

async function seedOutsideStations() {
  console.log('Seeding outside stations...');

  return await prisma.outsideStation.createMany({
    data: [
      { name: 'Макеевка', code: '800001' },
      { name: 'Ясиноватая', code: '800002' },
      { name: 'Иловайск', code: '800003' },
      { name: 'Дебальцево', code: '800004' },
    ],
  });
}

async function seedCargo() {
  console.log('Seeding cargo...');

  return await prisma.cargo.createMany({
    data: [
      {
        name: 'Уголь энергетический',
        nationalCode: '101000',
        internationalCode: 'H0101',
      },
      {
        name: 'Уголь коксующийся',
        nationalCode: '101100',
        internationalCode: 'H0102',
      },
      {
        name: 'Щебень',
        nationalCode: '102200',
        internationalCode: 'G2201',
      },
      {
        name: 'Известняк',
        nationalCode: '104500',
        internationalCode: 'G4501',
      },
    ],
  });
}

async function main() {
  try {
    await clearData();
    await seedUsers();
    await seedWagonTypes();
    await seedWagonOwners();
    await seedWagons();
    await seedInsideStations();
    await seedOutsideStations();
    await seedCargo();

    console.log('Seed completed successfully!');
  } catch (error) {
    console.error('Seed error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
