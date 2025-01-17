'use client';
import { Icon } from '@/primitives/icon';
import { Button } from 'react-aria-components';
import LandingPageLogo from './Landing.Logo';
import Link from 'next/link';
import { paths } from '@/config/paths';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { MobilePopover } from './mobile.Popover';

export default function Header() {
  return (
    <div className="flex items-center justify-between gap-2 py-2">
      <Logo />
      <Navigation />
      <CallToAction />
      <MobilePopover />
    </div>
  );
}

function Logo() {
  return (
    <Link
      href={paths.landing.root.getHref()}
      className="flex items-center gap-2"
    >
      <span>
        <LandingPageLogo />
      </span>
      <span className="text-base font-bold">Instructise</span>
    </Link>
  );
}

function Navigation() {
  const pathname = usePathname();
  return (
    <div className="hidden rounded-lg border border-gray-elevation-2-border bg-gray-elevation-2 px-14 py-1 sm:flex">
      <Button
        className={cn(
          pathname === paths.landing.pricing.getHref() &&
            'rounded-full bg-gray-elevation-4',
          'rounded-full px-4 py-1 hover:bg-gray-elevation-2-hover',
        )}
      >
        <Link href={paths.landing.pricing.getHref()}>pricing</Link>
      </Button>
      <Button
        className={cn(
          pathname === paths.landing.FAQ.getHref() && 'bg-gray-elevation-4',
          'rounded-full px-4 py-1 hover:bg-gray-elevation-2-hover',
        )}
      >
        <Link href={paths.landing.FAQ.getHref()}>FAQ</Link>
      </Button>
      <Button
        className={cn(
          pathname === paths.landing.blogs.getHref() && 'bg-gray-elevation-4',
          'rounded-full px-4 py-1 hover:bg-gray-elevation-2-hover',
        )}
      >
        <Link href={paths.landing.blogs.getHref()}>Blogs</Link>
      </Button>
    </div>
  );
}

function CallToAction() {
  return (
    <Button
      className={
        'hidden gap-2 rounded-2xl bg-gradient-to-r from-orange-text-secondary to-red px-4 py-2 shadow-md shadow-[#0C0909] sm:flex dark:text-black'
      }
    >
      <Link href={paths.auth.register.getHref()} className="flex gap-2">
        Dashboard
        <span>
          <Icon name="ChevronRight" strokeWidth={3} />
        </span>
      </Link>
    </Button>
  );
}
