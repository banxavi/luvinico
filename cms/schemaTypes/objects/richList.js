import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'richList',
  title: 'List',
  type: 'object',
  fields: [
    defineField({
      name: 'listStyle',
      title: 'Style',
      type: 'string',
      options: {list: ['bullet', 'number']},
      initialValue: 'bullet',
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{type: 'richListItem'}],
    }),
  ],
})
