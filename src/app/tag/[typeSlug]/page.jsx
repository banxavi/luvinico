import { redirect } from "next/navigation";
import { getTypeMeta, getAllTypeSlugs } from "../../../data/productTypes";
import { resolveTypeSlug } from "../../../lib/types";

export function generateStaticParams() {
  return getAllTypeSlugs().map((typeSlug) => ({ typeSlug }));
}

export default async function TagTypeRedirectPage({ params }) {
  const { typeSlug } = await params;
  const resolvedTypeSlug = resolveTypeSlug(typeSlug);
  const typeMeta = resolvedTypeSlug ? getTypeMeta(resolvedTypeSlug) : null;

  if (!typeMeta) {
    redirect("/tag");
  }

  const paramsOut = new URLSearchParams();
  paramsOut.set("category", typeMeta.category);
  paramsOut.set("type", resolvedTypeSlug);

  redirect(`/tag?${paramsOut.toString()}`);
}
