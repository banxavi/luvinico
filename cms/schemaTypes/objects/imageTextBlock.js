import {defineField, defineType} from 'sanity'
import {defineBlockContentMember} from './blockContentMember'

/** Side-by-side image + rich text block (Image Text Block pattern). */
export default defineType({
  name: 'imageTextBlock',
  title: 'Khối ảnh + văn bản',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Tiêu đề',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Phụ đề',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Ảnh',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'imagePosition',
      title: 'Vị trí ảnh',
      type: 'string',
      options: {
        list: [
          {title: 'Trái', value: 'left'},
          {title: 'Phải', value: 'right'},
        ],
        layout: 'radio',
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'body',
      title: 'Nội dung',
      type: 'array',
      of: [defineBlockContentMember()],
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'subtitle', media: 'image'},
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Khối ảnh + văn bản',
        subtitle,
        media,
      }
    },
  },
})
