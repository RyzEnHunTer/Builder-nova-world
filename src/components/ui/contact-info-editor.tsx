import { useState } from "react";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Badge } from "./badge";
import { Alert, AlertDescription } from "./alert";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Save,
  RotateCcw,
  Building,
  Globe,
  Trash2,
  Plus,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useContactInfo, ContactInfo } from "@/contexts/ContactInfoContext";

const ContactInfoEditor = () => {
  const { contactInfo, updateContactInfo, resetToDefaults } = useContactInfo();
  const [editedInfo, setEditedInfo] = useState<ContactInfo>(contactInfo);
  const [successMessage, setSuccessMessage] = useState("");
  const [newService, setNewService] = useState("");

  const handleSave = () => {
    updateContactInfo(editedInfo);
    setSuccessMessage("Contact information updated successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleReset = () => {
    resetToDefaults();
    setEditedInfo(contactInfo);
    setSuccessMessage("Contact information reset to defaults!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const addService = () => {
    if (newService.trim() && !editedInfo.services.includes(newService.trim())) {
      setEditedInfo({
        ...editedInfo,
        services: [...editedInfo.services, newService.trim()],
      });
      setNewService("");
    }
  };

  const removeService = (serviceToRemove: string) => {
    setEditedInfo({
      ...editedInfo,
      services: editedInfo.services.filter(
        (service) => service !== serviceToRemove,
      ),
    });
  };

  const updateHours = (
    day: keyof typeof editedInfo.hours,
    field: "open" | "close" | "closed",
    value: string | boolean,
  ) => {
    setEditedInfo({
      ...editedInfo,
      hours: {
        ...editedInfo.hours,
        [day]: {
          ...editedInfo.hours[day],
          [field]: value,
        },
      },
    });
  };

  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ] as const;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Contact Information Management
          </CardTitle>
          <p className="text-sm text-gray-600">
            Update your business contact information. Changes will be reflected
            across the entire website.
          </p>
        </CardHeader>
      </Card>

      {/* Success Message */}
      {successMessage && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-700">
            {successMessage}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Name
              </label>
              <Input
                value={editedInfo.businessName}
                onChange={(e) =>
                  setEditedInfo({
                    ...editedInfo,
                    businessName: e.target.value,
                  })
                }
                placeholder="Dream World Beauty Parlour"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <Input
                type="email"
                value={editedInfo.email}
                onChange={(e) =>
                  setEditedInfo({ ...editedInfo, email: e.target.value })
                }
                placeholder="dreamworldparlourmail@gmail.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <Input
                type="tel"
                value={editedInfo.phone}
                onChange={(e) =>
                  setEditedInfo({ ...editedInfo, phone: e.target.value })
                }
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Address Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street Address
              </label>
              <Input
                value={editedInfo.address.street}
                onChange={(e) =>
                  setEditedInfo({
                    ...editedInfo,
                    address: { ...editedInfo.address, street: e.target.value },
                  })
                }
                placeholder="Ramjanki mandir gali, Main Town"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <Input
                  value={editedInfo.address.city}
                  onChange={(e) =>
                    setEditedInfo({
                      ...editedInfo,
                      address: { ...editedInfo.address, city: e.target.value },
                    })
                  }
                  placeholder="Ghocho Toli, Simdega"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <Input
                  value={editedInfo.address.state}
                  onChange={(e) =>
                    setEditedInfo({
                      ...editedInfo,
                      address: { ...editedInfo.address, state: e.target.value },
                    })
                  }
                  placeholder="Jharkhand"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ZIP Code
              </label>
              <Input
                value={editedInfo.address.zipCode}
                onChange={(e) =>
                  setEditedInfo({
                    ...editedInfo,
                    address: {
                      ...editedInfo.address,
                      zipCode: e.target.value,
                    },
                  })
                }
                placeholder="835223"
              />
            </div>
          </CardContent>
        </Card>

        {/* Business Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Business Hours
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {daysOfWeek.map((day) => (
              <div key={day} className="flex items-center gap-3">
                <div className="w-20 text-sm font-medium text-gray-700 capitalize">
                  {day.slice(0, 3)}
                </div>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={!editedInfo.hours[day].closed}
                    onChange={(e) =>
                      updateHours(day, "closed", !e.target.checked)
                    }
                    className="rounded"
                  />
                  <span className="text-sm">Open</span>
                </label>

                {!editedInfo.hours[day].closed && (
                  <>
                    <Input
                      type="time"
                      value={editedInfo.hours[day].open}
                      onChange={(e) => updateHours(day, "open", e.target.value)}
                      className="w-24"
                    />
                    <span className="text-sm text-gray-500">to</span>
                    <Input
                      type="time"
                      value={editedInfo.hours[day].close}
                      onChange={(e) =>
                        updateHours(day, "close", e.target.value)
                      }
                      className="w-24"
                    />
                  </>
                )}

                {editedInfo.hours[day].closed && (
                  <Badge variant="secondary" className="text-gray-500">
                    Closed
                  </Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Social Media Links
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Facebook className="h-4 w-4 text-blue-600" />
                Facebook
              </label>
              <Input
                value={editedInfo.socialMedia.facebook}
                onChange={(e) =>
                  setEditedInfo({
                    ...editedInfo,
                    socialMedia: {
                      ...editedInfo.socialMedia,
                      facebook: e.target.value,
                    },
                  })
                }
                placeholder="https://facebook.com/dreamworldbeauty"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Instagram className="h-4 w-4 text-pink-600" />
                Instagram
              </label>
              <Input
                value={editedInfo.socialMedia.instagram}
                onChange={(e) =>
                  setEditedInfo({
                    ...editedInfo,
                    socialMedia: {
                      ...editedInfo.socialMedia,
                      instagram: e.target.value,
                    },
                  })
                }
                placeholder="https://instagram.com/dreamworldbeauty"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Twitter className="h-4 w-4 text-blue-400" />
                Twitter
              </label>
              <Input
                value={editedInfo.socialMedia.twitter}
                onChange={(e) =>
                  setEditedInfo({
                    ...editedInfo,
                    socialMedia: {
                      ...editedInfo.socialMedia,
                      twitter: e.target.value,
                    },
                  })
                }
                placeholder="https://twitter.com/dreamworldbeauty"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services Management */}
      <Card>
        <CardHeader>
          <CardTitle>Services Offered</CardTitle>
          <p className="text-sm text-gray-600">
            Manage the list of services displayed on your website
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
              placeholder="Add new service..."
              onKeyPress={(e) => e.key === "Enter" && addService()}
            />
            <Button onClick={addService} disabled={!newService.trim()}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {editedInfo.services.map((service, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-rose-50 text-rose-700 px-3 py-1 rounded-full"
              >
                <span className="text-sm">{service}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeService(service)}
                  className="h-4 w-4 p-0 hover:bg-rose-100"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end">
        <Button
          variant="outline"
          onClick={handleReset}
          className="border-gray-300 text-gray-600 hover:bg-gray-50"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset to Defaults
        </Button>
        <Button
          onClick={handleSave}
          className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Preview Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">
                Changes Apply To:
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Website footer contact information</li>
                <li>• Contact page details</li>
                <li>• Homepage contact section</li>
                <li>• All navigation and social media links</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactInfoEditor;
