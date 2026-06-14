import { DirectoriesView } from '@/src/shared/components/directories/directories-view';

export default function DirectoriesPage() {
  return (
    <main className='mx-auto w-full px-4 py-8 md:py-12'>
      <header className='mb-8 flex flex-col gap-1'>
        <h1 className='text-2xl font-semibold tracking-tight'>Справочники</h1>
        <p className='text-sm text-muted-foreground'>
          Управление списками справочных данных системы
        </p>
      </header>

      <DirectoriesView />
    </main>
  );
}
