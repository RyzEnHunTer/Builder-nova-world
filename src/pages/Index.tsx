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
                className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-8 py-4 text-lg"
                onClick={() => bookAppointment(contactInfo.phone)}
              >
                Book Your Appointment
              </Button>
              <Link to="/gallery">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-rose-300 text-rose-600 hover:bg-rose-50 px-8 py-4 text-lg"
                >
                  View Our Gallery
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-8 pt-8">
              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="h-5 w-5 text-rose-500" />
                <span>500+ Happy Clients</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Sparkles className="h-5 w-5 text-rose-500" />
                <span>Professional Services</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-rose-100 text-rose-600 px-4 py-2 mb-6">
              Our Services
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Premium Beauty Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From hair styling to spa treatments, we offer a complete range of
              beauty services to help you look and feel your absolute best.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2"
              >
                <CardContent className="p-8 text-center">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-rose-100 to-pink-100 mb-6 group-hover:from-rose-200 group-hover:to-pink-200 transition-colors">
                    <service.icon className="h-8 w-8 text-rose-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-rose-700">
                <MapPin className="h-5 w-5" />
                <span className="font-medium">Visit Our Parlour</span>
              </div>
              <div className="text-gray-600">
                <p>{contactInfo.address.street}</p>
                <p>
                  {contactInfo.address.city}, {contactInfo.address.state}{" "}
                  {contactInfo.address.zipCode}
                </p>
              </div>

              <div className="flex items-center gap-2 text-rose-700">
                <Phone className="h-5 w-5" />
                <span className="font-medium">Call Us</span>
              </div>
              <div>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-gray-600 hover:text-rose-600 transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </div>

              <div className="flex items-center gap-2 text-rose-700">
                <Mail className="h-5 w-5" />
                <span className="font-medium">Email Us</span>
              </div>
              <div>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-gray-600 hover:text-rose-600 transition-colors"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>

            <div>
              <BusinessHoursDisplay variant="compact" className="h-fit" />
            </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-rose-100 text-rose-600 px-4 py-2 mb-6">
              Google Reviews
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real reviews from our valued customers on Google. See what they're
              saying about their experience at Dream World Beauty Parlour.
            </p>
          </div>

          <GoogleReviews maxReviews={3} />
        </div>
      </section>

      {/* Contact & Location Section */}
      <section className="py-20 bg-gradient-to-br from-rose-900 to-pink-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-white/20 text-white px-4 py-2 mb-6">
                Visit Us
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Look?
              </h2>
              <p className="text-xl text-rose-100 mb-8 leading-relaxed">
                Book your appointment today and experience the Dream World
                difference. We're conveniently located and ready to serve you.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-rose-300 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Location</h3>
                    <p className="text-rose-100">
                      Ramjanki mandir gali, Main Town
                      <br />
                      Ghocho Toli, Simdega, Jharkhand 835223
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-rose-300 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Phone</h3>
                    <p className="text-rose-100">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-rose-300 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Hours</h3>
                    <div className="text-rose-100">
                      <p>Mon - Sat: 9:00 AM - 8:00 PM</p>
                      <p>Sunday: 10:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button
                  className="bg-white text-rose-600 hover:bg-rose-50 px-8 py-3"
                  onClick={() => bookAppointment(contactInfo.phone)}
                >
                  Book Now
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8 py-3"
                >
                  Call Us
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video rounded-2xl bg-white/10 backdrop-blur-sm p-4">
                <div className="h-full w-full rounded-xl bg-white/20 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-white mx-auto mb-4" />
                    <p className="text-white text-lg">
                      Interactive Map Coming Soon
                    </p>
                    <p className="text-rose-200 text-sm">
                      Click to view directions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;