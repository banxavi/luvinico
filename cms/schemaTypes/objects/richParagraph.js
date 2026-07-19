import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'richParagraph',
  title: 'Paragraph',
  type: 'object',
  fields: [
    defineField({
      name: 'plainText',
      title: 'Plain text',
      type: 'text',
      rows: 3,
      description: 'Dùng khi không cần in đậm inline',
    }),
    defineField({
      name: 'spans',
      title: 'Rich spans',
      type: 'array',
      of: [{type: 'richSpan'}],
      description: 'Dùng khi cần in đậm một phần text',
    }),
  ],
})
