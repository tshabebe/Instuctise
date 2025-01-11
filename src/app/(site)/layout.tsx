import Header from '@/features/landing/header';
import type { ReactNode } from 'react';

function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header className="container">
        <Header />
      </header>
      {children}
    </div>
  );
}

export default layout;
