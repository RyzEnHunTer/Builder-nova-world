import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import GoogleReviews from "@/components/ui/google-reviews";
import BusinessHoursDisplay from "@/components/ui/business-hours";
import {
  Sparkles,
  Star,
  MapPin,
  Phone,
  Clock,
  Users,
  Heart,
  Scissors,
  Palette,
  Gift,
  Crown,
  CheckCircle,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useContactInfo } from "@/contexts/ContactInfoContext";
import { useWhatsAppBooking } from "@/lib/whatsapp";

const Index = () => {
  const { contactInfo } = useContactInfo();
  const { bookAppointment } = useWhatsAppBooking();

  const services = [
    {
      icon: Scissors,
      title: "Hair Styling & Cuts",
      description:
        "Professional hair cuts, styling, coloring, and treatments for all hair types.",
    },
    {
      icon: Sparkles,
      title: "Facial Treatments",
      description:
        "Rejuvenating facials, anti-aging treatments, and skincare consultations.",
    },
    {
      icon: Palette,
      title: "Makeup & Beauty",
      description:
        "Professional makeup for special occasions, events, and everyday beauty.",
    },
    {
      icon: Crown,
      title: "Bridal Packages",
      description: "Complete bridal makeover packages for your special day.",
    },
    {
      icon: Heart,
      title: "Spa Treatments",
      description:
        "Relaxing massages, body treatments, and wellness therapies.",
    },
    {
      icon: Gift,
      title: "Special Packages",
      description:
        "Customized beauty packages for birthdays, anniversaries, and celebrations.",
    },
  ];

  const whyChooseUs = [
    "Experienced & certified professionals",
    "Premium quality products & equipment",
    "Personalized service for every client",
    "Clean & hygienic environment",
    "Affordable pricing with no hidden costs",
    "Flexible appointment scheduling",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-400/20 to-pink-400/20" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <Badge className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-2 text-sm">
              ✨ Your Beauty Dreams Come True
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                Dream World
              </span>
              <br />
              Beauty Parlour
            </h1>

            <p className="mx-auto max-w-3xl text-xl text-gray-600 leading-relaxed">
              Experience premium beauty services in a luxurious, relaxing
              environment. Our expert team is dedicated to enhancing your
              natural beauty and making you feel confident and radiant.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={() => bookAppointment("homepage_hero")}
                className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Book Your Appointment
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-2 border-rose-300 text-rose-600 hover:bg-rose-50 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
              >
                <Link to="/gallery">View Our Gallery</Link>
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span>4.8+ Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-rose-500" />
                <span>500+ Happy Clients</span>
              </div>
              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-purple-500" />
                <span>Premium Services</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-rose-100 text-rose-700 px-4 py-2">
              Our Services
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Transform Your Beauty
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Discover our comprehensive range of beauty and wellness services
              designed to help you look and feel your absolute best.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:scale-105"
              >
                <CardContent className="p-8 text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full flex items-center justify-center group-hover:from-rose-200 group-hover:to-pink-200 transition-colors">
                    <service.icon className="h-8 w-8 text-rose-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={() => bookAppointment("services_section")}
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Book Your Service Today
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2">
              Why Choose Us
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Your Beauty, Our Passion
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              We're committed to providing exceptional beauty services with a
              personal touch that makes every visit special.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((reason, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <span className="text-gray-700 font-medium">{reason}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-rose-100 text-rose-700 px-4 py-2">
              Customer Reviews
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              What Our Clients Say
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Read real reviews from our satisfied customers who trust us with
              their beauty needs.
            </p>
          </div>

          <GoogleReviews maxReviews={6} showRefreshButton={false} />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2">
              Get In Touch
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Visit Us Today
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Ready to transform your look? Contact us today to schedule your
              appointment at Dream World Beauty Parlour.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Visit Our Parlour
                    </h3>
                    <p className="text-gray-600">
                      {contactInfo.address.street}
                      <br />
                      {contactInfo.address.city}, {contactInfo.address.state}{" "}
                      {contactInfo.address.zipCode}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Call Us
                    </h3>
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="text-gray-600 hover:text-rose-600 transition-colors"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Email Us
                    </h3>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-gray-600 hover:text-rose-600 transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => bookAppointment("contact_section")}
                  className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Book Appointment via WhatsApp
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="border-2 border-rose-300 text-rose-600 hover:bg-rose-50 px-6 py-3 text-lg font-semibold rounded-full transition-all duration-300"
                >
                  <Link to="/contact">More Contact Options</Link>
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <BusinessHoursDisplay variant="full" showSync={false} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
