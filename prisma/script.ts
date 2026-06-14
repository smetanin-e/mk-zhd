import { UserRole } from '@/generated/prisma/enums';
import { generateSalt, hashPassword } from '@/src/shared/lib/auth/password-utils';
import { prisma } from '@/src/shared/lib/prisma';

async function main() {
  const salt = generateSalt();
  const password = await hashPassword('12345678', salt);

  const user = await prisma.user.create({
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
  console.log('Created user:', user);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
