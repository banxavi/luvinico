const SINGLETONS = ['siteSettings']

export const structure = (S) =>
  S.list()
    .title('Nội dung')
    .items([
      S.listItem()
        .title('Cài đặt trang')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Cài đặt trang'),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !SINGLETONS.includes(listItem.getId()),
      ),
    ])
