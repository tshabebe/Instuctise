import { Icon } from '@/primitives/icon';
import { Button, Link } from 'react-aria-components';
import UnderLineIcon from './underline.icon';
import { paths } from '@/config/paths';

export default function Hero() {
  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="max-w-[24ch] text-center text-4xl font-black  md:text-5xl lg:text-6xl">
        Manage Your Classroom Like a Modern{' '}
        <span className="inline-flex flex-col text-nowrap">
          School Board
          <UnderLineIcon />
        </span>
      </h1>
      <p className="max-w-[64ch] text-center font-light lg:text-base">
        Stop juggling multiple apps and paper schedules. Streamline attendance,
        grading, announcements, and class schedules in one digital hub that
        works just like your familiar school board—but better.
      </p>
      <Button
        className={
          'flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-text-secondary to-red px-8 py-2 font-bold text-background shadow-md shadow-[#0C0909]'
        }
      >
        <Link href={paths.auth.register.getHref()} className="flex gap-2">
          Get Started
          <span>
            <Icon name="ChevronRight" strokeWidth={3} />
          </span>
        </Link>
      </Button>
    </div>
  );
}
