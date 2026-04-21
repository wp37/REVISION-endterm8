---
name: Build Web Ôn Tập Cuối Kỳ - Tiếng Anh Global Success
description: Skill hướng dẫn toàn trình xây dựng web ôn tập cuối kỳ Tiếng Anh sách Global Success cho các lớp 7, 8, 9 với React + Vite + TailwindCSS, có quiz trắc nghiệm random và từ điển từ vựng tương tác, hoa phượng trang trí.
---

# SKILL: Build Web Ôn Tập Cuối Kỳ – Tiếng Anh Global Success

## Mục tiêu

Tạo website ôn tập cuối kỳ chuyên nghiệp cho bộ sách **Tiếng Anh Global Success** (Bộ Giáo dục), hỗ trợ học sinh lớp 7/8/9 ôn luyện hiệu quả với:

- 📚 **Card bài học** cho từng Unit (từ vựng, ngữ pháp, ngữ âm) + các phần Reading, Writing, Speaking
- 📝 **Quiz trắc nghiệm** Random 20 câu / 5 phút, có đếm giờ SVG animation và giải thích đáp án
- 🌺 **Hoa phượng trang trí** — cánh hoa rơi + cành phượng SVG góc trang, báo hiệu hè về
- 🎨 **Giao diện đẹp** với hiệu ứng gradient, animation, responsive
- 🔗 **Zalo thumbnail** — OG meta tags để chia sẻ link đẹp trên Zalo/Facebook

---

## Nhật Ký Công Việc Dự Án (Lớp 7 – Cuối kỳ 2, 2025–2026)

### Phiên 1: Xây dựng ban đầu (trước đó)

- ✅ Tạo project React + Vite + TypeScript
- ✅ Xây dựng giao diện hero gradient, teacher info, tab navigation
- ✅ Tạo 20 bài học (Unit 7–12 + Review 3, 4) với VocabTable, GrammarBox, PhoneticCard
- ✅ Tạo Quiz 70 câu trắc nghiệm có timer 45 phút
- ✅ Components: LessonModal (modal popup) + QuizSection (quiz đầy đủ)
- ✅ Deploy cấu hình Vercel

### Phiên 2: Cập nhật Đề cương chính thức (22/04/2026)

#### Bước 1: Thay nội dung theo đề cương mới

- ✅ Đọc và phân tích file `DE_CUONG_KI_2_LOP_7_2025-2026.md` — đề cương chính thức
- ✅ **Xóa toàn bộ nội dung cũ** trong `data.tsx` (70 câu quiz, 20 lessons)
- ✅ **Viết lại data.tsx** hoàn toàn mới theo đề cương, gồm:
  - **5 bài Grammar** (Unit 7: It + Should, Unit 8: Although/However, Unit 9: Yes/No, Unit 10: Present Continuous, Unit 11: Will + Possessive Pronouns)
  - **1 bài Phonetics** (10 câu trọng âm + phát âm từ đề cương)
  - **1 bài Language** (8 câu chọn đáp án đúng)
  - **1 bài Error Correction** (5 câu tìm lỗi sai)
  - **2 bài Reading** (La Tomatina + Traffic Signs)
  - **1 bài Writing** (5 câu viết lại câu)
  - **1 bài Speaking** (3 chủ đề nói: Thanksgiving, Save Energy, Future Transport)
  - **30 câu Quiz trắc nghiệm** bao phủ: Phonetics (5), Language (15), Error Correction (3), Reading (3), Writing (4)

#### Bước 2: Cập nhật App.tsx

- ✅ Đổi hero title: "Unit 7 → 11" + "Đề cương Cuối kỳ 2"
- ✅ Đổi hero description theo nội dung đề cương
- ✅ Cập nhật tab: "📚 Ôn tập bài học" + "⏱️ Quiz (Random 20 câu / 5 phút)"
- ✅ Cập nhật section heading: "Nội dung đề cương chính thức"
- ✅ Cập nhật unit colors/labels (bỏ Unit 12, Review 4; thêm "Đề cương" cho unit=0)
- ✅ Cập nhật footer text

#### Bước 3: Quiz Random 20 câu / 5 phút

- ✅ **Viết lại hoàn toàn `QuizSection.tsx`** với các tính năng mới:
  - **Random 20 câu** từ ngân hàng 30 câu mỗi lần làm bài (Fisher-Yates shuffle)
  - **Countdown 5 phút** (300 giây) thay vì 45 phút
  - **Animated SVG Clock** — đồng hồ tròn đếm ngược trực quan:
    - Progress ring xanh → vàng (≤2 phút) → đỏ nhấp nháy (≤1 phút)
    - Hiển thị "Sắp hết giờ!" khi ≤1 phút
  - **Điểm tối đa: 10** (mỗi câu đúng = 0.5 điểm)
  - **Timer icon + badge "5'"** trong idle screen
  - **Hiển thị thời gian đã dùng** trong kết quả
  - **Nút "Làm lại (Random mới)"** để tạo bộ câu mới

#### Bước 4: Hoa Phượng trang trí – Báo hiệu hè

- ✅ **Cánh hoa rơi** (Falling Petals) — CSS animation:
  - 15 cánh hoa đỏ/hồng rơi liên tục trên nền trắng
  - 3 kiểu cánh hoa SVG khác nhau (classic, round, narrow)
  - 6 sắc đỏ khác nhau (#e63946, #ff4d5a, #ff6b6b, #ff8585, #d63031, #eb4d4b)
  - Tốc độ rơi ngẫu nhiên 8–20 giây, kích thước 12–26px
  - `pointer-events: none` để không chặn tương tác
- ✅ **Cành phượng SVG** — trang trí góc trang:
  - Góc trên phải: cành cây + lá xanh compound + 3 chùm hoa đỏ + nhụy vàng
  - Góc dưới trái: cành nhỏ hơn, xoay 180°
  - Opacity thấp (12–15%) để tinh tế, không che nội dung
  - Animation `sway` — đung đưa nhẹ 4s

#### Bước 5: Zalo Thumbnail

- ✅ Thêm **OG meta tags** trong `index.html`:
  - `og:title`: 🌺 Ôn tập Cuối kỳ 2 – Tiếng Anh 7 (2025-2026)
  - `og:description`: Đề cương chính thức...
  - `og:image`: `./tải-xuống.jpg` (ảnh hoa phượng đỏ)
  - `og:locale`: vi_VN
- ✅ Cập nhật `<title>` và `<meta description>`

---

## Cấu trúc Project (Sau cập nhật)

```
REVISION-endterm7/
├── index.html              ← CSS, Tailwind CDN, font, OG meta, HOA PHƯỢNG (petals + branch SVG)
├── index.tsx               ← Entry point React
├── App.tsx                 ← Layout chính, hero, tab navigation, footer
├── data.tsx                ← NỘI DUNG ĐỀ CƯƠNG: grammar, phonetics, language, reading, writing, speaking + 30 quiz
├── types.ts                ← TypeScript interfaces (Lesson, VocabItem, ExerciseItem, QuizQuestion)
├── tải-xuống.jpg           ← Ảnh hoa phượng — Zalo/Facebook thumbnail
├── components/
│   ├── LessonModal.tsx     ← Modal popup xem bài học chi tiết
│   └── QuizSection.tsx     ← Quiz Random 20 câu / 5 phút, SVG countdown clock
├── DE_CUONG_KI_2_LOP_7_2025-2026.md  ← File đề cương gốc (source of truth)
├── package.json
├── vite.config.ts
├── vercel.json
└── tsconfig.json
```

---

## Stack Công Nghệ

| Công nghệ | Phiên bản | Vai trò |
|-----------|-----------|---------|
| React | 18.x | UI framework |
| TypeScript | 5.x | Type safety |
| Vite | 5.x | Build tool, dev server |
| TailwindCSS | CDN | Styling (dùng CDN trong index.html) |
| framer-motion | 11.x | Animation (modal, transitions) |
| lucide-react | 0.344+ | Icons (Timer, AlertCircle, BookMarked, FileText...) |

---

## Hướng Dẫn Build Từng Bước

### Bước 1: Clone / Setup Project

```powershell
# Copy từ project đã có sẵn
cp -r "REVISION-endterm7" "REVISION-endterm8"
cd "REVISION-endterm8"

# Cài dependencies
npm install
```

### Bước 2: Cập nhật `index.html`

- Sửa `<title>` và `<meta description>`
- Sửa **OG meta tags** cho Zalo thumbnail
- Chỉnh gradient hero nếu muốn đổi màu
- Có thể tắt/bật hoa phượng bằng cách comment/uncomment phần petals script

```html
<title>Global Success [LỚP] - Đề cương Cuối kỳ 2 | Thầy Võ Ngọc Tùng</title>
<meta property="og:image" content="./[TÊN_ẢNH_THUMBNAIL].jpg" />
```

### Bước 3: Cập nhật `App.tsx`

- Thay text hero h1/description
- Cập nhật unit colors/labels
- Cập nhật footer text

### Bước 4: Viết nội dung `data.tsx` (QUAN TRỌNG NHẤT)

Đây là file chứa toàn bộ nội dung học thuật. Cấu trúc mới:

#### 4a. Grammar Exercises (ExerciseItem[])

```tsx
const unit7Grammar: ExerciseItem[] = [
  { id: 1, question: "Cấu trúc <strong>'It'</strong>...", answer: "Câu trả lời..." },
];
```

#### 4b. Quiz Questions (QuizQuestion[]) – 30 câu từ đề cương

```tsx
export const quizQuestions: QuizQuestion[] = [
  { id: 1, question: "...", options: ["A", "B", "C", "D"], correct: 0, explanation: "...", unit: 7 },
  // unit: 0 = Đề cương (Phonetics, Reading, Writing)
];
```

#### 4c. Lesson cards (Lesson[]) – 12 card theo đề cương

- 5 card Grammar (Unit 7–11)
- 1 card Phonetics
- 1 card Language (chọn đáp án)
- 1 card Error Correction (tìm lỗi sai)
- 2 card Reading
- 1 card Writing
- 1 card Speaking

### Bước 5: Cấu hình QuizSection

Trong `QuizSection.tsx`, chỉnh các hằng số:

```tsx
const QUIZ_NUM = 20;       // Số câu random
const QUIZ_TIME = 5 * 60;  // Thời gian (giây)
const MAX_SCORE = 10;      // Điểm tối đa
```

---

## Tính Năng Quiz Chi Tiết

### Luồng Quiz mới

```
[IDLE] → Bấm "Bắt đầu" → Shuffle 30 câu → Lấy 20 câu đầu
  ↓
[ACTIVE] → SVG Clock đếm ngược 5 phút
  ↓         ├── Xanh (>2 phút)
  ↓         ├── Vàng (≤2 phút)
  ↓         └── Đỏ nhấp nháy (≤1 phút) + "Sắp hết giờ!"
  ↓
[RESULT] → Điểm /10 + Đúng/Sai + Tỷ lệ% + Thời gian đã dùng
  ↓         ├── "Làm lại (Random mới)" → shuffle lại
  ↓         └── "Xem giải thích" → hiện explanations
```

### CountdownClock Component

```tsx
const CountdownClock: React.FC<{ timeLeft: number; total: number }> = ({ timeLeft, total }) => {
  // SVG circle với stroke-dashoffset animation
  // 3 trạng thái màu: indigo → amber → red (pulse)
  // Hiển thị MM:SS ở giữa
};
```

---

## Hoa Phượng – Kỹ Thuật Chi Tiết

### Cánh hoa rơi (JavaScript)

```javascript
// Tạo 15 cánh → 3 kiểu SVG × 6 màu đỏ
// Animation: petal-fall (CSS keyframes)
// Xoay + lắc ngang + fade in/out
// Tự động xóa & tạo lại sau khi rơi xong
```

### Cành phượng (SVG thuần)

```html
<!-- Góc trên phải, opacity 15%, sway animation -->
<div class="phuong-branch sway">
  <svg>
    <!-- path: cành cong -->
    <!-- ellipse: lá compound -->
    <!-- circle: hoa đỏ (3 chùm) -->
    <!-- line + circle: nhụy vàng -->
  </svg>
</div>
```

---

## Checklist Trước Khi Deploy

- [ ] Xóa file không liên quan (`dist/`, file tạm)
- [ ] Cập nhật `<title>`, `<meta description>`, `og:` tags trong `index.html`
- [ ] Cập nhật `og:image` thành **URL đầy đủ** (https://domain.com/image.jpg) khi deploy
- [ ] Cập nhật text hero, tab labels, footer trong `App.tsx`
- [ ] Thêm đúng nội dung đề cương trong `data.tsx`
- [ ] Kiểm tra số câu quiz (QUIZ_NUM) và thời gian (QUIZ_TIME) trong `QuizSection.tsx`
- [ ] `npm run dev` → test: ôn tập bài học + quiz random + hoa phượng
- [ ] Kiểm tra responsive trên mobile
- [ ] `npm run build` → không có lỗi TypeScript
- [ ] Push GitHub → deploy Vercel

---

## Deploy lên Vercel

```powershell
# Cần có vercel.json trong project (đã có sẵn)
git add -A
git commit -m "Cập nhật đề cương cuối kỳ 2 - quiz random 20 câu - hoa phượng"
git push
```

**Lưu ý OG Image cho Zalo:**
Sau khi deploy, cần đổi `og:image` từ đường dẫn tương đối sang URL tuyệt đối:
```html
<meta property="og:image" content="https://your-domain.vercel.app/tải-xuống.jpg" />
```

---

## Thông Tin Giáo Viên

- **Giáo viên:** Thầy Võ Ngọc Tùng
- **Trường:** THCS Nguyễn Văn Bánh - Vĩnh Long
- **Zalo:** 0814 666 040
- **Link Zalo:** https://zalo.me/0814666040

> Nhớ cập nhật thông tin giáo viên trong `App.tsx` phần Teacher Info và Footer nếu dùng cho giáo viên khác.

---

## Nội Dung Theo Lớp (Tham khảo)

### Lớp 7 - Cuối kỳ 2 (Đề cương 2025–2026) ✅ ĐÃ HOÀN THÀNH

| Phần | Nội dung | Số câu quiz |
|------|----------|-------------|
| Unit 7 | It + distance, Should | 4 câu |
| Unit 8 | Although / However | 5 câu |
| Unit 9 | Yes/No Questions | 2 câu |
| Unit 10 | Present Continuous | 4 câu |
| Unit 11 | Will, Possessive Pronouns | 1 câu |
| Phonetics | Stress + Pronunciation | 5 câu |
| Error Correction | Tìm lỗi sai | 3 câu |
| Reading | Traffic Signs | 3 câu |
| Writing | Viết lại câu | 4 câu |
| **Tổng** | | **30 câu** (random 20) |

### Lớp 8 - Học kỳ 2 (Unit 7-12) ✅ ĐÃ XÁC NHẬN VỚI SGK

| Unit | Chủ đề | Ngữ pháp chính |
|------|--------|----------------|
| 7 | Environmental Protection | Past Continuous (while/when) |
| 8 | Shopping | Present Simple for Future, Adverbs of Frequency |
| 9 | Natural Disasters | Adverbial Clauses of Time |
| 10 | Ecotourism | Present Perfect |
| 11 | Science & Technology | Passive Voice |
| 12 | Life on Other Planets | Conditional Type 2 |

### Lớp 9 - Học kỳ 2 ← Cần xác nhận chương trình

---

## ⚠️ Lưu ý kỹ thuật

1. **data.tsx rất dài** — nếu viết bằng AI, chia thành nhiều bước nhỏ (mỗi bước 1–2 units)
2. **OG Image phải là URL tuyệt đối** khi deploy production (Zalo/Facebook không đọc relative path)
3. **Hoa phượng** dùng `pointer-events: none` + `z-index: 0/1` để không chặn tương tác
4. **Quiz random** dùng Fisher-Yates shuffle — mỗi lần bấm "Làm bài" sẽ ra bộ câu khác nhau
5. **SVG CountdownClock** dùng `stroke-dashoffset` animation, tự đổi màu theo thời gian còn lại
