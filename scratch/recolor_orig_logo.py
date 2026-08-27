from PIL import Image
import colorsys

# 1. Load original logo
orig = Image.open('C:/Users/USER/Desktop/new/healthcare/assets/images/logo.webp').convert('RGBA')
width, height = orig.size

# Target theme color: Hue for cyan-blue (around 195 - 205 deg -> 0.54 - 0.57 in colorsys)
# Target hue: 198 / 360 = 0.55
target_hue = 198.0 / 360.0

pixels = orig.load()
for y in range(height):
    for x in range(width):
        r, g, b, a = pixels[x, y]
        if a > 0:
            # Convert RGB to HLS
            r_norm, g_norm, b_norm = r / 255.0, g / 255.0, b / 255.0
            h, l, s = colorsys.rgb_to_hls(r_norm, g_norm, b_norm)
            
            # Shift hue to medical cyan/sky-blue while boosting saturation if needed
            new_h = target_hue
            new_s = min(1.0, max(s, 0.85))
            new_l = l
            
            new_r, new_g, new_b = colorsys.hls_to_rgb(new_h, new_l, new_s)
            pixels[x, y] = (int(new_r * 255), int(new_g * 255), int(new_b * 255), a)

# Save recolored original logo
orig.save('assets/images/logo.webp', 'WEBP', quality=100)
print(f"Original logo graphic preserved and recolored to medical cyan theme (saved to assets/images/logo.webp)")
