import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'richSpan',
  title: 'Inline text',
  type: 'object',
  fields: [
    defineField({name: 'text', title: 'Text', type: 'string'}),
    defineField({name: 'bold', title: 'Bold', type: 'boolean', initialValue: false}),
  ],
})
