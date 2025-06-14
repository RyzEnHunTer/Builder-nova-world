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

  // Custom gallery images - Add your beauty parlour photos here
  const galleryImages = [
    // Hair Styling Images
    {
      id: 1,
      url: "/images/hair-styling/hair-cut-1.jpg", // Replace with your image filename
      alt: "Hair styling transformation",
      category: "Hair Styling",
      title: "Elegant Hair Transformation",
      description: "Beautiful layered cut with highlights",
    },
    {
      id: 2,
      url: "/images/hair-styling/hair-color-1.jpg", // Replace with your image filename
      alt: "Hair coloring service",
      category: "Hair Styling",
      title: "Color Transformation",
      description: "Professional hair coloring service",
    },

    // Makeup Images
    {
      id: 3,
      url: "/images/makeup/makeup-1.jpg", // Replace with your image filename
      alt: "Professional makeup",
      category: "Makeup",
      title: "Glamour Makeup",
      description: "Evening look with dramatic eyes",
    },
    {
      id: 4,
      url: "/images/makeup/makeup-2.jpg", // Replace with your image filename
      alt: "Party makeup",
      category: "Makeup",
      title: "Party Perfect",
      description: "Stunning party makeup look",
    },

    // Bridal Images
    {
      id: 5,
      url: "/images/bridal/bridal-1.jpg", // Replace with your image filename
      alt: "Bridal makeup",
      category: "Bridal",
      title: "Bridal Perfection",
      description: "Complete bridal makeover package",
    },
    {
      id: 6,
      url: "/images/bridal/bridal-2.jpg", // Replace with your image filename
      alt: "Wedding makeup",
      category: "Bridal",
      title: "Wedding Day Glow",
      description: "Natural bridal makeup with soft curls",
    },

    // Facial Treatment Images
    {
      id: 7,
      url: "/images/facial/facial-1.jpg", // Replace with your image filename
      alt: "Facial treatment",
      category: "Facial Treatments",
      title: "Rejuvenating Facial",
      description: "Deep cleansing and hydrating treatment",
    },
    {
      id: 8,
      url: "/images/facial/facial-2.jpg", // Replace with your image filename
      alt: "Skincare treatment",
      category: "Facial Treatments",
      title: "Glowing Skin Treatment",
      description: "Advanced skincare therapy",
    },

    // Spa Treatment Images
    {
      id: 9,
      url: "/images/spa/spa-1.jpg", // Replace with your image filename
      alt: "Spa treatment",
      category: "Spa Treatments",
      title: "Relaxing Spa Session",
      description: "Peaceful facial and massage treatment",
    },
    {
      id: 10,
      url: "/images/spa/spa-2.jpg", // Replace with your image filename
      alt: "Massage therapy",
      category: "Spa Treatments",
      title: "Therapeutic Massage",
      description: "Stress relief and relaxation",
    },

    // Add more of your custom images here...
    // Template for adding new images:
    // {
    //   id: 11, // Next available ID
    //   url: "/images/category/your-image-name.jpg",
    //   alt: "Description for accessibility",
    //   category: "Hair Styling", // Must match existing categories
    //   title: "Your Image Title",
    //   description: "Brief description of the service shown",
    // },
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
