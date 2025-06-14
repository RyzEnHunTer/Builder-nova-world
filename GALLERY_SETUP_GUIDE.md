# 📸 Dream World Beauty Parlour - Gallery Setup Guide

## How to Add Your Custom Images

### Step 1: Organize Your Photos

Create these folders in your `public/images/` directory:

```
public/images/
├── hair-styling/
├── makeup/
├── bridal/
├── facial/
└── spa/
```

### Step 2: Prepare Your Images

**Recommended Image Specifications:**

- **Format**: JPG or PNG
- **Size**: 800x600px or larger (will be automatically resized)
- **Quality**: High resolution for professional appearance
- **File Names**: Use descriptive names with hyphens (no spaces)

**Good file names examples:**

- `long-layers-cut.jpg`
- `evening-glamour-makeup.jpg`
- `traditional-bridal-look.jpg`
- `deep-cleansing-facial.jpg`
- `relaxing-massage.jpg`

### Step 3: Add Images to Folders

Place your photos in the appropriate category folders:

**Hair Styling Photos** → `public/images/hair-styling/`

- Hair cuts, styling, coloring, treatments
- Before/after transformations
- Different hair lengths and styles

**Makeup Photos** → `public/images/makeup/`

- Day makeup, evening looks
- Special occasion makeup
- Before/after makeup transformations

**Bridal Photos** → `public/images/bridal/`

- Wedding makeup and hair
- Engagement looks
- Pre-wedding photoshoot styles

**Facial Treatment Photos** → `public/images/facial/`

- Facial treatments in progress
- Before/after skin improvements
- Different facial services

**Spa Treatment Photos** → `public/images/spa/`

- Massage treatments
- Relaxation and wellness services
- Spa environment photos

### Step 4: Update the Gallery Code

In `src/pages/Gallery.tsx`, replace the sample image URLs with your actual image names:

```javascript
// Example: Replace this...
{
  id: 1,
  url: "/images/hair-styling/long-layers-cut.jpg", // ← Change this to your image name
  alt: "Long layered haircut transformation",
  category: "Hair Styling",
  title: "Long Layered Cut", // ��� Update with your title
  description: "Beautiful long layers with face-framing highlights", // ← Your description
},

// With your actual image...
{
  id: 1,
  url: "/images/hair-styling/my-haircut-photo.jpg", // ← Your actual image name
  alt: "Client haircut transformation",
  category: "Hair Styling",
  title: "Stylish Layered Cut",
  description: "Modern layered cut with subtle highlights",
},
```

### Step 5: Adding New Images

To add a new image, copy this template and fill in your details:

```javascript
{
  id: 21, // Next available ID number
  url: "/images/category-name/your-image-name.jpg",
  alt: "Description for accessibility",
  category: "Hair Styling", // Must be exact: "Hair Styling", "Makeup", "Bridal", "Facial Treatments", or "Spa Treatments"
  title: "Your Image Title",
  description: "Brief description of the service shown",
},
```

### Categories Available:

- `"Hair Styling"` - Hair cuts, coloring, styling
- `"Makeup"` - All makeup services
- `"Bridal"` - Wedding and engagement looks
- `"Facial Treatments"` - Skincare and facial services
- `"Spa Treatments"` - Massage and wellness services

### Quick Checklist:

- [ ] Photos are high quality and professional
- [ ] Images are named clearly with hyphens
- [ ] Photos are placed in correct category folders
- [ ] Gallery array is updated with correct file names
- [ ] All required fields are filled (id, url, alt, category, title, description)
- [ ] Category names match exactly
- [ ] Each image has a unique ID number

### Example Complete Setup:

**File Structure:**

```
public/images/
├── hair-styling/
│   ├── bob-cut-before-after.jpg
│   ├── blonde-highlights.jpg
│   └── curly-hair-treatment.jpg
├── makeup/
│   ├── wedding-makeup-look.jpg
│   └── evening-party-makeup.jpg
└── bridal/
    ├── traditional-bride.jpg
    └── modern-bridal-look.jpg
```

**Gallery Code:**

```javascript
const galleryImages = [
  {
    id: 1,
    url: "/images/hair-styling/bob-cut-before-after.jpg",
    alt: "Bob haircut transformation",
    category: "Hair Styling",
    title: "Stylish Bob Transformation",
    description: "Modern bob cut with beautiful styling",
  },
  {
    id: 2,
    url: "/images/makeup/wedding-makeup-look.jpg",
    alt: "Wedding makeup application",
    category: "Makeup",
    title: "Elegant Wedding Makeup",
    description: "Bridal makeup with natural glow",
  },
  // Add more images...
];
```

### Need Help?

If you need assistance adding your images, contact us through the website or refer to this guide. The gallery will automatically handle filtering, responsive display, and lightbox functionality once your images are properly added.
