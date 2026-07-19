import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { isPortableText, portableTextToPlain } from '../../lib/portableText';

const blockClass = 'text-base leading-relaxed text-body-muted';

const components = {
  block: {
    normal: ({ children }) => <p className={`${blockClass} [&:not(:first-child)]:mt-3`}>{children}</p>,
    h2: ({ children }) => (
      <h2 className="mt-6 text-lg font-semibold text-white sm:text-xl">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-5 text-base font-semibold text-white sm:text-lg">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-4 text-sm font-semibold uppercase tracking-wide text-brand-amber">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-4 border-l-2 border-brand-amber/60 pl-4 italic text-body-muted">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="product-detail-list mt-3 space-y-1 text-body-muted">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="product-detail-list product-detail-list--ordered mt-3 space-y-1 text-body-muted">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-white/95">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline underline-offset-2">{children}</span>,
    link: ({ value, children }) => {
      const href = value?.href ?? '#';
      const external = /^https?:\/\//i.test(href);
      if (external) {
        return (
          <a
            href={href}
            className="text-brand-amber underline underline-offset-2 hover:text-white"
            target={value?.openInNewTab ? '_blank' : undefined}
            rel={value?.openInNewTab ? 'noreferrer noopener' : undefined}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className="text-brand-amber underline underline-offset-2 hover:text-white">
          {children}
        </Link>
      );
    },
  },
};

/**
 * Render Sanity Portable Text or legacy plain string.
 * @param {{ value?: unknown, className?: string, as?: 'div' | 'p' }} props
 */
export default function PortableTextContent({ value, className = '', as = 'div' }) {
  const plain = portableTextToPlain(value);
  if (!plain && !isPortableText(value)) return null;

  if (typeof value === 'string') {
    const Tag = as;
    return <Tag className={`${blockClass} ${className}`.trim()}>{value}</Tag>;
  }

  if (!isPortableText(value)) return null;

  const Wrapper = as === 'p' ? 'div' : as;
  return (
    <Wrapper className={['product-detail-prose', className].filter(Boolean).join(' ')}>
      <PortableText value={value} components={components} />
    </Wrapper>
  );
}
