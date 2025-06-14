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

const defaultContactInfo: ContactInfo = {
  businessName: "Dream World Beauty Parlour",
  email: "dreamworldparlourmail@gmail.com",
  phone: "+1 (555) 123-4567",
  address: {
    street: "Ramjanki mandir gali, Main Town",
    city: "Ghocho Toli, Simdega",
    state: "Jharkhand",
    zipCode: "835223",
  },
  hours: {
    monday: { open: "09:00", close: "20:00", closed: false },
    tuesday: { open: "09:00", close: "20:00", closed: false },
    wednesday: { open: "09:00", close: "20:00", closed: false },
    thursday: { open: "09:00", close: "20:00", closed: false },
    friday: { open: "09:00", close: "20:00", closed: false },
    saturday: { open: "09:00", close: "20:00", closed: false },
    sunday: { open: "10:00", close: "18:00", closed: false },
  },
  socialMedia: {
    facebook: "https://facebook.com/dreamworldbeauty",
    instagram: "https://instagram.com/dreamworldbeauty",
    twitter: "https://twitter.com/dreamworldbeauty",
  },
  services: [
    "Hair Styling & Cuts",
    "Facial Treatments",
    "Makeup & Beauty",
    "Bridal Packages",
    "Spa Treatments",
    "Special Packages",
  ],
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
