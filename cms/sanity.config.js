import {createElement} from 'react'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import ProductMenuSelect from './components/ProductMenuSelect.jsx'
import {schemaTypes} from './schemaTypes'
import StudioNavbar from './studio/StudioNavbar.jsx'

import './studio/studioManageMenu.css'

export default defineConfig({
  name: 'default',
  title: 'cms',

  projectId: 'sfqhf74q',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  studio: {
    components: {
      navbar: StudioNavbar,
    },
  },

  form: {
    components: {
      input: (props) => {
        if (props.schemaType?.name === 'productMenuSelection') {
          return createElement(ProductMenuSelect, props)
        }
        return props.renderDefault(props)
      },
    },
  },
})
