import {defineField, defineType} from 'sanity'
import ProductMenuSelect from '../../components/ProductMenuSelect.jsx'

export default defineType({
  name: 'productMenuSelection',
  title: 'Nhóm / sub-menu',
  type: 'object',
  fields: [
    // Sanity hides object fields when every member is hidden — keep one visible anchor.
    defineField({
      name: 'itemName',
      type: 'string',
      title: ' ',
      readOnly: true,
    }),
    defineField({name: 'menuKind', type: 'string', hidden: true}),
    defineField({name: 'groupSlug', type: 'string', hidden: true}),
    defineField({name: 'itemSlug', type: 'string', hidden: true}),
  ],
  components: {
    input: ProductMenuSelect,
  },
})
