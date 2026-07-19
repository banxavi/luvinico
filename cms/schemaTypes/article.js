import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'article',
  title: 'Bài viết kiến thức',
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
      options: {source: 'title', maxLength: 120},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Tóm tắt',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'category',
      title: 'Chủ đề',
      type: 'string',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Ngày đăng',
      type: 'date',
    }),
    defineField({
      name: 'coverImage',
      title: 'Ảnh bìa',
      type: 'image',
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
      name: 'body',
      title: 'Nội dung',
      type: 'array',
      of: [{type: 'contentSection'}],
    }),
  ],
  preview: {
    select: {title: 'title', media: 'coverImage', subtitle: 'publishedAt'},
  },
})
