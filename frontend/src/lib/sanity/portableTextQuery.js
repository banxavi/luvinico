/** GROQ projection for richBodyContent (Portable Text + image + imageTextBlock). */

export const portableTextImageProjection = /* groq */ `
  _type == "image" => {
    ...,
    alt,
    caption,
    "url": asset->url,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height
  }
`;

export const portableTextProjection = /* groq */ `
  ...,
  ${portableTextImageProjection},
  _type == "imageTextBlock" => {
    ...,
    title,
    subtitle,
    imagePosition,
    image {
      alt,
      "url": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    },
    body[] {
      ...,
      ${portableTextImageProjection}
    }
  }
`;

/** Legacy contentSection blocks (pre-migration). */
export const legacyContentSectionProjection = /* groq */ `
  heading,
  blocks[] {
    _type,
    _key,
    plainText,
    spans[] { text, bold },
    listStyle,
    items[] { text, bold },
    alt,
    heading,
    caption,
    "imageUrl": image.asset->url,
    "imageWidth": image.asset->metadata.dimensions.width,
    "imageHeight": image.asset->metadata.dimensions.height
  }
`;
