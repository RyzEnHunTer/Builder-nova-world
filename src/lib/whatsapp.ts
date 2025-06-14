// WhatsApp utility functions for appointment booking

export interface WhatsAppConfig {
  phoneNumber: string;
  defaultMessage: string;
}

// Clean phone number for WhatsApp (remove spaces, dashes, parentheses)
export const cleanPhoneNumber = (phone: string): string => {
  return phone.replace(/[^+\d]/g, "");
};

// Generate WhatsApp URL
export const generateWhatsAppURL = (
  phoneNumber: string,
  message: string,
): string => {
  const cleanPhone = cleanPhoneNumber(phoneNumber);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
};

// Default appointment booking messages
export const WhatsAppMessages = {
  GENERAL_BOOKING:
    "Hi! I would like to book an appointment at Dream World Beauty Parlour. Could you please help me with available slots?",

  SPECIFIC_SERVICE: (service: string) =>
    `Hi! I'm interested in booking a ${service} appointment at Dream World Beauty Parlour. What are your available times?`,

  BRIDAL_PACKAGE:
    "Hello! I would like to inquire about your bridal packages and book a consultation. Could you please provide me with more details?",

  GALLERY_INQUIRY:
    "Hi! I saw your beautiful work in the gallery and would like to book an appointment. When are you available?",

  CONTACT_INQUIRY:
    "Hello! I found your contact information and would like to book an appointment. Could you please help me with your available slots?",

  PRICING_INQUIRY:
    "Hi! I would like to know about your service prices and book an appointment. Could you please share your rates?",
};

// Open WhatsApp with pre-filled message
export const openWhatsApp = (phoneNumber: string, message: string): void => {
  const whatsappURL = generateWhatsAppURL(phoneNumber, message);
  window.open(whatsappURL, "_blank");
};

// Hook for using WhatsApp functionality
export const useWhatsAppBooking = () => {
  const bookAppointment = (
    phoneNumber: string,
    message: string = WhatsAppMessages.GENERAL_BOOKING,
  ) => {
    openWhatsApp(phoneNumber, message);
  };

  const bookSpecificService = (phoneNumber: string, serviceName: string) => {
    const message = WhatsAppMessages.SPECIFIC_SERVICE(serviceName);
    openWhatsApp(phoneNumber, message);
  };

  const inquireAboutPricing = (phoneNumber: string) => {
    openWhatsApp(phoneNumber, WhatsAppMessages.PRICING_INQUIRY);
  };

  const bookBridalPackage = (phoneNumber: string) => {
    openWhatsApp(phoneNumber, WhatsAppMessages.BRIDAL_PACKAGE);
  };

  return {
    bookAppointment,
    bookSpecificService,
    inquireAboutPricing,
    bookBridalPackage,
  };
};
