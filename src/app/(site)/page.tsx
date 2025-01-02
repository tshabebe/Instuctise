import { checkLoggedIn } from '@/auth/auth';
import LandingPageUI from './_components/landing.page';
import { redirect } from 'next/navigation';
import { paths } from '@/config/paths';

async function LandingPage() {
  const isLoggedIn = await checkLoggedIn();
  if (isLoggedIn) {
    redirect(paths.app.dashboard.getHref());
  }
  return <LandingPageUI />;
}

export default LandingPage;
