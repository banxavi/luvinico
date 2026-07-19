import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'richListItem',
  title: 'List item',
  type: 'object',
  fields: [
    defineField({name: 'text', title: 'Text', type: 'string'}),
    defineField({name: 'bold', title: 'Bold label', type: 'string'}),
  ],
})
