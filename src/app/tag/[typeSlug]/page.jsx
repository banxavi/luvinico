import { redirect } from 'next/navigation';
import { getTypeMeta, getAllTypeSlugs } from '../../../data/productTypes';
import { resolveTypeSlug } from '../../../lib/types';

export function generateStaticParams() {
  return getAllTypeSlugs().map((typeSlug) => ({ typeSlug }));
}

export default async function TagTypeRedirectPage({ params, searchParams }) {
  const { typeSlug } = await params;
  const resolvedTypeSlug = resolveTypeSlug(typeSlug);
  const typeMeta = resolvedTypeSlug ? getTypeMeta(resolvedTypeSlug) : null;

  if (!typeMeta) {
    redirect('/tag');
  }

  const resolvedSearchParams = await searchParams;
  const paramsOut = new URLSearchParams();
  paramsOut.set('category', typeMeta.category);
  paramsOut.set('type', resolvedTypeSlug);

  const origin = (resolvedSearchParams.origin || '').trim();
  const price = (resolvedSearchParams.price || '').trim();
  const abv = (resolvedSearchParams.abv || '').trim();
  const page = (resolvedSearchParams.page || '').trim();
  if (origin) paramsOut.set('origin', origin);
  if (price) paramsOut.set('price', price);
  if (abv) paramsOut.set('abv', abv);
  if (page) paramsOut.set('page', page);

  redirect(`/tag?${paramsOut.toString()}`);
}
