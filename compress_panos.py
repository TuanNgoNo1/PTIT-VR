"""
Script nén ảnh panorama VR Tour để giảm dung lượng deploy.
Chạy: python compress_panos.py

Yêu cầu: pip install Pillow
Input:  vr/vr/panos/ (hoặc frontend/public/vr-tour/panos/)
Output: Ghi đè file gốc (backup trước nếu cần)

Kết quả mong đợi: ~2GB → ~700MB-1GB (giảm 50-65%)
"""

import os
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Cần cài Pillow: pip install Pillow")
    sys.exit(1)

# === CẤU HÌNH ===
PANOS_DIR = Path("frontend/public/vr-tour/panos")  # Đổi nếu cần
JPEG_QUALITY = 65          # 60-70 là sweet spot (gốc thường 85-95)
MAX_DIMENSION = 4096       # Giới hạn kích thước tối đa mỗi tile (pixel)
SKIP_THUMBS = False        # True = bỏ qua file thumb.jpg (giữ nguyên chất lượng)

# Fallback paths
if not PANOS_DIR.exists():
    PANOS_DIR = Path("vr/vr/panos")
if not PANOS_DIR.exists():
    print(f"Không tìm thấy thư mục panos. Thử: {PANOS_DIR}")
    print("Sửa biến PANOS_DIR trong script cho đúng đường dẫn.")
    sys.exit(1)

def get_size_mb(path):
    """Tính tổng dung lượng thư mục (MB)"""
    total = 0
    for f in path.rglob("*"):
        if f.is_file():
            total += f.stat().st_size
    return total / (1024 * 1024)

def compress_image(filepath, quality=JPEG_QUALITY, max_dim=MAX_DIMENSION):
    """Nén 1 file ảnh JPEG/PNG"""
    try:
        img = Image.open(filepath)
        
        # Resize nếu quá lớn
        w, h = img.size
        if max(w, h) > max_dim:
            ratio = max_dim / max(w, h)
            new_size = (int(w * ratio), int(h * ratio))
            img = img.resize(new_size, Image.LANCZOS)
        
        # Convert RGBA → RGB nếu cần (JPEG không hỗ trợ alpha)
        if img.mode in ('RGBA', 'P'):
            img = img.convert('RGB')
        
        # Lưu đè với quality thấp hơn
        img.save(filepath, 'JPEG', quality=quality, optimize=True)
        return True
    except Exception as e:
        # Bỏ qua file lỗi (không phải ảnh, hoặc corrupt)
        return False

def main():
    print(f"📁 Thư mục: {PANOS_DIR.absolute()}")
    print(f"🎯 JPEG Quality: {JPEG_QUALITY}")
    print(f"📐 Max dimension: {MAX_DIMENSION}px")
    print()
    
    # Tính size trước
    size_before = get_size_mb(PANOS_DIR)
    print(f"📊 Dung lượng trước: {size_before:.1f} MB")
    print()
    
    # Tìm tất cả file ảnh
    extensions = {'.jpg', '.jpeg', '.png'}
    files = [f for f in PANOS_DIR.rglob("*") if f.suffix.lower() in extensions]
    
    if SKIP_THUMBS:
        files = [f for f in files if 'thumb' not in f.name.lower()]
    
    total = len(files)
    print(f"🖼️  Tìm thấy {total} file ảnh")
    print(f"⏳ Bắt đầu nén...")
    print()
    
    compressed = 0
    failed = 0
    
    for i, filepath in enumerate(files, 1):
        if i % 100 == 0 or i == total:
            print(f"   [{i}/{total}] {i*100//total}% ...", end='\r')
        
        if compress_image(filepath):
            compressed += 1
        else:
            failed += 1
    
    print()
    print()
    
    # Tính size sau
    size_after = get_size_mb(PANOS_DIR)
    saved = size_before - size_after
    percent = (saved / size_before * 100) if size_before > 0 else 0
    
    print(f"✅ Hoàn tất!")
    print(f"   Đã nén: {compressed} files")
    print(f"   Lỗi/bỏ qua: {failed} files")
    print()
    print(f"📊 Kết quả:")
    print(f"   Trước: {size_before:.1f} MB")
    print(f"   Sau:   {size_after:.1f} MB")
    print(f"   Giảm:  {saved:.1f} MB ({percent:.1f}%)")
    print()
    
    if size_after < 1024:
        print(f"🎉 Dưới 1GB! Có thể deploy all-in-one trên Railway.")
    else:
        print(f"⚠️  Vẫn trên 1GB. Thử giảm JPEG_QUALITY xuống 55-60 hoặc MAX_DIMENSION xuống 2048.")

if __name__ == "__main__":
    main()
