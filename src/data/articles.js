import coronaKienThucImg from '../assets/Bia Mexico/corona_lat_chanh_kien_thuc.webp';
import coronaKienThucLiviniImg from '../assets/Bia Mexico/corona_lat_chanh_kien_thuc_livini.webp';

/** Nội dung bài viết — block giống productDetails (p, ul, image) */
export const articleBodies = {
  'co-can-uong-bia-corona-extra-voi-chanh-khong': [
    {
      blocks: [
        {
          type: 'p',
          value: [
            { text: 'Bia ' },
            { text: 'Corona Extra', bold: true },
            {
              text: ' là một trong những loại bia ngon nhất và được uống nhiều nhất thế giới, có nguồn gốc xuất phát từ Mexico. Ở đây người ta thường thưởng thức bia Corona với một lát chanh — sẽ làm hương vị bia tăng lên và trở thành nét đặc trưng của loại bia này.',
            },
          ],
        },
        {
          type: 'image',
          src: coronaKienThucImg,
          alt: 'Bia Corona Extra với lát chanh trên miệng chai',
        },
      ],
    },
    {
      heading: 'Cách thưởng thức bia Corona Extra',
      blocks: [
        {
          type: 'p',
          value: 'Bia Corona cần được thưởng thức sau khi ướp lạnh. Bạn có thể cho bia vào tủ đông, tủ lạnh hay tủ mát; tùy nhiệt độ ban đầu mà chỉ cần ướp khoảng 30 phút hoặc vài tiếng để bia được lạnh.',
        },
        {
          type: 'p',
          value:
            'Đặc biệt, việc để lát chanh tươi trên miệng chai và thưởng thức sẽ giúp hương vị bia Corona thêm phần tươi mát và có hiệu quả về vị giác nhằm tăng thêm phần sảng khoái.',
        },
      ],
    },
    {
      blocks: [
        {
          type: 'image',
          src: coronaKienThucLiviniImg,
          alt: 'Corona Extra kết hợp bò bít tết — gợi ý từ LUVINI & CO.',
          heading: 'Bò bít tết và Corona Extra — combo quen thuộc khi dã ngoại.',
        },
        {
          type: 'p',
          value: [
            { text: 'Có thể nói bia ' },
            { text: 'Corona Extra', bold: true },
            {
              text: ' nổi tiếng như một thương hiệu không thể nào thay đổi được. Có nhiều người nói đã uống bia này rồi thì khó có thể từ chối mà không uống thêm vài lần nữa.',
            },
          ],
        },
        {
          type: 'p',
          value: [
            { text: 'Đặc biệt, đồ ăn ngon hơn khi dùng với bia Corona — nó được coi như chất xúc tác giúp bạn ngon miệng hơn. Bia ' },
            { text: 'Corona Extra', bold: true },
            {
              text: ' rất hợp với món bò bít tết trong các chuyến dã ngoại. Khi đi dã ngoại, thức ăn là thứ không thể thiếu, nên chọn những món ăn phù hợp nhất với cuộc dã ngoại.',
            },
          ],
        },
        {
          type: 'p',
          value: [
            { text: 'Bò bít tết là món ăn yêu thích của rất nhiều người vì nó dễ làm, ăn lại ngon. Người châu Âu thường có sở thích ăn bò bít tết uống với bia ' },
            { text: 'Corona Extra', bold: true },
            { text: ' đầy thú vị.' },
          ],
        },
      ],
    },
  ],
};

export const articles = [
  {
    id: 'corona-chanh',
    slug: 'co-can-uong-bia-corona-extra-voi-chanh-khong',
    title: 'Có Cần Uống Bia Corona Extra Với 1 Lát Chanh Hay Không?',
    excerpt:
      'Bia Corona Extra từ Mexico — vì sao thêm chanh trở thành nét đặc trưng, cách ướp lạnh đúng và gợi ý kết hợp món ăn.',
    image: coronaKienThucImg,
    category: 'Bia',
    publishedAt: '2026-01-15',
  },
];

/** @deprecated dùng `articles` */
export const mockArticles = articles;
