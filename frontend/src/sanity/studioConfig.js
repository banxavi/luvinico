import { createElement } from 'react';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import ProductMenuSelect from './_cms/components/ProductMenuSelect.jsx';
import { schemaTypes } from './_cms/schemaTypes/index.js';
import StudioNavbar from './StudioNavbar';

import './studioManageMenu.css';

export default defineConfig({
  name: 'default',
  title: 'LUVINI & CO. CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'sfqhf74q',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/admin',
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
          return createElement(ProductMenuSelect, props);
        }
        return props.renderDefault(props);
      },
    },
  },
});
