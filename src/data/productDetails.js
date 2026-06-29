/** Chi tiết bổ sung theo id — gộp với mockProducts khi hiển thị trang sản phẩm */
export const productDetailExtras = {
  1: {
    volume: '750ml',
    serveTemp: '16–18°C',
    content: [
      {
        heading: 'Thực phẩm kết hợp',
        blocks: [
          {
            type: 'ul',
            items: ['Thịt đỏ (bò, cừu)', 'Thịt gia cầm', 'Phô mai', 'Salad'],
          },
        ],
      },
      {
        heading: 'Cách thưởng thức',
        blocks: [
          {
            type: 'ul',
            items: [
              { bold: 'Nhiệt độ phục vụ:', text: ' 16–18°C.' },
              {
                bold: 'Decanter (thở rượu):',
                text: ' Khuyên dùng 30–60 phút trước khi uống để bung tỏa hương thơm.',
              },
            ],
          },
        ],
      },
      {
        heading: 'Hướng dẫn bảo quản và sử dụng',
        blocks: [
          {
            type: 'ul',
            items: [
              'Bảo quản tránh ánh nắng trực tiếp',
              'Nhiệt độ sử dụng tốt nhất 16–18°C',
              'Dùng ly cỡ lớn để tận hưởng hương vị',
            ],
          },
        ],
      },
    ],
  },
  2: {
    volume: '750ml',
    serveTemp: '16–18°C',
    content: [
      {
        heading: 'Đặc điểm hương vị và cấu trúc',
        blocks: [
          {
            type: 'ul',
            items: [
              {
                bold: 'Màu sắc:',
                text: ' Đỏ Ruby đậm pha ánh tím huyền bí và sang trọng.',
              },
              {
                bold: 'Hương thơm:',
                text: ' Trái cây đỏ chín, mứt quả đen, anh đào, gỗ sồi Pháp, cam thảo, chocolate và thoảng khói sồi.',
              },
              {
                bold: 'Vị rượu:',
                text: ' Mạnh mẽ, cấu trúc rắn — ngọt mận khô, mứt dâu rừng và cay nhẹ của thảo mộc.',
              },
              {
                bold: 'Hậu vị:',
                text: ' Tannin mịn như lụa, kết thúc ngọt mềm và kéo dài.',
              },
            ],
          },
        ],
      },
      {
        heading: 'Hướng dẫn thưởng thức đúng cách',
        blocks: [
          {
            type: 'ul',
            items: [
              { bold: 'Nhiệt độ:', text: ' 16–18°C.' },
              {
                bold: 'Thở rượu:',
                text: ' Decanter 30–60 phút để hương vị bung tỏa và tannin mềm hơn.',
              },
            ],
          },
          {
            type: 'p',
            value: 'Kết hợp món đậm vị, giàu chất béo:',
          },
          {
            type: 'ul',
            items: [
              'Thịt đỏ nướng (bò, cừu)',
              'Thịt tẩm ướp gia vị mạnh',
              'Đồ săn bắn (thịt hươu, nai)',
              'Phô mai chín',
            ],
          },
        ],
      },
    ],
  },
  8: {
    volume: '750ml',
    serveTemp: '12–18°C',
    content: [
      {
        heading: 'Đặc trưng hương vị',
        blocks: [
          {
            type: 'ul',
            items: [
              {
                bold: 'Hương thơm:',
                text: ' Quả mọng đen, mận chín, tiêu đen, vani và gỗ sồi nướng.',
              },
              {
                bold: 'Vị rượu:',
                text: ' Đầy đặn, cân bằng — mứt trái cây, cam thảo, tannin mượt, hậu vị ấm áp không ngọt gắt.',
              },
            ],
          },
        ],
      },
      {
        heading: 'Hướng dẫn thưởng thức',
        blocks: [
          {
            type: 'ul',
            items: [
              {
                bold: 'Nhiệt độ:',
                text: ' 12–18°C — dòng Classic mượt, không cần decant quá lâu.',
              },
            ],
          },
          {
            type: 'p',
            value: 'Món ăn kèm gợi ý:',
          },
          {
            type: 'ul',
            items: [
              'Thịt đỏ nướng (BBQ, bít tết bò, sườn cừu nướng tỏi)',
              'Pizza, mì Ý sốt cà chua đậm vị',
              'Phô mai cứng (Cheddar, Parmesan)',
            ],
          },
        ],
      },
    ],
  },
  3: {
    volume: 'Hộp 2 chai 750ml',
    serveTemp: '8–12°C',
    content: [
      {
        heading: 'Set Quà Tặng Bia Chimay – Phần quà dành tặng cho người thân yêu !',
        blocks: [
          {
            type: 'p',
            value: [
              { text: 'Không chỉ riêng dịp Lễ Tết — bia cũng là thức uống để cùng chia sẻ và dành tặng nhau. ' },
              { text: 'LUVINI & CO.', bold: true },
              { text: ' mang đến món quà ý nghĩa, sang trọng và thiết thực cho mọi dịp đặc biệt.' },
            ],
          },
          {
            type: 'p',
            value: 'Hộp quà gồm hai dòng Trappist nổi tiếng:',
          },
          {
            type: 'ul',
            items: [
              { bold: 'Chimay Đỏ (7%)', text: ' — hương thơm trái cây dịu nhẹ.' },
              { bold: 'Chimay Xanh (9%)', text: ' — đậm đà, hương thảo mộc và gia vị.' },
            ],
          },
        ],
      },
      {
        heading: 'Thưởng thức Set Quà Tặng Bia Chimay',
        blocks: [
          {
            type: 'p',
            value: 'Set quà bia Bỉ phù hợp làm quà trong các dịp quan trọng:',
          },
          {
            type: 'ul',
            items: ['Lễ – Tết', 'Sinh nhật', 'Sự kiện doanh nghiệp', 'Tri ân đối tác'],
          },
          {
            type: 'p',
            value: [
              { text: 'Thiết kế ' },
              { text: 'sang trọng, đẹp mắt', bold: true },
              { text: ' và hương vị đậm chất Trappist — món quà ý nghĩa cho người thân và đối tác quan trọng.' },
            ],
          },
        ],
      },
    ],
  },
  4: {
    volume: 'Hộp 4 chai 330ml + 1 ly',
    serveTemp: '6–10°C',
    content: [
      {
        heading: 'Đặc trưng hương vị bia Duvel',
        blocks: [
          {
            type: 'ul',
            items: [
              {
                bold: 'Dòng bia:',
                text: ' Belgian Strong Blond Ale — biểu tượng bia vàng mạnh của Bỉ từ năm 1871.',
              },
              {
                bold: 'Nồng độ cồn:',
                text: ' 8.5% ABV — cao nhưng uống mượt mà, êm ái.',
              },
              {
                bold: 'Khứu giác & vị giác:',
                text: ' Vàng tươi như ánh nắng; hương cam quýt, lê chín, tiêu trắng và men Bỉ; vị đắng nhẹ hòa ngọt malt; hậu vị khô, thanh và kéo dài.',
              },
            ],
          },
        ],
      },
      {
        heading: 'Nghệ thuật thưởng thức và kết hợp món ăn',
        blocks: [
          {
            type: 'p',
            value: [
              { text: 'Nhiệt độ lý tưởng: ', bold: false },
              { text: '6°C – 10°C', bold: true },
              { text: ' — ướp lạnh trước khi rót ra ly Tulip.' },
            ],
          },
          {
            type: 'p',
            value: [
              { text: 'Ẩm thực đi kèm: ', bold: true },
              { text: 'Duvel cắt ngấy cực tốt nhờ ga mạnh và nồng độ cao — hợp món béo, nhiều đạm:' },
            ],
          },
          {
            type: 'ul',
            items: ['Thịt kho hột vịt', 'Nem rán', 'Bánh chưng', 'Chả lụa', 'Dăm bông', 'Hạt khô'],
          },
          {
            type: 'p',
            value: [
              { text: 'Hộp quà Duvel ', bold: false },
              { text: 'cao cấp, bắt mắt', bold: true },
              { text: ' — lựa chọn ưa chuộng của người sành bia Bỉ cho Lễ Tết, tri ân và chúc tụng.' },
            ],
          },
        ],
      },
    ],
  },
  5: {
    volume: 'Thùng 24 lon 500ml',
    serveTemp: '6–8°C',
    content: [
      {
        heading: 'Mẹo thưởng thức',
        blocks: [
          {
            type: 'ul',
            items: [
              {
                bold: 'Nhiệt độ:',
                text: ' Ướp lạnh 6°C – 8°C — không thêm đá để tránh loãng vị.',
              },
              {
                bold: 'Kết hợp món ăn:',
                text: ' Xúc xích Đức, salad, hải sản, phô mai nhẹ.',
              },
            ],
          },
        ],
      },
      {
        heading: 'Giới thiệu về Bia Paulaner Weissbier lon 500ml',
        blocks: [
          {
            type: 'p',
            value: [
              { text: 'Paulaner Weissbier ', bold: true },
              { text: 'là Hefeweizen truyền thống Bavaria — làm từ lúa mì, thơm dịu, dễ chịu và thanh mát.' },
            ],
          },
          {
            type: 'ul',
            items: [
              'Màu vàng đục tự nhiên, lớp bọt dày mịn',
              'Hương chuối, xoài và dứa tươi mát',
              'Nồng độ 5.5% — nhẹ nhàng, dễ uống',
              'Lon 500ml thiết kế sang trọng, đẹp mắt',
            ],
          },
        ],
      },
      {
        heading: 'Thưởng thức Bia Paulaner Weissbier lon 500ml',
        blocks: [
          {
            type: 'p',
            value: 'Ướp lạnh lon trước khi uống để cảm nhận trọn vẹn hương vị bia Đức.',
          },
          {
            type: 'p',
            value: 'Đặc biệt ngon khi kết hợp:',
          },
          {
            type: 'ul',
            items: ['Thịt đỏ nướng', 'Đồ nướng', 'Các món mặn thơm'],
          },
        ],
      },
    ],
  },
  6: {
    volume: 'Thùng 20 chai 500ml',
    serveTemp: '6–8°C',
    content: [
      {
        blocks: [
          {
            type: 'ul',
            items: [
              {
                bold: 'Hương vị:',
                text: ' Đậm đà nhưng êm dịu — ngọt nhẹ caramel, lúa mì và trái cây chín.',
              },
              {
                bold: 'Thành phần:',
                text: ' Tuân thủ Reinheitsgebot — nước, lúa mì, đại mạch rang, hoa bia Hallertau và men tự nhiên.',
              },
            ],
          },
        ],
      },
      {
        heading: 'Cách thưởng thức chuẩn vị',
        blocks: [
          {
            type: 'ul',
            items: [
              { bold: 'Nhiệt độ:', text: ' 6–8°C — không uống quá lạnh.' },
              { bold: 'Ly uống:', text: ' Ly Weissbier cao, thon — giữ bọt và hương thơm.' },
              {
                bold: 'Món ăn:',
                text: ' Xúc xích Đức, thịt nướng, phô mai, hải sản, đồ nướng.',
              },
            ],
          },
        ],
      },
      {
        heading: 'Mùi hương phong phú, dễ uống cho mọi dịp',
        blocks: [
          {
            type: 'p',
            value: 'Khác nhiều bia đen mạnh, Dunkel dễ chịu với hương caramel, chuối chín và bánh mì nướng.',
          },
          {
            type: 'p',
            value: 'Phù hợp cả người mới — tiệc nhẹ, picnic, BBQ cuối tuần.',
          },
        ],
      },
      {
        heading: 'Vì sao nên chọn Paulaner Weissbier Dunkel?',
        blocks: [
          {
            type: 'ul',
            items: [
              'Thương hiệu uy tín hàng trăm năm',
              'Hương vị đậm đà, dễ uống',
              'Nguyên liệu 100% tự nhiên',
              'Công nghệ ủ bia chuẩn Đức',
              'Bao bì sang trọng, cao cấp',
              'Đánh giá cao từ giới sành bia',
              'Hạn sử dụng dài, dễ bảo quản',
            ],
          },
        ],
      },
    ],
  },
  7: {
    volume: 'Thùng 24 chai 210ml',
    serveTemp: '2–4°C',
    content: [
      {
        heading: 'Cách thưởng thức bia Corona Extra',
        blocks: [
          {
            type: 'p',
            value: 'Bia Corona nên được ướp lạnh trước khi uống:',
          },
          {
            type: 'ul',
            items: [
              'Tủ lạnh, tủ mát hoặc tủ đông (tùy nhiệt độ ban đầu)',
              'Thời gian ướp: khoảng 30 phút đến vài tiếng',
              'Thêm lát chanh tươi trên miệng chai — nét đặc trưng của Corona',
            ],
          },
          {
            type: 'p',
            value: [
              { text: 'Chanh giúp hương vị ', bold: false },
              { text: 'tươi mát', bold: true },
              { text: ' và tăng cảm giác sảng khoái khi thưởng thức.' },
            ],
          },
        ],
      },
      {
        heading: 'Bia Corona Extra và món bò bít tết',
        blocks: [
          {
            type: 'p',
            value: [
              { text: 'Corona Extra ', bold: true },
              { text: 'là thương hiệu bia bán chạy toàn cầu — dễ gây thói quen thưởng thức từ ngụm đầu tiên.' },
            ],
          },
          {
            type: 'p',
            value: 'Kết hợp hoàn hảo khi dã ngoại:',
          },
          {
            type: 'ul',
            items: [
              { bold: 'Bò bít tết', text: ' — dễ làm, ăn ngon, chuẩn phong cách châu Âu' },
              'Đồ nướng và hải sản ngoài trời',
              'Bia lạnh có chanh — bữa tiệc nhẹ nhàng, sảng khoái',
            ],
          },
        ],
      },
    ],
  },
};
