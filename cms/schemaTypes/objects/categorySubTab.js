import {defineField, defineType} from 'sanity'
import {slugOptionsFromName} from '../utils/slugify'

export default defineType({
  name: 'categorySubTab',
  title: 'Sub-tab',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Tên sub-tab',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug sub-tab',
      type: 'slug',
      description: 'Nhập tên sub-tab trước, rồi bấm Generate',
      options: slugOptionsFromName,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'slug.current'},
  },
})
