import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Scissors,
  Palette,
  Crown,
  Sparkles,
  Heart,
  Gift,
  Filter,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categories = [
    { name: "All", icon: Heart, count: "150+" },
    { name: "Hair Styling", icon: Scissors, count: "50+" },
    { name: "Makeup", icon: Palette, count: "40+" },
    { name: "Bridal", icon: Crown, count: "30+" },
    { name: "Facial Treatments", icon: Sparkles, count: "25+" },
    { name: "Spa Treatments", icon: Heart, count: "15+" },
  ];

  // Sample gallery images - Replace these URLs with your actual images
  const galleryImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&h=600&fit=crop",
      alt: "Hair styling transformation",
      category: "Hair Styling",
      title: "Elegant Hair Transformation",
      description: "Beautiful layered cut with highlights",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500&h=600&fit=crop",
      alt: "Bridal makeup",
      category: "Bridal",
      title: "Bridal Perfection",
      description: "Complete bridal makeover package",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=500&h=600&fit=crop",
      alt: "Professional makeup",
      category: "Makeup",
      title: "Glamour Makeup",
      description: "Evening look with dramatic eyes",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=500&h=600&fit=crop",
      alt: "Facial treatment",
      category: "Facial Treatments",
      title: "Rejuvenating Facial",
      description: "Deep cleansing and hydrating treatment",
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=500&h=600&fit=crop",
      alt: "Hair coloring",
      category: "Hair Styling",
      title: "Color Transformation",
      description: "Balayage highlights on brunette hair",
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=500&h=600&fit=crop",
      alt: "Wedding makeup",
      category: "Bridal",
      title: "Wedding Day Glow",
      description: "Natural bridal makeup with soft curls",
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=500&h=600&fit=crop",
      alt: "Eye makeup",
      category: "Makeup",
      title: "Smokey Eyes",
      description: "Professional evening makeup",
    },
    {
      id: 8,
      url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=600&fit=crop",
      alt: "Spa treatment",
      category: "Spa Treatments",
      title: "Relaxing Spa Session",
      description: "Peaceful facial and massage treatment",
    },
    {
      id: 9,
      url: "https://images.unsplash.com/photo-1554213352-5ffe6534af08?w=500&h=600&fit=crop",
      alt: "Hair updo",
      category: "Hair Styling",
      title: "Elegant Updo",
      description: "Sophisticated braided updo style",
    },
    // Add more images as needed...
  ];

  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

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

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-rose-600 transition-colors">
                        {image.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
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
                      <p className="text-gray-600 mb-4">{image.description}</p>
                      <Badge className="bg-rose-100 text-rose-600">
                        {image.category}
                      </Badge>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">
                No images found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Instructions Section for Adding Images */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Card className="border-2 border-dashed border-rose-300 bg-rose-50">
            <CardContent className="p-8 text-center">
              <Gift className="h-16 w-16 text-rose-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                How to Add Your Own Images
              </h2>
              <div className="text-left max-w-2xl mx-auto space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    1. Prepare Your Images
                  </h3>
                  <p className="text-gray-600">
                    Add your beauty parlour images to the{" "}
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                      public/images/
                    </code>{" "}
                    folder
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    2. Update the Gallery Array
                  </h3>
                  <p className="text-gray-600">
                    Replace the sample URLs in{" "}
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                      galleryImages
                    </code>{" "}
                    array with your image paths
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    3. Add Categories
                  </h3>
                  <p className="text-gray-600">
                    Categorize each image to match your services (Hair Styling,
                    Makeup, Bridal, etc.)
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <Link to="/contact">
                  <Button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white">
                    Need Help? Contact Us
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
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
