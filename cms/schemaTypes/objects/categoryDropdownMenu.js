import {defineField, defineType} from 'sanity'
import {slugOptionsFromName} from '../utils/slugify'

export default defineType({
  name: 'categoryDropdownMenu',
  title: 'Menu dropdown',
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
    defineField({
      name: 'showEmptySubTabs',
      title: 'Hiện sub-tab trống',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'subTabs',
      title: 'Sub-tab',
      type: 'array',
      of: [{type: 'categorySubTab'}],
      validation: (rule) => rule.min(1).error('Thêm ít nhất một sub-tab'),
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'slug.current'},
  },
})
