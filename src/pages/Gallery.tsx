import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Camera,
  Image,
  Star,
  Heart,
  Scissors,
  Palette,
  Crown,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const Gallery = () => {
  const categories = [
    { name: "Hair Styling", icon: Scissors, count: "50+" },
    { name: "Makeup", icon: Palette, count: "40+" },
    { name: "Bridal", icon: Crown, count: "30+" },
    { name: "Facial Treatments", icon: Sparkles, count: "25+" },
  ];

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

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="px-4 py-2 text-sm border-rose-300 text-rose-600 hover:bg-rose-50"
                >
                  <category.icon className="h-4 w-4 mr-2" />
                  {category.name} ({category.count})
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Card className="border-0 shadow-2xl">
            <CardContent className="p-16">
              <Camera className="h-24 w-24 text-rose-300 mx-auto mb-8" />

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Gallery Coming Soon
              </h2>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We're currently curating our most stunning work to showcase in
                this gallery. From breathtaking bridal transformations to
                everyday beauty makeovers, you'll soon be able to browse through
                hundreds of before-and-after photos.
              </p>

              <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-8 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  What to Expect:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-rose-500 flex-shrink-0" />
                    <span className="text-gray-700">
                      High-quality before & after photos
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Heart className="h-5 w-5 text-rose-500 flex-shrink-0" />
                    <span className="text-gray-700">
                      Client transformation stories
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Image className="h-5 w-5 text-rose-500 flex-shrink-0" />
                    <span className="text-gray-700">
                      Service category filters
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Sparkles className="h-5 w-5 text-rose-500 flex-shrink-0" />
                    <span className="text-gray-700">
                      Behind-the-scenes content
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-8 py-4"
                  >
                    Book Consultation
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-rose-300 text-rose-600 hover:bg-rose-50 px-8 py-4"
                  >
                    Learn About Our Services
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Temporary Preview Section */}
      <section className="py-20 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Preview: Our Work Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Here's a sneak peek of the different types of transformations
              you'll see in our full gallery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2"
              >
                <CardContent className="p-8 text-center">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-rose-100 to-pink-100 mb-6 group-hover:from-rose-200 group-hover:to-pink-200 transition-colors">
                    <category.icon className="h-10 w-10 text-rose-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {category.name}
                  </h3>
                  <p className="text-3xl font-bold text-rose-600 mb-2">
                    {category.count}
                  </p>
                  <p className="text-gray-600">Photos coming soon</p>
                </CardContent>
              </Card>
            ))}
          </div>
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
            Don't wait for the gallery – experience the transformation yourself!
            Book your appointment today and become part of our collection of
            beautiful success stories.
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
              Call Now: (555) 123-4567
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
