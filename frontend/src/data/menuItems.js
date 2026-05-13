const menuItems = [
  { label: 'Trang chủ', to: '/' },
  {
    label: 'Giới thiệu',
    to: '/gioi-thieu',
    children: [
      { label: 'Giới thiệu chung', to: '/gioi-thieu' },
      { label: 'Sứ mạng - Tầm nhìn - Giá trị cốt lõi', to: '/gioi-thieu#mission' },
      { label: 'Lịch sử phát triển', to: '/gioi-thieu#history' },
      { label: 'Ban Giám đốc', to: '/gioi-thieu#leadership' },
      { label: 'Cơ cấu tổ chức', to: '/gioi-thieu#organization' },
    ],
  },
  {
    label: 'Đào tạo',
    to: '/dao-tao',
    children: [
      { label: 'Đại học chính quy', to: '/dao-tao#dai-hoc' },
      { label: 'Sau đại học', to: '/dao-tao#sau-dai-hoc' },
      { label: 'Liên thông & Văn bằng 2', to: '/dao-tao#lien-thong' },
      { label: 'Chương trình chất lượng cao', to: '/dao-tao#clc' },
      { label: 'Chương trình quốc tế', to: '/dao-tao#quoc-te' },
    ],
  },
  {
    label: 'Tuyển sinh',
    to: '/tuyen-sinh',
    children: [
      { label: 'Thông báo tuyển sinh', to: '/tuyen-sinh' },
      { label: 'Phương thức xét tuyển', to: '/tuyen-sinh#phuong-thuc' },
      { label: 'Điểm chuẩn các năm', to: '/tuyen-sinh#diem-chuan' },
      { label: 'Học phí & Học bổng', to: '/tuyen-sinh#hoc-bong' },
    ],
  },
  {
    label: 'Khoa - Viện',
    to: '/khoa-vien',
    children: [
      { label: 'Khoa Công nghệ Thông tin 1', to: '/khoa-vien/cntt1' },
      { label: 'Khoa Công nghệ Thông tin 2', to: '/khoa-vien/cntt2' },
      { label: 'Khoa Viễn thông 1', to: '/khoa-vien/vt1' },
      { label: 'Khoa Điện tử', to: '/khoa-vien/dt' },
      { label: 'Khoa Đa phương tiện', to: '/khoa-vien/dpt' },
      { label: 'Khoa Kinh tế', to: '/khoa-vien/kt' },
      { label: 'Khoa Khoa học cơ bản', to: '/khoa-vien/khcb' },
      { label: 'Viện Nghiên cứu và Phát triển', to: '/khoa-vien/vien-ncpt' },
      { label: 'Trung tâm Đổi mới sáng tạo', to: '/khoa-vien/tt-dmst' },
    ],
  },
  {
    label: 'Nghiên cứu',
    to: '/nghien-cuu',
    children: [
      { label: 'Hướng nghiên cứu trọng điểm', to: '/nghien-cuu' },
      { label: 'Đề tài & Dự án', to: '/nghien-cuu#de-tai' },
      { label: 'Công bố khoa học', to: '/nghien-cuu#cong-bo' },
      { label: 'Hội thảo - Sự kiện', to: '/nghien-cuu#hoi-thao' },
    ],
  },
  {
    label: 'Tin tức - Sự kiện',
    to: '/tin-tuc',
    children: [
      { label: 'Tin tức chung', to: '/tin-tuc/Tin tức' },
      { label: 'Sự kiện', to: '/tin-tuc/Sự kiện' },
      { label: 'Thông báo', to: '/tin-tuc/Thông báo' },
    ],
  },
  {
    label: 'Hợp tác quốc tế',
    to: '/hop-tac-quoc-te',
    children: [
      { label: 'Đối tác chiến lược', to: '/hop-tac-quoc-te' },
      { label: 'Chương trình trao đổi', to: '/hop-tac-quoc-te#trao-doi' },
      { label: 'Học bổng quốc tế', to: '/hop-tac-quoc-te#hoc-bong' },
    ],
  },
  {
    label: 'Sinh viên',
    to: '/sinh-vien',
    children: [
      { label: 'Hoạt động sinh viên', to: '/sinh-vien' },
      { label: 'Học bổng - Hỗ trợ', to: '/sinh-vien#hoc-bong' },
      { label: 'Cựu sinh viên', to: '/sinh-vien#cuu-sv' },
      { label: 'Đoàn - Hội', to: '/sinh-vien#doan-hoi' },
    ],
  },
  { label: 'Tuyển dụng', to: '/tuyen-dung' },
  { label: 'Liên hệ', to: '/lien-he' },
];

export default menuItems;
