// Bộ đề trắc nghiệm MLN111 — 54 câu
// Nguồn: Giáo trình Chủ nghĩa Marx-Lenin, NXB CTQG Sự thật, 2021

export const SECTIONS = [
  { id: "all",    label: "Tất cả" },
  { id: "triet",  label: "Triết học" },
  { id: "ktct",   label: "Kinh tế CT" },
  { id: "cnxhkh", label: "CNXHKH" },
];

export const questions = [
  // ── TRIẾT HỌC ─────────────────────────────────────────
  {
    id: 1,
    section: "triet",
    topic: "Khái luận về triết học",
    q: "Vấn đề cơ bản của triết học là gì?",
    choices: [
      "Mối quan hệ giữa con người và tự nhiên",
      "Mối quan hệ giữa vật chất và ý thức",
      "Mối quan hệ giữa lực lượng sản xuất và quan hệ sản xuất",
      "Mối quan hệ giữa tồn tại xã hội và ý thức xã hội",
    ],
    answer: 1,
    explanation:
      "Vấn đề cơ bản của triết học là mối quan hệ giữa vật chất và ý thức (tư duy và tồn tại). Vấn đề này có hai mặt: mặt thứ nhất — cái nào có trước, cái nào quyết định; mặt thứ hai — con người có khả năng nhận thức thế giới không.",
    source: "Chương 1",
  },
  {
    id: 2,
    section: "triet",
    topic: "Khái luận về triết học",
    q: "Triết học Mác-Lênin ra đời vào thời gian nào?",
    choices: [
      "Cuối thế kỷ XVII — đầu thế kỷ XVIII",
      "Đầu thế kỷ XIX",
      "Những năm 40 của thế kỷ XIX",
      "Cuối thế kỷ XIX — đầu thế kỷ XX",
    ],
    answer: 2,
    explanation:
      "Triết học Mác ra đời vào những năm 40 của thế kỷ XIX, gắn liền với các tác phẩm của Marx và Engels như 'Hệ tư tưởng Đức' (1845–1846), 'Luận cương về Feuerbach' (1845), 'Tuyên ngôn của Đảng Cộng sản' (1848).",
    source: "Chương 1",
  },
  {
    id: 3,
    section: "triet",
    topic: "Khái luận về triết học",
    q: "Luận điểm nào sau đây thể hiện đúng nhất vai trò của triết học Mác-Lênin?",
    choices: [
      "Là khoa học của mọi khoa học, thay thế các khoa học cụ thể",
      "Là thế giới quan, phương pháp luận cho nhận thức và hoạt động thực tiễn",
      "Chỉ có vai trò trong nghiên cứu khoa học, không áp dụng vào đời sống",
      "Là môn học thuần túy lý thuyết, không liên quan thực tiễn",
    ],
    answer: 1,
    explanation:
      "Triết học Mác-Lênin đóng vai trò là thế giới quan khoa học (giúp nhìn nhận thế giới đúng đắn) và phương pháp luận chung (cung cấp nguyên tắc, cách tiếp cận) cho mọi hoạt động nhận thức và thực tiễn.",
    source: "Chương 1",
  },

  // Vật chất và ý thức
  {
    id: 4,
    section: "triet",
    topic: "Vật chất và ý thức",
    q: "Theo Lenin, định nghĩa đúng nhất về vật chất là:",
    choices: [
      "Vật chất là tất cả những gì tồn tại trong vũ trụ",
      "Vật chất là phạm trù triết học dùng để chỉ thực tại khách quan, được đem lại cho con người trong cảm giác, tồn tại không lệ thuộc vào cảm giác",
      "Vật chất là những vật thể, chất liệu cụ thể mà con người có thể nhìn thấy hoặc sờ mó được",
      "Vật chất là phạm trù triết học chỉ những gì không thay đổi theo thời gian",
    ],
    answer: 1,
    explanation:
      "Lenin định nghĩa: 'Vật chất là phạm trù triết học dùng để chỉ thực tại khách quan, được đem lại cho con người trong cảm giác, được cảm giác của chúng ta chép lại, chụp lại, phản ánh, và tồn tại không lệ thuộc vào cảm giác.' (Lenin, Chủ nghĩa duy vật và chủ nghĩa kinh nghiệm phê phán, 1909)",
    source: "Chương 2",
  },
  {
    id: 5,
    section: "triet",
    topic: "Vật chất và ý thức",
    q: "Thuộc tính cơ bản nhất, phổ biến nhất của vật chất là gì?",
    choices: [
      "Vận động",
      "Không gian",
      "Thời gian",
      "Phản ánh",
    ],
    answer: 0,
    explanation:
      "Vận động là thuộc tính cơ bản và phổ biến nhất của vật chất. Engels khẳng định: 'Vận động, hiểu theo nghĩa chung nhất... là phương thức tồn tại của vật chất.' Không có vật chất nào không vận động và không có vận động nào không có vật chất.",
    source: "Chương 2",
  },
  {
    id: 6,
    section: "triet",
    topic: "Vật chất và ý thức",
    q: "Nguồn gốc của ý thức là gì theo quan điểm triết học Mác-Lênin?",
    choices: [
      "Do Thượng đế ban cho con người",
      "Là thuộc tính của toàn bộ thế giới vật chất",
      "Là sản phẩm của bộ não người và là sự phản ánh thế giới khách quan",
      "Xuất hiện đồng thời với vật chất",
    ],
    answer: 2,
    explanation:
      "Theo triết học Mác-Lênin, ý thức có hai nguồn gốc: nguồn gốc tự nhiên (bộ não người — cơ quan vật chất cao nhất) và nguồn gốc xã hội (lao động và ngôn ngữ). Ý thức là sự phản ánh thế giới vật chất khách quan vào bộ não con người.",
    source: "Chương 2",
  },
  {
    id: 7,
    section: "triet",
    topic: "Vật chất và ý thức",
    q: "Mối quan hệ giữa vật chất và ý thức theo triết học Mác-Lênin là:",
    choices: [
      "Vật chất và ý thức độc lập nhau, không có quan hệ gì",
      "Ý thức quyết định vật chất, vật chất phụ thuộc ý thức",
      "Vật chất quyết định ý thức, ý thức có tính độc lập tương đối và tác động trở lại vật chất",
      "Vật chất và ý thức quyết định nhau ngang nhau",
    ],
    answer: 2,
    explanation:
      "Vật chất có trước, ý thức có sau; vật chất quyết định ý thức. Tuy nhiên ý thức có tính độc lập tương đối: có thể đi trước (hoặc lạc hậu) so với vật chất, tác động trở lại mạnh mẽ lên thế giới vật chất thông qua hoạt động thực tiễn của con người.",
    source: "Chương 2",
  },
  {
    id: 8,
    section: "triet",
    topic: "Vật chất và ý thức",
    q: "Phạm trù 'thực tiễn' trong triết học Mác-Lênin được hiểu là:",
    choices: [
      "Mọi hoạt động tinh thần, tư duy của con người",
      "Hoạt động vật chất, cảm tính, có mục đích của con người nhằm cải tạo thế giới khách quan",
      "Chỉ hoạt động lao động sản xuất vật chất của giai cấp công nhân",
      "Những thí nghiệm khoa học trong phòng thí nghiệm",
    ],
    answer: 1,
    explanation:
      "Thực tiễn là toàn bộ hoạt động vật chất, có mục đích, mang tính lịch sử-xã hội của con người nhằm cải tạo tự nhiên và xã hội. Ba hình thức cơ bản: hoạt động sản xuất vật chất, hoạt động chính trị-xã hội, và thực nghiệm khoa học.",
    source: "Chương 2",
  },
  {
    id: 9,
    section: "triet",
    topic: "Vật chất và ý thức",
    q: "Tiêu chuẩn của chân lý theo triết học Mác-Lênin là gì?",
    choices: [
      "Được số đông đồng ý",
      "Phù hợp với lý luận đã được thừa nhận",
      "Thực tiễn",
      "Được kiểm nghiệm bằng thí nghiệm khoa học",
    ],
    answer: 2,
    explanation:
      "Marx khẳng định: 'Vấn đề tư duy con người có đạt tới chân lý khách quan không — đó không phải là vấn đề lý luận mà là vấn đề thực tiễn.' Thực tiễn là tiêu chuẩn duy nhất và cuối cùng của chân lý, dù bản thân thực tiễn cũng vận động, phát triển.",
    source: "Chương 2",
  },

  // Phép biện chứng duy vật
  {
    id: 10,
    section: "triet",
    topic: "Phép biện chứng duy vật",
    q: "Hai nguyên lý cơ bản của phép biện chứng duy vật là:",
    choices: [
      "Nguyên lý về tính tất yếu và nguyên lý về tính ngẫu nhiên",
      "Nguyên lý về mối liên hệ phổ biến và nguyên lý về sự phát triển",
      "Nguyên lý về vật chất và nguyên lý về ý thức",
      "Nguyên lý về nhân quả và nguyên lý về mâu thuẫn",
    ],
    answer: 1,
    explanation:
      "Phép biện chứng duy vật xây dựng trên hai nguyên lý nền tảng: (1) Nguyên lý về mối liên hệ phổ biến — mọi sự vật, hiện tượng đều liên hệ với nhau; (2) Nguyên lý về sự phát triển — mọi thứ đều vận động, phát triển không ngừng theo hướng đi lên.",
    source: "Chương 2",
  },
  {
    id: 11,
    section: "triet",
    topic: "Phép biện chứng duy vật",
    q: "Quy luật lượng — chất phản ánh điều gì?",
    choices: [
      "Nguồn gốc của sự vận động, phát triển",
      "Khuynh hướng của sự phát triển",
      "Cách thức của sự phát triển",
      "Mối quan hệ giữa nguyên nhân và kết quả",
    ],
    answer: 2,
    explanation:
      "Ba quy luật cơ bản: (1) Quy luật mâu thuẫn — nguồn gốc của sự vận động; (2) Quy luật lượng-chất — cách thức (phương thức) của sự phát triển (thay đổi lượng dần dần dẫn tới bước nhảy về chất); (3) Quy luật phủ định của phủ định — khuynh hướng (xoáy trôn ốc, tiến lên).",
    source: "Chương 2",
  },
  {
    id: 12,
    section: "triet",
    topic: "Phép biện chứng duy vật",
    q: "Khái niệm 'độ' trong quy luật lượng — chất là gì?",
    choices: [
      "Giới hạn tối đa mà sự vật có thể đạt được",
      "Khoảng giới hạn trong đó sự thay đổi về lượng chưa làm thay đổi chất",
      "Tốc độ thay đổi của sự vật",
      "Điểm bắt đầu của bước nhảy chất",
    ],
    answer: 1,
    explanation:
      "'Độ' là khoảng giới hạn (từ điểm giới hạn này đến điểm giới hạn kia) mà trong đó sự thay đổi về lượng chưa dẫn tới sự thay đổi về chất của sự vật. Khi lượng vượt ra ngoài 'độ' thì xảy ra 'bước nhảy' — chất mới ra đời.",
    source: "Chương 2",
  },
  {
    id: 13,
    section: "triet",
    topic: "Phép biện chứng duy vật",
    q: "Theo quy luật thống nhất và đấu tranh của các mặt đối lập, nguồn gốc của sự vận động phát triển là:",
    choices: [
      "Sự tác động từ bên ngoài của môi trường",
      "Mâu thuẫn nội tại bên trong sự vật, hiện tượng",
      "Sự thay đổi của lượng tích lũy theo thời gian",
      "Sự phủ định của thế hệ sau đối với thế hệ trước",
    ],
    answer: 1,
    explanation:
      "Mâu thuẫn là nguồn gốc và động lực của sự phát triển. Mọi sự vật đều chứa đựng những mặt đối lập (mâu thuẫn). Sự thống nhất và đấu tranh của các mặt đối lập là nguồn gốc nội tại của mọi vận động, phát triển.",
    source: "Chương 2",
  },
  {
    id: 14,
    section: "triet",
    topic: "Phép biện chứng duy vật",
    q: "Quy luật phủ định của phủ định cho thấy khuynh hướng phát triển của sự vật là:",
    choices: [
      "Theo đường thẳng đi lên không ngừng",
      "Theo đường tròn khép kín, lặp lại hoàn toàn",
      "Theo đường xoáy trôn ốc — đi lên nhưng có kế thừa, lặp lại ở mức cao hơn",
      "Ngẫu nhiên, không theo quy luật",
    ],
    answer: 2,
    explanation:
      "Phủ định biện chứng là phủ định có kế thừa: cái mới ra đời phủ định cái cũ nhưng giữ lại những yếu tố tích cực. Quá trình phủ định của phủ định tạo nên đường xoáy trôn ốc — dường như quay lại điểm xuất phát nhưng ở trình độ cao hơn.",
    source: "Chương 2",
  },
  {
    id: 15,
    section: "triet",
    topic: "Phép biện chứng duy vật",
    q: "Cặp phạm trù 'nguyên nhân và kết quả' trong phép biện chứng duy vật cho thấy:",
    choices: [
      "Nguyên nhân luôn xuất hiện trước kết quả về mặt thời gian",
      "Một nguyên nhân chỉ có thể sinh ra một kết quả duy nhất",
      "Kết quả không thể tác động ngược lại nguyên nhân",
      "Nguyên nhân và kết quả hoàn toàn độc lập nhau",
    ],
    answer: 0,
    explanation:
      "Nguyên nhân luôn có trước kết quả về mặt thời gian (nguyên nhân sinh ra kết quả, chứ không phải ngược lại). Tuy nhiên, mối quan hệ nhân-quả có tính phức tạp: một nguyên nhân có thể sinh ra nhiều kết quả và ngược lại; kết quả cũng có thể tác động trở lại nguyên nhân.",
    source: "Chương 2",
  },
  {
    id: 16,
    section: "triet",
    topic: "Phép biện chứng duy vật",
    q: "Luận điểm 'Không ai tắm hai lần trên cùng một dòng sông' của Heraclitus phản ánh:",
    choices: [
      "Nguyên lý về mối liên hệ phổ biến",
      "Nguyên lý về sự phát triển và vận động không ngừng",
      "Quy luật lượng — chất",
      "Quy luật phủ định của phủ định",
    ],
    answer: 1,
    explanation:
      "Heraclitus — nhà biện chứng cổ đại Hy Lạp — với câu nói nổi tiếng này muốn khẳng định rằng mọi thứ đều luôn vận động và biến đổi không ngừng (nguyên lý về sự phát triển). Lần tắm thứ hai, cả con người lẫn dòng sông đều đã thay đổi.",
    source: "Chương 2",
  },
  {
    id: 17,
    section: "triet",
    topic: "Phép biện chứng duy vật",
    q: "Điểm khác biệt căn bản giữa phép biện chứng duy vật và phép biện chứng duy tâm (Hegel) là:",
    choices: [
      "Phép biện chứng duy vật không thừa nhận sự phát triển",
      "Phép biện chứng duy vật đặt biện chứng trên cơ sở vật chất, không phải ý niệm tuyệt đối",
      "Hegel không đề cập đến mâu thuẫn",
      "Phép biện chứng duy vật bác bỏ hoàn toàn tư tưởng của Hegel",
    ],
    answer: 1,
    explanation:
      "Marx đã 'lật ngược' Hegel: Hegel xây dựng biện chứng trên nền tảng ý niệm tuyệt đối (duy tâm), còn Marx đặt biện chứng trên cơ sở thế giới vật chất khách quan (duy vật). Marx thừa nhận 'hạt nhân hợp lý' trong triết học Hegel nhưng phê phán vỏ bọc thần bí của nó.",
    source: "Chương 2",
  },

  // Chủ nghĩa duy vật lịch sử
  {
    id: 18,
    section: "triet",
    topic: "Chủ nghĩa duy vật lịch sử",
    q: "Cơ sở hạ tầng bao gồm những yếu tố nào?",
    choices: [
      "Nhà nước, pháp luật, chính trị, tôn giáo",
      "Khoa học, giáo dục, văn hóa, nghệ thuật",
      "Toàn bộ quan hệ sản xuất của một xã hội (lực lượng sản xuất + quan hệ sản xuất)",
      "Toàn bộ quan hệ sản xuất của một xã hội (quan hệ sở hữu, quản lý, phân phối)",
    ],
    answer: 3,
    explanation:
      "Cơ sở hạ tầng là toàn bộ các quan hệ sản xuất của một xã hội trong giai đoạn lịch sử nhất định, bao gồm: quan hệ sở hữu về tư liệu sản xuất, quan hệ quản lý và tổ chức sản xuất, quan hệ phân phối sản phẩm. Lực lượng sản xuất không thuộc cơ sở hạ tầng.",
    source: "Chương 3",
  },
  {
    id: 19,
    section: "triet",
    topic: "Chủ nghĩa duy vật lịch sử",
    q: "Theo chủ nghĩa duy vật lịch sử, cái nào quyết định cái nào?",
    choices: [
      "Kiến trúc thượng tầng quyết định cơ sở hạ tầng",
      "Cơ sở hạ tầng quyết định kiến trúc thượng tầng",
      "Hai cái quyết định nhau ngang nhau",
      "Nhà nước quyết định cả hai",
    ],
    answer: 1,
    explanation:
      "Cơ sở hạ tầng (quan hệ sản xuất) quyết định kiến trúc thượng tầng (nhà nước, pháp luật, ý thức xã hội...). Khi cơ sở hạ tầng thay đổi thì kiến trúc thượng tầng cũng thay đổi theo. Tuy nhiên, kiến trúc thượng tầng có tác động trở lại (tích cực hoặc tiêu cực) với cơ sở hạ tầng.",
    source: "Chương 3",
  },
  {
    id: 20,
    section: "triet",
    topic: "Chủ nghĩa duy vật lịch sử",
    q: "Hình thái kinh tế-xã hội là khái niệm chỉ:",
    choices: [
      "Một kiểu nhà nước cụ thể",
      "Xã hội ở một giai đoạn phát triển lịch sử nhất định, với lực lượng sản xuất, quan hệ sản xuất và kiến trúc thượng tầng tương ứng",
      "Mức độ phát triển kinh tế của một quốc gia",
      "Chế độ sở hữu tư liệu sản xuất",
    ],
    answer: 1,
    explanation:
      "Hình thái kinh tế-xã hội là khái niệm khoa học của Marx, chỉ xã hội ở một trình độ phát triển lịch sử-tự nhiên nhất định, với lực lượng sản xuất nhất định (cơ sở kinh tế) và kiến trúc thượng tầng tương ứng. Lịch sử loài người là lịch sử kế tiếp nhau của các hình thái KTXH.",
    source: "Chương 3",
  },
  {
    id: 21,
    section: "triet",
    topic: "Chủ nghĩa duy vật lịch sử",
    q: "Giai cấp là những tập đoàn người khác nhau về:",
    choices: [
      "Địa vị, vai trò trong nền sản xuất xã hội và quan hệ với tư liệu sản xuất",
      "Trình độ học vấn và nghề nghiệp",
      "Nguồn gốc xuất thân và dân tộc",
      "Tín ngưỡng tôn giáo và văn hóa",
    ],
    answer: 0,
    explanation:
      "Lenin định nghĩa: giai cấp là tập đoàn người khác nhau về địa vị trong hệ thống sản xuất xã hội, quan hệ với tư liệu sản xuất, vai trò trong tổ chức lao động và do đó khác nhau về cách thức hưởng thụ và thu nhập. Tiêu chí cơ bản nhất là quan hệ với tư liệu sản xuất.",
    source: "Chương 3",
  },
  {
    id: 22,
    section: "triet",
    topic: "Chủ nghĩa duy vật lịch sử",
    q: "Cách mạng xã hội là gì?",
    choices: [
      "Mọi sự thay đổi trong xã hội, dù lớn hay nhỏ",
      "Sự thay thế hình thái kinh tế-xã hội này bằng hình thái kinh tế-xã hội khác cao hơn",
      "Chỉ là cuộc đảo chính giành chính quyền",
      "Sự cải cách dần dần của giai cấp thống trị",
    ],
    answer: 1,
    explanation:
      "Cách mạng xã hội là bước chuyển biến nhảy vọt về chất trong đời sống xã hội, sự thay thế hình thái KTXH lỗi thời bằng hình thái KTXH tiến bộ hơn. Đây là quy luật phát triển của xã hội loài người. Nội dung cơ bản nhất là vấn đề giành chính quyền nhà nước.",
    source: "Chương 3",
  },
  {
    id: 23,
    section: "triet",
    topic: "Chủ nghĩa duy vật lịch sử",
    q: "Tồn tại xã hội và ý thức xã hội có mối quan hệ như thế nào?",
    choices: [
      "Ý thức xã hội quyết định tồn tại xã hội",
      "Tồn tại xã hội quyết định ý thức xã hội; ý thức xã hội phản ánh và có thể tác động lại tồn tại xã hội",
      "Hai cái độc lập hoàn toàn với nhau",
      "Ý thức xã hội và tồn tại xã hội quyết định nhau ngang nhau",
    ],
    answer: 1,
    explanation:
      "Tồn tại xã hội (điều kiện sống vật chất) quyết định ý thức xã hội. Ý thức xã hội là sự phản ánh tồn tại xã hội. Tuy nhiên, ý thức xã hội có tính độc lập tương đối (có thể tiên tiến hoặc lạc hậu hơn tồn tại) và có thể tác động trở lại tồn tại xã hội.",
    source: "Chương 3",
  },
  {
    id: 24,
    section: "triet",
    topic: "Chủ nghĩa duy vật lịch sử",
    q: "Quan niệm của chủ nghĩa Mác về bản chất con người là gì?",
    choices: [
      "Con người là động vật có lý trí",
      "Con người là sản phẩm và chủ thể của lịch sử; bản chất con người là tổng hòa các quan hệ xã hội",
      "Con người do Thượng đế tạo ra và có sứ mệnh thiêng liêng",
      "Con người chỉ là công cụ của lịch sử, không có vai trò chủ động",
    ],
    answer: 1,
    explanation:
      "Marx viết: 'Bản chất của con người không phải là cái gì trừu tượng vốn có của cá nhân riêng lẻ. Trong tính hiện thực của nó, bản chất con người là tổng hòa những quan hệ xã hội.' Con người vừa là sản phẩm (bị quy định bởi lịch sử) vừa là chủ thể (tạo ra lịch sử).",
    source: "Chương 3",
  },
  {
    id: 25,
    section: "triet",
    topic: "Chủ nghĩa duy vật lịch sử",
    q: "Nhân tố nào là nhân tố suy đến cùng quyết định lịch sử?",
    choices: [
      "Ý chí của các vĩ nhân và lãnh tụ vĩ đại",
      "Ý thức hệ và tôn giáo thống trị",
      "Sản xuất và tái sản xuất ra đời sống hiện thực",
      "Đấu tranh giai cấp",
    ],
    answer: 2,
    explanation:
      "Engels viết trong thư gửi Bloch (1890): 'Nhân tố suy đến cùng quyết định lịch sử là sản xuất và tái sản xuất ra đời sống hiện thực.' Đây là quan điểm duy vật lịch sử: kinh tế là cơ sở, các yếu tố khác (chính trị, pháp luật, tôn giáo...) đều phụ thuộc vào cơ sở kinh tế.",
    source: "Chương 3",
  },

  // ── KINH TẾ CHÍNH TRỊ ─────────────────────────────────
  {
    id: 26,
    section: "ktct",
    topic: "Học thuyết giá trị",
    q: "Hàng hóa là gì theo kinh tế chính trị Marx?",
    choices: [
      "Mọi sản phẩm do lao động của con người tạo ra",
      "Sản phẩm của lao động, có thể thỏa mãn nhu cầu nào đó của con người và được sản xuất để trao đổi",
      "Mọi thứ có thể mua bán trên thị trường",
      "Sản phẩm được sản xuất hàng loạt bởi máy móc",
    ],
    answer: 1,
    explanation:
      "Hàng hóa là sản phẩm của lao động, có khả năng thỏa mãn một nhu cầu nào đó của con người (giá trị sử dụng) và được sản xuất ra không phải để người sản xuất dùng mà để trao đổi, mua bán (giá trị trao đổi).",
    source: "Chương 4",
  },
  {
    id: 27,
    section: "ktct",
    topic: "Học thuyết giá trị",
    q: "Hai thuộc tính của hàng hóa là gì?",
    choices: [
      "Giá trị và giá cả",
      "Giá trị sử dụng và giá trị (trao đổi)",
      "Chất lượng và số lượng",
      "Giá trị thực và giá trị danh nghĩa",
    ],
    answer: 1,
    explanation:
      "Hàng hóa có hai thuộc tính: (1) Giá trị sử dụng — công dụng của hàng hóa, khả năng thỏa mãn nhu cầu; (2) Giá trị — lao động xã hội kết tinh trong hàng hóa, biểu hiện qua giá trị trao đổi. Mâu thuẫn giữa hai thuộc tính này là mầm mống của mọi mâu thuẫn trong sản xuất hàng hóa.",
    source: "Chương 4",
  },
  {
    id: 28,
    section: "ktct",
    topic: "Học thuyết giá trị",
    q: "Thước đo giá trị của hàng hóa là gì?",
    choices: [
      "Thời gian lao động cá biệt của người sản xuất",
      "Thời gian lao động xã hội cần thiết",
      "Giá thị trường hiện hành của hàng hóa",
      "Số lượng nguyên vật liệu dùng để sản xuất",
    ],
    answer: 1,
    explanation:
      "Giá trị của hàng hóa được đo bằng thời gian lao động xã hội cần thiết — thời gian trung bình, điều kiện sản xuất trung bình (kỹ xảo trung bình, cường độ lao động trung bình) để sản xuất ra một hàng hóa. Không phải thời gian lao động cá biệt của từng người sản xuất.",
    source: "Chương 4",
  },
  {
    id: 29,
    section: "ktct",
    topic: "Học thuyết giá trị",
    q: "Tiền tệ thực hiện chức năng nào sau đây?",
    choices: [
      "Thước đo giá trị và phương tiện lưu thông",
      "Chỉ là phương tiện thanh toán",
      "Chỉ là thước đo giá trị",
      "Chỉ là phương tiện tích lũy",
    ],
    answer: 0,
    explanation:
      "Tiền tệ có 5 chức năng: (1) Thước đo giá trị — biểu hiện giá trị hàng hóa; (2) Phương tiện lưu thông — môi giới trong trao đổi; (3) Phương tiện cất trữ; (4) Phương tiện thanh toán; (5) Tiền tệ thế giới. Hai chức năng đầu là cơ bản nhất.",
    source: "Chương 4",
  },
  {
    id: 30,
    section: "ktct",
    topic: "Học thuyết giá trị",
    q: "Quy luật giá trị yêu cầu:",
    choices: [
      "Trao đổi hàng hóa theo tỷ lệ tùy ý, phụ thuộc nhu cầu",
      "Sản xuất và trao đổi hàng hóa phải dựa trên thời gian lao động xã hội cần thiết",
      "Giá cả thị trường phải luôn bằng giá trị",
      "Người sản xuất được tự do định giá theo ý muốn",
    ],
    answer: 1,
    explanation:
      "Quy luật giá trị là quy luật kinh tế cơ bản của sản xuất hàng hóa: sản xuất và trao đổi hàng hóa phải dựa trên cơ sở hao phí lao động xã hội cần thiết. Trong cạnh tranh, giá cả dao động quanh giá trị — đây là cơ chế điều tiết sản xuất xã hội.",
    source: "Chương 4",
  },
  {
    id: 31,
    section: "ktct",
    topic: "Học thuyết giá trị",
    q: "Lao động cụ thể và lao động trừu tượng khác nhau ở chỗ nào?",
    choices: [
      "Lao động cụ thể tạo ra giá trị sử dụng; lao động trừu tượng tạo ra giá trị của hàng hóa",
      "Lao động cụ thể là lao động thủ công; lao động trừu tượng là lao động máy móc",
      "Lao động cụ thể thuộc về cá nhân; lao động trừu tượng thuộc về xã hội",
      "Lao động cụ thể tạo ra giá trị; lao động trừu tượng tạo ra giá trị sử dụng",
    ],
    answer: 0,
    explanation:
      "Lao động cụ thể là lao động có hình thức cụ thể, mang đặc điểm riêng của từng nghề nghiệp (thợ mộc, thợ may...) — tạo ra giá trị sử dụng. Lao động trừu tượng là hao phí lao động của con người nói chung (cơ bắp, thần kinh...) — tạo ra giá trị của hàng hóa.",
    source: "Chương 4",
  },

  // Giá trị thặng dư
  {
    id: 32,
    section: "ktct",
    topic: "Học thuyết giá trị thặng dư",
    q: "Giá trị thặng dư (m) là gì?",
    choices: [
      "Phần lợi nhuận mà nhà tư bản thu được từ buôn bán",
      "Phần giá trị mới dôi ra ngoài giá trị sức lao động, do công nhân tạo ra nhưng bị nhà tư bản chiếm đoạt",
      "Tiền lương mà nhà tư bản trả cho công nhân",
      "Giá trị máy móc và nguyên liệu trong sản xuất",
    ],
    answer: 1,
    explanation:
      "Giá trị thặng dư là phần giá trị mới (do lao động sống của công nhân tạo ra) vượt quá giá trị sức lao động (tiền lương). Đây là nguồn gốc của lợi nhuận tư bản. Công thức: m = v' – v, trong đó v là giá trị sức lao động đã trả, v' là giá trị mới do lao động tạo ra.",
    source: "Chương 5",
  },
  {
    id: 33,
    section: "ktct",
    topic: "Học thuyết giá trị thặng dư",
    q: "Tư bản bất biến (c) và tư bản khả biến (v) khác nhau ở điểm nào?",
    choices: [
      "c là tiền mặt; v là tài sản cố định",
      "c là tư bản để mua máy móc, nguyên vật liệu (không tạo ra GTTD); v là tư bản mua sức lao động (tạo ra GTTD)",
      "c là tư bản ngắn hạn; v là tư bản dài hạn",
      "c là tư bản trong nước; v là tư bản nước ngoài",
    ],
    answer: 1,
    explanation:
      "Tư bản bất biến (c): phần tư bản chuyển thành tư liệu sản xuất (máy móc, nguyên liệu) — giá trị không thay đổi, chỉ chuyển vào sản phẩm. Tư bản khả biến (v): phần tư bản mua sức lao động — giá trị thay đổi (tăng lên) trong quá trình sản xuất, tạo ra giá trị thặng dư.",
    source: "Chương 5",
  },
  {
    id: 34,
    section: "ktct",
    topic: "Học thuyết giá trị thặng dư",
    q: "Hai phương pháp sản xuất giá trị thặng dư là:",
    choices: [
      "GTTD tuyệt đối và GTTD tương đối",
      "GTTD trực tiếp và GTTD gián tiếp",
      "GTTD trong sản xuất và GTTD trong lưu thông",
      "GTTD bình thường và GTTD siêu ngạch",
    ],
    answer: 0,
    explanation:
      "Hai phương pháp: (1) GTTD tuyệt đối — kéo dài ngày lao động, giữ nguyên thời gian lao động cần thiết; (2) GTTD tương đối — rút ngắn thời gian lao động cần thiết (bằng tăng năng suất lao động), do đó tăng thời gian lao động thặng dư trong cùng ngày lao động.",
    source: "Chương 5",
  },
  {
    id: 35,
    section: "ktct",
    topic: "Học thuyết giá trị thặng dư",
    q: "Tích lũy tư bản là gì?",
    choices: [
      "Tiết kiệm tiền lương của nhà tư bản để mua hàng hóa xa xỉ",
      "Biến một phần giá trị thặng dư thành tư bản phụ thêm để mở rộng sản xuất",
      "Vay vốn ngân hàng để đầu tư thêm",
      "Tăng giá bán hàng hóa để thu lợi nhuận cao hơn",
    ],
    answer: 1,
    explanation:
      "Tích lũy tư bản là quá trình tư bản hóa giá trị thặng dư — biến một phần m thành tư bản phụ thêm (c' và v') để mở rộng quy mô sản xuất. Đây là quy luật kinh tế cơ bản của CNTB: tư bản sinh ra tư bản, tập trung ngày càng cao.",
    source: "Chương 5",
  },
  {
    id: 36,
    section: "ktct",
    topic: "Học thuyết giá trị thặng dư",
    q: "Tỷ suất giá trị thặng dư (m') được tính như thế nào?",
    choices: [
      "m' = m/c × 100%",
      "m' = m/(c+v) × 100%",
      "m' = m/v × 100%",
      "m' = v/m × 100%",
    ],
    answer: 2,
    explanation:
      "Tỷ suất giá trị thặng dư: m' = m/v × 100%, trong đó m là giá trị thặng dư và v là tư bản khả biến (chi phí sức lao động). m' cho thấy mức độ bóc lột của tư bản đối với lao động — tỷ lệ giữa thời gian lao động thặng dư và thời gian lao động cần thiết.",
    source: "Chương 5",
  },
  {
    id: 37,
    section: "ktct",
    topic: "Học thuyết giá trị thặng dư",
    q: "Nguồn gốc của lợi nhuận trong nền kinh tế TBCN là gì?",
    choices: [
      "Sự khéo léo kinh doanh và tài năng của nhà tư bản",
      "Chênh lệch giá mua và bán trên thị trường",
      "Giá trị thặng dư do công nhân lao động tạo ra",
      "Tiến bộ công nghệ và đổi mới sáng tạo",
    ],
    answer: 2,
    explanation:
      "Theo Marx, lợi nhuận (p) là hình thức biểu hiện biến đổi của giá trị thặng dư. Nguồn gốc thực sự của lợi nhuận là giá trị thặng dư do lao động sống của công nhân tạo ra. Lợi nhuận che giấu quan hệ bóc lột bằng cách làm cho GTTD trông như sinh ra từ toàn bộ tư bản ứng trước.",
    source: "Chương 5",
  },
  {
    id: 38,
    section: "ktct",
    topic: "CNTB độc quyền",
    q: "Đặc trưng kinh tế cơ bản của CNTB độc quyền là gì?",
    choices: [
      "Tự do cạnh tranh hoàn hảo giữa các doanh nghiệp nhỏ",
      "Sự hình thành và thống trị của các tổ chức độc quyền trong nền kinh tế",
      "Nhà nước sở hữu toàn bộ tư liệu sản xuất",
      "Bình đẳng hoàn toàn trong phân phối thu nhập",
    ],
    answer: 1,
    explanation:
      "Lenin trong 'Chủ nghĩa đế quốc giai đoạn tột cùng của CNTB' (1916) nêu 5 đặc trưng của CNTB độc quyền: (1) Tập trung sản xuất → độc quyền; (2) Hợp nhất tư bản ngân hàng + tư bản công nghiệp → tư bản tài chính; (3) Xuất khẩu tư bản; (4) Phân chia thế giới giữa các liên minh tư bản; (5) Phân chia thế giới giữa các cường quốc.",
    source: "Chương 6",
  },
  {
    id: 39,
    section: "ktct",
    topic: "CNTB độc quyền",
    q: "Tư bản tài chính là sự hợp nhất của:",
    choices: [
      "Tư bản thương nghiệp và tư bản cho vay",
      "Tư bản độc quyền ngân hàng và tư bản độc quyền công nghiệp",
      "Tư bản trong nước và tư bản nước ngoài",
      "Tư bản nhà nước và tư bản tư nhân",
    ],
    answer: 1,
    explanation:
      "Tư bản tài chính (finance capital) là sự hợp nhất, thâm nhập lẫn nhau giữa tư bản độc quyền ngân hàng và tư bản độc quyền công nghiệp, tạo thành một khối tư bản mới có quyền lực kinh tế và chính trị khổng lồ — đặc trưng của CNTB độc quyền.",
    source: "Chương 6",
  },
  {
    id: 40,
    section: "ktct",
    topic: "CNTB độc quyền",
    q: "Tại sao Lenin gọi CNTB độc quyền là 'giai đoạn tột cùng' của CNTB?",
    choices: [
      "Vì CNTB sẽ tồn tại mãi mãi từ giai đoạn này",
      "Vì đây là giai đoạn CNTB phát triển cao nhất, đồng thời chứa đựng điều kiện chín muồi cho cách mạng XHCN",
      "Vì kinh tế tư bản đã đạt đến mức hoàn hảo",
      "Vì không còn mâu thuẫn giai cấp nào nữa",
    ],
    answer: 1,
    explanation:
      "Lenin gọi CNTB độc quyền là 'giai đoạn tột cùng' (imperialism) vì: đây là giai đoạn cao nhất của CNTB, biểu hiện tất cả mâu thuẫn của CNTB ở mức sâu sắc nhất, và đồng thời tạo ra những tiền đề vật chất chín muồi cho cuộc cách mạng XHCN thay thế CNTB.",
    source: "Chương 6",
  },
  {
    id: 41,
    section: "ktct",
    topic: "CNTB độc quyền",
    q: "Xuất khẩu tư bản khác với xuất khẩu hàng hóa ở điểm nào?",
    choices: [
      "Xuất khẩu tư bản là chuyển tư bản (không phải hàng hóa) ra nước ngoài để thu lợi nhuận thặng dư",
      "Xuất khẩu tư bản chỉ là hình thức cho vay tiền",
      "Xuất khẩu tư bản không thu được lợi nhuận",
      "Không có sự khác biệt đáng kể",
    ],
    answer: 0,
    explanation:
      "Xuất khẩu hàng hóa: đưa hàng hóa ra nước ngoài bán để thu tiền. Xuất khẩu tư bản: đưa tư bản (vốn) ra nước ngoài (dưới hình thức đầu tư trực tiếp, cho vay...) để sản xuất hoặc kinh doanh tại đó, thu lợi nhuận siêu ngạch — đây là đặc trưng của giai đoạn CNTB độc quyền.",
    source: "Chương 6",
  },

  // ── CNXH KHOA HỌC ─────────────────────────────────────
  {
    id: 42,
    section: "cnxhkh",
    topic: "Sứ mệnh lịch sử của GCCN",
    q: "Sứ mệnh lịch sử của giai cấp công nhân là gì?",
    choices: [
      "Cải thiện điều kiện làm việc trong khuôn khổ CNTB",
      "Lãnh đạo nhân dân lao động lật đổ CNTB, xây dựng CNXH và CNCS",
      "Đàm phán thương lượng với giai cấp tư sản để nâng cao lương",
      "Di cư ra nước ngoài tìm việc làm tốt hơn",
    ],
    answer: 1,
    explanation:
      "Sứ mệnh lịch sử của GCCN: xóa bỏ chế độ TBCN, xóa bỏ chế độ người bóc lột người, giải phóng giai cấp công nhân và toàn thể nhân loại khỏi áp bức, bóc lột; xây dựng xã hội XHCN và CNCS. Sứ mệnh này xuất phát từ đặc điểm kinh tế-xã hội của GCCN.",
    source: "Chương 7",
  },
  {
    id: 43,
    section: "cnxhkh",
    topic: "Sứ mệnh lịch sử của GCCN",
    q: "Điều kiện khách quan quy định sứ mệnh lịch sử của GCCN là:",
    choices: [
      "Ý chí và quyết tâm của các lãnh tụ cách mạng",
      "Địa vị kinh tế-xã hội trong nền sản xuất TBCN: gắn với lực lượng sản xuất hiện đại, bị bóc lột nặng nề nhất",
      "Số lượng đông đảo của giai cấp công nhân trong dân số",
      "Trình độ học vấn cao của giai cấp công nhân",
    ],
    answer: 1,
    explanation:
      "Điều kiện khách quan: (1) GCCN gắn với lực lượng sản xuất tiên tiến nhất (đại công nghiệp), đại diện cho xu hướng phát triển của lịch sử; (2) Bị bóc lột giá trị thặng dư → lợi ích đối lập trực tiếp với tư bản; (3) Có tổ chức kỷ luật cao (do sản xuất công nghiệp rèn luyện).",
    source: "Chương 7",
  },
  {
    id: 44,
    section: "cnxhkh",
    topic: "CNXH và thời kỳ quá độ",
    q: "Thời kỳ quá độ lên CNXH là gì?",
    choices: [
      "Giai đoạn phát triển cao nhất của CNXH",
      "Thời kỳ cải cách kinh tế trong CNTB",
      "Thời kỳ lịch sử từ CNTB (hoặc tiền TBCN) lên CNXH, với những mâu thuẫn đan xen giữa cái cũ và cái mới",
      "Giai đoạn chuyển từ CNXH sang CNCS",
    ],
    answer: 2,
    explanation:
      "Thời kỳ quá độ là tất yếu lịch sử giữa CNTB và CNXH. Đặc điểm: tồn tại đan xen nhiều thành phần kinh tế, nhiều giai cấp, nhiều mâu thuẫn; nhà nước XHCN (chuyên chính vô sản) giữ vai trò lãnh đạo. Ở Việt Nam, đây là thời kỳ quá độ 'bỏ qua' CNTB (không trải qua giai đoạn TBCN phát triển đầy đủ).",
    source: "Chương 8",
  },
  {
    id: 45,
    section: "cnxhkh",
    topic: "CNXH và thời kỳ quá độ",
    q: "Nền kinh tế XHCN dựa trên chế độ sở hữu như thế nào?",
    choices: [
      "Chỉ có sở hữu tư nhân về tư liệu sản xuất",
      "Chỉ có sở hữu nhà nước về tư liệu sản xuất",
      "Sở hữu toàn dân (nhà nước) và sở hữu tập thể là nền tảng; có thể tồn tại nhiều hình thức sở hữu trong thời kỳ quá độ",
      "Mọi người đều sở hữu tư liệu sản xuất bình đẳng nhau",
    ],
    answer: 2,
    explanation:
      "CNXH xây dựng chế độ công hữu về tư liệu sản xuất (sở hữu toàn dân và sở hữu tập thể làm nền tảng). Trong thời kỳ quá độ, còn tồn tại nhiều thành phần kinh tế (tư nhân, tập thể, nhà nước...). Ở Việt Nam, kinh tế nhà nước giữ vai trò chủ đạo.",
    source: "Chương 8",
  },
  {
    id: 46,
    section: "cnxhkh",
    topic: "Dân chủ XHCN",
    q: "Bản chất của nền dân chủ XHCN là gì?",
    choices: [
      "Quyền lực thuộc về tầng lớp tinh hoa trong xã hội",
      "Quyền lực thuộc về nhân dân, do nhân dân, vì nhân dân; nhà nước do Đảng lãnh đạo",
      "Mỗi cá nhân có quyền tuyệt đối, không bị ràng buộc",
      "Quyền lực chia đều cho tất cả các đảng phái chính trị",
    ],
    answer: 1,
    explanation:
      "Dân chủ XHCN là nền dân chủ của nhân dân, do nhân dân và vì nhân dân lao động. Bản chất kinh tế: dựa trên công hữu về tư liệu sản xuất. Bản chất chính trị: do Đảng Cộng sản lãnh đạo, nhà nước quản lý, nhân dân làm chủ. Khác với dân chủ tư sản (chỉ dân chủ hình thức cho thiểu số).",
    source: "Chương 9",
  },
  {
    id: 47,
    section: "cnxhkh",
    topic: "Dân chủ XHCN",
    q: "Nhà nước XHCN (chuyên chính vô sản) có chức năng gì?",
    choices: [
      "Chỉ duy trì trật tự an ninh xã hội",
      "Trấn áp các giai cấp thù địch; xây dựng, phát triển kinh tế-văn hóa; bảo vệ Tổ quốc",
      "Chỉ quản lý kinh tế, không can thiệp vào văn hóa xã hội",
      "Tiến tới tự tiêu vong ngay lập tức",
    ],
    answer: 1,
    explanation:
      "Nhà nước XHCN có hai chức năng cơ bản: (1) Chức năng thống trị giai cấp (trấn áp sự chống phá của các giai cấp thù địch); (2) Chức năng xã hội (tổ chức xây dựng, phát triển kinh tế-văn hóa, bảo vệ tổ quốc, phục vụ nhân dân). Về lâu dài, khi CNCS được xây dựng hoàn toàn, nhà nước mới tiêu vong.",
    source: "Chương 9",
  },
  {
    id: 48,
    section: "cnxhkh",
    topic: "Vấn đề dân tộc",
    q: "Cương lĩnh dân tộc của chủ nghĩa Mác-Lênin gồm mấy nội dung?",
    choices: [
      "2 nội dung",
      "3 nội dung",
      "4 nội dung",
      "5 nội dung",
    ],
    answer: 1,
    explanation:
      "Cương lĩnh dân tộc của Lenin gồm 3 nội dung: (1) Các dân tộc hoàn toàn bình đẳng; (2) Các dân tộc được quyền tự quyết; (3) Liên hiệp công nhân tất cả các dân tộc. Ba nội dung này liên quan chặt chẽ, trong đó liên hiệp công nhân là nền tảng đảm bảo hai nội dung trên.",
    source: "Chương 11",
  },
  {
    id: 49,
    section: "cnxhkh",
    topic: "Vấn đề dân tộc",
    q: "Quyền tự quyết dân tộc bao gồm:",
    choices: [
      "Chỉ là quyền ly khai khỏi quốc gia hiện tại",
      "Quyền tự lựa chọn con đường phát triển, kể cả quyền ly khai hoặc liên hiệp tùy điều kiện cụ thể",
      "Quyền phân biệt đối xử với dân tộc khác",
      "Quyền thành lập nhà nước riêng trong mọi trường hợp",
    ],
    answer: 1,
    explanation:
      "Quyền tự quyết dân tộc bao gồm quyền phân lập (thành lập nhà nước độc lập) và quyền liên hiệp (sáp nhập với dân tộc khác). Tuy nhiên, Lenin nhấn mạnh: quyền tự quyết phải đặt trong lợi ích của cách mạng vô sản toàn thế giới — không ủng hộ tự quyết có hại cho cách mạng.",
    source: "Chương 11",
  },
  {
    id: 50,
    section: "cnxhkh",
    topic: "Vấn đề tôn giáo",
    q: "Quan điểm của chủ nghĩa Mác-Lênin về tôn giáo là:",
    choices: [
      "Tôn giáo phải bị xóa bỏ ngay lập tức bằng bạo lực",
      "Tôn giáo là thuốc phiện của nhân dân — cần được tôn trọng và bảo vệ",
      "Tôn giáo là hiện tượng xã hội-lịch sử, tồn tại lâu dài; nhà nước XHCN tôn trọng tự do tín ngưỡng đồng thời đấu tranh với việc lợi dụng tôn giáo",
      "Tôn giáo và CNXH hoàn toàn không thể dung hòa",
    ],
    answer: 2,
    explanation:
      "Tôn giáo là hiện tượng xã hội-lịch sử, sẽ tồn tại lâu dài. Nhà nước XHCN: tôn trọng và bảo đảm quyền tự do tín ngưỡng của nhân dân; phê phán mê tín dị đoan; đấu tranh chống lợi dụng tôn giáo cho mục đích phản động. Câu nói 'tôn giáo là thuốc phiện' (Marx) nhằm phê phán tôn giáo được dùng để che khuất mâu thuẫn xã hội.",
    source: "Chương 11",
  },
  {
    id: 51,
    section: "cnxhkh",
    topic: "Gia đình trong CNXH",
    q: "Hôn nhân XHCN được đặc trưng bởi:",
    choices: [
      "Hôn nhân theo sắp đặt của gia đình và xã hội",
      "Hôn nhân tự nguyện, bình đẳng, một vợ một chồng, được nhà nước bảo hộ",
      "Hôn nhân dựa trên điều kiện kinh tế của hai bên",
      "Hôn nhân không cần được pháp luật công nhận",
    ],
    answer: 1,
    explanation:
      "Gia đình XHCN được xây dựng trên nền tảng hôn nhân tự nguyện (do tình yêu), bình đẳng (không có sự thống trị của đàn ông), tiến bộ, một vợ một chồng, bền vững, và được nhà nước XHCN bảo hộ pháp lý. Xóa bỏ chế độ gia trưởng và bất bình đẳng giới trong gia đình.",
    source: "Chương 12",
  },
  {
    id: 52,
    section: "cnxhkh",
    topic: "Cơ cấu xã hội-giai cấp",
    q: "Liên minh công-nông-trí thức trong CNXH có vai trò gì?",
    choices: [
      "Chỉ là hình thức tổ chức lao động sản xuất",
      "Là nền tảng chính trị của nhà nước XHCN, đảm bảo sức mạnh tổng hợp để xây dựng và bảo vệ Tổ quốc",
      "Chỉ có ý nghĩa kinh tế trong phân công lao động",
      "Là liên minh tạm thời, chỉ cần trong giai đoạn đầu xây dựng CNXH",
    ],
    answer: 1,
    explanation:
      "Liên minh công-nông-trí thức (lấy liên minh công-nông làm nền tảng, dưới sự lãnh đạo của GCCN thông qua Đảng) là nền tảng chính trị-xã hội vững chắc của nhà nước XHCN. Đây là lực lượng chủ yếu của cách mạng XHCN và xây dựng CNXH, đặc biệt quan trọng ở các nước nông nghiệp như Việt Nam.",
    source: "Chương 10",
  },
  {
    id: 53,
    section: "cnxhkh",
    topic: "CNXH và thời kỳ quá độ",
    q: "Nguyên tắc phân phối trong CNXH là gì?",
    choices: [
      "Làm theo năng lực, hưởng theo nhu cầu",
      "Làm theo năng lực, hưởng theo lao động",
      "Bình quân — mọi người hưởng như nhau",
      "Hưởng theo tài sản và địa vị xã hội",
    ],
    answer: 1,
    explanation:
      "CNXH (giai đoạn thấp của CNCS): phân phối theo lao động — 'mỗi người làm theo năng lực, hưởng theo lao động.' Đây là nguyên tắc phân phối tiến bộ hơn CNTB, nhưng vẫn tồn tại bất bình đẳng vì năng lực lao động khác nhau. Chỉ ở CNCS (giai đoạn cao) mới đạt 'làm theo năng lực, hưởng theo nhu cầu.'",
    source: "Chương 8",
  },
  {
    id: 54,
    section: "cnxhkh",
    topic: "Sứ mệnh lịch sử của GCCN",
    q: "Điều kiện chủ quan quan trọng nhất để GCCN thực hiện sứ mệnh lịch sử là:",
    choices: [
      "Số lượng đông đảo của GCCN",
      "Sự giàu có về kinh tế của GCCN",
      "Đảng Cộng sản — đội tiên phong, tổ chức cao nhất của GCCN",
      "Vũ khí trang bị hiện đại",
    ],
    answer: 2,
    explanation:
      "Điều kiện chủ quan (yếu tố chủ quan) quan trọng nhất là Đảng Cộng sản — đội tiên phong có tổ chức của GCCN, được trang bị bởi chủ nghĩa Marx-Lenin. Đảng lãnh đạo GCCN và quần chúng nhân dân trong đấu tranh cách mạng. Không có Đảng Cộng sản, GCCN không thể hoàn thành sứ mệnh lịch sử.",
    source: "Chương 7",
  },
];
