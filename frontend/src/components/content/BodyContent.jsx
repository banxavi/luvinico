import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { isBodyContentPortableText, isPortableText, portableTextToPlain } from '../../lib/portableText';
import { isRichContentSections } from '../../lib/sanity/mapBodyContent';
import RichContent from './RichContent';

const blockClass = 'text-base leading-relaxed text-body-muted';

const DEFAULT_IMAGE_WIDTH = 800;
const DEFAULT_IMAGE_HEIGHT = 600;

function parseSanityImageDimensions(src) {
  if (typeof src !== 'string') return null;
  const match = src.match(/-(\d+)x(\d+)\.(?:jpe?g|png|webp|gif|avif)(?:\?|$)/i);
  if (!match) return null;
  return { width: Number(match[1]), height: Number(match[2]) };
}

function resolveImageDimensions(image) {
  let width = image?.width;
  let height = image?.height;
  const src = image?.url ?? image?.src;

  if ((!width || !height) && typeof src === 'string') {
    const parsed = parseSanityImageDimensions(src);
    if (parsed) {
      width = parsed.width;
      height = parsed.height;
    }
  }

  return {
    src,
    width: width || DEFAULT_IMAGE_WIDTH,
    height: height || DEFAULT_IMAGE_HEIGHT,
  };
}

const IMAGE_LAYOUT = {
  default: {
    figure: 'my-6 overflow-hidden rounded-2xl border border-white/10 bg-premium-black',
    sizes: '(max-width: 640px) 100vw, 768px',
    imageTextFigure: 'w-full shrink-0 overflow-hidden rounded-xl border border-white/10 bg-premium-black lg:w-5/12',
    imageTextSizes: '(max-width: 1024px) 100vw, 420px',
  },
  article: {
    figure:
      'my-6 mx-auto w-full max-w-xs overflow-hidden rounded-2xl border border-white/10 bg-premium-black sm:max-w-sm md:max-w-md',
    sizes: '(max-width: 640px) 90vw, 448px',
    imageTextFigure:
      'mx-auto w-full max-w-xs shrink-0 overflow-hidden rounded-xl border border-white/10 bg-premium-black sm:max-w-sm md:max-w-md lg:mx-0 lg:w-5/12',
    imageTextSizes: '(max-width: 640px) 90vw, 448px',
  },
};

function createPortableTextComponents({ nested = false, variant = 'default' } = {}) {
  const imageLayout = IMAGE_LAYOUT[variant] ?? IMAGE_LAYOUT.default;

  return {
    block: {
      normal: ({ children }) => (
        <p className={`${blockClass} [&:not(:first-child)]:mt-3`}>{children}</p>
      ),
      h2: ({ children }) => (
        <h2
          className={
            nested
              ? 'mt-4 text-lg font-semibold text-white sm:text-xl'
              : 'mt-8 text-lg font-semibold text-white sm:text-xl'
          }
        >
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="mt-5 text-base font-semibold text-white sm:text-lg">{children}</h3>
      ),
      h4: ({ children }) => (
        <h4 className="mt-4 text-sm font-semibold uppercase tracking-wide text-brand-amber">
          {children}
        </h4>
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
    types: {
      image: ({ value }) => {
        if (!value?.url) return null;
        const { src, width, height } = resolveImageDimensions(value);
        return (
          <figure className={imageLayout.figure}>
            <Image
              src={src}
              alt={value.alt ?? ''}
              width={width}
              height={height}
              quality={90}
              className="h-auto w-full object-contain"
              sizes={imageLayout.sizes}
            />
            {value.caption ? (
              <figcaption className="border-t border-white/10 px-4 py-3 text-center text-sm text-body-subtle">
                {value.caption}
              </figcaption>
            ) : null}
          </figure>
        );
      },
      imageTextBlock: ({ value }) => {
        if (!value) return null;
        const imageLeft = value.imagePosition !== 'right';
        const image = value.image;
        const { src, width, height } = image?.url
          ? resolveImageDimensions(image)
          : { src: null, width: DEFAULT_IMAGE_WIDTH, height: DEFAULT_IMAGE_HEIGHT };
        const nestedComponents = createPortableTextComponents({ nested: true, variant });

        return (
          <div
            className={[
              'my-8 flex flex-col gap-6 rounded-2xl border border-white/10 bg-premium-dark/60 p-5 sm:p-6',
              'lg:flex-row lg:items-start',
              imageLeft ? '' : 'lg:flex-row-reverse',
            ].join(' ')}
          >
            {src ? (
              <figure className={imageLayout.imageTextFigure}>
                <Image
                  src={src}
                  alt={image?.alt ?? value.title ?? ''}
                  width={width}
                  height={height}
                  quality={90}
                  className="h-auto w-full object-contain"
                  sizes={imageLayout.imageTextSizes}
                />
              </figure>
            ) : null}
            <div className="min-w-0 flex-1">
              {value.title ? (
                <h2 className="text-lg font-semibold text-white sm:text-xl">{value.title}</h2>
              ) : null}
              {value.subtitle ? (
                <p className="mt-1 text-sm text-brand-amber/90">{value.subtitle}</p>
              ) : null}
              {value.body?.length ? (
                <div className={value.title || value.subtitle ? 'mt-4' : ''}>
                  <PortableText value={value.body} components={nestedComponents} />
                </div>
              ) : null}
            </div>
          </div>
        );
      },
    },
  };
}

const defaultPortableTextComponents = createPortableTextComponents();

/**
 * Unified body renderer — Portable Text (richBodyContent) + legacy contentSection.
 * @param {{ value?: unknown, className?: string, as?: 'div' | 'p', variant?: 'default' | 'article' }} props
 */
export default function BodyContent({ value, className = '', as = 'div', variant = 'default' }) {
  if (isRichContentSections(value)) {
    return <RichContent content={value} className={className} />;
  }

  const plain = portableTextToPlain(value);
  if (!plain && !isBodyContentPortableText(value) && !isPortableText(value)) return null;

  if (typeof value === 'string') {
    const Tag = as;
    return <Tag className={`${blockClass} ${className}`.trim()}>{value}</Tag>;
  }

  if (!isBodyContentPortableText(value) && !isPortableText(value)) return null;

  const components =
    variant === 'default'
      ? defaultPortableTextComponents
      : createPortableTextComponents({ variant });

  const Wrapper = as === 'p' ? 'div' : as;
  return (
    <Wrapper className={['product-detail-prose', className].filter(Boolean).join(' ')}>
      <PortableText value={value} components={components} />
    </Wrapper>
  );
}
