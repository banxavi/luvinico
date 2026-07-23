import AdminStudio from '../../../sanity/AdminStudio';

export const dynamic = 'force-static';

export { metadata, viewport } from 'next-sanity/studio';

export default function AdminStudioPage() {
  return <AdminStudio />;
}
