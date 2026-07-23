import { Suspense } from 'react';

import AdminChromeGate from './AdminChromeGate';
import PageLayout from './PageLayout';

export default function RootChrome({ children }) {
  const siteShell = (
    <PageLayout>
      <Suspense fallback={<div className="site-container py-16 text-center text-body-muted">Đang tải...</div>}>
        {children}
      </Suspense>
    </PageLayout>
  );

  return <AdminChromeGate siteShell={siteShell}>{children}</AdminChromeGate>;
}
