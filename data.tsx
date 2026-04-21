import React, { useState } from 'react';
import {
  Globe,
  FlaskConical,
  Rocket,
  Zap,
  Info,
  AlertTriangle,
  CheckCircle2,
  Mic,
  ClipboardCheck,
  RotateCcw,
  Star,
  TreePine,
  Cpu,
  Stars,
  Leaf,
  Wind,
  ShoppingBag,
  CloudLightning,
  Recycle,
  BookMarked,
  BookOpenCheck,
  MessageCircle,
  Headphones,
  BookOpen,
  PenTool,
  FileText
} from 'lucide-react';
import { Lesson, VocabItem, ExerciseItem, QuizQuestion } from './types';

// --- REUSABLE COMPONENTS ---

const VocabTable: React.FC<{ items: VocabItem[], colorTheme: string }> = ({ items, colorTheme }) => (
  <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-white">
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className={`${colorTheme} text-white`}>
          <tr>
            <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">Từ vựng (Word)</th>
            <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">IPA & Loại từ</th>
            <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">Phân tích & Ngữ cảnh</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {items.map((item, idx) => (
            <tr key={idx} className="hover:bg-gray-50 transition-colors group">
              <td className="px-6 py-4">
                <span className="font-bold text-gray-900 text-base block">{item.word}</span>
              </td>
              <td className="px-6 py-4">
                <span className="font-mono text-gray-500 text-xs bg-gray-100 px-2 py-1 rounded-md border border-gray-200">{item.ipa}</span>
              </td>
              <td className="px-6 py-4 text-gray-700">
                <div dangerouslySetInnerHTML={{ __html: item.meaning }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const GrammarBox: React.FC<{
  title: string;
  rule: React.ReactNode;
  examples: { correct: string; incorrect?: string; explain?: string }[];
  color: string
}> = ({ title, rule, examples, color }) => (
  <div className="mb-8 rounded-2xl border border-gray-200 overflow-hidden shadow-sm bg-white">
    <div className={`${color} px-6 py-4 border-b border-white/10`}>
      <h3 className="text-white font-bold text-lg flex items-center gap-2">
        <Zap className="w-5 h-5 fill-current" /> {title}
      </h3>
    </div>
    <div className="p-6">
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6 font-medium text-gray-800">
        {rule}
      </div>
      <div className="space-y-4">
        {examples.map((ex, idx) => (
          <div key={idx} className="relative pl-4 border-l-4 border-l-transparent hover:border-l-indigo-500 transition-all">
            <div className="flex items-start gap-3 mb-1">
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <p className="text-green-800 font-medium bg-green-50 px-2 py-1 rounded inline-block">{ex.correct}</p>
            </div>
            {ex.incorrect && (
              <div className="flex items-start gap-3 mb-1">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-red-800 line-through decoration-red-500/50 bg-red-50 px-2 py-1 rounded inline-block">{ex.incorrect}</p>
              </div>
            )}
            {ex.explain && (
              <p className="text-sm text-gray-500 italic ml-8 mt-1 border-t border-dashed border-gray-200 pt-1">💡 {ex.explain}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ExerciseCard: React.FC<{ item: ExerciseItem, idx: number }> = ({ item, idx }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <div className="p-5 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex gap-3">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold text-sm shrink-0">
          {idx + 1}
        </span>
        <div className="grow">
          <p className="font-medium text-gray-800 text-lg mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.question }}></p>
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-4 py-2 rounded-lg transition-colors flex items-center"
            >
              {showAnswer ? 'Ẩn đáp án' : 'Xem đáp án'}
            </button>
          </div>
          {showAnswer && (
            <div className="mt-4 bg-green-50 p-4 rounded-lg border border-green-100 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
              <div>
                <span className="text-green-800 font-bold block mb-1">Giải thích chi tiết:</span>
                <span className="text-green-900" dangerouslySetInnerHTML={{ __html: item.answer }}></span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PhoneticCard: React.FC<{ pair: string, words: string[], tip: string }> = ({ pair, words, tip }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-indigo-200 transition-colors h-full flex flex-col">
    <div className="flex items-center justify-between mb-4">
      <span className="text-2xl font-black text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl">{pair}</span>
      <Mic className="text-gray-400 w-6 h-6" />
    </div>
    <div className="flex flex-wrap gap-2 mb-4 grow content-start">
      {words.map((w, i) => (
        <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200 hover:bg-indigo-50 hover:text-indigo-700 transition-colors cursor-default">
          {w}
        </span>
      ))}
    </div>
    <p className="text-sm text-gray-600 italic bg-yellow-50 p-3 rounded-lg border border-yellow-100 mt-auto">
      <span className="font-bold text-yellow-700 not-italic">Quy tắc:</span> {tip}
    </p>
  </div>
);

// ============================================================
// UNIT 7: COMPLEX SENTENCES WITH ADVERB CLAUSES OF TIME
// ============================================================

const unit7Vocab: VocabItem[] = [
  { word: "Pollution", ipa: "/pəˈluːʃn/ (n)", meaning: "<strong>Sự ô nhiễm</strong>. Sự làm bẩn môi trường tự nhiên.<br/><em class='text-xs text-gray-500'>Collocation: air/water/soil pollution.</em>" },
  { word: "Ecosystem", ipa: "/ˈiːkəʊˌsɪstəm/ (n)", meaning: "<strong>Hệ sinh thái</strong>. Cộng đồng sinh vật và môi trường sống.<br/><em class='text-xs text-gray-500'>Collocation: protect ecosystems.</em>" },
  { word: "Recycle", ipa: "/ˌriːˈsaɪkl/ (v)", meaning: "<strong>Tái chế</strong>. Xử lý rác để dùng lại.<br/><em class='text-xs text-gray-500'>Family: recycling (n), recyclable (adj).</em>" },
  { word: "Single-use", ipa: "/ˌsɪŋɡl ˈjuːs/ (adj)", meaning: "<strong>Dùng một lần</strong>. Chỉ sử dụng một lần rồi bỏ.<br/><em class='text-xs text-gray-500'>Ví dụ: single-use plastic bags.</em>" },
  { word: "Endangered species", ipa: "/ɪnˈdeɪndʒəd ˈspiːʃiːz/ (n)", meaning: "<strong>Loài có nguy cơ tuyệt chủng</strong>. Loài sinh vật sắp biến mất.<br/><em class='text-xs text-gray-500'>Ví dụ: tigers are endangered species.</em>" },
  { word: "Habitat", ipa: "/ˈhæbɪtæt/ (n)", meaning: "<strong>Môi trường sống</strong>. Nơi sinh vật sống tự nhiên.<br/><em class='text-xs text-gray-500'>Collocation: destroy habitat.</em>" },
  { word: "Natural resources", ipa: "/ˈnætʃrəl rɪˈzɔːsɪz/ (n)", meaning: "<strong>Tài nguyên thiên nhiên</strong>. Nguồn vật chất có sẵn trong tự nhiên.<br/><em class='text-xs text-gray-500'>Ví dụ: coal, oil, wood.</em>" },
  { word: "Carbon footprint", ipa: "/ˈkɑːbən ˌfʊtprɪnt/ (n)", meaning: "<strong>Dấu chân carbon</strong>. Lượng CO₂ thải ra từ hoạt động của con người.<br/><em class='text-xs text-gray-500'>Collocation: reduce your carbon footprint.</em>" },
  { word: "Deforestation", ipa: "/ˌdiːˌfɒrɪˈsteɪʃn/ (n)", meaning: "<strong>Nạn phá rừng</strong>. Việc chặt phá rừng quy mô lớn.<br/><em class='text-xs text-gray-500'>Family: deforest (v).</em>" },
  { word: "Renewable energy", ipa: "/rɪˈnjuːəbl ˈenədʒi/ (n)", meaning: "<strong>Năng lượng tái tạo</strong>. Năng lượng từ nguồn không cạn kiệt.<br/><em class='text-xs text-gray-500'>Ví dụ: solar, wind, hydro energy.</em>" },
  { word: "Litter", ipa: "/ˈlɪtə/ (v, n)", meaning: "<strong>Xả rác / Rác thải</strong>. Thả rác bừa bãi nơi công cộng.<br/><em class='text-xs text-gray-500'>Collocation: litter the street.</em>" },
];

const unit7Exercises: ExerciseItem[] = [
  { id: 1, question: "_______ Jenny left the party, she said goodbye to the host.<br/>(Before / After / As soon as / Until)", answer: "<strong>Before</strong>.<br/>💡 Before = trước khi. Jenny nói lời tạm biệt trước khi rời bữa tiệc → Before Jenny left the party, she said goodbye." },
  { id: 2, question: "_______ I get to school, I will show you my writing about the habitat of polar bear.<br/>(As soon as / While / Until / Till)", answer: "<strong>As soon as</strong>.<br/>💡 As soon as = ngay khi → mệnh đề thời gian + hiện tại đơn → As soon as I get to school, I will show you..." },
  { id: 3, question: "_______ you buy and use a plastic bag, ask yourself if you really need it.<br/>(Before / When / While / After)", answer: "<strong>Before</strong>.<br/>💡 Before = trước khi → Before you buy = trước khi bạn mua túi nhựa, hãy tự hỏi bạn có thực sự cần nó không." },
  { id: 4, question: "While he _______ (work) on the field, the tornado hit the area.<br/>(Chia động từ)", answer: "<strong>was working</strong>.<br/>💡 While + quá khứ tiếp diễn: While he was working (hành động đang xảy ra khi lốc xoáy đổ bộ)." },
];

// ============================================================
// UNIT 8: ADVERBS OF FREQUENCY + PRESENT SIMPLE FOR FUTURE
// ============================================================

const unit8Vocab: VocabItem[] = [
  { word: "Shopaholic", ipa: "/ˌʃɒpəˈhɒlɪk/ (n)", meaning: "<strong>Người nghiện mua sắm</strong>. Người không thể nhịn mua đồ.<br/><em class='text-xs text-gray-500'>Ví dụ: She's a real shopaholic!</em>" },
  { word: "Browse", ipa: "/braʊz/ (v)", meaning: "<strong>Xem hàng (không định mua)</strong>. Nhìn qua các mặt hàng.<br/><em class='text-xs text-gray-500'>Collocation: browse the internet / browse a shop.</em>" },
  { word: "Bargain", ipa: "/ˈbɑːɡən/ (n, v)", meaning: "<strong>Món hời / Mặc cả</strong>. Mua được hàng rẻ hoặc thương lượng giá.<br/><em class='text-xs text-gray-500'>Collocation: get a bargain, bargain with the seller.</em>" },
  { word: "Convenience store", ipa: "/kənˈviːniəns stɔː/ (n)", meaning: "<strong>Cửa hàng tiện lợi</strong>. Cửa hàng mở cửa lâu, bán nhiều loại hàng.<br/><em class='text-xs text-gray-500'>Ví dụ: 7-Eleven, Circle K.</em>" },
  { word: "Online shopping", ipa: "/ˈɒnlaɪn ˈʃɒpɪŋ/ (n)", meaning: "<strong>Mua sắm trực tuyến</strong>. Mua hàng qua internet.<br/><em class='text-xs text-gray-500'>Collocation: shop online.</em>" },
  { word: "Price tag", ipa: "/ˈpraɪs tæɡ/ (n)", meaning: "<strong>Nhãn giá</strong>. Nhãn ghi giá trên hàng hóa.<br/><em class='text-xs text-gray-500'>Ví dụ: check the price tag before buying.</em>" },
  { word: "Customer", ipa: "/ˈkʌstəmə/ (n)", meaning: "<strong>Khách hàng</strong>. Người mua hàng hoặc dịch vụ.<br/><em class='text-xs text-gray-500'>Collocation: serve customers.</em>" },
  { word: "Discount", ipa: "/ˈdɪskaʊnt/ (n)", meaning: "<strong>Giảm giá</strong>. Sự giảm giá so với giá gốc.<br/><em class='text-xs text-gray-500'>Collocation: get a discount, 20% discount.</em>" },
  { word: "Retail", ipa: "/ˈriːteɪl/ (n, adj)", meaning: "<strong>Bán lẻ</strong>. Bán hàng trực tiếp cho người tiêu dùng.<br/><em class='text-xs text-gray-500'>Collocation: retail shop, retail price.</em>" },
  { word: "Addict / Addicted", ipa: "/ˈædɪkt/ /əˈdɪktɪd/ (n/adj)", meaning: "<strong>Người nghiện / Nghiện</strong>. Phụ thuộc vào điều gì đó.<br/><em class='text-xs text-gray-500'>Collocation: be addicted to shopping.</em>" },
];

const unit8Exercises: ExerciseItem[] = [
  { id: 1, question: "The next semester _______ on Friday.<br/>(begins / began / beginning / to begin)", answer: "<strong>begins</strong>.<br/>💡 Hiện tại đơn diễn tả sự kiện theo lịch trình cố định trong tương lai: The next semester begins on Friday." },
  { id: 2, question: "They are rarely ……… home at lunch time.<br/>(at / in / on / to)", answer: "<strong>at</strong>.<br/>💡 'at home' = ở nhà. Giới từ 'at' dùng cho địa điểm chung (home, school, work)." },
  { id: 3, question: "She _______ (always / go) to the market on Sunday mornings.<br/>(Trạng từ tần suất)", answer: "<strong>always goes</strong>.<br/>💡 Trạng từ tần suất (always) đứng TRƯỚC động từ thường: She always goes..." },
  { id: 4, question: "He _______ (never) _______ (forget) to check the price tag.<br/>(Trạng từ tần suất)", answer: "<strong>never forgets</strong>.<br/>💡 never đứng trước động từ thường: He never forgets..." },
];

// ============================================================
// UNIT 9: PAST CONTINUOUS
// ============================================================

const unit9Vocab: VocabItem[] = [
  { word: "Natural disaster", ipa: "/ˈnætʃrəl dɪˈzɑːstə/ (n)", meaning: "<strong>Thảm họa thiên nhiên</strong>. Sự kiện thiên nhiên gây thiệt hại lớn.<br/><em class='text-xs text-gray-500'>Ví dụ: earthquakes, floods, tsunamis.</em>" },
  { word: "Earthquake", ipa: "/ˈɜːθkweɪk/ (n)", meaning: "<strong>Động đất</strong>. Rung chuyển của mặt đất do hoạt động địa chất.<br/><em class='text-xs text-gray-500'>Collocation: a 7.0 magnitude earthquake.</em>" },
  { word: "Flood", ipa: "/flʌd/ (n, v)", meaning: "<strong>Lũ lụt / Ngập lụt</strong>. Nước tràn vào khu vực không bình thường.<br/><em class='text-xs text-gray-500'>Collocation: a major flood, floods occur.</em>" },
  { word: "Tsunami", ipa: "/tsuːˈnɑːmi/ (n)", meaning: "<strong>Sóng thần</strong>. Sóng biển khổng lồ do động đất dưới biển.<br/><em class='text-xs text-gray-500'>Ví dụ: the 2004 Indian Ocean tsunami.</em>" },
  { word: "Tornado", ipa: "/tɔːˈneɪdəʊ/ (n)", meaning: "<strong>Lốc xoáy</strong>. Cơn gió xoáy mạnh hình phễu.<br/><em class='text-xs text-gray-500'>Ví dụ: tornadoes in the USA.</em>" },
  { word: "Shelter", ipa: "/ˈʃeltə/ (n)", meaning: "<strong>Nơi trú ẩn</strong>. Nơi tránh nguy hiểm trong thảm họa.<br/><em class='text-xs text-gray-500'>Collocation: go to a public shelter.</em>" },
  { word: "Evacuate", ipa: "/ɪˈvækjueɪt/ (v)", meaning: "<strong>Sơ tán</strong>. Rời khỏi khu vực nguy hiểm khẩn cấp.<br/><em class='text-xs text-gray-500'>Collocation: evacuate the area.</em>" },
  { word: "Victim", ipa: "/ˈvɪktɪm/ (n)", meaning: "<strong>Nạn nhân</strong>. Người chịu thiệt hại do thảm họa.<br/><em class='text-xs text-gray-500'>Collocation: disaster victims.</em>" },
  { word: "Rescue", ipa: "/ˈreskjuː/ (v, n)", meaning: "<strong>Cứu hộ / Giải cứu</strong>. Cứu người khỏi nguy hiểm.<br/><em class='text-xs text-gray-500'>Collocation: rescue team, rescue operation.</em>" },
  { word: "Strengthen", ipa: "/ˈstreŋθn/ (v)", meaning: "<strong>Tăng cường, củng cố</strong>. Làm cho mạnh hơn.<br/><em class='text-xs text-gray-500'>Antonym: weaken. E.g.: strengthen my knowledge.</em>" },
];

const unit9Exercises: ExerciseItem[] = [
  { id: 1, question: "While the other passengers _______ to the exits, Brian climbed out of the window.<br/>(run / ran / was running / were running)", answer: "<strong>were running</strong>.<br/>💡 While + quá khứ tiếp diễn (số nhiều): the passengers were running → hành động đang xảy ra song song." },
  { id: 2, question: "The sun was shining when Hamilton _______ at the beach in Da Nang on a beautiful morning.<br/>(arrive / arriving / arrived / to arrive)", answer: "<strong>arrived</strong>.<br/>💡 When + quá khứ đơn: khi Hamilton đến (arrived) → sự kiện xảy ra trong khi trời đang nắng (was shining)." },
  { id: 3, question: "I was having dinner at 7 p.m. yesterday when the storm suddenly ______.<br/>(comes / came / come / was coming)", answer: "<strong>came</strong>.<br/>💡 When + quá khứ đơn: hành động bất ngờ xảy ra (came) trong khi hành động khác đang diễn ra." },
  { id: 4, question: "While they _______, an earthquake happened.<br/>(reads / are reading / were reading / will)", answer: "<strong>were reading</strong>.<br/>💡 While + past continuous: While they were reading (hành động đang xảy ra khi động đất xảy ra)." },
];

// ============================================================
// UNIT 10: PREPOSITIONS OF PLACE AND TIME + POSSESSIVE PRONOUNS
// ============================================================

const unit10Vocab: VocabItem[] = [
  { word: "Telepathy", ipa: "/təˈlepəθi/ (n)", meaning: "<strong>Thần giao cách cảm</strong>. Khả năng giao tiếp bằng suy nghĩ.<br/><em class='text-xs text-gray-500'>Ví dụ: communicate by telepathy.</em>" },
  { word: "Holography", ipa: "/həˈlɒɡrəfi/ (n)", meaning: "<strong>Hình ảnh ảo 3D</strong>. Kỹ thuật tạo ảnh không gian 3 chiều.<br/><em class='text-xs text-gray-500'>Ví dụ: 3D holography technology.</em>" },
  { word: "Advanced", ipa: "/ədˈvɑːnst/ (adj)", meaning: "<strong>Tiên tiến, cao cấp</strong>. Hiện đại hơn mức bình thường.<br/><em class='text-xs text-gray-500'>Collocation: advanced technology.</em>" },
  { word: "Communicate", ipa: "/kəˈmjuːnɪkeɪt/ (v)", meaning: "<strong>Giao tiếp, liên lạc</strong>. Trao đổi thông tin với nhau.<br/><em class='text-xs text-gray-500'>Family: communication (n), communicative (adj).</em>" },
  { word: "Social network", ipa: "/ˌsəʊʃl ˈnetwɜːk/ (n)", meaning: "<strong>Mạng xã hội</strong>. Nền tảng giao tiếp trực tuyến.<br/><em class='text-xs text-gray-500'>Ví dụ: Facebook, TikTok.</em>" },
  { word: "Smartphone", ipa: "/ˈsmɑːtfəʊn/ (n)", meaning: "<strong>Điện thoại thông minh</strong>. Điện thoại di động hiện đại.<br/><em class='text-xs text-gray-500'>Ví dụ: a new smartphone.</em>" },
  { word: "Text message", ipa: "/tekst ˈmesɪdʒ/ (n)", meaning: "<strong>Tin nhắn văn bản</strong>. Tin nhắn chữ gửi qua điện thoại.<br/><em class='text-xs text-gray-500'>Collocation: send a text message.</em>" },
  { word: "Video call", ipa: "/ˈvɪdiəʊ kɔːl/ (n)", meaning: "<strong>Cuộc gọi video</strong>. Gọi điện có hình ảnh trực tiếp.<br/><em class='text-xs text-gray-500'>Ví dụ: make a video call.</em>" },
  { word: "Face-to-face", ipa: "/ˌfeɪs tə ˈfeɪs/ (adj, adv)", meaning: "<strong>Trực tiếp, mặt đối mặt</strong>. Nói chuyện trực tiếp với nhau.<br/><em class='text-xs text-gray-500'>Collocation: a face-to-face meeting.</em>" },
  { word: "Translation machine", ipa: "/trænsˈleɪʃn məˌʃiːn/ (n)", meaning: "<strong>Máy phiên dịch</strong>. Thiết bị dịch ngôn ngữ.<br/><em class='text-xs text-gray-500'>Ví dụ: use a translation machine.</em>" },
];

const unit10Exercises: ExerciseItem[] = [
  { id: 1, question: "When I make a _______ to my mother with my smartphone, I can see her on the phone screen.<br/>(text message / phone call / video call / voice call)", answer: "<strong>video call</strong>.<br/>💡 Video call = cuộc gọi video có hình. Vì 'I can see her on the phone screen' → phải là video call." },
  { id: 2, question: "In commemoration of the 50th anniversary, a large-scale military parade was held _______ April 30th.<br/>(at / in / on / to)", answer: "<strong>on</strong>.<br/>💡 Giới từ 'on' dùng trước ngày tháng cụ thể: on April 30th." },
  { id: 3, question: "A friend of _______ got a virtual reality device as a birthday gift.<br/>(I / me / my / mine)", answer: "<strong>mine</strong>.<br/>💡 'A friend of mine' = một người bạn của tôi. Dùng đại từ sở hữu (mine) sau 'of'." },
  { id: 4, question: "This motorbike belongs to Mr. Anderson. It is _______.<br/>(his / theirs / ours / yours)", answer: "<strong>his</strong>.<br/>💡 Đại từ sở hữu: his = his motorbike. Belongs to Mr. Anderson → it is his." },
];

// ============================================================
// UNIT 11: REPORTED SPEECH (STATEMENTS)
// ============================================================

const unit11Vocab: VocabItem[] = [
  { word: "Science", ipa: "/ˈsaɪəns/ (n)", meaning: "<strong>Khoa học</strong>. Hoạt động tìm hiểu thế giới.<br/><em class='text-xs text-gray-500'>Family: scientist (n), scientific (adj).</em>" },
  { word: "Technology", ipa: "/tekˈnɒlədʒi/ (n)", meaning: "<strong>Công nghệ</strong>. Ứng dụng khoa học vào đời sống.<br/><em class='text-xs text-gray-500'>Family: technological (adj).</em>" },
  { word: "Invention", ipa: "/ɪnˈvenʃn/ (n)", meaning: "<strong>Phát minh</strong>. Tạo ra thứ chưa từng có.<br/><em class='text-xs text-gray-500'>Family: invent (v), inventor (n).</em>" },
  { word: "Discover", ipa: "/dɪˈskʌvə/ (v)", meaning: "<strong>Khám phá</strong>. Tìm ra thứ đã có sẵn nhưng chưa ai biết.<br/><em class='text-xs text-gray-500'>Family: discovery (n).</em>" },
  { word: "Online learning", ipa: "/ˈɒnlaɪn ˈlɜːnɪŋ/ (n)", meaning: "<strong>Học trực tuyến</strong>. Học qua mạng internet.<br/><em class='text-xs text-gray-500'>Collocation: an online learning platform.</em>" },
  { word: "Robot", ipa: "/ˈrəʊbɒt/ (n)", meaning: "<strong>Người máy</strong>. Máy móc tự động hóa.<br/><em class='text-xs text-gray-500'>Ví dụ: robot teacher.</em>" },
  { word: "Machine", ipa: "/məˈʃiːn/ (n)", meaning: "<strong>Máy móc</strong>. Thiết bị cơ điện phục vụ công việc.<br/><em class='text-xs text-gray-500'>Ví dụ: washing machine.</em>" },
  { word: "Equip", ipa: "/ɪˈkwɪp/ (v)", meaning: "<strong>Trang bị</strong>. Cung cấp thiết bị cần thiết.<br/><em class='text-xs text-gray-500'>Family: equipment (n).</em>" },
  { word: "Internet", ipa: "/ˈɪntənet/ (n)", meaning: "<strong>Mạng lưới thông tin toàn cầu</strong>.<br/><em class='text-xs text-gray-500'>Collocation: surf the Internet.</em>" },
  { word: "Electronic device", ipa: "/ɪˌlekˈtrɒnɪk dɪˈvaɪs/ (n)", meaning: "<strong>Thiết bị điện tử</strong>. Thiết bị hoạt động bằng mạch điện tử.<br/><em class='text-xs text-gray-500'>Ví dụ: smartphones, tablets, laptops.</em>" },
];

const unit11Exercises: ExerciseItem[] = [
  { id: 1, question: "Jonathan said to his friend that _______.<br/>A. he is reading a science book now<br/>B. he is reading a science book then<br/>C. he was reading a science book now<br/>D. he was reading a science book then", answer: "<strong>D. he was reading a science book then</strong>.<br/>💡 Lùi thì (is reading → was reading), đổi đại từ (I → he), đổi trạng từ (now → then)." },
  { id: 2, question: "\"I will invent a new robot,\" Nam said.<br/>(Viết lại câu tường thuật)", answer: "<strong>Nam said (that) he would invent a new robot.</strong><br/>💡 Lùi thì (will → would), đổi đại từ (I → he)." },
  { id: 3, question: "\"We are learning online now,\" they said.<br/>(Viết lại câu tường thuật)", answer: "<strong>They said (that) they were learning online then.</strong><br/>💡 Lùi thì (are → were), đổi đại từ (We → they), đổi trạng từ (now → then)." },
  { id: 4, question: "\"My father bought this tablet yesterday,\" she told me.<br/>(Viết lại câu tường thuật)", answer: "<strong>She told me (that) her father had bought that tablet the previous day / the day before.</strong><br/>💡 Lùi thì QKĐ → QK Hoàn thành (bought → had bought)." },
];

// ============================================================
// QUIZ QUESTIONS – ĐỀ CƯƠNG CHÍNH THỨC HKII TIẾNG ANH 8
// 47 câu bao phủ: Pronunciation, Stress, Grammar, Vocabulary,
// Error Correction, Reading Cloze, Reading Comprehension, Writing
// ============================================================

export const quizQuestions: QuizQuestion[] = [
  // ===================================================
  // PHẦN A: PHONETICS (5 câu)
  // ===================================================

  // I. Pronunciation - Phát âm (2 câu)
  { id: 1, question: "Choose the word whose underlined part is pronounced differently: A. always  B. natural  C. cathedral  D. cultural", options: ["always", "natural", "cathedral", "cultural"], correct: 2, explanation: "cathedral /kəˈθiːdrəl/ – âm 'a' phát âm /iː/, khác với 3 từ còn lại phát âm /æ/ hoặc /ɔː/.", unit: 0 },
  { id: 2, question: "Choose the word whose underlined part is pronounced differently: A. science  B. fingerprint  C. recognition  D. digital", options: ["science", "fingerprint", "recognition", "digital"], correct: 0, explanation: "science /ˈsaɪəns/ – âm 'i' phát âm /aɪ/, khác với 3 từ còn lại phát âm /ɪ/.", unit: 0 },

  // II. Stress - Trọng âm (3 câu)
  { id: 3, question: "Choose the word whose main stress is different: A. humourous  B. numerous  C. ambitious  D. poisonous", options: ["humourous", "numerous", "ambitious", "poisonous"], correct: 2, explanation: "ambitious /æmˈbɪʃəs/ trọng âm ở âm 2. Các từ còn lại trọng âm ở âm 1.", unit: 0 },
  { id: 4, question: "Choose the word whose main stress is different: A. effective  B. expression  C. pollution  D. employee", options: ["effective", "expression", "pollution", "employee"], correct: 3, explanation: "employee /ˌɪmplɔɪˈiː/ trọng âm ở âm 3. Các từ còn lại trọng âm ở âm 2.", unit: 0 },
  { id: 5, question: "Choose the word whose main stress is different: A. general  B. disaster  C. property  D. fabulous", options: ["general", "disaster", "property", "fabulous"], correct: 1, explanation: "disaster /dɪˈzɑːstə/ trọng âm ở âm 2. Các từ còn lại trọng âm ở âm 1.", unit: 0 },

  // ===================================================
  // PHẦN B: GRAMMAR AND VOCABULARY (19 câu)
  // ===================================================

  // III. Circle the best answer (câu 6-18)
  { id: 6, question: "Stacy: \"My dad promised to get me a new iPad.\" — Christina: \"_______\"", options: ["Great idea.", "Congratulations!", "I'm not sure.", "That's brilliant"], correct: 3, explanation: "That's brilliant! = Tuyệt vời! → phản ứng khen ngợi tin tốt phù hợp nhất.", unit: 0 },
  { id: 7, question: "While the other passengers _______ to the exits, Brian climbed out of the window.", options: ["run", "ran", "was running", "were running"], correct: 3, explanation: "While + QKTD (số nhiều): the passengers were running → hành động đang diễn ra song song.", unit: 9 },
  { id: 8, question: "_______ Jenny left the party, she said goodbye to the host.", options: ["Before", "After", "As soon as", "Until"], correct: 0, explanation: "Before = trước khi. Jenny nói tạm biệt trước khi rời tiệc.", unit: 7 },
  { id: 9, question: "_______ I get to school, I will show you my writing about the habitat of polar bear.", options: ["As soon as", "While", "Until", "Till"], correct: 0, explanation: "As soon as = ngay khi. Ngay khi tôi đến trường, tôi sẽ cho bạn xem bài viết.", unit: 7 },
  { id: 10, question: "When I make a _______ to my mother with my smartphone, I can see her on the phone screen.", options: ["text message", "phone call", "video call", "voice call"], correct: 2, explanation: "Video call = cuộc gọi video. 'I can see her on the screen' → phải thấy hình ảnh.", unit: 10 },
  { id: 11, question: "The sun was shining when Hamilton _______ at the beach in Da Nang on a beautiful morning.", options: ["arrive", "arriving", "arrived", "to arrive"], correct: 2, explanation: "When + quá khứ đơn (arrived): hành động xảy ra tại thời điểm cụ thể trong quá khứ.", unit: 9 },
  { id: 12, question: "Jonathan said to his friend that _______.", options: ["he is reading a science book now", "he is reading a science book then", "he was reading a science book now", "he was reading a science book then"], correct: 3, explanation: "Câu tường thuật: lùi thì (is reading → was reading), đổi trạng từ (now → then).", unit: 11 },
  { id: 13, question: "I was having dinner at 7 p.m. yesterday when the storm suddenly _______.", options: ["comes", "came", "come", "was coming"], correct: 1, explanation: "When + quá khứ đơn (came): hành động bất ngờ xảy ra xen vào hành động đang diễn ra.", unit: 9 },
  { id: 14, question: "The next semester _______ on Friday.", options: ["begins", "began", "beginning", "to begin"], correct: 0, explanation: "Hiện tại đơn cho lịch trình cố định: The next semester begins on Friday.", unit: 8 },
  { id: 15, question: "In commemoration of the 50th anniversary of the liberation of Southern Vietnam, a large-scale military parade was held _______ April 30th.", options: ["at", "in", "on", "to"], correct: 2, explanation: "Giới từ 'on' dùng trước ngày tháng cụ thể: on April 30th.", unit: 10 },

  // Closest meaning / Opposite meaning (câu 16-19)
  { id: 16, question: "The residents of the community actively take part in environmental conservation efforts. ('take part in' means:)", options: ["participate", "ignore", "impact", "throw"], correct: 0, explanation: "take part in = participate = tham gia.", unit: 0 },
  { id: 17, question: "The mid-term test was a piece of cake. Most students get high marks. ('piece of cake' means:)", options: ["bad", "tasty", "easy", "difficult"], correct: 2, explanation: "piece of cake = easy = dễ dàng (thành ngữ).", unit: 0 },
  { id: 18, question: "They are rarely …… home at lunch time.", options: ["at", "in", "on", "to"], correct: 0, explanation: "'at home' = ở nhà. Giới từ 'at' dùng cho vị trí chung.", unit: 8 },
  { id: 19, question: "I need to strengthen my knowledge about natural disasters by reading more books on the subject. (OPPOSITE of 'strengthen':)", options: ["shortage", "improved", "weaken", "purchased"], correct: 2, explanation: "strengthen (tăng cường) ↔ weaken (làm yếu đi). Trái nghĩa.", unit: 0 },

  // Thêm câu Grammar & Vocab (câu 20-24)
  { id: 20, question: "_______ you buy and use a plastic bag, ask yourself if you really need it.", options: ["Before", "When", "While", "After"], correct: 0, explanation: "Before = trước khi. Trước khi mua túi nhựa, hãy tự hỏi có cần không.", unit: 7 },
  { id: 21, question: "A friend of _______ got a virtual reality device as a birthday gift.", options: ["I", "me", "my", "mine"], correct: 3, explanation: "'A friend of mine' = một người bạn của tôi. Dùng đại từ sở hữu sau 'of'.", unit: 10 },
  { id: 22, question: "Many people think _______ will replace human translators in the future.", options: ["voice messages", "translation machines", "dictionaries", "emojis"], correct: 1, explanation: "Translation machines = máy phiên dịch → dự đoán về công nghệ tương lai.", unit: 10 },
  { id: 23, question: "While they _______, an earthquake happened.", options: ["reads", "are reading", "were reading", "will"], correct: 2, explanation: "While + past continuous: were reading (hành động đang xảy ra khi động đất xảy ra).", unit: 9 },
  { id: 24, question: "This motorbike belongs to Mr. Anderson. It is _______.", options: ["his", "theirs", "ours", "yours"], correct: 0, explanation: "Đại từ sở hữu: his = his motorbike. Belongs to Mr. Anderson → it is his.", unit: 10 },

  // ===================================================
  // IV. ERROR CORRECTION (3 câu)
  // ===================================================
  { id: 25, question: "I've seen Alexandre using that new tablet several times, but I don't think it's ___. (Find the error: him → ?)", options: ["I've seen", "using", "it's", "him"], correct: 3, explanation: "him → his. Đại từ sở hữu: 'it's his' (= his tablet). 'him' là tân ngữ, không phải sở hữu.", unit: 0 },
  { id: 26, question: "_____ research on future communication is good, but I like hers a lot more. (Find the error)", options: ["You", "research", "good", "hers"], correct: 0, explanation: "You → Your. Cần tính từ sở hữu 'Your' trước danh từ 'research'. 'You research' sai ngữ pháp.", unit: 0 },
  { id: 27, question: "They _____ on the lake when it started to rain so they went home. (Find the error: fished → ?)", options: ["started", "fished", "on", "when"], correct: 1, explanation: "fished → were fishing. Khi mưa bắt đầu (started), họ đang câu cá → quá khứ tiếp diễn (were fishing).", unit: 0 },

  // ===================================================
  // PHẦN C: READING (10 câu)
  // ===================================================

  // I. Reading Cloze - Corner shop passage (5 câu)
  { id: 28, question: "A corner shop is a British tradition. We can find it in many neighbourhoods in towns _______ cities across the UK.", options: ["and", "before", "as", "after"], correct: 0, explanation: "towns AND cities = thành thị và thành phố. Liên từ 'and' nối hai danh từ song song.", unit: 0 },
  { id: 29, question: "The corner shop _______ all kinds of household goods and simple food and drinks.", options: ["selling", "sell", "sold", "sells"], correct: 3, explanation: "Hiện tại đơn số ít: The corner shop sells... (chủ ngữ số ít → V-s).", unit: 0 },
  { id: 30, question: "It _______ sells newspapers, magazines, and cigarettes.", options: ["generally", "finally", "also", "too"], correct: 2, explanation: "'also' đứng trước động từ thường: It also sells... = nó cũng bán...", unit: 0 },
  { id: 31, question: "Convenience stores are originally from America. The only _______ is that convenience stores are often open 24 hours.", options: ["good", "difference", "benefit", "thing"], correct: 1, explanation: "The only difference = điểm khác biệt duy nhất.", unit: 0 },
  { id: 32, question: "You can find a convenience store at any residential _______.", options: ["land", "houses", "community", "area"], correct: 3, explanation: "residential area = khu dân cư. 'area' phù hợp ngữ cảnh nhất.", unit: 0 },

  // II. Reading Comprehension - Online shopping in Asia (5 câu)
  { id: 33, question: "What is the main idea of the passage about online shopping in Asia?", options: ["Online shopping is more popular in North America and Europe than in Asia.", "Internet access is still very limited in Asia compared to other regions.", "Online shopping is rapidly growing in Asia due to improved internet access and secure payments.", "Young people in Asia spend too much money shopping online."], correct: 2, explanation: "Ý chính: Mua sắm trực tuyến đang tăng nhanh ở châu Á nhờ mạng internet và thanh toán an toàn hơn.", unit: 0 },
  { id: 34, question: "Why does Cecelia Wang enjoy shopping online?", options: ["She can get better discounts online.", "She avoids interacting with salespeople.", "She doesn't trust physical stores.", "She wants to shop with friends."], correct: 1, explanation: "Cecelia Wang nói: 'no sales girls will disturb me' → cô ấy tránh tiếp xúc nhân viên bán hàng.", unit: 0 },
  { id: 35, question: "How much does Cecelia Wang spend monthly on online shopping?", options: ["About $150", "About $73", "About 500 Taiwan dollars", "About $43"], correct: 3, explanation: "Bài viết ghi: '1,500 Taiwan dollars, about $43, each month'.", unit: 0 },
  { id: 36, question: "According to the text, what is the approximate percentage of Internet users in Asia?", options: ["17%", "50%", "73%", "27%"], correct: 0, explanation: "Bài viết ghi: 'about 17 percent in Asia versus 73 percent in North America'.", unit: 0 },
  { id: 37, question: "Which statement is NOT true according to the passage about online shopping?", options: ["Improved telecommunication and secure payment methods help boost e-commerce in Asia.", "Cecelia Wang spends around $43 every month shopping online.", "The percentage of Internet users in Asia is higher than in Europe.", "Online shopping in Japan is expected to grow by up to 40% each year."], correct: 2, explanation: "SAI: Asia 17% < Europe 50%. Châu Á có tỷ lệ internet THẤP hơn châu Âu.", unit: 0 },

  // ===================================================
  // PHẦN D: WRITING (10 câu)
  // ===================================================

  // I. Supply the correct tense (8 câu)
  { id: 38, question: "What time _______ their flight _______ ? (leave – Present Simple for future)", options: ["do / leave", "does / leave", "is / leaving", "did / leave"], correct: 1, explanation: "HTĐ cho lịch trình: Does their flight leave...? (flight = số ít → does).", unit: 8 },
  { id: 39, question: "I _______ football when she called me. (play – Past Continuous)", options: ["play", "played", "was playing", "am playing"], correct: 2, explanation: "QK tiếp diễn: was playing (đang chơi bóng khi cô ấy gọi → hành động đang xảy ra).", unit: 9 },
  { id: 40, question: "While he _______ on the field, the tornado hit the area. (work – Past Continuous)", options: ["work", "worked", "was working", "is working"], correct: 2, explanation: "While + QK tiếp diễn: was working (đang làm việc trên cánh đồng khi lốc xoáy đổ bộ).", unit: 7 },
  { id: 41, question: "What were they doing when the fire _______ out? (break – Past Simple)", options: ["breaks", "broke", "break", "was breaking"], correct: 1, explanation: "When + QK đơn: broke out (= bùng phát). Fire broke out = hành động xảy ra đột ngột.", unit: 9 },
  { id: 42, question: "The meeting is in the teacher's room. It _______ at 11:00. (start – Present Simple for future)", options: ["starts", "started", "starting", "will starts"], correct: 0, explanation: "HTĐ cho lịch trình: It starts at 11:00 (lịch trình cố định → HTĐ).", unit: 8 },
  { id: 43, question: "Tam is interested in _______ soccer on Sunday. (play – Gerund)", options: ["play", "playing", "to play", "plays"], correct: 1, explanation: "interested in + V-ing: interested in playing. Giới từ 'in' + danh động từ.", unit: 0 },
  { id: 44, question: "At 8 pm, Minh _______ to music. (listen – Past Continuous)", options: ["listen", "listened", "was listening", "listens"], correct: 2, explanation: "At 8 pm (thời điểm cụ thể trong quá khứ) → QK tiếp diễn: was listening.", unit: 9 },
  { id: 45, question: "Please stop _______ . You are making the school yard dirty. (litter – Gerund)", options: ["litter", "littering", "to litter", "littered"], correct: 1, explanation: "stop + V-ing = ngừng làm gì: stop littering = ngừng xả rác.", unit: 7 },

  // II. Sentence rewriting – dạng trắc nghiệm (2 câu)
  { id: 46, question: "\"I'm having a science test tomorrow.\" Mary said. → Mary said that _______", options: ["she is having a science test tomorrow", "she was having a science test the next day", "she had a science test tomorrow", "I was having a science test the next day"], correct: 1, explanation: "Lùi thì (am having → was having), đổi đại từ (I → she), đổi trạng từ (tomorrow → the next day).", unit: 11 },
  { id: 47, question: "\"I can help you tomorrow,\" she said. → She said _______", options: ["she can help me tomorrow", "she could help me the following day", "she can help you the following day", "I could help you tomorrow"], correct: 1, explanation: "Lùi thì (can → could), đổi đại từ (I → she, you → me), đổi trạng từ (tomorrow → the following day).", unit: 11 },
];

// ============================================================
// LESSONS EXPORT
// ============================================================

export const lessons: Lesson[] = [
  // UNIT 7
  {
    id: 20, title: "Unit 7: Từ vựng Bảo vệ Môi trường", unit: 7, icon: Recycle,
    color: "from-green-500 to-lime-500",
    content: (
      <div>
        <div className="bg-green-50 p-6 rounded-2xl mb-8 border border-green-100">
          <h2 className="text-2xl font-bold text-green-800 mb-2">Environmental Protection</h2>
          <p className="text-green-700">Từ vựng về ô nhiễm, hệ sinh thái, tái chế và bảo vệ môi trường.</p>
        </div>
        <VocabTable items={unit7Vocab} colorTheme="bg-gradient-to-r from-green-500 to-lime-500" />
      </div>
    )
  },
  {
    id: 21, title: "Unit 7: Mệnh đề trạng ngữ thời gian", unit: 7, icon: Globe,
    color: "from-lime-500 to-teal-500",
    content: (
      <div>
        <div className="bg-lime-50 border-l-4 border-lime-400 p-4 mb-8">
          <p className="text-lime-800 font-bold">Complex sentences with adverb clauses of time</p>
          <p className="text-lime-700 text-sm mt-1">Các từ nối: <strong>when, while, before, after, as soon as, until</strong></p>
        </div>
        <GrammarBox
          title="Mệnh đề trạng ngữ chỉ thời gian"
          color="bg-lime-600"
          rule={
            <div className="space-y-2 text-sm">
              <p>• <strong>when</strong>: khi (xảy ra đồng thời hoặc gần nhau)</p>
              <p>• <strong>while</strong>: trong khi (hai hành động song song)</p>
              <p>• <strong>before/after</strong>: trước/sau khi</p>
              <p>• <strong>as soon as</strong>: ngay khi (xảy ra tức thì)</p>
              <p>• <strong>until</strong>: cho đến khi</p>
              <div className="bg-amber-50 p-2 rounded mt-2 border border-amber-200">
                <p className="text-amber-800">⚠️ Mệnh đề thời gian → dùng <strong>HTĐ</strong>, KHÔNG dùng will: <em>As soon as we arrive (not will arrive)</em></p>
              </div>
            </div>
          }
          examples={[
            { correct: "Before Jenny left the party, she said goodbye to the host.", explain: "Before + QKĐ → hành động xảy ra trước." },
            { correct: "As soon as I get to school, I will show you my writing.", explain: "As soon as + HTĐ → phản ứng ngay tức thì." },
            { correct: "While he was working on the field, the tornado hit the area.", explain: "While + QK tiếp diễn → hành động đang xảy ra." },
          ]}
        />
        <div className="space-y-4">
          {unit7Exercises.map((ex, idx) => <ExerciseCard key={ex.id} item={ex} idx={idx} />)}
        </div>
      </div>
    )
  },
  // UNIT 8
  {
    id: 23, title: "Unit 8: Từ vựng Mua sắm", unit: 8, icon: ShoppingBag,
    color: "from-amber-500 to-orange-500",
    content: (
      <div>
        <div className="bg-amber-50 p-6 rounded-2xl mb-8 border border-amber-100">
          <h2 className="text-2xl font-bold text-amber-800 mb-2">Shopping</h2>
          <p className="text-amber-700">Từ vựng về mua sắm, cửa hàng, giá cả và hành vi tiêu dùng.</p>
        </div>
        <VocabTable items={unit8Vocab} colorTheme="bg-gradient-to-r from-amber-500 to-orange-500" />
      </div>
    )
  },
  {
    id: 24, title: "Unit 8: Trạng từ tần suất & HTĐ cho tương lai", unit: 8, icon: FlaskConical,
    color: "from-orange-400 to-red-500",
    content: (
      <div>
        <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-8">
          <p className="text-orange-800 font-bold">Adverbs of Frequency + Present Simple for Future</p>
          <p className="text-orange-700 text-sm mt-1">Trạng từ tần suất & Hiện tại đơn diễn tả <strong>lịch trình cố định</strong>.</p>
        </div>
        <GrammarBox
          title="HTĐ cho lịch trình & Trạng từ tần suất"
          color="bg-orange-500"
          rule={
            <div className="space-y-2 text-sm">
              <p><strong>HTĐ cho lịch trình:</strong> The train leaves at 6 a.m. (không dùng will)</p>
              <p><strong>Trạng từ tần suất:</strong> always &gt; usually &gt; often &gt; sometimes &gt; rarely &gt; never</p>
              <p className="mt-2 text-orange-700">Vị trí: <strong>sau to be</strong> | <strong>trước động từ thường</strong></p>
            </div>
          }
          examples={[
            { correct: "The next semester begins on Friday.", explain: "Lịch trình cố định → HTĐ (begins)." },
            { correct: "She always compares prices before buying.", incorrect: "She is always comparing prices.", explain: "Thói quen → HTĐ + trạng từ tần suất." },
            { correct: "They are rarely at home at lunch time.", explain: "rarely + trạng từ đứng sau to be." },
          ]}
        />
        <div className="space-y-4 mt-8">
          <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2 mb-4"><ClipboardCheck className="text-orange-500" /> Luyện tập</h3>
          {unit8Exercises.map((ex, idx) => <ExerciseCard key={ex.id} item={ex} idx={idx} />)}
        </div>
      </div>
    )
  },
  // UNIT 9
  {
    id: 26, title: "Unit 9: Từ vựng Thảm họa thiên nhiên", unit: 9, icon: CloudLightning,
    color: "from-blue-500 to-cyan-600",
    content: (
      <div>
        <div className="bg-blue-50 p-6 rounded-2xl mb-8 border border-blue-100">
          <h2 className="text-2xl font-bold text-blue-800 mb-2">Natural Disasters</h2>
          <p className="text-blue-700">Từ vựng về các thảm họa thiên nhiên, cách ứng phó và cứu hộ.</p>
        </div>
        <VocabTable items={unit9Vocab} colorTheme="bg-gradient-to-r from-blue-500 to-cyan-600" />
      </div>
    )
  },
  {
    id: 27, title: "Unit 9: Ngữ pháp – Quá khứ tiếp diễn", unit: 9, icon: Rocket,
    color: "from-cyan-500 to-sky-600",
    content: (
      <div>
        <div className="bg-cyan-50 border-l-4 border-cyan-400 p-4 mb-8">
          <p className="text-cyan-800 font-bold">Past Continuous – Thì Quá khứ tiếp diễn</p>
          <p className="text-cyan-700 text-sm mt-1">Diễn đạt hành động <strong>đang xảy ra</strong> tại một thời điểm quá khứ.</p>
        </div>
        <GrammarBox
          title="Thì Quá khứ tiếp diễn"
          color="bg-cyan-600"
          rule={
            <div className="space-y-2 text-sm">
              <p><strong>Khẳng định:</strong> S + was/were + V-ing</p>
              <p><strong>Phủ định:</strong> S + was/were + not + V-ing</p>
              <p><strong>Câu hỏi:</strong> Was/Were + S + V-ing?</p>
              <p className="mt-2 text-cyan-700">• Dùng <em>when</em>: When + QKĐ, S + was/were + V-ing &nbsp;|&nbsp; • Dùng <em>while</em>: While + QK tiếp diễn, QKĐ</p>
            </div>
          }
          examples={[
            { correct: "While the other passengers were running to the exits, Brian climbed out of the window.", explain: "While + QK tiếp diễn (số nhiều) | QKĐ" },
            { correct: "The sun was shining when Hamilton arrived at the beach.", explain: "When + QKĐ (arrived) | QK tiếp diễn (was shining)" },
            { correct: "I was having dinner when the storm suddenly came.", incorrect: "I had dinner when the storm was coming.", explain: "Hành động đang xảy ra → was having." },
          ]}
        />
        <div className="space-y-4 mt-8">
          <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2 mb-4"><ClipboardCheck className="text-cyan-600" /> Luyện tập</h3>
          {unit9Exercises.map((ex, idx) => <ExerciseCard key={ex.id} item={ex} idx={idx} />)}
        </div>
      </div>
    )
  },
  // UNIT 10
  {
    id: 1001, title: "Unit 10: Từ vựng Communication", unit: 10, icon: MessageCircle,
    color: "from-blue-600 to-indigo-500",
    content: (
      <div>
        <div className="bg-blue-50 p-6 rounded-2xl mb-8 border border-blue-100">
          <h2 className="text-2xl font-bold text-blue-800 mb-2">Communication in the Future</h2>
          <p className="text-blue-700">Từ vựng về giao tiếp, thiết bị thông minh, mạng xã hội và công nghệ tương lai.</p>
        </div>
        <VocabTable items={unit10Vocab} colorTheme="bg-gradient-to-r from-blue-600 to-indigo-500" />
      </div>
    )
  },
  {
    id: 1002, title: "Unit 10: Đại từ sở hữu & Giới từ", unit: 10, icon: BookOpenCheck,
    color: "from-indigo-500 to-violet-600",
    content: (
      <div>
        <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 mb-8">
          <p className="text-indigo-800 font-bold">Possessive Pronouns & Prepositions of Time and Place</p>
        </div>
        <GrammarBox
          title="1. Đại từ sở hữu (Possessive Pronouns)"
          color="bg-indigo-600"
          rule={
            <div className="space-y-2 text-sm">
              <p>Đại từ sở hữu thay thế cho <strong>Tính từ sở hữu + Danh từ</strong> để tránh lặp lại.</p>
              <p>mine, yours, his, hers, ours, theirs.</p>
              <p className="mt-2 text-indigo-700">⚠️ Cấu trúc đặc biệt: <strong>a friend of mine</strong> (= my friend)</p>
            </div>
          }
          examples={[
            { correct: "A friend of mine got a virtual reality device.", explain: "mine = my friend → cấu trúc a friend of + đại từ sở hữu." },
            { correct: "This motorbike belongs to Mr. Anderson. It is his.", explain: "his = his motorbike." },
          ]}
        />
        <GrammarBox
          title="2. Giới từ chỉ Thời gian & Địa điểm"
          color="bg-violet-600"
          rule={
            <div className="space-y-2 text-sm">
              <p>• <strong>in</strong>: tháng, năm, mùa, buổi / thành phố, quốc gia.</p>
              <p>• <strong>on</strong>: ngày trong tuần, ngày tháng / trên bề mặt.</p>
              <p>• <strong>at</strong>: giờ cụ thể, dịp lễ / địa điểm cụ thể (home, school).</p>
            </div>
          }
          examples={[
            { correct: "A parade was held on April 30th.", explain: "On + ngày tháng cụ thể." },
            { correct: "They are rarely at home at lunch time.", explain: "At + home (địa điểm)." },
          ]}
        />
        <div className="space-y-4 mt-8">
          <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2 mb-4"><ClipboardCheck className="text-indigo-600" /> Luyện tập</h3>
          {unit10Exercises.map((ex, idx) => <ExerciseCard key={ex.id} item={ex} idx={idx} />)}
        </div>
      </div>
    )
  },
  // UNIT 11
  {
    id: 1101, title: "Unit 11: Từ vựng Science & Technology", unit: 11, icon: Cpu,
    color: "from-sky-500 to-blue-600",
    content: (
      <div>
        <div className="bg-sky-50 p-6 rounded-2xl mb-8 border border-sky-100">
          <h2 className="text-2xl font-bold text-sky-800 mb-2">Science & Technology</h2>
          <p className="text-sky-700">Từ vựng về khoa học, công nghệ, thiết bị học trực tuyến, phát minh máy móc.</p>
        </div>
        <VocabTable items={unit11Vocab} colorTheme="bg-gradient-to-r from-sky-500 to-blue-600" />
      </div>
    )
  },
  {
    id: 1102, title: "Unit 11: Câu tường thuật (Reported Speech)", unit: 11, icon: FlaskConical,
    color: "from-blue-500 to-indigo-600",
    content: (
      <div>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
          <p className="text-blue-800 font-bold">Reported Speech (Statements) – Câu tường thuật dạng khẳng định</p>
          <p className="text-blue-700 text-sm mt-1">Cấu trúc: <strong>S + said/told (that) + S + V (đã lùi thì)</strong></p>
        </div>
        <GrammarBox
          title="Quy tắc chuyển câu tường thuật"
          color="bg-blue-600"
          rule={
            <div className="space-y-2 text-sm">
              <p><strong>1. Đổi đại từ:</strong> I → he/she, my → his/her, we → they.</p>
              <p><strong>2. Lùi thì:</strong></p>
              <ul className="list-disc ml-5">
                <li>Hiện tại đơn (V1) → Quá khứ đơn (V2/ed)</li>
                <li>HT tiếp diễn (am/is/are V-ing) → QK tiếp diễn (was/were V-ing)</li>
                <li>Quá khứ đơn (V2/ed) → QK Hoàn thành (had + V3/ed)</li>
                <li>HT Hoàn thành (have/has V3) → QK Hoàn thành (had + V3/ed)</li>
                <li>will → would / can → could / must → had to</li>
              </ul>
              <p><strong>3. Đổi trạng từ:</strong> now → then, today → that day, tomorrow → the next day, yesterday → the day before, this → that.</p>
            </div>
          }
          examples={[
            { correct: "Jonathan said he was reading a science book then.", explain: "is reading → was reading, now → then." },
            { correct: "Mary said she was having a science test the next day.", explain: "am having → was having, tomorrow → the next day." },
            { correct: "She said she could help me the following day.", explain: "can → could, you → me, tomorrow → the following day." },
          ]}
        />
        <div className="space-y-4 mt-8">
          <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2 mb-4"><ClipboardCheck className="text-blue-600" /> Luyện tập</h3>
          {unit11Exercises.map((ex, idx) => <ExerciseCard key={ex.id} item={ex} idx={idx} />)}
        </div>
      </div>
    )
  },

  // ============================================================
  // PHẦN ĐỀ CƯƠNG: Phonetics, Error Correction, Reading, Writing, Listening
  // ============================================================

  // PHONETICS
  {
    id: 2001, title: "Phonetics: Phát âm & Trọng âm", unit: 0, icon: Mic,
    color: "from-violet-500 to-purple-500",
    content: (
      <div>
        <h2 className="text-2xl font-bold text-violet-800 mb-6">Phát âm & Trọng âm – Đề cương HKII</h2>
        <div className="space-y-4">
          <ExerciseCard item={{ id: 101, question: "<strong>Câu 1 – Pronunciation:</strong><br/>Choose the word whose underlined part is pronounced differently:<br/>A. <u>a</u>lways &nbsp; B. n<u>a</u>tural &nbsp; C. c<u>a</u>thedral &nbsp; D. cult<u>u</u>ral", answer: "<strong>C. cathedral</strong>.<br/>💡 cathedral /kəˈθiːdrəl/ – âm 'a' phát âm /iː/, khác với 3 từ còn lại." }} idx={0} />
          <ExerciseCard item={{ id: 102, question: "<strong>Câu 2 – Pronunciation:</strong><br/>A. sc<u>i</u>ence &nbsp; B. f<u>i</u>ngerprint &nbsp; C. recogn<u>i</u>tion &nbsp; D. d<u>i</u>gital", answer: "<strong>A. science</strong>.<br/>💡 science /ˈsaɪəns/ – âm 'i' phát âm /aɪ/, khác với 3 từ còn lại phát âm /ɪ/." }} idx={1} />
          <ExerciseCard item={{ id: 103, question: "<strong>Câu 3 – Stress:</strong><br/>A. humourous &nbsp; B. numerous &nbsp; C. ambitious &nbsp; D. poisonous", answer: "<strong>C. ambitious</strong> /æmˈbɪʃəs/ trọng âm ở âm tiết thứ 2.<br/>💡 Các từ còn lại trọng âm ở âm tiết thứ 1." }} idx={2} />
          <ExerciseCard item={{ id: 104, question: "<strong>Câu 4 – Stress:</strong><br/>A. effective &nbsp; B. expression &nbsp; C. pollution &nbsp; D. employee", answer: "<strong>D. employee</strong> /ˌɪmplɔɪˈiː/ trọng âm ở âm tiết thứ 3.<br/>💡 Các từ còn lại trọng âm ở âm tiết thứ 2." }} idx={3} />
          <ExerciseCard item={{ id: 105, question: "<strong>Câu 5 – Stress:</strong><br/>A. general &nbsp; B. disaster &nbsp; C. property &nbsp; D. fabulous", answer: "<strong>B. disaster</strong> /dɪˈzɑːstə/ trọng âm ở âm tiết thứ 2.<br/>💡 Các từ còn lại trọng âm ở âm tiết thứ 1." }} idx={4} />
        </div>
      </div>
    )
  },

  // ERROR CORRECTION
  {
    id: 2002, title: "Error Correction: Tìm lỗi sai", unit: 0, icon: AlertTriangle,
    color: "from-rose-500 to-pink-600",
    content: (
      <div>
        <div className="bg-rose-50 p-6 rounded-2xl mb-8 border border-rose-100">
          <h2 className="text-2xl font-bold text-rose-800 mb-2">🔍 Tìm lỗi sai (Error Correction)</h2>
          <p className="text-rose-700">Xác định từ / cụm từ sai trong câu và sửa lại cho đúng.</p>
        </div>
        <div className="space-y-4">
          <ExerciseCard item={{ id: 201, question: "I've seen Alexandre using that new tablet several times, but I don't think it's <strong><u>him</u></strong>.<br/><br/>A. I've seen &nbsp; B. using &nbsp; C. it's &nbsp; D. him", answer: "<strong>D. him → his</strong>.<br/>💡 Cần đại từ sở hữu 'his' (= his tablet), không phải tân ngữ 'him'.<br/>✅ Câu đúng: ...I don't think it's <strong>his</strong>." }} idx={0} />
          <ExerciseCard item={{ id: 202, question: "<strong><u>You</u></strong> research on future communication is good, but I like hers a lot more.<br/><br/>A. You &nbsp; B. research &nbsp; C. good &nbsp; D. hers", answer: "<strong>A. You → Your</strong>.<br/>💡 Cần tính từ sở hữu 'Your' trước danh từ 'research'.<br/>✅ Câu đúng: <strong>Your</strong> research on future communication is good..." }} idx={1} />
          <ExerciseCard item={{ id: 203, question: "They <strong><u>fished</u></strong> on the lake when it started to rain so they went home.<br/><br/>A. started &nbsp; B. fished &nbsp; C. on &nbsp; D. when", answer: "<strong>B. fished → were fishing</strong>.<br/>💡 Khi mưa bắt đầu (started), họ đang câu cá → cần quá khứ tiếp diễn (were fishing).<br/>✅ Câu đúng: They <strong>were fishing</strong> on the lake when it started to rain..." }} idx={2} />
        </div>
      </div>
    )
  },

  // LISTENING PRACTICE
  {
    id: 2003, title: "Listening Practice: Electronic Devices", unit: 0, icon: Headphones,
    color: "from-teal-500 to-emerald-600",
    content: (
      <div>
        <div className="bg-teal-50 p-6 rounded-2xl mb-8 border border-teal-100">
          <h2 className="text-2xl font-bold text-teal-800 mb-2">🎧 Listening – Electronic Devices at School</h2>
          <p className="text-teal-700">Nghe đoạn trình bày về cách học sinh sử dụng thiết bị điện tử ở trường.</p>
        </div>

        <h3 className="font-bold text-gray-800 text-lg mb-4">I. True or False</h3>
        <div className="space-y-4 mb-8">
          <ExerciseCard item={{ id: 301, question: "1. Students can use their electronic devices to send text messages to each other at school.", answer: "<strong>✅ True</strong>.<br/>💡 Học sinh có thể sử dụng thiết bị điện tử để gửi tin nhắn cho nhau." }} idx={0} />
          <ExerciseCard item={{ id: 302, question: "2. Electronic devices can't help students with their schoolwork.", answer: "<strong>❌ False</strong>.<br/>💡 Thiết bị điện tử CÓ THỂ giúp học sinh với việc học (tra cứu, ghi chú, v.v.)." }} idx={1} />
          <ExerciseCard item={{ id: 303, question: "3. There is nothing bad about using electronic devices during class time.", answer: "<strong>❌ False</strong>.<br/>💡 Có nhiều tác hại: mất tập trung, xao nhãng việc học trong giờ lên lớp." }} idx={2} />
          <ExerciseCard item={{ id: 304, question: "4. Students will have weight problems if they are addicted to electronic devices.", answer: "<strong>✅ True</strong>.<br/>💡 Nghiện thiết bị điện tử → ít vận động → vấn đề cân nặng." }} idx={3} />
          <ExerciseCard item={{ id: 305, question: "5. Teachers don't have to do anything to help with this problem.", answer: "<strong>❌ False</strong>.<br/>💡 Giáo viên CẦN hỗ trợ, hướng dẫn học sinh sử dụng thiết bị hợp lý." }} idx={4} />
        </div>

        <h3 className="font-bold text-gray-800 text-lg mb-4">II. Fill in the blanks (Unit 11 - Skills 2)</h3>
        <div className="space-y-4">
          <ExerciseCard item={{ id: 306, question: "1. There are _____ choices that people have when they use something.", answer: "<strong>two</strong>.<br/>💡 2 lựa chọn: tái sử dụng hoặc vứt bỏ." }} idx={0} />
          <ExerciseCard item={{ id: 307, question: "2. If aluminum goes into the landfill, it is toxic and _____ to the environment.", answer: "<strong>dangerous</strong>.<br/>💡 toxic and dangerous = độc hại và nguy hiểm cho môi trường." }} idx={1} />
          <ExerciseCard item={{ id: 308, question: "3. Recycling objects helps with reducing the need for cutting down trees or mining for materials to _____.", answer: "<strong>make cans</strong>.<br/>💡 Tái chế giúp giảm nhu cầu khai thác nguyên liệu để sản xuất lon (make cans)." }} idx={2} />
          <ExerciseCard item={{ id: 309, question: "4. The programs exist that pay people to recycle various items, including aluminum cans, glass bottles, _____, and some types of scrap metal.", answer: "<strong>cell phones</strong>.<br/>💡 Các chương trình trả tiền cho người tái chế: lon nhôm, chai thủy tinh, điện thoại di động (cell phones)." }} idx={3} />
          <ExerciseCard item={{ id: 310, question: "5. Using compact fluorescent light bulbs is a simple habit that can make a _____ in protecting the environment.", answer: "<strong>difference</strong>.<br/>💡 make a difference = tạo ra sự khác biệt. Dùng bóng đèn tiết kiệm = giúp bảo vệ môi trường." }} idx={4} />
        </div>
      </div>
    )
  },

  // READING PRACTICE
  {
    id: 2004, title: "Reading: Corner Shop & Online Shopping", unit: 0, icon: BookOpen,
    color: "from-emerald-500 to-green-600",
    content: (
      <div>
        <div className="bg-emerald-50 p-6 rounded-2xl mb-8 border border-emerald-100">
          <h2 className="text-2xl font-bold text-emerald-800 mb-2">📖 Reading Comprehension</h2>
          <p className="text-emerald-700">2 bài đọc từ đề cương: Corner Shop (điền từ) và Online Shopping in Asia (trả lời câu hỏi).</p>
        </div>

        <h3 className="font-bold text-gray-800 text-lg mb-4">I. Reading Cloze: The Corner Shop</h3>
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 mb-6 text-gray-700 leading-relaxed">
          <p>A corner shop or a convenience shop is a British tradition. It is a small retail shop. We can find a corner shop at the end of a local street in many neighbourhoods in towns <strong>(1)___</strong> cities across the UK. The corner shop <strong>(2)___</strong> all kinds of household goods and simple food and drinks like snacks, groceries, coffee, soft drinks. It <strong>(3)___</strong> sells newspapers, magazines, and cigarettes. Convenience stores are originally from America. They are like the British corner shops. The only <strong>(4)___</strong> is that convenience stores are often open 24 hours. Probably the most well-known convenience store is 7-Eleven. You can find a convenience store at any residential <strong>(5)___</strong>, a filling station, a railway station, or alongside a busy road.</p>
        </div>
        <div className="space-y-4 mb-10">
          <ExerciseCard item={{ id: 401, question: "(1) A. and &nbsp; B. before &nbsp; C. as &nbsp; D. after", answer: "<strong>A. and</strong>.<br/>💡 towns AND cities = thành thị và thành phố." }} idx={0} />
          <ExerciseCard item={{ id: 402, question: "(2) A. selling &nbsp; B. sell &nbsp; C. sold &nbsp; D. sells", answer: "<strong>D. sells</strong>.<br/>💡 Chủ ngữ số ít (The corner shop) + HTĐ → sells." }} idx={1} />
          <ExerciseCard item={{ id: 403, question: "(3) A. generally &nbsp; B. finally &nbsp; C. also &nbsp; D. too", answer: "<strong>C. also</strong>.<br/>💡 also đứng trước động từ thường: It also sells..." }} idx={2} />
          <ExerciseCard item={{ id: 404, question: "(4) A. good &nbsp; B. difference &nbsp; C. benefit &nbsp; D. thing", answer: "<strong>B. difference</strong>.<br/>💡 The only difference = điểm khác biệt duy nhất." }} idx={3} />
          <ExerciseCard item={{ id: 405, question: "(5) A. land &nbsp; B. houses &nbsp; C. community &nbsp; D. area", answer: "<strong>D. area</strong>.<br/>💡 residential area = khu dân cư." }} idx={4} />
        </div>

        <h3 className="font-bold text-gray-800 text-lg mb-4">II. Reading Comprehension: Online Shopping in Asia</h3>
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 mb-6 text-gray-700 leading-relaxed text-sm">
          <p className="font-bold text-base mb-2">As access improves, online shopping takes off in Asia</p>
          <p className="mb-2"><strong>SINGAPORE:</strong> From dresses to handbags, diamonds to music downloads, consumers in Asia are taking to Internet shopping as never before, making the region one of the world's fastest-growing e-commerce markets.</p>
          <p className="mb-2">"I like to shop for clothes online because no sales girls will disturb me," said Cecelia Wang, a 23-year-old university student in Taipei who said she spent about 1,500 Taiwan dollars, about $43, each month on Internet shopping.</p>
          <p className="mb-2">Internet commerce is increasingly making its presence felt in Asia because telecommunication has improved and payment is becoming more and more secure, analysts say.</p>
          <p className="mb-2">The percentage of the population that has Internet access is about 17 percent in Asia versus 73 percent in North America and almost 50 percent in Europe.</p>
          <p>As more people in countries like China and India get hooked up to the Internet, online sales are expected to rise by an average of 20 percent a year. In some markets, including Japan, they are expected to increase by as much as 40 percent annually.</p>
        </div>
        <div className="space-y-4">
          <ExerciseCard item={{ id: 406, question: "What is the main idea of the passage?", answer: "<strong>C. Online shopping is rapidly growing in Asia due to improved internet access and secure payments.</strong>" }} idx={0} />
          <ExerciseCard item={{ id: 407, question: "Why does Cecelia Wang enjoy shopping online?", answer: "<strong>B. She avoids interacting with salespeople.</strong><br/>💡 'no sales girls will disturb me' = không bị nhân viên bán hàng quấy rầy." }} idx={1} />
          <ExerciseCard item={{ id: 408, question: "How much does Cecelia Wang spend monthly on online shopping?", answer: "<strong>D. About $43</strong>.<br/>💡 '1,500 Taiwan dollars, about $43, each month'." }} idx={2} />
          <ExerciseCard item={{ id: 409, question: "What is the approximate percentage of Internet users in Asia?", answer: "<strong>A. 17%</strong>.<br/>💡 'about 17 percent in Asia versus 73 percent in North America'." }} idx={3} />
          <ExerciseCard item={{ id: 410, question: "Which statement is NOT true?<br/>A. Improved telecommunication helps boost e-commerce.<br/>B. Cecelia spends $43/month.<br/>C. Internet users in Asia is higher than Europe.<br/>D. Japan e-commerce grows 40%/year.", answer: "<strong>C. Internet users in Asia is higher than Europe.</strong><br/>💡 SAI: Asia 17% < Europe 50%." }} idx={4} />
        </div>
      </div>
    )
  },

  // WRITING PRACTICE
  {
    id: 2005, title: "Writing: Supply Tense & Rewrite", unit: 0, icon: PenTool,
    color: "from-pink-500 to-rose-600",
    content: (
      <div>
        <div className="bg-pink-50 p-6 rounded-2xl mb-8 border border-pink-100">
          <h2 className="text-2xl font-bold text-pink-800 mb-2">✍️ Writing – Chia động từ & Viết lại câu</h2>
          <p className="text-pink-700">Luyện tập chia đúng thì và viết lại câu theo đề cương chính thức HKII.</p>
        </div>

        <h3 className="font-bold text-gray-800 text-lg mb-4">I. Supply the correct tense</h3>
        <div className="space-y-4 mb-10">
          <ExerciseCard item={{ id: 501, question: "What time _______ their flight _______ (leave)?", answer: "<strong>does … leave</strong>.<br/>💡 HTĐ cho lịch trình: Does their flight leave...? (flight số ít → does)." }} idx={0} />
          <ExerciseCard item={{ id: 502, question: "I (play) _______ football when she called me.", answer: "<strong>was playing</strong>.<br/>💡 QK tiếp diễn: was playing (đang chơi bóng khi cô ấy gọi)." }} idx={1} />
          <ExerciseCard item={{ id: 503, question: "While he (work) _______ on the field, the tornado hit the area.", answer: "<strong>was working</strong>.<br/>💡 While + QK tiếp diễn: was working (đang làm việc khi lốc xoáy đổ bộ)." }} idx={2} />
          <ExerciseCard item={{ id: 504, question: "What were they doing when the fire (break) _______ out?", answer: "<strong>broke</strong>.<br/>💡 When + QK đơn: broke out (bùng phát). Sự kiện xảy ra đột ngột." }} idx={3} />
          <ExerciseCard item={{ id: 505, question: "The meeting is in the teacher's room. It _______ (start) at 11:00.", answer: "<strong>starts</strong>.<br/>💡 HTĐ cho lịch trình: It starts at 11:00." }} idx={4} />
          <ExerciseCard item={{ id: 506, question: "Tam is interested in (play) _______ soccer on Sunday.", answer: "<strong>playing</strong>.<br/>💡 interested in + V-ing: interested in playing." }} idx={5} />
          <ExerciseCard item={{ id: 507, question: "At 8 pm, Minh (listen) _______ to music.", answer: "<strong>was listening</strong>.<br/>💡 At 8 pm (thời điểm cụ thể QK) → QK tiếp diễn: was listening." }} idx={6} />
          <ExerciseCard item={{ id: 508, question: "Please stop _______ (litter). You are making the school yard dirty.", answer: "<strong>littering</strong>.<br/>💡 stop + V-ing = ngừng làm gì: stop littering = ngừng xả rác." }} idx={7} />
        </div>

        <h3 className="font-bold text-gray-800 text-lg mb-4">II. Viết lại câu</h3>
        <div className="space-y-4">
          <ExerciseCard item={{ id: 509, question: "Tom was swimming and his sister was reading a book at the same time.<br/>⇒ While Tom _______________________", answer: "<strong>While Tom was swimming, his sister was reading a book.</strong><br/>💡 While + QK tiếp diễn → 2 hành động song song." }} idx={0} />
          <ExerciseCard item={{ id: 510, question: "I read my favourite book. Then I went to bed. (after)<br/>⇒ _______________________", answer: "<strong>After I read my favourite book, I went to bed.</strong><br/>💡 After + QKĐ, QKĐ → trình tự thời gian." }} idx={1} />
          <ExerciseCard item={{ id: 511, question: "My father was going to work. He saw her old friend from high school. (when)<br/>⇒ My father _______________________", answer: "<strong>My father was going to work when he saw her old friend from high school.</strong><br/>💡 S + was + V-ing when S + V2." }} idx={2} />
          <ExerciseCard item={{ id: 512, question: "\"I'm having a science test tomorrow.\" Mary said.<br/>⇒ Mary said that _______________________", answer: "<strong>Mary said that she was having a science test the next day.</strong><br/>💡 am having → was having, I → she, tomorrow → the next day." }} idx={3} />
          <ExerciseCard item={{ id: 513, question: "Sam asked me, \"Which planet do you think there is life?\"<br/>⇒ Sam asked me _______________________", answer: "<strong>Sam asked me which planet I thought there was life.</strong><br/>💡 Bỏ trợ động từ do, đổi S + V: you think → I thought." }} idx={4} />
          <ExerciseCard item={{ id: 514, question: "Her tablet is red and new. (hers)<br/>⇒ The red _______________________", answer: "<strong>The red and new tablet is hers.</strong><br/>💡 Đại từ sở hữu: hers = her tablet." }} idx={5} />
          <ExerciseCard item={{ id: 515, question: "Jack is one of her cousins.<br/>⇒ Jack is a _______________________", answer: "<strong>Jack is a cousin of hers.</strong><br/>💡 a cousin of + đại từ sở hữu: a cousin of hers = one of her cousins." }} idx={6} />
          <ExerciseCard item={{ id: 516, question: "My friend said that scientists would explore Mars in the near future.<br/>⇒ My friend said, \"_______________________\"", answer: "<strong>My friend said, \"Scientists will explore Mars in the near future.\"</strong><br/>💡 Chuyển ngược: would → will (trực tiếp)." }} idx={7} />
          <ExerciseCard item={{ id: 517, question: "\"I can help you tomorrow,\" she said.<br/>⇒ She said _______________________", answer: "<strong>She said she could help me the following day / the next day.</strong><br/>💡 can → could, I → she, you → me, tomorrow → the following day." }} idx={8} />
        </div>
      </div>
    )
  },

  // GRAMMAR TỔNG HỢP
  {
    id: 2006, title: "Tổng hợp: Ngữ pháp trọng tâm HKII", unit: 0, icon: Star,
    color: "from-purple-500 to-violet-600",
    content: (
      <div>
        <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-8">
          <p className="text-purple-800 font-bold">⭐ Tổng hợp 5 chuyên đề ngữ pháp trọng tâm HKII</p>
        </div>
        <GrammarBox
          title="1. Mệnh đề trạng ngữ thời gian (Unit 7)"
          color="bg-lime-600"
          rule={<p>Từ nối: <strong>when, while, before, after, as soon as, until</strong>. Mệnh đề thời gian dùng <strong>HTĐ</strong> (không dùng will).</p>}
          examples={[{ correct: "Before Jenny left, she said goodbye.", explain: "Before + QKĐ." }]}
        />
        <GrammarBox
          title="2. Trạng từ tần suất & HTĐ cho tương lai (Unit 8)"
          color="bg-orange-500"
          rule={<p><strong>always / usually / often / sometimes / rarely / never</strong> đứng TRƯỚC động từ thường, SAU to be. HTĐ dùng cho lịch trình cố định.</p>}
          examples={[
            { correct: "The next semester begins on Friday.", explain: "Lịch trình → HTĐ." },
            { correct: "They are rarely at home at lunch time.", explain: "rarely sau to be." },
          ]}
        />
        <GrammarBox
          title="3. Quá khứ tiếp diễn (Unit 9)"
          color="bg-cyan-600"
          rule={<p><strong>S + was/were + V-ing</strong>. Dùng với when/while: hành động đang xảy ra bị gián đoạn bởi hành động khác.</p>}
          examples={[
            { correct: "While they were reading, an earthquake happened.", explain: "While + QK tiếp diễn." },
            { correct: "He arrived when the sun was shining.", explain: "When + QKĐ | QKTD." },
          ]}
        />
        <GrammarBox
          title="4. Đại từ sở hữu & Giới từ (Unit 10)"
          color="bg-indigo-600"
          rule={<p><strong>mine, yours, his, hers, ours, theirs</strong>. Giới từ: IN (tháng, năm, buổi), ON (ngày, thứ), AT (giờ, home, school).</p>}
          examples={[
            { correct: "A friend of mine got a VR device.", explain: "a friend of mine = my friend." },
            { correct: "A parade was held on April 30th.", explain: "on + ngày tháng." },
          ]}
        />
        <GrammarBox
          title="5. Câu tường thuật (Unit 11)"
          color="bg-blue-600"
          rule={<p><strong>S + said (that) + S + V(lùi thì)</strong>. Đổi đại từ, lùi thì, đổi trạng từ chỉ thời gian, nơi chốn.</p>}
          examples={[
            { correct: "He said he was reading a book then.", explain: "is reading → was reading, now → then." },
            { correct: "She said she could help me the next day.", explain: "can → could, tomorrow → the next day." },
          ]}
        />
      </div>
    )
  },
];


