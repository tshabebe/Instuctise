'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@/primitives/icon';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/primitives/breadcrumb';

export function BreadcrumbNav() {
  const pathname = usePathname();
  const paths = pathname.split('/').filter((path) => path);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((path, index) => {
          const href = `/${paths.slice(0, index + 1).join('/')}`;
          const isLast = index === paths.length - 1;
          return (
            <BreadcrumbItem key={path}>
              {isLast ? (
                <BreadcrumbPage className="capitalize">
                  {path.replace(/-/g, ' ')}
                </BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink asChild>
                    <Link href={href} className="capitalize">
                      {path.replace(/-/g, ' ')}
                    </Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator>
                    <Icon name="Slash" />
                  </BreadcrumbSeparator>
                </>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
