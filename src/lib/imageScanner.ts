// Dynamic Image Scanner for Gallery
// This utility automatically detects images in folders and generates gallery data

export interface GalleryImage {
  id: number;
  url: string;
  alt: string;
  category: string;
  title: string;
  description: string;
  filename: string;
}

export interface CategoryConfig {
  name: string;
  folder: string;
  defaultDescription: string;
}

// Category configuration
export const categoryConfigs: CategoryConfig[] = [
  {
    name: "Hair Styling",
    folder: "hair-styling",
    defaultDescription: "Professional hair styling and transformation",
  },
  {
    name: "Makeup",
    folder: "makeup",
    defaultDescription: "Expert makeup application and beauty enhancement",
  },
  {
    name: "Bridal",
    folder: "bridal",
    defaultDescription: "Beautiful bridal makeup and styling",
  },
  {
    name: "Facial Treatments",
    folder: "facial",
    defaultDescription: "Rejuvenating facial and skincare treatments",
  },
  {
    name: "Spa Treatments",
    folder: "spa",
    defaultDescription: "Relaxing spa and wellness treatments",
  },
];

// Function to convert filename to title
export const filenameToTitle = (filename: string): string => {
  return filename
    .replace(/\.[^/.]+$/, "") // Remove file extension
    .replace(/[-_]/g, " ") // Replace hyphens and underscores with spaces
    .replace(/\b\w/g, (l) => l.toUpperCase()); // Capitalize first letter of each word
};

// Function to detect if running in browser or build environment
export const isClient = typeof window !== "undefined";

// Mock image detection for development (when images are manually added)
// In production, this would scan the actual folder structure
export const generateGalleryFromFolders = async (): Promise<GalleryImage[]> => {
  const allImages: GalleryImage[] = [];
  let imageId = 1;

  // For each category, we'll check for common image files
  for (const category of categoryConfigs) {
    const commonImageNames = [
      "image-1.jpg",
      "image-2.jpg",
      "image-3.jpg",
      "image-4.jpg",
      "image-5.jpg",
      "photo-1.jpg",
      "photo-2.jpg",
      "photo-3.jpg",
      "before-after-1.jpg",
      "before-after-2.jpg",
      "transformation-1.jpg",
      "transformation-2.jpg",
      "style-1.jpg",
      "style-2.jpg",
      "style-3.jpg",
      "look-1.jpg",
      "look-2.jpg",
      "look-3.jpg",
    ];

    for (const imageName of commonImageNames) {
      const imageUrl = `/images/${category.folder}/${imageName}`;

      // In a real implementation, you'd check if the file exists
      // For now, we'll create placeholder data that you can replace

      allImages.push({
        id: imageId++,
        url: imageUrl,
        alt: `${category.name} - ${filenameToTitle(imageName)}`,
        category: category.name,
        title: filenameToTitle(imageName),
        description: category.defaultDescription,
        filename: imageName,
      });
    }
  }

  return allImages;
};

// Simple image existence checker (for client-side)
export const checkImageExists = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
};

// Filter out non-existent images (for client-side)
export const filterExistingImages = async (
  images: GalleryImage[],
): Promise<GalleryImage[]> => {
  if (!isClient) return images;

  const existingImages: GalleryImage[] = [];

  for (const image of images) {
    const exists = await checkImageExists(image.url);
    if (exists) {
      existingImages.push(image);
    }
  }

  return existingImages;
};

// Get images for a specific category
export const getImagesByCategory = (
  images: GalleryImage[],
  category: string,
): GalleryImage[] => {
  if (category === "All") return images;
  return images.filter((img) => img.category === category);
};

// Get category counts
export const getCategoryCounts = (images: GalleryImage[]) => {
  const counts: Record<string, number> = { All: images.length };

  categoryConfigs.forEach((config) => {
    counts[config.name] = images.filter(
      (img) => img.category === config.name,
    ).length;
  });

  return counts;
};
