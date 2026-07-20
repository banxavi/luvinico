/** Map Sanity contentSection blocks → RichContent / ProductDetailContent shape */

function mapParagraph(block) {
  if (block.spans?.length) {
    return {
      type: 'p',
      value: block.spans.map((span) => ({
        text: span.text ?? '',
        bold: Boolean(span.bold),
      })),
    };
  }
  if (block.plainText) {
    return { type: 'p', value: block.plainText };
  }
  return null;
}

function mapList(block) {
  const items = (block.items ?? []).map((item) => {
    if (item.bold) return { bold: item.bold, text: item.text ?? '' };
    return item.text ?? '';
  });
  if (!items.length) return null;
  return {
    type: block.listStyle === 'number' ? 'ol' : 'ul',
    items,
  };
}

function mapImage(block) {
  if (!block.imageUrl) return null;
  return {
    type: 'image',
    src: block.imageUrl,
    width: block.imageWidth ?? undefined,
    height: block.imageHeight ?? undefined,
    alt: block.alt ?? '',
    heading: block.heading ?? undefined,
    caption: block.caption ?? undefined,
  };
}

function mapBlock(block) {
  if (!block?._type) return null;
  switch (block._type) {
    case 'richParagraph':
      return mapParagraph(block);
    case 'richList':
      return mapList(block);
    case 'richImageBlock':
      return mapImage(block);
    default:
      return null;
  }
}

/** @param {Array<{ heading?: string, blocks?: unknown[] }>} sections */
export function mapSanityContentSections(sections) {
  if (!Array.isArray(sections) || sections.length === 0) return [];

  return sections
    .map((section) => {
      const blocks = (section.blocks ?? []).map(mapBlock).filter(Boolean);
      if (!blocks.length && !section.heading) return null;
      return {
        heading: section.heading ?? undefined,
        blocks,
      };
    })
    .filter(Boolean);
}
