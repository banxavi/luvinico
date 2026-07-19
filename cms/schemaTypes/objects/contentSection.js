import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contentSection',
  title: 'Content section',
  type: 'object',
  fields: [
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({
      name: 'blocks',
      title: 'Blocks',
      type: 'array',
      of: [{type: 'richParagraph'}, {type: 'richList'}, {type: 'richImageBlock'}],
    }),
  ],
})
