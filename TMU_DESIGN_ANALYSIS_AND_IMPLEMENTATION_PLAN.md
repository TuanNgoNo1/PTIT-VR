# Phân tích thiết kế TMU.edu.vn & Implementation Plan cho PTIT Website

> **Mục tiêu**: Nâng cấp frontend PTIT website theo phong cách thiết kế TMU.edu.vn, đổi tone màu xanh dương TMU → đỏ PTIT, giữ nguyên backend hiện tại.

---

## PHẦN 1: PHÂN TÍCH CHI TIẾT THIẾT KẾ TMU.EDU.VN

### 1.1. Tổng quan phong cách thiết kế

TMU sử dụng phong cách **modern corporate university** với đặc trưng:
- **Minimalist layout** với nhiều whitespace
- **Full-width sections** xen kẽ nền trắng / nền màu / nền ảnh
- **Typography lớn, bold** cho heading — nhỏ gọn cho body
- **Scroll-driven storytelling** — trang chủ là một dải dọc liền mạch, mỗi section là một "chapter"
- **Micro-interactions** tinh tế (hover, scroll reveal, parallax nhẹ)
- **SVG icons** thay vì icon fonts — sắc nét, tải nhanh

### 1.2. Bảng màu (Color Palette)

#### TMU gốc (xanh dương chủ đạo):
| Vai trò | Mã màu | Sử dụng |
|---------|--------|---------|
| Primary | `#003366` (navy) | Header, footer, heading, CTA |
| Primary Light | `#0066CC` | Links, hover states |
| Accent | `#F5A623` (amber) | Badge, counter number, highlight |
| Background Light | `#F7F8FC` | Section nền xám nhạt xen kẽ |
| Background Dark | `#001A33` | Footer, overlay |
| Text Primary | `#1A1A2E` | Body text |
| Text Secondary | `#6B7280` | Caption, meta text |
| White | `#FFFFFF` | Card background, text trên nền tối |
| Border | `#E5E7EB` | Card border, divider |

#### Chuyển đổi sang PTIT (đỏ chủ đạo):
| Vai trò | Mã màu mới | CSS Variable |
|---------|------------|-------------|
| Primary | `#C41E3A` | `--color-primary` |
| Primary Dark | `#8B1A2D` | `--color-primary-dark` |
| Primary Light | `#E63950` | `--color-primary-light` |
| Primary Hover | `#A3182F` | `--color-primary-hover` |
| Accent | `#FF6F00` (cam) | `--color-accent` |
| Background Light | `#FFF8F8` | `--color-bg-light` |
| Background Alt | `#F5F0F0` | `--color-bg-alt` |
| Background Dark | `#2D0A0A` | `--color-bg-dark` |
| Text Primary | `#1A1A2E` | `--color-text` |
| Text Secondary | `#6B7280` | `--color-text-secondary` |
| Text on Dark | `#FFFFFF` | `--color-text-light` |
| Border | `#E5E7EB` | `--color-border` |
| Success | `#10B981` | `--color-success` |
| Gradient Primary | `linear-gradient(135deg, #C41E3A, #8B1A2D)` | `--gradient-primary` |
| Gradient Hero | `linear-gradient(180deg, rgba(196,30,58,0.8), rgba(139,26,45,0.95))` | `--gradient-hero` |

### 1.3. Typography

TMU dùng font hiện đại, sans-serif:

| Vai trò | Font | Weight | Size (desktop) | Size (mobile) |
|---------|------|--------|----------------|---------------|
| Heading H1 (Hero) | Inter / Montserrat | 700 (Bold) | 48–56px | 28–32px |
| Heading H2 (Section title) | Inter / Montserrat | 700 | 36–40px | 24–28px |
| Heading H3 (Card title) | Inter / Montserrat | 600 (SemiBold) | 20–24px | 18–20px |
| Body text | Inter | 400 (Regular) | 16px | 14–15px |
| Caption / Meta | Inter | 400 | 13–14px | 12–13px |
| Button text | Inter | 600 | 14–16px | 14px |
| Nav links | Inter | 500 (Medium) | 15px | 14px |

**Line height**: 1.5–1.7 cho body, 1.2–1.3 cho heading.
**Letter spacing**: heading có `letter-spacing: -0.02em` (tighter), body `0` hoặc `0.01em`.

> **Khuyến nghị cho PTIT**: Dùng `Inter` (Google Fonts, miễn phí, hỗ trợ tiếng Việt tốt). Fallback: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`.

### 1.4. Layout System

```
Max-width container: 1280px (giống PTIT hiện tại)
Padding container: 0 60px (desktop), 0 20px (mobile)
Section vertical spacing: 80–120px (desktop), 48–60px (mobile)
Card gap: 24–32px
Grid: CSS Grid 12 columns, gap 24px
```

**Breakpoints**:
| Tên | Width | Ghi chú |
|-----|-------|---------|
| Mobile | < 768px | 1 column, hamburger menu |
| Tablet | 768–1024px | 2 columns |
| Desktop | 1024–1440px | 3–4 columns |
| Wide | > 1440px | Max-width capped, centered |

### 1.5. PHÂN TÍCH TỪNG COMPONENT

---

#### 1.5.1. HEADER / NAVIGATION

**Cấu trúc TMU Header** (2 tầng):

```
┌─────────────────────────────────────────────────────────┐
│ [Logo SVG]  [Logo Text]    🔍 Search  ☰ Menu  🌐 VIE ▼ │  ← Sticky header
│                            [Cổng đào tạo]               │
└─────────────────────────────────────────────────────────┘
```

**Chi tiết**:
- **Position**: `position: fixed; top: 0; z-index: 1000` — header luôn dính trên cùng
- **Background**: Trong suốt khi ở đầu trang (hero), chuyển sang `background: white; box-shadow: 0 2px 20px rgba(0,0,0,0.08)` khi scroll xuống (scroll event listener)
- **Height**: ~70px desktop, ~56px mobile
- **Logo**: SVG 2 phần — icon bên trái + text bên phải. Trên mobile chỉ hiện icon
- **Search**: Icon 🔍 → click mở overlay tìm kiếm full-width với animation slide-down. Placeholder: "Bạn đang tìm kiếm gì?" với icon search xanh
- **Hamburger Menu (☰)**: Mở sidebar navigation (slide từ phải sang)
- **Language switcher**: Globe icon + "VIE" + dropdown arrow → dropdown 2 options (VIE/ENG) với flag icons
- **CTA Button**: "Cổng đào tạo" — button nhỏ, border-radius, dẫn link ngoài

**Sidebar Menu (khi click ☰)**:
```
┌──────────────────────────────┐
│ [Logo]               [Close X]│
│                                │
│ • Trang chủ                    │
│ • Giới thiệu           →      │  ← Arrow = có submenu
│   - Giới thiệu chung          │
│   - Sứ mạng mục tiêu          │
│   - Cơ cấu tổ chức            │
│ • Tin tức                      │
│ • Sự kiện                      │
│ • Tuyển sinh            →      │
│ • ...                          │
│                                │
│ [Background image overlay]     │
│ [Social icons: FB, LI, YT]    │
└──────────────────────────────┘
```

- Slide từ phải, overlay backdrop `rgba(0,0,0,0.5)`
- Background: gradient tối + ảnh campus mờ
- Menu items: font lớn (~20px), spacing rộng (~16px gap)
- Submenu: indent, font nhỏ hơn, mở toggle (accordion)
- Close: icon X góc trên phải

**Animations**:
- Header background: `transition: background 0.3s ease, box-shadow 0.3s ease`
- Sidebar: `transform: translateX(100%) → translateX(0)`, `transition: 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)`
- Search overlay: `opacity: 0 → 1`, `transform: translateY(-20px) → translateY(0)`

---

#### 1.5.2. HERO SECTION (Banner chính)

**Layout**:
```
┌───────────────────────────────────────────────────┐
│                                                     │
│   [Background: ảnh campus full-width + overlay]     │
│                                                     │
│   "Là trường đại học đầu tiên tại Việt Nam         │
│    hoàn thành 100% kiểm định cho tất cả            │
│    các chương trình đào tạo."                       │
│                                                     │
│   [Khám phá ngay →]                                │
│                                                     │
│   01 / 05    ▲ ▼    Cuộn xuống ↓                   │
│                                                     │
└───────────────────────────────────────────────────┘
```

**Chi tiết kỹ thuật**:
- **Height**: `100vh` (full viewport height)
- **Background**: Slider ảnh panorama campus, có overlay gradient `linear-gradient(180deg, rgba(0,51,102,0.4), rgba(0,26,51,0.7))` → Đổi thành gradient đỏ PTIT
- **Slider**: Auto-play 5–7s, transition fade hoặc slide. Counter "01/05" góc dưới trái
- **Navigation arrows**: ▲▼ vertical (không phải ◄►) — thiết kế độc đáo
- **Text**: Centered, font 48–56px bold, color white, `text-shadow: 0 2px 10px rgba(0,0,0,0.3)`
- **CTA button**: Border trắng, text trắng, hover → fill trắng + text đỏ. Border-radius: 30px (pill shape)
- **Scroll indicator**: "Cuộn xuống" + icon animated (bounce nhẹ), vị trí bottom center
- **Parallax**: Background image có `background-attachment: fixed` hoặc JS parallax nhẹ (translate speed 0.5)

**Animations**:
- Slide transition: `opacity` + `transform: scale(1.05) → scale(1)` (Ken Burns effect nhẹ)
- Text entrance: fade-in + slide-up khi slide đổi
- Scroll indicator: `@keyframes bounce { 0%,100% { transform: translateY(0) } 50% { transform: translateY(8px) } }` loop infinite

---

#### 1.5.3. GIỚI THIỆU SECTION ("Chúng tôi – TMU")

**Layout**:
```
┌───────────────────────────────────────────────────┐
│                                                     │
│  ## Chúng tôi – Trường Đại học Thương mại (TMU)    │
│                                                     │
│  [Đoạn text giới thiệu ngắn]                       │
│  [Xem thêm →]                                      │
│                                                     │
│  ┌─────────────────────────────────────┐            │
│  │  [Ảnh campus lớn]                   │            │
│  │                                     │            │
│  │     [Logo spinning overlay]         │            │
│  │                                     │            │
│  └─────────────────────────────────────┘            │
│                                                     │
│  ┌────────┬────────┬────────┬────────┐              │
│  │  1960  │   45   │ 26000  │  116   │              │
│  │Năm TL  │CT ĐT   │SV      │CG QT  │              │
│  └────────┴────────┴────────┴────────┘              │
│                                                     │
└───────────────────────────────────────────────────┘
```

**Chi tiết**:
- **Section padding**: `padding: 100px 0`
- **Heading**: H2, color primary dark, font 36–40px
- **"Xem thêm" link**: Text + arrow icon →, hover underline slide animation
- **Ảnh campus**: Full-width hoặc 80% width, border-radius: 16px, `object-fit: cover`
- **Logo overlay**: 2 lớp SVG chồng nhau — lớp ngoài xoay chậm (`animation: spin 20s linear infinite`), lớp trong tĩnh (logo). Position absolute trên ảnh
- **Statistics counters**: 4 cột grid, mỗi ô chứa số lớn (font 48px bold, color primary) + label nhỏ bên dưới. Số đếm lên (count-up animation) khi scroll vào viewport

**Animations**:
- Count-up numbers: từ 0 → target value trong 2s, easing `ease-out`. Trigger: Intersection Observer
- Logo spin: `@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }` duration 20–30s
- Section reveal: fade-in + slide-up 30px khi scroll vào

**Đổi cho PTIT**: Thay stats = Năm thành lập (1997), Số ngành đào tạo, Số sinh viên, Số giảng viên TS/PGS.

---

#### 1.5.4. KHOA - VIỆN SECTION

**Layout**: Horizontal scrolling carousel với card layout

```
┌───────────────────────────────────────────────────┐
│ ### Khoa - Viện thuộc TMU          [← text scroll →] │
│                                                      │
│  [Ảnh building     ] ┌──────┬──────┬──────┬──────┐  │
│  [bên trái,        ] │[icon]│[icon]│[icon]│[icon]│  │
│  [fixed position   ] │Khoa  │Khoa  │Viện  │Khoa  │  │
│  [khi scroll       ] │Toán  │Luật  │QTKD  │KS-DL │  │
│  [                 ] │KT    │      │      │      │  │
│  [                 ] │      │      │      │      │  │
│  [                 ] │[desc]│[desc]│[desc]│[desc]│  │
│  [                 ] │  →   │  →   │  →   │  →   │  │
│  [                 ] └──────┴──────┴──────┴──────┘  │
│                                                      │
│  [Xem tất cả →]                                      │
└───────────────────────────────────────────────────┘
```

**Chi tiết**:
- **Layout**: 2 phần — ảnh bên trái (sticky/fixed ~40% width) + danh sách card bên phải scroll ngang
- **Title**: Có marquee/ticker text "Khoa - Viện thuộc TMU" chạy ngang lặp lại (infinite scroll text)
- **Card khoa/viện**:
  - Size: ~280px × 320px
  - Background: white, border: 1px solid `#E5E7EB`
  - Border-radius: 12px
  - Padding: 24px
  - Icon: hình tròn/vuông nhỏ 48px (ảnh PNG custom mỗi khoa)
  - Title: H6, font 16–18px semibold
  - Description: font 13–14px, color secondary, max 3 lines `line-clamp: 3`
  - Arrow link: icon → ở bottom-right
  - Hover: `box-shadow: 0 8px 30px rgba(0,0,0,0.12)`, `transform: translateY(-4px)`
  - Transition: `0.3s ease`
- **Horizontal scroll**: `overflow-x: auto; scroll-snap-type: x mandatory` hoặc custom JS carousel
- **"Xem tất cả" button**: Text link + small arrow icon

**Animations**:
- Marquee text: CSS `@keyframes marquee { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }` — text duplicate, tốc độ chậm
- Card hover: lift + shadow
- Scroll snap: mỗi card snap vào vị trí

---

#### 1.5.5. TUYỂN SINH SECTION

**Layout**: Full-width horizontal card carousel

```
┌───────────────────────────────────────────────────┐
│ ### Tuyển sinh                    [Xem tất cả →]   │
│                                                     │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│ │ [ảnh]    │ │ [ảnh]    │ │ [ảnh]    │ ...        │
│ │          │ │          │ │          │            │
│ │ ──────── │ │ ──────── │ │ ──────── │            │
│ │ Đại học  │ │ Thạc sĩ  │ │ Tiến sĩ  │            │
│ │ CQ       │ │          │ │          │            │
│ │ [View →] │ │ [View →] │ │ [View →] │            │
│ └──────────┘ └──────────┘ └──────────┘            │
│                                                     │
└───────────────────────────────────────────────────┘
```

**Chi tiết card tuyển sinh**:
- Size: ~300px × 400px
- Ảnh: 100% width, aspect-ratio 3:2, `object-fit: cover`
- Border-radius: 16px (card) + 12px (ảnh phía trên)
- Overlay gradient trên ảnh: `linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)`
- Title: overlay trên ảnh, font white, bold
- "View more" button: nhỏ, pill shape, white border + white text, absolute bottom
- Hover: ảnh `transform: scale(1.05)`, `overflow: hidden` trên card để clip
- Carousel: horizontal scroll hoặc Swiper.js

---

#### 1.5.6. CỔNG THÔNG TIN (Portal Links)

**Layout**: Grid 4 cột, mỗi ô là icon + label

```
┌──────────────────────────────────────────┐
│ ### Cổng thông tin                        │
│                                           │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ │
│ │ 📝      │ │ 📋      │ │ 📚      │ │ 💼      │ │
│ │ Đăng ký │ │ Thi     │ │ Thư     │ │ Việc    │ │
│ │ tín chỉ │ │ VSTEP   │ │ viện số │ │ làm     │ │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘ │
└──────────────────────────────────────────┘
```

**Chi tiết**:
- Background section: gradient nhẹ hoặc nền xám nhạt
- Card: background white, border-radius 12px, padding 32px, text-align center
- Icon: SVG custom, size 48px, color primary
- Label: font 14–16px medium
- Hover: background primary → text white, icon white (`transition: 0.3s`)
- Hoặc: hover lift + tint color change

**Đổi cho PTIT**: Thay = Cổng đào tạo, Thư viện, Lịch thi, Tham quan ảo VR, etc.

---

#### 1.5.7. TIN TỨC VÀ SỰ KIỆN

**Layout**: Danh sách vertical, mỗi item là 1 row

```
┌────────────────────────────────────────────────┐
│ ### Tin tức và sự kiện                          │
│                                                  │
│ ┌──────────────────────────────────────────┐    │
│ │ 02.04.2026  |  Tiêu đề bài viết dài...  │ →  │
│ │               Tin tức                     │    │
│ ├──────────────────────────────────────────┤    │
│ │ 01.04.2026  |  Tiêu đề bài viết...      │ →  │
│ │               Tin tức                     │    │
│ ├──────────────────────────────────────────┤    │
│ │ 27.03.2026  |  Tiêu đề bài viết...      │ →  │
│ └──────────────────────────────────────────┘    │
└────────────────────────────────────────────────┘
```

**Chi tiết**:
- Layout: list-style, mỗi item là flexbox row: `[date] [title + category] [arrow →]`
- Date: font monospace hoặc tabular-nums, color secondary, width fixed ~100px
- Title: font 16–18px medium, color text primary, `text-overflow: ellipsis` 1 line
- Category badge: font 12px, color primary, uppercase hoặc normal
- Arrow: icon → bên phải, ẩn default, hiện khi hover row
- Divider: `border-bottom: 1px solid #E5E7EB` giữa các row
- Hover row: background `#F7F8FC`, arrow slide-in từ phải
- Hiển thị 6 items mới nhất, không phân trang ở trang chủ

---

#### 1.5.8. HỢP TÁC SECTION

**Layout**: Horizontal card carousel

```
┌───────────────────────────────────────────────────┐
│ ### Hợp tác                        [Xem tất cả →] │
│                                                     │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ │
│ │ [ảnh lớn]    │ │ [ảnh lớn]    │ │ [ảnh lớn]    │ │
│ │              │ │              │ │              │ │
│ │ Hợp tác QT  │ │ Hợp tác QT  │ │ Hợp tác TN  │ │
│ │ Tiêu đề...  │ │ Tiêu đề...  │ │ Tiêu đề...  │ │
│ └──────────────┘ └──────────────┘ └──────────────┘ │
└───────────────────────────────────────────────────┘
```

**Chi tiết card**:
- Size: ~380px × 450px
- Ảnh: 100% width, aspect-ratio 16:10, border-radius top 12px
- Category tag: overlay trên ảnh, pill badge, background `rgba(primary, 0.9)`, color white
- Title: 2 lines max, font 18px semibold
- Hover: ảnh zoom `scale(1.05)` + shadow lift
- Carousel: Swiper.js hoặc CSS scroll-snap

---

#### 1.5.9. ĐỐI TÁC (Partner Logos)

**Layout**: Logo ticker/marquee auto-scroll

```
┌─────────────────────────────────────────────────┐
│ ### Đối tác                                      │
│                                                   │
│ [logo1] [logo2] [logo3] [logo4] [logo5] →→→     │
│         (auto-scroll liên tục)                    │
└─────────────────────────────────────────────────┘
```

**Chi tiết**:
- Infinite horizontal scroll (CSS marquee animation)
- Logo: grayscale mặc định, color khi hover
- Size logo: max-height 60px, max-width ~200px
- Gap giữa logos: 48–60px
- CSS: `filter: grayscale(100%); opacity: 0.6` → hover `filter: none; opacity: 1`
- Animation: duplicate track, `animation: marquee 30s linear infinite`

---

#### 1.5.10. FOOTER

**Layout**:
```
┌───────────────────────────────────────────────────┐
│ Background: gradient tối (navy/dark red)           │
│                                                     │
│ [Logo + Name]                                       │
│                                                     │
│ 📍 Địa chỉ                                         │
│ 📞 Điện thoại                                      │
│ 📠 Fax                                             │
│ ✉️ Email                                           │
│                                                     │
│ LIÊN KẾT NGOÀI              [Social icons]         │
│ • Cổng TTĐT Chính phủ                              │
│ • Bộ GD&ĐT                                         │
│ • ...                                               │
│                                                     │
│ ─────────────────────────────                       │
│ © Bản quyền 2024–2025      [FB] [YT] [LinkedIn]    │
└───────────────────────────────────────────────────┘
```

**Chi tiết**:
- Background: `#001A33` (TMU) → `#2D0A0A` hoặc `linear-gradient(135deg, #1a0505, #3d0f0f)` (PTIT)
- Logo: SVG white version
- Text color: `rgba(255,255,255,0.8)` cho body, white cho heading
- Links: white, hover `color: var(--color-accent)` (cam)
- Social icons: SVG, circle background hoặc plain, size 40px
- Divider: `border-top: 1px solid rgba(255,255,255,0.15)`

---

#### 1.5.11. FLOATING ACTION BUTTONS

```
┌──────┐
│ 💬   │  ← Chat (Messenger)
├──────┤
│ 📞   │  ← Phone
├──────┤
│ ↑    │  ← Scroll to top (hiện khi scroll > 300px)
└──────┘
   (fixed bottom-right)
```

**Chi tiết**:
- Position: `fixed; bottom: 24px; right: 24px; z-index: 999`
- Size: 48px × 48px mỗi button
- Background: primary color, border-radius: 50%
- Shadow: `0 4px 12px rgba(0,0,0,0.15)`
- Hover: scale(1.1) + shadow tăng
- Scroll-to-top: ẩn khi ở top, hiện từ từ `opacity 0 → 1`
- Stack vertical, gap 12px

---

#### 1.5.12. SEARCH OVERLAY

Khi click icon search:
```
┌───────────────────────────────────────────────────┐
│ [backdrop tối toàn màn hình]                       │
│                                                     │
│   ### Bạn đang tìm kiếm gì?                       │
│   ┌──────────────────────────────────┐             │
│   │ 🔍 [input field rộng toàn bộ]   │             │
│   └──────────────────────────────────┘             │
│                                                     │
│   [Close X]                                         │
└───────────────────────────────────────────────────┘
```

- Overlay: `position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 2000`
- Input: max-width 600px, centered, font 24px, border-bottom only (minimalist)
- Animation: backdrop fade-in 0.3s, input slide-down 0.3s

---

### 1.6. ANIMATION & INTERACTION PATTERNS (Tổng hợp)

| Pattern | CSS/JS | Chi tiết |
|---------|--------|----------|
| **Scroll reveal** | Intersection Observer + CSS | Elements fade-in + translateY(30px) khi enter viewport. `transition: 0.6s ease-out`. Stagger children 0.1s |
| **Hover lift** | CSS | Cards: `transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.12)` |
| **Link underline slide** | CSS pseudo-element | `::after { content:''; width:0; height:2px; transition:width 0.3s }` hover `width:100%` |
| **Button fill** | CSS | Border button → hover fill background + text color swap |
| **Image zoom on hover** | CSS | `overflow:hidden` wrapper + `img:hover { transform: scale(1.05) }` |
| **Count-up numbers** | JS | requestAnimationFrame, easing function, trigger on viewport enter |
| **Marquee/Ticker** | CSS animation | Duplicate content, `translateX(-50%)` loop |
| **Parallax (nhẹ)** | CSS/JS | `background-attachment: fixed` hoặc `transform: translateY(calc(var(--scroll) * 0.3))` |
| **Smooth scroll** | CSS | `html { scroll-behavior: smooth }` |
| **Header transition** | JS scroll event | Toggle class `.scrolled` at threshold 50px → change bg/shadow |
| **Ken Burns (Hero)** | CSS | `@keyframes kenburns { from { transform: scale(1) } to { transform: scale(1.08) } }` 7s |
| **Slide transitions** | CSS | Carousel items: `opacity + transform` combo |

---

### 1.7. RESPONSIVE BEHAVIOR

| Component | Desktop | Tablet | Mobile |
|-----------|---------|--------|--------|
| Header | Logo + search + menu icon + lang | Same, compact | Logo only + hamburger |
| Hero | 100vh, text 48px | 100vh, text 36px | 100vh, text 28px, CTA smaller |
| Stats | 4 columns | 2×2 grid | 2×2 grid, numbers 36px |
| Faculty cards | 4 per row visible | 2 per row | 1 per row, swipe |
| Admission cards | 4 visible | 2 visible | 1 visible, swipe |
| News list | Full row | Full row | Stacked (date trên, title dưới) |
| Cooperation | 3 cards visible | 2 visible | 1 visible, swipe |
| Portal links | 4 columns | 2×2 | 2×2 hoặc stacked |
| Footer | 2–3 columns | 2 columns | Stacked |

---

## PHẦN 2: IMPLEMENTATION PLAN CHO AI

> **Quan trọng**: Plan này dành cho AI assistant (Claude, Cursor, Copilot...) để implement từng bước. Mỗi task là một prompt/session riêng biệt. Thứ tự phải tuân theo vì có dependency.

### Quy ước chung cho mọi task

```
- Framework: React 19 + React Router v7
- CSS: CSS thuần (KHÔNG dùng Tailwind, SCSS, styled-components)
- BEM naming: .component-name__element--modifier
- Tách pure logic → *Utils.js
- Data tĩnh → src/data/
- Font: Inter (Google Fonts)
- Icons: SVG inline hoặc component
- Animation: CSS transitions + Intersection Observer (KHÔNG dùng thư viện animation nặng)
- Image optimization: lazy loading native (loading="lazy")
- Giữ nguyên backend API (port 5000)
```

---

### PHASE 0: SETUP & INFRASTRUCTURE (2 tasks)

#### Task 0.1 — CSS Design System Reset

**Mô tả**: Xóa toàn bộ CSS cũ trong `index.css`, tạo design system mới dựa theo phân tích TMU.

**File cần sửa**: `frontend/src/index.css`

**Nội dung cần tạo**:
```css
/* === RESET === */
/* CSS Reset (modern) — box-sizing, margin, padding */

/* === FONTS === */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* === CSS VARIABLES === */
:root {
  /* Colors */
  --color-primary: #C41E3A;
  --color-primary-dark: #8B1A2D;
  --color-primary-light: #E63950;
  --color-primary-hover: #A3182F;
  --color-accent: #FF6F00;
  --color-bg-light: #FFF8F8;
  --color-bg-alt: #F5F0F0;
  --color-bg-dark: #2D0A0A;
  --color-text: #1A1A2E;
  --color-text-secondary: #6B7280;
  --color-text-light: #FFFFFF;
  --color-border: #E5E7EB;
  --color-success: #10B981;
  --gradient-primary: linear-gradient(135deg, #C41E3A, #8B1A2D);
  --gradient-hero: linear-gradient(180deg, rgba(196,30,58,0.4), rgba(139,26,45,0.7));
  --gradient-footer: linear-gradient(135deg, #1a0505, #3d0f0f);

  /* Typography */
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.8125rem;  /* 13px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-md: 1.125rem;   /* 18px */
  --font-size-lg: 1.25rem;    /* 20px */
  --font-size-xl: 1.5rem;     /* 24px */
  --font-size-2xl: 2rem;      /* 32px */
  --font-size-3xl: 2.5rem;    /* 40px */
  --font-size-4xl: 3rem;      /* 48px */
  --font-size-hero: 3.5rem;   /* 56px */

  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  --spacing-3xl: 64px;
  --spacing-4xl: 80px;
  --spacing-section: 100px;

  /* Layout */
  --max-width: 1280px;
  --header-height: 70px;
  --container-padding: 60px;
  --border-radius-sm: 8px;
  --border-radius-md: 12px;
  --border-radius-lg: 16px;
  --border-radius-pill: 30px;

  /* Shadows */
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.06);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.1);
  --shadow-lg: 0 8px 30px rgba(0,0,0,0.12);
  --shadow-xl: 0 12px 40px rgba(0,0,0,0.15);
  --shadow-header: 0 2px 20px rgba(0,0,0,0.08);

  /* Transitions */
  --transition-fast: 0.2s ease;
  --transition-base: 0.3s ease;
  --transition-slow: 0.5s ease;
  --transition-bounce: 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

@media (max-width: 768px) {
  :root {
    --font-size-hero: 1.75rem;
    --font-size-4xl: 1.75rem;
    --font-size-3xl: 1.5rem;
    --font-size-2xl: 1.25rem;
    --container-padding: 20px;
    --spacing-section: 60px;
    --header-height: 56px;
  }
}

/* === BASE STYLES === */
/* html, body, *, .container, headings, links, buttons, etc. */

/* === UTILITY CLASSES === */
/* .container, .section, .scroll-reveal, etc. */
```

**Acceptance criteria**:
- Mọi CSS variable đều được define
- Reset CSS sạch
- Base styles cho html, body, headings, links, buttons
- `.container` class với max-width + padding
- `.section` class với vertical spacing
- `.scroll-reveal` class cho animation (initial state: `opacity:0; transform:translateY(30px)`)
- Responsive variables đã override ở mobile breakpoint

---

#### Task 0.2 — Scroll Reveal Hook + Animation Utilities

**Mô tả**: Tạo custom React hook `useScrollReveal` dùng Intersection Observer, và các CSS animation utilities.

**File cần tạo**: 
- `frontend/src/hooks/useScrollReveal.js`
- `frontend/src/hooks/useCountUp.js` (cho animated numbers)
- `frontend/src/hooks/useHeaderScroll.js` (cho header background change)

**Chi tiết useScrollReveal**:
```javascript
// Intersection Observer hook
// Nhận ref hoặc selector
// Khi element vào viewport → add class '.revealed' 
// CSS .scroll-reveal.revealed { opacity:1; transform:translateY(0) }
// Options: threshold: 0.1, rootMargin: '0px 0px -50px 0px'
// Support stagger: mỗi child delay thêm 0.1s
```

**Chi tiết useCountUp**:
```javascript
// Input: targetNumber, duration (ms), startOnView (boolean)
// Output: currentNumber (animated value)
// Uses requestAnimationFrame + easing
// Trigger khi element in viewport (Intersection Observer)
```

**Chi tiết useHeaderScroll**:
```javascript
// Listen scroll event (throttled)
// Return: isScrolled (boolean) — true khi scroll > 50px
// Dùng để toggle header class
```

---

### PHASE 1: LAYOUT SHELL (3 tasks)

#### Task 1.1 — Header Component (Redesign hoàn toàn)

**Mô tả**: Tạo lại Header theo phong cách TMU — sticky, transparent-to-white on scroll, hamburger sidebar.

**Xóa**: Toàn bộ Header cũ (3 tầng topbar/logo/nav đỏ)

**File cần sửa/tạo**:
- `frontend/src/components/Header/Header.jsx` (rewrite)
- `frontend/src/components/Header/Header.css` (rewrite)
- `frontend/src/components/Header/SidebarMenu.jsx` (mới)
- `frontend/src/components/Header/SidebarMenu.css` (mới)
- `frontend/src/components/Header/SearchOverlay.jsx` (mới)
- `frontend/src/components/Header/SearchOverlay.css` (mới)

**Cấu trúc Header mới**:
```jsx
<header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
  <div className="header__container">
    <Link to="/" className="header__logo">
      <img src="/images/logo-ptit.svg" alt="PTIT" className="header__logo-icon" />
      <img src="/images/logo-ptit-text.svg" alt="PTIT" className="header__logo-text" />
    </Link>
    
    <div className="header__actions">
      <button className="header__search-btn" onClick={openSearch}>
        <SearchIcon />
      </button>
      <button className="header__menu-btn" onClick={openSidebar}>
        <MenuIcon />
      </button>
    </div>
  </div>
</header>

<SidebarMenu isOpen={isSidebarOpen} onClose={closeSidebar} />
<SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} />
```

**CSS Header**:
- `position: fixed; top:0; left:0; right:0; z-index:1000`
- Default: `background: transparent` (hero visible through)
- `.header--scrolled`: `background: white; box-shadow: var(--shadow-header)`
- Logo: SVG version trắng khi transparent, SVG version màu khi scrolled
- Transition: `background 0.3s, box-shadow 0.3s`

**SidebarMenu**:
- Slide từ phải: `transform: translateX(100%)` → `translateX(0)` 
- Backdrop: `rgba(0,0,0,0.5)`
- Background: gradient tối + ảnh campus mờ
- Menu items: accordion cho submenu
- Social icons ở bottom
- Width: 400px desktop, 85vw mobile

**SearchOverlay**:
- Full screen overlay tối
- Input centered, font lớn, border-bottom style
- Auto-focus khi mở
- Navigate to `/search?q=...` khi submit

---

#### Task 1.2 — Footer Component (Redesign)

**Mô tả**: Tạo lại Footer theo phong cách TMU — gradient tối, layout gọn.

**File cần sửa/tạo**:
- `frontend/src/components/Footer/Footer.jsx` (rewrite)
- `frontend/src/components/Footer/Footer.css` (rewrite)
- `frontend/src/data/footerData.js` (update data)

**Layout mới**:
```
[Logo + Tên trường]
[📍 Địa chỉ | 📞 SĐT | 📠 Fax | ✉️ Email]
[LIÊN KẾT: Bộ GD&ĐT, Bộ TT&TT, ...]
[Divider]
[© Copyright] [Social icons]
```

---

#### Task 1.3 — Floating Action Buttons

**File cần tạo**:
- `frontend/src/components/FloatingActions/FloatingActions.jsx`
- `frontend/src/components/FloatingActions/FloatingActions.css`

**Nội dung**: Chat button (link FB Messenger hoặc Zalo), Phone button, Scroll-to-top button. Fixed bottom-right, hiện scroll-to-top chỉ khi scroll > 300px.

---

### PHASE 2: TRANG CHỦ — HERO & SECTIONS (6 tasks)

#### Task 2.1 — Hero Section (Banner slider fullscreen)

**File cần tạo**:
- `frontend/src/components/HeroSection/HeroSection.jsx`
- `frontend/src/components/HeroSection/HeroSection.css`
- `frontend/src/data/heroSlides.js`

**Yêu cầu**:
- Full viewport height `100vh`
- Background image slider (auto-play 6s, crossfade transition)
- Ken Burns effect nhẹ trên mỗi slide
- Overlay gradient đỏ PTIT
- Text content centered: heading lớn + subtitle + CTA button pill
- Slide counter "01/05" góc dưới trái
- Navigation arrows ▲▼ vertical
- "Cuộn xuống" indicator với bounce animation ở bottom center
- Responsive: text nhỏ hơn trên mobile

**Data**: 4–5 slides với ảnh campus PTIT (hero images cần chuẩn bị sẵn trong `public/images/hero/`)

---

#### Task 2.2 — About Section (Giới thiệu + Stats counter)

**File cần tạo**:
- `frontend/src/components/AboutSection/AboutSection.jsx`
- `frontend/src/components/AboutSection/AboutSection.css`
- `frontend/src/data/aboutStats.js`

**Yêu cầu**:
- Heading + mô tả ngắn + link "Xem thêm →"
- Ảnh campus lớn (border-radius 16px)
- Logo overlay xoay (spin animation 20s) — optional, có thể bỏ nếu không có SVG
- 4 statistics counters: count-up animation khi scroll vào viewport
- Stats data: `{ number: 1997, label: 'Năm thành lập' }`, etc.
- Scroll reveal animation cho toàn section

---

#### Task 2.3 — Faculty Section (Khoa - Viện carousel)

**File cần tạo**:
- `frontend/src/components/FacultySection/FacultySection.jsx`
- `frontend/src/components/FacultySection/FacultySection.css`

**Data đã có**: `frontend/src/data/faculties.js`

**Yêu cầu**:
- Marquee ticker text "Khoa - Viện thuộc PTIT" chạy ngang lặp lại
- Ảnh campus bên trái (optional — hoặc bỏ, dùng layout grid thuần)
- Horizontal scrolling card list (CSS scroll-snap hoặc button prev/next)
- Card: icon + title + description (3 lines clamp) + arrow link
- Card hover: lift + shadow
- "Xem tất cả" button cuối

---

#### Task 2.4 — Admission Section (Tuyển sinh cards)

**File cần tạo**:
- `frontend/src/components/AdmissionSection/AdmissionSection.jsx`
- `frontend/src/components/AdmissionSection/AdmissionSection.css`
- `frontend/src/data/admissionPrograms.js` (mới — khác admissionMethods.js cũ)

**Yêu cầu**:
- Heading + "Xem tất cả" link
- Horizontal carousel cards
- Card: ảnh + overlay gradient + title + "Xem thêm" button
- Image hover zoom
- Responsive: 1 card mobile, 2 tablet, 4 desktop

---

#### Task 2.5 — Portal Links + News Section

**File cần tạo**:
- `frontend/src/components/PortalLinks/PortalLinks.jsx`
- `frontend/src/components/PortalLinks/PortalLinks.css`
- `frontend/src/data/portalLinks.js`
- `frontend/src/components/NewsEventsSection/NewsEventsSection.jsx`
- `frontend/src/components/NewsEventsSection/NewsEventsSection.css`

**Portal Links**: Grid 4 cột, icon + label, hover fill color change.

**News Events**: 
- Fetch từ API `/api/posts/category/Tin tức?limit=6`
- Layout: list rows (date | title | category | arrow)
- Hover: background tint + arrow slide-in
- Divider giữa rows

---

#### Task 2.6 — Cooperation + Partners Section

**File cần tạo**:
- `frontend/src/components/CooperationSection/CooperationSection.jsx`
- `frontend/src/components/CooperationSection/CooperationSection.css`
- `frontend/src/components/PartnersMarquee/PartnersMarquee.jsx`
- `frontend/src/components/PartnersMarquee/PartnersMarquee.css`
- `frontend/src/data/cooperationNews.js`
- `frontend/src/data/partnerLogos.js`

**Cooperation**: Card carousel (image + category badge + title). Có thể fetch từ API nếu có category "Hợp tác".

**Partners**: Infinite marquee logo scroll. Logos grayscale → color on hover.

---

### PHASE 3: TRANG CHỦ ASSEMBLY + CÁC TRANG PHỤ (4 tasks)

#### Task 3.1 — Assemble HomePage

**File cần sửa**: `frontend/src/pages/Home/HomePage.jsx`

**Nội dung**: Import và sắp xếp tất cả sections theo thứ tự:
```jsx
<>
  <HeroSection />
  <AboutSection />
  <FacultySection />
  <AdmissionSection />
  <PortalLinks />
  <NewsEventsSection />
  <CooperationSection />
  <PartnersMarquee />
</>
```

Không cần Layout wrapper vì Header/Footer đã trong App.js.

---

#### Task 3.2 — News Page Redesign

**File cần sửa**: 
- `frontend/src/pages/News/NewsPage.jsx`
- `frontend/src/pages/News/NewsPage.css`

**Thay đổi**:
- Bỏ layout grid card cũ → dùng list-style giống TMU news section (date | title | category)
- Sidebar danh mục vẫn giữ nhưng restyle: gọn hơn, pill badges cho category
- Pagination: restyle = dot hoặc number minimal
- Hero banner nhỏ ở top page (ảnh + overlay + breadcrumb + page title)

---

#### Task 3.3 — Post Detail Page Redesign

**File cần sửa**:
- `frontend/src/pages/PostDetail/PostDetailPage.jsx`
- `frontend/src/pages/PostDetail/PostDetailPage.css`

**Thay đổi**:
- Layout: centered content column (max-width 800px)
- Typography: article-style, font-size 18px body, line-height 1.8
- Hero image full-width ở top
- Breadcrumb + date + category
- Related posts ở bottom: horizontal card row

---

#### Task 3.4 — Other Pages Restyle

Lặp lại pattern cho các trang còn lại — mỗi trang cần:
1. **Page hero banner** nhỏ (ảnh + overlay đỏ + title + breadcrumb)
2. **Content area** theo design system mới (typography, spacing, colors)
3. **Scroll reveal animations**

Danh sách trang: Giới thiệu, Đào tạo, Tuyển sinh, Khoa-Viện, Nghiên cứu, Hợp tác QT, Sinh viên, Tuyển dụng, Liên hệ, Tìm kiếm.

---

### PHASE 4: POLISH & RESPONSIVE (3 tasks)

#### Task 4.1 — Mobile Responsive Complete

- Header: hamburger đã có từ Phase 1
- Hero: text scale down, CTA smaller
- Carousels: touch swipe, 1 card visible
- Grid sections: stack to 1–2 columns
- Footer: stack columns
- Test trên viewport 375px (iPhone SE) và 768px (iPad)

#### Task 4.2 — Animation & Performance Polish

- Verify tất cả scroll-reveal đều hoạt động
- Count-up numbers chạy mượt
- Lazy load images: `loading="lazy"` cho mọi `<img>`
- Lazy load page components: `React.lazy` + `<Suspense>`
- Test Lighthouse score > 90

#### Task 4.3 — SVG Icons & Image Assets

- Tạo bộ SVG icons component: SearchIcon, MenuIcon, CloseIcon, ArrowRightIcon, PhoneIcon, MailIcon, LocationIcon, FaxIcon, FacebookIcon, YouTubeIcon, LinkedInIcon, GlobeIcon, ScrollDownIcon
- Chuẩn bị images: hero slides (4–5 ảnh campus PTIT), faculty icons, partner logos
- Logo PTIT SVG 2 versions: full color + white

---

### PHASE 5: TÍCH HỢP VR TOUR + EXTRAS (2 tasks)

#### Task 5.1 — VR Tour Integration

(Giống task A trong README hiện tại)
1. Copy `vr/vr/*` → `frontend/public/vr-tour/`
2. Tạo VirtualTourPage: `<iframe src="/vr-tour/tour.html" />`
3. Thêm route `/tham-quan` 
4. Thêm vào menu + portal links

#### Task 5.2 — SEO + Meta Tags

- `react-helmet-async` cho dynamic title + description mỗi trang
- Open Graph tags
- `robots.txt` + `sitemap.xml` (tĩnh hoặc generate)
- Favicon PTIT

---

## PHẦN 3: THỨ TỰ THỰC HIỆN (TỔNG KẾT)

```
Phase 0: Setup (2 tasks)                  ← BẮT ĐẦU TỪ ĐÂY
  0.1  CSS Design System Reset
  0.2  Hooks (scroll reveal, count-up, header scroll)

Phase 1: Layout Shell (3 tasks)
  1.1  Header (sticky + sidebar + search overlay)
  1.2  Footer (gradient dark + new layout)
  1.3  Floating Action Buttons

Phase 2: Trang chủ Sections (6 tasks)
  2.1  Hero Section (fullscreen slider)
  2.2  About Section (stats count-up)
  2.3  Faculty Section (marquee + carousel)
  2.4  Admission Section (card carousel)
  2.5  Portal Links + News Events
  2.6  Cooperation + Partners Marquee

Phase 3: Assembly + Các trang (4 tasks)
  3.1  Assemble HomePage
  3.2  News Page redesign
  3.3  Post Detail redesign
  3.4  Other pages restyle

Phase 4: Polish (3 tasks)
  4.1  Mobile responsive
  4.2  Animation & performance
  4.3  SVG icons & image assets

Phase 5: Extras (2 tasks)
  5.1  VR Tour integration
  5.2  SEO + Meta tags
```

**Tổng cộng: 20 tasks, chia thành 6 phases.**

---

## PHẦN 4: PROMPT TEMPLATE CHO AI

Khi bắt đầu mỗi task, gửi prompt sau cho AI:

```
Tôi đang redesign frontend PTIT website (React 19, CSS thuần, BEM naming).
Dự án hiện tại: [đính kèm README.md]

Task [X.Y]: [Tên task]
[Copy nội dung task từ plan trên]

Quy ước:
- CSS thuần, BEM naming, CSS variables từ index.css
- Font: Inter (Google Fonts)
- Tone màu đỏ PTIT: --color-primary: #C41E3A
- Không dùng Tailwind, SCSS, styled-components
- Tách logic → *Utils.js
- Data tĩnh → src/data/
- Responsive: mobile-first approach
- Animation: CSS transitions + Intersection Observer

Hãy implement đầy đủ code cho task này.
```

---

*Document generated: May 2026*
*Reference: TMU.edu.vn design analysis*
