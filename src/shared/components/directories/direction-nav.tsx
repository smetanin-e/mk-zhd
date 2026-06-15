'use client';
import React from 'react';

import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/src/shared/components/ui';

import Link from 'next/link';
import { cn } from '../../lib/utils';
import { usePathname } from 'next/navigation';
import { DIRECTORIES_CONFIG } from '@/src/features/directories/config/directories.config';

interface Props {
  className?: string;
}

export const DirectionNav: React.FC<Props> = () => {
  const pathname = usePathname();
  return (
    <NavigationMenu className='mb-4'>
      <NavigationMenuList>
        {DIRECTORIES_CONFIG.map((directory) => {
          const isActive = pathname === `/directories/${directory.id}`;
          return (
            <NavigationMenuLink key={directory.id} asChild className={navigationMenuTriggerStyle()}>
              <Link
                href={`/directories/${directory.id}`}
                className={cn(
                  'px-3 py-2 hover:bg-primary/80 hover:text-white  focus:bg-primary focus:outline-none transition-colors',
                  {
                    'bg-primary text-white  active:bg-primary': isActive,
                  },
                )}
              >
                {directory.title}
              </Link>
            </NavigationMenuLink>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
