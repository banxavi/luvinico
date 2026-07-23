import {defineField, defineType} from 'sanity'
import {slugifyAscii} from './utils/slugify'

export default defineType({
  name: 'product',
  title: 'Sản phẩm',
  type: 'document',
  groups: [
    {name: 'content', title: 'Nội dung', default: true},
    {name: 'catalog', title: 'Danh mục & menu'},
    {name: 'pricing', title: 'Giá'},
    {name: 'media', title: 'Hình ảnh'},
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Tên sản phẩm',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      description: 'Nhập tên sản phẩm trước, rồi bấm Generate',
      options: {
        source: 'name',
        maxLength: 96,
        slugify: slugifyAscii,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Danh mục',
      type: 'reference',
      group: 'content',
      to: [{type: 'category'}],
      options: {
        disableNew: false,
      },
      description: 'Chọn danh mục có sẵn hoặc bấm Create new để thêm danh mục mới',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'menuSelection',
      title: 'Nhóm / sub-menu',
      type: 'productMenuSelection',
      group: 'content',
      description: 'Chọn nhóm menu và sub-tab từ danh mục — không cần nhập slug tay',
      validation: (rule) =>
        rule.custom((value, context) => {
          if (value?.itemSlug) return true
          if (context.document?.type) return true
          return 'Chọn loại sản phẩm từ menu danh mục'
        }),
    }),
    defineField({
      name: 'type',
      title: 'Loại (slug — legacy)',
      type: 'string',
      group: 'content',
      readOnly: true,
      hidden: ({document}) => Boolean(document?.menuSelection?.itemSlug),
      description: 'Giữ cho sản phẩm cũ; sản phẩm mới dùng menuSelection',
    }),
    defineField({
      name: 'price',
      title: 'Giá hiển thị',
      type: 'string',
      group: 'pricing',
      description: 'VD: 450.000 đ',
    }),
    defineField({
      name: 'salePrice',
      title: 'Giá khuyến mãi',
      type: 'string',
      group: 'pricing',
    }),
    defineField({
      name: 'contactPrice',
      title: 'Liên hệ thay vì giá',
      type: 'boolean',
      group: 'pricing',
      initialValue: false,
    }),
    defineField({
      name: 'origin',
      title: 'Xuất xứ',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'style',
      title: 'Phong cách',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'abv',
      title: 'ABV',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'volume',
      title: 'Dung tích',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'serveTemp',
      title: 'Nhiệt độ uống',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Mô tả ngắn',
      type: 'richBodyContent',
      group: 'content',
      description: 'Văn bản, heading, danh sách, ảnh — một editor duy nhất',
    }),
    defineField({
      name: 'image',
      title: 'Ảnh đại diện',
      type: 'image',
      group: 'media',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'content',
      title: 'Nội dung chi tiết',
      type: 'richBodyContent',
      group: 'content',
      description: 'Văn bản, list, ảnh, khối ảnh+text — thay cho section/block riêng lẻ',
    }),
    defineField({
      name: 'legacyId',
      title: 'Legacy mock ID',
      type: 'number',
      readOnly: true,
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      categoryTitle: 'category.title',
      menuLabel: 'menuSelection.itemName',
      typeSlug: 'type',
      menuSlug: 'menuSelection.itemSlug',
    },
    prepare({title, media, categoryTitle, menuLabel, typeSlug, menuSlug}) {
      const typeLabel = menuLabel || menuSlug || typeSlug
      return {
        title,
        subtitle: [categoryTitle, typeLabel].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
