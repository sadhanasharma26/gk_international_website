export type CompanyInfo = {
  name: string;
  establishedYear: number;
  description: string;
  natureOfBusiness: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  ceo: string;
  employeesRange: string;
  gstRegistrationDate: string;
  legalStatus: string;
  annualTurnover: string;
  gstNumber: string;
  bank: string;
  paymentModes: string[];
  shipmentMode: string;
  whyUsBlurb: string;
  keyFactors: string[];
  categories: { name: string; image: string }[];
};

export const company: CompanyInfo = {
  name: "GK International",
  establishedYear: 2015,
  description:
    "Manufacturer and Wholesale Trader of Cattle Feed, Animal Feed, Chicken Feed, etc. We emphasize stringent quality standards to ensure optimum products for our clients.",
  natureOfBusiness: "Trader - Wholesaler/Distributor",
  address: "Z-1- 67, Hemant Vihar, Barra 2",
  city: "Kanpur",
  state: "Uttar Pradesh",
  postalCode: "208027",
  country: "India",
  ceo: "Dushyant Sharma",
  employeesRange: "11 to 25 People",
  gstRegistrationDate: "06-02-2018",
  legalStatus: "Proprietorship",
  annualTurnover: "40 L - 1.5 Cr",
  gstNumber: "09AWNPS2225G1ZA",
  bank: "UCO BANK",
  paymentModes: ["Cash", "Cheque", "DD", "Online"],
  shipmentMode: "By Road",
  whyUsBlurb:
    "We offer top‑notch quality products tailored to the exact demands of our valued clients.",
  keyFactors: [
    "Competitive price",
    "Customization facility",
    "Client-centric approach",
    "Wide distribution network",
    "Quality tested products",
  ],
  categories: [
    { name: "Animal Feed", image: "/placeholder.jpg" },
    { name: "Chicken Feed", image: "/placeholder.jpg" },
    { name: "Cattle Feed", image: "/placeholder.jpg" },
  ],
};


