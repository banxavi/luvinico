import { redirect } from 'next/navigation';
import { getCatalog } from '../../../lib/sanity/catalogStore';
import { getAllTypeSlugs, getTypeMeta, resolveTypeSlug } from '../../../lib/types';

export const revalidate = 60;

export async function generateStaticParams() {
  const catalog = await getCatalog();
  return getAllTypeSlugs(catalog).map((typeSlug) => ({ typeSlug }));
}

export default async function TagTypeRedirectPage({ params }) {
  const { typeSlug } = await params;
  const catalog = await getCatalog();
  const resolvedTypeSlug = resolveTypeSlug(typeSlug, catalog);
  const typeMeta = resolvedTypeSlug ? getTypeMeta(catalog, resolvedTypeSlug) : null;

  if (!typeMeta) {
    redirect('/tag');
  }

  const paramsOut = new URLSearchParams();
  paramsOut.set('category', typeMeta.category);
  paramsOut.set('type', resolvedTypeSlug);

  redirect(`/tag?${paramsOut.toString()}`);
}
