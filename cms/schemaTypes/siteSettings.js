import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Cài đặt trang',
  type: 'document',
  groups: [
    {name: 'favicon', title: 'Favicon', default: true},
    {name: 'footer', title: 'Footer'},
  ],
  fields: [
    defineField({
      name: 'favicon',
      title: 'Favicon / Logo icon',
      type: 'image',
      description: 'Dùng chung cho tab trình duyệt, icon header và footer',
      group: 'favicon',
      options: {hotspot: false},
    }),
    defineField({
      name: 'address',
      title: 'Địa chỉ',
      type: 'text',
      rows: 2,
      group: 'footer',
    }),
    defineField({
      name: 'hotline',
      title: 'Hotline',
      type: 'string',
      group: 'footer',
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Link Facebook',
      type: 'url',
      group: 'footer',
    }),
    defineField({
      name: 'disclaimer',
      title: 'Lưu ý',
      type: 'text',
      rows: 5,
      group: 'footer',
    }),
    defineField({
      name: 'regulatoryNote',
      title: 'Ghi chú pháp lý / nghị quyết',
      type: 'text',
      rows: 5,
      group: 'footer',
    }),
    defineField({
      name: 'warning',
      title: 'Khuyến cáo',
      type: 'text',
      rows: 3,
      group: 'footer',
    }),
    defineField({
      name: 'warningImage',
      title: 'Ảnh khuyến cáo',
      type: 'image',
      group: 'footer',
      options: {hotspot: false},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Cài đặt trang'}
    },
  },
})
