import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'richImageBlock',
  title: 'Image block',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'alt', title: 'Alt text', type: 'string'}),
    defineField({name: 'heading', title: 'Heading below image', type: 'string'}),
    defineField({name: 'caption', title: 'Caption', type: 'string'}),
  ],
})
