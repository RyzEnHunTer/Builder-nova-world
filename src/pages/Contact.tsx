import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Calendar,
  Star,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import { useContactInfo } from "@/contexts/ContactInfoContext";
import { useWhatsAppBooking, WhatsAppMessages } from "@/lib/whatsapp";

const Contact = () => {
  const { contactInfo: businessInfo } = useContactInfo();
  const { bookAppointment } = useWhatsAppBooking();

  const contactInfo = [
    {
      icon: MapPin,
      title: "Location",
      details: [
        "Ramjanki mandir gali, Main Town",
        "Ghocho Toli, Simdega, Jharkhand 835223",
      ],
      action: "Get Directions",
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (555) 123-4567"],
      action: "Call Now",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["hello@dreamworldbeauty.com"],
      action: "Send Email",
    },
    {
      icon: Clock,
      title: "Hours",
      details: ["Mon - Sat: 9:00 AM - 8:00 PM", "Sunday: 10:00 AM - 6:00 PM"],
      action: "View Schedule",
    },
  ];

  const services = [
    "Hair Cut & Styling",
    "Hair Coloring",
    "Facial Treatment",
    "Makeup Application",
    "Bridal Package",
    "Spa Treatment",
    "Manicure & Pedicure",
    "Other (Please specify)",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-2 text-sm mb-6">
              Contact Us
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Let's Make You{" "}
              <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                Beautiful
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Ready to transform your look? Get in touch with us to book an
              appointment, ask questions, or learn more about our services.
              We're here to help you look and feel amazing!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow group"
              >
                <CardContent className="p-8">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-rose-100 to-pink-100 mb-6 group-hover:from-rose-200 group-hover:to-pink-200 transition-colors">
                    <info.icon className="h-8 w-8 text-rose-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {info.title}
                  </h3>
                  <div className="space-y-2 mb-6">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600">
                        {detail}
                      </p>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="border-rose-300 text-rose-600 hover:bg-rose-50"
                  >
                    {info.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-20 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Badge className="bg-rose-100 text-rose-600 px-4 py-2 mb-6">
                Book Appointment
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Fill out the form below and we'll get back to you within 24
                hours to confirm your appointment.
              </p>

              <Card className="border-0 shadow-xl">
                <CardContent className="p-8">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <Input
                          placeholder="Your first name"
                          className="border-gray-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <Input
                          placeholder="Your last name"
                          className="border-gray-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        className="border-gray-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <Input
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="border-gray-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service Interested In
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500">
                        <option value="">Select a service</option>
                        {services.map((service, index) => (
                          <option key={index} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Date & Time
                      </label>
                      <Input
                        type="datetime-local"
                        className="border-gray-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Message
                      </label>
                      <Textarea
                        placeholder="Tell us more about what you're looking for..."
                        className="border-gray-300 min-h-[120px]"
                      />
                    </div>

                    <Button className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white py-3">
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              <div>
                <Badge className="bg-rose-100 text-rose-600 px-4 py-2 mb-6">
                  Find Us
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Visit Our Salon
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Located in the heart of downtown, our beautiful salon is
                  easily accessible with convenient parking and public
                  transportation options.
                </p>
              </div>

              {/* Map Placeholder */}
              <Card className="border-0 shadow-xl">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-rose-200 to-pink-200 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-16 w-16 text-rose-600 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Interactive Map
                      </h3>
                      <p className="text-gray-600">Coming Soon</p>
                      <Button
                        variant="outline"
                        className="mt-4 border-rose-300 text-rose-600"
                      >
                        Get Directions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Contact Options */}
              <Card className="border-0 shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Quick Contact
                  </h3>
                  <div className="space-y-4">
                    <Button
                      className="w-full justify-start bg-green-500 hover:bg-green-600 text-white"
                      onClick={() => bookAppointment(businessInfo.phone, WhatsAppMessages.CONTACT_INQUIRY)}
                    >
                      <MessageCircle className="h-5 w-5 mr-3" />
                      WhatsApp: {businessInfo.phone}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-blue-300 text-blue-600 hover:bg-blue-50"
                      onClick={() => window.open(`tel:${businessInfo.phone}`, '_self')}
                    >
                      <Phone className="h-5 w-5 mr-3" />
                      Call Now: {businessInfo.phone}
                    </Button>
                        variant="ghost"
                        size="icon"
                        className="text-blue-600 hover:bg-blue-50"
                      >
                        <Facebook className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-pink-600 hover:bg-pink-50"
                      >
                        <Instagram className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-blue-400 hover:bg-blue-50"
                      >
                        <Twitter className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-rose-100 text-rose-600 px-4 py-2 mb-6">
              Client Reviews
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our happy clients
              have to say about their experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                rating: 5,
                comment:
                  "Absolutely amazing service! The staff is professional and my hair looks incredible.",
                service: "Hair Styling",
              },
              {
                name: "Emily Davis",
                rating: 5,
                comment:
                  "Best facial ever! My skin is glowing and I feel so refreshed. Highly recommend!",
                service: "Facial Treatment",
              },
              {
                name: "Jessica Miller",
                rating: 5,
                comment:
                  "Perfect bridal package! They made me feel like a princess on my wedding day.",
                service: "Bridal Package",
              },
            ].map((review, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic leading-relaxed">
                    "{review.comment}"
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900">{review.name}</p>
                    <p className="text-rose-600 text-sm">{review.service}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;