import { directories } from '@/src/shared/lib/directories';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui';
import { DirectoryContent } from './directory-content';

export function DirectoriesView() {
  return (
    <Tabs defaultValue={directories[0]?.id} className='gap-6'>
      <TabsList variant='line' className='flex-wrap'>
        {directories.map((directory) => (
          <TabsTrigger key={directory.id} value={directory.id}>
            {directory.title}
          </TabsTrigger>
        ))}
      </TabsList>

      {directories.map((directory) => (
        <TabsContent key={directory.id} value={directory.id}>
          <DirectoryContent directory={directory} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
