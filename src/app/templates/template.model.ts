export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  previewImage: string;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
  features: string[];
}

export interface BusinessInfo {
  businessName: string;
  businessType: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  openingHours: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  // Campos específicos para plantillas legales
  firmName?: string;
  legalServices?: string[];
  // Campos específicos para ecommerce
  storeName?: string;
  // Campos específicos para real estate
  agencyName?: string;
  // Campos específicos para farmacia
  pharmacyName?: string;
}