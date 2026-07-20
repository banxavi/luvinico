import category from './category'
import product from './product'
import article from './article'
import categorySubTab from './objects/categorySubTab'
import categoryDropdownMenu from './objects/categoryDropdownMenu'
import categoryStandardMenu from './objects/categoryStandardMenu'
import productMenuSelection from './objects/productMenuSelection'
import richSpan from './objects/richSpan'
import richParagraph from './objects/richParagraph'
import richListItem from './objects/richListItem'
import richList from './objects/richList'
import richImageBlock from './objects/richImageBlock'
import contentSection from './objects/contentSection'
import productRichText from './objects/productRichText'
import richBodyContent from './objects/richBodyContent'
import imageTextBlock from './objects/imageTextBlock'

export const schemaTypes = [
  category,
  productMenuSelection,
  product,
  article,
  categorySubTab,
  categoryDropdownMenu,
  categoryStandardMenu,
  richBodyContent,
  imageTextBlock,
  // Legacy — giữ để đọc dữ liệu cũ trước khi chạy migrate:rich-body
  richSpan,
  richParagraph,
  richListItem,
  richList,
  richImageBlock,
  contentSection,
  productRichText,
]
