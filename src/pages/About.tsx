import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Users,
  Award,
  Star,
  Scissors,
  Palette,
  Sparkles,
  Crown,
  Gift,
  CheckCircle,
  Clock,
  Shield,
  Smile,
} from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const services = [
    {
      icon: Scissors,
      title: "Hair Services",
      description:
        "Professional cutting, styling, coloring, highlights, lowlights, perms, and treatments",
      features: [
        "Expert stylists",
        "Premium products",
        "Latest techniques",
        "All hair types",
      ],
    },
    {
      icon: Sparkles,
      title: "Facial & Skincare",
      description:
        "Deep cleansing facials, anti-aging treatments, acne treatment, and skincare consultation",
      features: [
        "Custom facials",
        "Organic products",
        "Latest technology",
        "Skin analysis",
      ],
    },
    {
      icon: Palette,
      title: "Makeup Services",
      description:
        "Professional makeup for events, parties, photoshoots, and everyday beauty",
      features: [
        "Certified artists",
        "High-end cosmetics",
        "Custom looks",
        "Touch-up service",
      ],
    },
    {
      icon: Crown,
      title: "Bridal Packages",
      description:
        "Complete bridal makeover including hair, makeup, skincare, and nail services",
      features: [
        "Trial sessions",
        "On-location service",
        "Photography ready",
        "Full day package",
      ],
    },
    {
      icon: Heart,
      title: "Spa & Wellness",
      description:
        "Relaxing massages, body treatments, aromatherapy, and wellness consultation",
      features: [
        "Licensed therapists",
        "Natural products",
        "Stress relief",
        "Holistic approach",
      ],
    },
    {
      icon: Gift,
      title: "Special Packages",
      description:
        "Birthday packages, anniversary specials, mother-daughter packages, and gift certificates",
      features: [
        "Custom packages",
        "Group discounts",
        "Gift wrapping",
        "Flexible scheduling",
      ],
    },
  ];

  const team = [
    {
      name: "Maria Rodriguez",
      role: "Founder & Senior Stylist",
      experience: "12+ years",
      specialties: [
        "Hair Cutting & Styling",
        "Color Specialist",
        "Bridal Hair",
      ],
      description:
        "Maria founded Dream World with a vision to create a space where beauty meets artistry.",
    },
    {
      name: "Sarah Chen",
      role: "Senior Makeup Artist",
      experience: "8+ years",
      specialties: ["Bridal Makeup", "Special Effects", "Photography Makeup"],
      description:
        "Sarah brings creativity and precision to every makeup application.",
    },
    {
      name: "Emma Thompson",
      role: "Esthetician & Spa Therapist",
      experience: "10+ years",
      specialties: ["Facial Treatments", "Skincare", "Massage Therapy"],
      description:
        "Emma specializes in rejuvenating treatments and holistic wellness.",
    },
    {
      name: "Lisa Kumar",
      role: "Hair Color Specialist",
      experience: "6+ years",
      specialties: ["Color Correction", "Highlights", "Balayage"],
      description:
        "Lisa is our expert in creating stunning color transformations.",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description:
        "Your satisfaction and comfort are our top priorities in everything we do.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We strive for perfection in every service and continuously improve our skills.",
    },
    {
      icon: Shield,
      title: "Safety & Hygiene",
      description:
        "We maintain the highest standards of cleanliness and safety protocols.",
    },
    {
      icon: Smile,
      title: "Positive Experience",
      description:
        "We create a welcoming, relaxing environment where you feel pampered and valued.",
    },
  ];

  const achievements = [
    { number: "500+", label: "Happy Clients" },
    { number: "5+", label: "Years Excellence" },
    { number: "15+", label: "Services Offered" },
    { number: "4.9/5", label: "Client Rating" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-2 text-sm mb-6">
              About Dream World Beauty Parlour
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Where Beauty Dreams{" "}
              <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                Come True
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Founded with a passion for beauty and excellence, Dream World
              Beauty Parlour has been transforming lives and boosting confidence
              through our premium beauty services and personalized care for over
              5 years.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-rose-600 mb-2">
                  {achievement.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-rose-100 text-rose-600 px-4 py-2 mb-6">
                Our Story
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                A Journey of Beauty & Excellence
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  Dream World Beauty Parlour was born from a simple yet powerful
                  vision: to create a space where every person can discover and
                  enhance their natural beauty while feeling completely
                  comfortable and pampered.
                </p>
                <p>
                  Founded by Maria Rodriguez in 2019, our parlour started as a
                  small boutique salon with just two chairs and a big dream.
                  Today, we've grown into a full-service beauty destination
                  while maintaining the intimate, personal touch that our
                  clients love.
                </p>
                <p>
                  We believe that beauty is not just about looking good – it's
                  about feeling confident, radiant, and truly yourself. Our team
                  of experienced professionals is dedicated to understanding
                  your unique needs and creating looks that reflect your
                  personality and lifestyle.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-rose-200 to-pink-200 p-8">
                <div className="h-full w-full rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center">
                    <Users className="h-24 w-24 text-rose-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Our Mission
                    </h3>
                    <p className="text-gray-600 px-4">
                      To enhance natural beauty and boost confidence through
                      exceptional service and expertise
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-rose-100 text-rose-600 px-4 py-2 mb-6">
              Our Services
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Beauty Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From head to toe, we offer a complete range of beauty services
              using the latest techniques and premium products to ensure
              exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
              >
                <CardContent className="p-8">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-rose-100 to-pink-100 mb-6 group-hover:from-rose-200 group-hover:to-pink-200 transition-colors">
                    <service.icon className="h-8 w-8 text-rose-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-rose-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-rose-100 text-rose-600 px-4 py-2 mb-6">
              Our Team
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Expert Professionals
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our talented team of certified beauty professionals brings years
              of experience, continuous training, and genuine passion for making
              you look and feel amazing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-8">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-rose-200 to-pink-200 mx-auto mb-6 flex items-center justify-center">
                    <Users className="h-12 w-12 text-rose-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-rose-600 font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    {member.experience}
                  </p>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {member.description}
                  </p>
                  <div className="space-y-1">
                    {member.specialties.map((specialty, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="text-xs mr-1 mb-1"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-rose-900 to-pink-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-white/20 text-white px-4 py-2 mb-6">
              Our Values
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What We Stand For
            </h2>
            <p className="text-xl text-rose-100 max-w-3xl mx-auto">
              Our core values guide everything we do, from the way we treat our
              clients to the quality of services we provide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/20 mb-6">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-rose-100 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="h-16 w-16 text-rose-500 mx-auto mb-8" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Experience the Dream World Difference?
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Join hundreds of satisfied clients who trust us with their beauty
            needs. Book your appointment today and discover why we're the top
            choice for beauty services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-8 py-4 text-lg"
              >
                Book Your Appointment
              </Button>
            </Link>
            <Link to="/gallery">
              <Button
                variant="outline"
                size="lg"
                className="border-rose-300 text-rose-600 hover:bg-rose-50 px-8 py-4 text-lg"
              >
                View Our Work
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
