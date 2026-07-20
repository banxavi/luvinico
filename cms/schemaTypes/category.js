import {defineField, defineType} from 'sanity'
import {slugOptionsFromTitle} from './utils/slugify'

export default defineType({
  name: 'category',
  title: 'Danh mục',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tiêu đề',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Nhập tiêu đề trước, rồi bấm Generate',
      options: slugOptionsFromTitle,
      validation: (rule) => rule.required(),
    }),    defineField({
      name: 'description',
      title: 'Mô tả',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow (hiển thị trang)',
      type: 'string',
      initialValue: 'DANH MỤC',
    }),
    defineField({
      name: 'showInNav',
      title: 'Hiển thị trên menu header',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'navOrder',
      title: 'Thứ tự menu header',
      type: 'number',
      description: 'Số nhỏ hiển thị trước (vd. 10 = Rượu vang, 30 = Bia)',
      hidden: ({document}) => document?.showInNav === false,
    }),
    defineField({
      name: 'navLabel',
      title: 'Nhãn menu header',
      type: 'string',
      description: 'Để trống = dùng tiêu đề danh mục',
      hidden: ({document}) => document?.showInNav === false,
    }),
    defineField({
      name: 'dropdownMenus',
      title: 'Menu dropdown',
      description: 'Menu phân cấp trên header — nhóm + sub-tab (vd. Bia Đức → Bia Paulaner)',
      type: 'array',
      of: [{type: 'categoryDropdownMenu'}],
    }),
    defineField({
      name: 'standardMenus',
      title: 'Standard menu',
      description:
        'Loại sản phẩm phẳng — dùng khi chọn loại cho sản phẩm hoặc lọc tag (vd. Cognac, Whisky)',
      type: 'array',
      of: [{type: 'categoryStandardMenu'}],
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'slug.current'},
  },
})
