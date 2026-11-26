// Keep public content and future data loading behind this module.
// Add service/design fields once the business content is confirmed.
export type ServiceItem = {
  name: string;
  price: number;
  note?: string;
  singleNailPrice?: number;
  newGroup?: boolean;
};

export const landingContent = {
  businessName: "Jàm Nail Spa",
  logoText: "JAM NAIL SPA",
  heroTitles: [
    "EYELASH EXTENSIONS", // heroimage1.png
    "ALL ABOUT NAILS", // heroimage2.png
    "WAXING", // heroimage3.png
    "BODY MASSAGE", // heroimage4.png
  ],
  heroServiceCategories: [
    "LASH & BROW",
    "NAIL SERVICES",
    "WAXING",
    "BODY MASSAGE",
  ],
  navigationItems: ["SERVICES", "OUR DESIGN", "FIND US"],
  serviceCategories: [
    "NAIL SERVICES",
    "HAND & FOOT",
    "BODY MASSAGE",
    "LASH & BROW",
    "WAXING",
  ],
  socialLinks: [
    { label: "FACEBOOK", href: "https://www.facebook.com/" },
    { label: "INSTAGRAM", href: "https://www.instagram.com/" },
    { label: "TIKTOK", href: "https://www.tiktok.com/" },
  ],
  nailSubcategories: [
    "MANICURE & PEDICURE",
    "NAIL EXTENSION",
    "NAIL ART - ADD ONS",
  ],
  handFootSubcategories: ["CLASSIC", "PREMIUM"],
  bodyMassageSubcategories: ["WHOLE BODY", "ENHANCEMENTS"],
  lashBrowSubcategories: ["LASH EXTENSION", "LASH CURLING", "BROW LAMINATION"],
  waxingSubcategories: ["REGULAR", "PACKAGE"],
  servicesByCategory: {
    "NAIL SERVICES": [],
    "HAND & FOOT": [],
    "BODY MASSAGE": [],
    "LASH & BROW": [],
    WAXING: [],
  } as Record<string, ServiceItem[]>,
  services: [],
  designs: [],
};
