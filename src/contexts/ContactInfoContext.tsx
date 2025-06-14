import React, { createContext, useContext, useState, useEffect } from "react";
import {
  useBusinessProfile,
  BusinessProfileInfo,
  BusinessHours as GoogleBusinessHours,
} from "@/lib/googleBusinessProfile";

export interface ContactInfo {
  businessName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  hours: {
    monday: { open: string; close: string; closed: boolean };
    tuesday: { open: string; close: string; closed: boolean };
    wednesday: { open: string; close: string; closed: boolean };
    thursday: { open: string; close: string; closed: boolean };
    friday: { open: string; close: string; closed: boolean };
    saturday: { open: string; close: string; closed: boolean };
    sunday: { open: string; close: string; closed: boolean };
  };
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  services: string[];
  syncWithGoogleBusiness: boolean;
  lastGoogleSync?: string;
}

interface ContactInfoContextType {
  contactInfo: ContactInfo;
  updateContactInfo: (info: ContactInfo) => void;
  resetToDefaults: () => void;
  syncWithGoogleProfile: () => Promise<void>;
  isSyncing: boolean;
  googleProfileData: BusinessProfileInfo | null;
}

const ContactInfoContext = createContext<ContactInfoContextType | undefined>(
  undefined,
);

export const useContactInfo = () => {
  const context = useContext(ContactInfoContext);
  if (context === undefined) {
    throw new Error("useContactInfo must be used within a ContactInfoProvider");
  }
  return context;
};

// Convert Google Business Hours to ContactInfo hours format
const convertGoogleHoursToContactHours = (googleHours: GoogleBusinessHours) => {
  return {
    monday: googleHours.monday,
    tuesday: googleHours.tuesday,
    wednesday: googleHours.wednesday,
    thursday: googleHours.thursday,
    friday: googleHours.friday,
    saturday: googleHours.saturday,
    sunday: googleHours.sunday,
  };
};

// Merge Google Business Profile data with existing contact info
const mergeGoogleBusinessData = (
  contactInfo: ContactInfo,
  googleData: BusinessProfileInfo,
): ContactInfo => {
  return {
    ...contactInfo,
    businessName: googleData.businessName || contactInfo.businessName,
    email: googleData.contact.email || contactInfo.email,
    phone: googleData.contact.phone || contactInfo.phone,
    address: {
      street: googleData.location.street || contactInfo.address.street,
      city: googleData.location.city || contactInfo.address.city,
      state: googleData.location.state || contactInfo.address.state,
      zipCode: googleData.location.zipCode || contactInfo.address.zipCode,
    },
    hours: convertGoogleHoursToContactHours(googleData.businessHours),
    lastGoogleSync: googleData.lastSyncTime,
    // Keep existing social media and services as they're not from Google Business
    socialMedia: contactInfo.socialMedia,
    services: contactInfo.services,
    syncWithGoogleBusiness: contactInfo.syncWithGoogleBusiness,
  };
};

const defaultContactInfo: ContactInfo = {
  businessName: "Dream World Beauty Parlour",
  email: "dreamworldparlourmail@gmail.com",
  phone: "+91 8210180164",
  address: {
    street: "Ramjanki mandir gali",
    city: "Main Town, Ghocho Toli, Simdega",
    state: "Jharkhand",
    zipCode: "835223",
  },
  hours: {
    monday: { open: "09:00", close: "20:00", closed: false },
    tuesday: { open: "09:00", close: "20:00", closed: false },
    wednesday: { open: "09:00", close: "20:00", closed: false },
    thursday: { open: "09:00", close: "20:00", closed: false },
    friday: { open: "09:00", close: "20:00", closed: false },
    saturday: { open: "09:00", close: "21:00", closed: false },
    sunday: { open: "10:00", close: "19:00", closed: false },
  },
  socialMedia: {
    facebook: "https://facebook.com/dreamworldbeautyparlour",
    instagram: "https://instagram.com/dreamworldbeautyparlour",
    twitter: "https://twitter.com/dreamworldbeauty",
  },
  services: [
    "Hair Styling & Cutting",
    "Professional Makeup",
    "Facial Treatments",
    "Spa & Wellness",
    "Bridal Packages",
    "Hair Coloring",
    "Manicure & Pedicure",
    "Eyebrow Threading",
    "Hair Treatment",
    "Party Makeup",
  ],
  syncWithGoogleBusiness: false,
};

interface ContactInfoProviderProps {
  children: React.ReactNode;
}

export const ContactInfoProvider: React.FC<ContactInfoProviderProps> = ({
  children,
}) => {
  const [contactInfo, setContactInfo] =
    useState<ContactInfo>(defaultContactInfo);

  // Load saved contact info on mount
  useEffect(() => {
    const savedInfo = localStorage.getItem("dreamworld-contact-info");
    if (savedInfo) {
      try {
        const parsedInfo = JSON.parse(savedInfo);
        setContactInfo({ ...defaultContactInfo, ...parsedInfo });
      } catch (error) {
        console.error("Error parsing saved contact info:", error);
      }
    }
  }, []);

  const updateContactInfo = (info: ContactInfo) => {
    setContactInfo(info);
    localStorage.setItem("dreamworld-contact-info", JSON.stringify(info));
  };

  const resetToDefaults = () => {
    setContactInfo(defaultContactInfo);
    localStorage.setItem(
      "dreamworld-contact-info",
      JSON.stringify(defaultContactInfo),
    );
  };

  return (
    <ContactInfoContext.Provider
      value={{
        contactInfo,
        updateContactInfo,
        resetToDefaults,
      }}
    >
      {children}
    </ContactInfoContext.Provider>
  );
};
