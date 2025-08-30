# Background Video Setup for Hero Section

## Video Requirements

The hero section now supports background videos with the following specifications:

### Supported Formats
- **MP4** (recommended for best compatibility)
- **WebM** (for modern browsers)

### Video Specifications
- **Resolution**: 1920x1080 (Full HD) or higher
- **Aspect Ratio**: 16:9 (landscape)
- **Duration**: 10-30 seconds (will loop automatically)
- **File Size**: Keep under 10MB for optimal performance

### Content Suggestions
- Pokémon battle scenes
- Animated Pokéballs floating
- Pokémon running through landscapes
- Abstract Pokémon-themed animations
- Particle effects with Pokémon colors

## File Placement

Place your video files in the `public/` directory:

```
public/
├── pokemon-background.mp4    # Main video file
├── pokemon-background.webm   # WebM version (optional)
└── pokeball-pattern.jpg     # Fallback poster image
```

## Current Implementation

The hero section includes:
- ✅ Background video with autoplay and loop
- ✅ Fallback poster image
- ✅ Semi-transparent overlay for text readability
- ✅ Animated floating Pokéballs overlay
- ✅ Responsive design for all screen sizes
- ✅ Graceful fallback for unsupported browsers

## Customization

### Video Overlay Opacity
To adjust the darkness of the overlay, modify this line in `Hero.tsx`:
```tsx
<div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>
```
Change `bg-black/30` to `bg-black/20` for lighter or `bg-black/40` for darker.

### Floating Pokéballs
The floating Pokéballs are positioned absolutely and can be customized:
- **Speed**: Modify animation duration in `src/index.css`
- **Position**: Adjust `top`, `left`, `right`, `bottom` values
- **Size**: Change `w-` and `h-` classes
- **Opacity**: Modify `opacity-` classes

## Performance Tips

1. **Compress videos** using tools like HandBrake or FFmpeg
2. **Use WebM format** for smaller file sizes
3. **Keep duration short** (10-15 seconds is ideal)
4. **Test on mobile devices** to ensure smooth playback

## Browser Support

- ✅ Chrome/Edge: Full support
- ✅ Firefox: Full support  
- ✅ Safari: Full support (iOS 10+)
- ✅ Mobile browsers: Full support

## Troubleshooting

### Video not playing?
- Check file path in `src/assets/`
- Ensure video format is supported
- Verify file permissions

### Performance issues?
- Reduce video resolution
- Compress video file
- Check file size (keep under 10MB)

### Text not readable?
- Adjust overlay opacity in the CSS
- Increase text shadow
- Modify backdrop blur intensity
