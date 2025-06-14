import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GalleryManager from "@/components/ui/gallery-manager";
import {
  Scissors,
  Palette,
  Crown,
  Sparkles,
  Heart,
  Settings,
  Eye,
  Upload,
  FolderOpen,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  GalleryImage,
  categoryConfigs,
  generateGalleryFromFolders,
  getImagesByCategory,
  getCategoryCounts,
} from "@/lib/imageScanner";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  // Load gallery images on component mount
  useEffect(() => {
    const loadGalleryImages = async () => {
      try {
        // For demo purposes, we'll start with some sample images
        // In production, this would scan your actual image folders
        const initialImages: GalleryImage[] = [
          {
            id: 1,
            url: "/images/hair-styling/sample-haircut.jpg",
            alt: "Professional haircut transformation",
            category: "Hair Styling",
            title: "Modern Layered Cut",
            description: "Beautiful layered haircut with professional styling",
            filename: "sample-haircut.jpg",
          },
          {
            id: 2,
            url: "/images/makeup/sample-makeup.jpg",
            alt: "Glamour makeup application",
            category: "Makeup",
            title: "Evening Glamour Look",
            description: "Sophisticated evening makeup with smokey eyes",
            filename: "sample-makeup.jpg",
          },
          {
            id: 3,
            url: "/images/bridal/sample-bridal.jpg",
            alt: "Bridal makeup and hair styling",
            category: "Bridal",
            title: "Traditional Bridal Look",
            description: "Complete bridal makeover with traditional elements",
            filename: "sample-bridal.jpg",
          },
        ];

        setGalleryImages(initialImages);
        setLoading(false);
      } catch (error) {
        console.error("Error loading gallery images:", error);
        setLoading(false);
      }
    };

    loadGalleryImages();
  }, []);

  const categories = [
    { name: "All", icon: Heart, count: galleryImages.length },
    ...categoryConfigs.map((config) => ({
      name: config.name,
      icon:
        config.name === "Hair Styling"
          ? Scissors
          : config.name === "Makeup"
            ? Palette
            : config.name === "Bridal"
              ? Crown
              : config.name === "Facial Treatments"
                ? Sparkles
                : Heart,
      count: galleryImages.filter((img) => img.category === config.name).length,
    })),
  ];

  const filteredImages = getImagesByCategory(galleryImages, selectedCategory);

  const handleImagesUpdate = (updatedImages: GalleryImage[]) => {
    setGalleryImages(updatedImages);
    // In a real app, you'd also save this to a database or local storage
    localStorage.setItem(
      "dreamworld-gallery-images",
      JSON.stringify(updatedImages),
    );
  };

  // Load saved images from localStorage on mount
  useEffect(() => {
    const savedImages = localStorage.getItem("dreamworld-gallery-images");
    if (savedImages) {
      try {
        const parsedImages = JSON.parse(savedImages);
        setGalleryImages(parsedImages);
      } catch (error) {
        console.error("Error parsing saved images:", error);
      }
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FolderOpen className="h-16 w-16 text-rose-400 mx-auto mb-4 animate-pulse" />
          <p className="text-lg text-gray-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-2 text-sm mb-6">
              Our Gallery
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Beauty{" "}
              <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                Transformations
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Discover the artistry and excellence that defines Dream World
              Beauty Parlour. Browse through our collection of stunning
              transformations and see the magic we create every day.
            </p>
          </div>
        </div>
      </section>

      {/* Main Gallery Content */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="gallery" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="gallery" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                View Gallery
              </TabsTrigger>
              <TabsTrigger value="manage" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Manage Images
              </TabsTrigger>
            </TabsList>

            {/* Gallery View Tab */}
            <TabsContent value="gallery" className="space-y-8">
              {/* Filter Section */}
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category, index) => (
                  <Button
                    key={index}
                    variant={
                      selectedCategory === category.name ? "default" : "outline"
                    }
                    onClick={() => setSelectedCategory(category.name)}
                    className={`px-6 py-2 ${
                      selectedCategory === category.name
                        ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white"
                        : "border-rose-300 text-rose-600 hover:bg-rose-50"
                    }`}
                  >
                    <category.icon className="h-4 w-4 mr-2" />
                    {category.name} ({category.count})
                  </Button>
                ))}
              </div>

              {/* Gallery Grid */}
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 py-12 rounded-2xl">
                {filteredImages.length === 0 ? (
                  <div className="text-center py-20">
                    <Upload className="h-16 w-16 text-rose-300 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      No Images in {selectedCategory}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Add your first {selectedCategory.toLowerCase()} images
                      using the Manage Images tab above.
                    </p>
                    <Button
                      onClick={() => {
                        const manageTab = document.querySelector(
                          '[value="manage"]',
                        ) as HTMLElement;
                        manageTab?.click();
                      }}
                      className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Add Images Now
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6">
                    {filteredImages.map((image) => (
                      <Dialog key={image.id}>
                        <DialogTrigger asChild>
                          <Card className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                            <div className="aspect-square overflow-hidden">
                              <img
                                src={image.url}
                                alt={image.alt}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                loading="lazy"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f3f4f6'/%3E%3Ctext x='200' y='200' text-anchor='middle' dy='.3em' fill='%236b7280' font-size='16'%3EImage Not Found%3C/text%3E%3C/svg%3E";
                                }}
                              />
                            </div>
                            <CardContent className="p-4">
                              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-rose-600 transition-colors">
                                {image.title}
                              </h3>
                              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                {image.description}
                              </p>
                              <Badge variant="secondary" className="text-xs">
                                {image.category}
                              </Badge>
                            </CardContent>
                          </Card>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
                          <DialogTitle className="sr-only">
                            {image.title} - {image.category} Gallery Image
                          </DialogTitle>
                          <div className="relative">
                            <img
                              src={image.url}
                              alt={image.alt}
                              className="w-full h-auto max-h-[80vh] object-contain"
                            />
                            <div className="p-6">
                              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                {image.title}
                              </h2>
                              <p className="text-gray-600 mb-4">
                                {image.description}
                              </p>
                              <Badge className="bg-rose-100 text-rose-600">
                                {image.category}
                              </Badge>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Gallery Management Tab */}
            <TabsContent value="manage">
              <GalleryManager
                images={galleryImages}
                onImagesUpdate={handleImagesUpdate}
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-rose-900 to-pink-800 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="h-16 w-16 text-white mx-auto mb-8" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Be Our Next Success Story?
          </h2>
          <p className="text-xl text-rose-100 mb-8 leading-relaxed">
            Book your appointment today and become part of our beautiful
            gallery!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-white text-rose-600 hover:bg-rose-50 px-8 py-4 text-lg"
              >
                Book Your Transformation
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg"
            >
              Call Now: +1 (555) 123-4567
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
