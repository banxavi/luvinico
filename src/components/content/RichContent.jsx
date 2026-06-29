import Image from 'next/image';

function RichInline({ parts }) {
  return parts.map((part, index) =>
    part.bold ? (
      <strong key={index} className="font-semibold text-white/95">
        {part.text}
      </strong>
    ) : (
      <span key={index}>{part.text}</span>
    ),
  );
}

function renderBlock(block, index) {
  if (block.type === 'p') {
    return (
      <p key={index} className="text-base leading-relaxed text-body-muted">
        {Array.isArray(block.value) ? <RichInline parts={block.value} /> : block.value}
      </p>
    );
  }

  if (block.type === 'ul' || block.type === 'ol') {
    const ListTag = block.type === 'ol' ? 'ol' : 'ul';
    const listClass =
      block.type === 'ol' ? 'product-detail-list product-detail-list--ordered' : 'product-detail-list';

    return (
      <ListTag key={index} className={listClass}>
        {block.items.map((item, itemIndex) => {
          const label = typeof item === 'string' ? null : item.bold;
          const text = typeof item === 'string' ? item : item.text;

          return (
            <li key={itemIndex}>
              {label ? (
                <>
                  <strong className="font-semibold text-white/95">{label}</strong>
                  {text}
                </>
              ) : (
                text
              )}
            </li>
          );
        })}
      </ListTag>
    );
  }

  if (block.type === 'image') {
    return (
      <div key={index} className="space-y-4">
        <figure className="mx-auto w-full overflow-hidden rounded-2xl border border-white/10 bg-premium-black sm:w-1/2">
          <Image
            src={block.src}
            alt={block.alt ?? ''}
            className="h-auto w-full object-cover"
            sizes="(max-width: 768px) 100vw, 720px"
          />
          {block.caption ? (
            <figcaption className="border-t border-white/10 px-4 py-3 text-center text-sm text-body-subtle">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
        {block.heading ? (
          <h2 className="text-lg font-semibold text-white sm:text-xl">{block.heading}</h2>
        ) : null}
      </div>
    );
  }

  return null;
}

export default function RichContent({ content, className = '' }) {
  if (!content?.length) return null;

  return (
    <div className={['space-y-8', className].filter(Boolean).join(' ')}>
      {content.map((section, sectionIndex) => (
        <div key={`section-${sectionIndex}`}>
          {section.heading ? (
            <h2 className="text-lg font-semibold text-white sm:text-xl">{section.heading}</h2>
          ) : null}
          <div
            className={['product-detail-prose space-y-4', section.heading ? 'mt-4' : '']
              .filter(Boolean)
              .join(' ')}
          >
            {(section.blocks ??
              section.paragraphs?.map((value) => ({ type: 'p', value })) ??
              []
            ).map((block, blockIndex) => renderBlock(block, blockIndex))}
          </div>
        </div>
      ))}
    </div>
  );
}
