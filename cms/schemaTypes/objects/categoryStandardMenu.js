import {defineField, defineType} from 'sanity'
import {slugOptionsFromName} from '../utils/slugify'

export default defineType({
  name: 'categoryStandardMenu',
  title: 'Standard menu',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Tên menu',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug menu',
      type: 'slug',
      description: 'Nhập tên menu trước, rồi bấm Generate',
      options: slugOptionsFromName,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'slug.current'},
  },
})
