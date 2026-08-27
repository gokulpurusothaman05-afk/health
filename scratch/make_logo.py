import math
from PIL import Image, ImageDraw, ImageFilter

def create_stackly_logo():
    size = 512
    # Create RGBA image with transparent background
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    center_x = size / 2
    center_y = size / 2
    
    # 1. Soft glowing background rounded capsule (Cyan gradient tone)
    glow_layer = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_layer)
    glow_box = [32, 32, size - 32, size - 32]
    glow_draw.rounded_rectangle(glow_box, radius=110, fill=(2, 132, 199, 28), outline=(14, 165, 233, 120), width=6)
    
    # 2. Dynamic DNA Helix Curves & Nodes
    dna_layer = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    dna_draw = ImageDraw.Draw(dna_layer)
    
    points_a = []
    points_b = []
    
    steps = 120
    amplitude = 115
    height_span = 320
    start_y = (size - height_span) / 2
    
    for i in range(steps + 1):
        t = i / steps
        y = start_y + t * height_span
        # 1.5 cycles
        angle = t * math.pi * 3.0 - math.pi / 2
        x1 = center_x + math.sin(angle) * amplitude
        x2 = center_x - math.sin(angle) * amplitude
        points_a.append((x1, y))
        points_b.append((x2, y))
    
    # Draw Cross Bars (Base Pairs)
    bar_indices = [15, 35, 55, 65, 85, 105]
    for idx in bar_indices:
        p1 = points_a[idx]
        p2 = points_b[idx]
        t = idx / steps
        
        # Color gradient transition from #0284c7 (2, 132, 199) to #00f0ff (0, 240, 255) and #10b981 (16, 185, 129)
        r = int(2 + (16 - 2) * t)
        g = int(132 + (185 - 132) * t)
        b = int(199 + (129 - 199) * t)
        
        dna_draw.line([p1, p2], fill=(r, g, b, 200), width=10)
        
        # Draw connector glowing beads
        dna_draw.ellipse([p1[0]-7, p1[1]-7, p1[0]+7, p1[1]+7], fill=(0, 240, 255, 255))
        dna_draw.ellipse([p2[0]-7, p2[1]-7, p2[0]+7, p2[1]+7], fill=(16, 185, 129, 255))
    
    # Draw Primary Strand A (Cyan / Sky Blue)
    for i in range(len(points_a) - 1):
        t = i / len(points_a)
        # Deep Sky Blue to Electric Cyan
        r = int(2 + (14 - 2) * t)
        g = int(132 + (165 - 132) * t)
        b = int(199 + (233 - 199) * t)
        dna_draw.line([points_a[i], points_a[i+1]], fill=(r, g, b, 245), width=18)
        
    # Draw Secondary Strand B (Teal / Emerald)
    for i in range(len(points_b) - 1):
        t = i / len(points_b)
        r = int(14 + (16 - 14) * t)
        g = int(165 + (185 - 165) * t)
        b = int(233 + (129 - 233) * t)
        dna_draw.line([points_b[i], points_b[i+1]], fill=(r, g, b, 220), width=18)

    # Core Center Node (Glowing Medical Orb)
    dna_draw.ellipse([center_x - 30, center_y - 30, center_x + 30, center_y + 30], fill=(255, 255, 255, 255), outline=(2, 132, 199, 255), width=6)
    dna_draw.ellipse([center_x - 14, center_y - 14, center_x + 14, center_y + 14], fill=(0, 240, 255, 255))

    # Compose layers
    final_img = Image.alpha_composite(glow_layer, dna_layer)
    
    # Save as high quality WebP
    final_img.save('assets/images/logo.webp', 'WEBP', quality=100)
    print("Stackly logo successfully generated and saved to assets/images/logo.webp")

if __name__ == '__main__':
    create_stackly_logo()
