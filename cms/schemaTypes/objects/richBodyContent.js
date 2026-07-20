import {defineArrayMember, defineType} from 'sanity'
import {defineBlockContentMember} from './blockContentMember'

/**
 * All-in-one body field — text, headings, lists, inline images, image+text blocks.
 * Replaces contentSection + productRichText.
 */
export default defineType({
  name: 'richBodyContent',
  title: 'Nội dung rich text',
  type: 'array',
  of: [
    defineBlockContentMember(),
    defineArrayMember({
      type: 'image',
      title: 'Ảnh',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (rule) => rule.required(),
        },
        {
          name: 'caption',
          title: 'Chú thích',
          type: 'string',
        },
      ],
    }),
    defineArrayMember({type: 'imageTextBlock'}),
  ],
})
