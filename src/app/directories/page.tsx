// import { DirectoriesView } from '@/src/shared/components/directories/directories-view';

// export default function DirectoriesPage() {
//   return <DirectoriesView />;
// }

import { redirect } from 'next/navigation';

export default function DirectoriesPage() {
  redirect('/directories/wagons');
}
