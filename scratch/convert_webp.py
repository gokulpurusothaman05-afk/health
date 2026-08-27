import os
from PIL import Image

def convert_to_webp(src_path, dest_path, max_kb=100):
    img = Image.open(src_path)
    
    # If image is RGBA and converting, keep or convert to RGB
    if img.mode == 'RGBA':
        background = Image.new('RGB', img.size, (255, 255, 255))
        background.paste(img, mask=img.split()[3])
        img = background
    elif img.mode != 'RGB':
        img = img.convert('RGB')
        
    # Resize slightly if too large (e.g., max width 1920)
    w, h = img.size
    if w > 1920:
        new_h = int(h * (1920 / w))
        img = img.resize((1920, new_h), Image.Resampling.LANCZOS)
        
    quality = 85
    while quality > 10:
        img.save(dest_path, 'WEBP', quality=quality, method=6)
        size_kb = os.path.getsize(dest_path) / 1024
        print(f"Quality {quality}: size is {size_kb:.2f} KB")
        if size_kb <= max_kb:
            print(f"SUCCESS: {dest_path} is {size_kb:.2f} KB (under {max_kb} KB target)")
            break
        quality -= 5

if __name__ == '__main__':
    # Convert light_dna_bg.jpg
    if os.path.exists('assets/images/light_dna_bg.jpg'):
        convert_to_webp('assets/images/light_dna_bg.jpg', 'assets/images/light_dna_bg.webp', max_kb=95)
    
    # Convert light_capsule.jpg if present
    if os.path.exists('assets/images/light_capsule.jpg'):
        convert_to_webp('assets/images/light_capsule.jpg', 'assets/images/light_capsule.webp', max_kb=95)
