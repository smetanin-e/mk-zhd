import { DirectionNav } from '@/src/shared/components/directories/direction-nav';

export default function DirectoriesLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='mx-auto w-full px-4 py-4'>
      <header className='mb-4 flex flex-col gap-1'>
        <h1 className='text-2xl font-semibold tracking-tight'>Справочники</h1>
        <p className='text-sm text-muted-foreground'>
          Управление списками справочных данных системы
        </p>
      </header>
      <DirectionNav />
      {children}
    </main>
  );
}
