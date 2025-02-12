export const navigation = [
    {
      id: "0",
      title: "Services",
      url: "/services",
      visibleIsAuthenticated: true
    },
    {
      id: "1",
      title: "blog",
      url: "/blog",
      visibleIsAuthenticated: true
    },
    {
      id: "2",
      title: "About",
      url: "/about",
      visibleIsAuthenticated: true
    },
    {
      id: "3",
      title: "FAQs",
      url: "/faq",
      visibleIsAuthenticated: true
    },
    {
      id: "4",
      title: "Tips & Tricks",
      url: "/tips",
      visibleIsAuthenticated: true
    },
    {
      id: "5",
      title: "Join Us",
      url: "/register",
      onlyMobile: true,
      visibleIsAuthenticated: false
    },
    {
      id: "6",
      title: "Sign in",
      url: "/login",
      onlyMobile: true,
      visibleIsAuthenticated: false
    },    
  ];

export const roles = {
  user: 'user',
  company: 'company',
  admin: 'admin'
}

export const states = [
  { value: "AL", label: "AL" },
  { value: "AK", label: "AK" },
  { value: "AR", label: "AR" },
  { value: "AS", label: "AS" },
  { value: "AZ", label: "AZ" },
  { value: "CA", label: "CA" },
  { value: "CM", label: "CM" },
  { value: "CO", label: "CO" },
  { value: "CT", label: "CT" },
  { value: "DC", label: "DC" },
  { value: "DE", label: "DE" },
  { value: "FL", label: "FL" },
  { value: "GA", label: "GA" },
  { value: "GU", label: "GU" },
  { value: "HI", label: "HI" },
  { value: "IA", label: "IA" },
  { value: "ID", label: "ID" },
  { value: "IL", label: "IL" },
  { value: "IN", label: "IN" },
  { value: "KS", label: "KS" },
  { value: "KY", label: "KY" },
  { value: "LA", label: "LA" },
  { value: "MA", label: "MA" },
  { value: "MD", label: "MD" },
  { value: "ME", label: "ME" },
  { value: "MI", label: "MI" },
  { value: "MN", label: "MN" },
  { value: "MO", label: "MO" },
  { value: "MS", label: "MS" },
  { value: "MT", label: "MT" },
  { value: "NC", label: "NC" },
  { value: "ND", label: "ND" },
  { value: "NE", label: "NE" },
  { value: "NH", label: "NH" },
  { value: "NJ", label: "NJ" },
  { value: "NM", label: "NM" },
  { value: "NV", label: "NV" },
  { value: "OH", label: "OH" },
  { value: "OK", label: "OK" },
  { value: "OR", label: "OR" },
  { value: "PA", label: "PA" },
  { value: "PI", label: "PI" },
  { value: "PR", label: "PR" },
  { value: "RI", label: "RI" },
  { value: "SC", label: "SC" },
  { value: "SD", label: "SD" },
  { value: "TN", label: "TN" },
  { value: "TT", label: "TT" },
  { value: "TX", label: "TX" },
  { value: "UT", label: "UT" },
  { value: "VA", label: "VA" },
  { value: "VI", label: "VI" },
  { value: "VT", label: "VT" },
  { value: "WA", label: "WA" },
  { value: "WI", label: "WI" },
  { value: "WV", label: "WV" },
  { value: "WY", label: "WY" },
];

export const fedTaxClass = [
  { value: "LLC", label: "LLC" },
  { value: "C Corporation", label: "C Corporation" },
  { value: "S Corporation", label: "S Corporation" },
  { value: "Partnership", label: "Partnership" },
  { value: "Exempt payee", label: "Exempt payee" },
];

export const rateTypes = [
  { value: 1, label: "Hourly rate" },
  { value: 2, label: "Flat rate" },
  { value: 3, label: "Both" },  
];

export const yearOfExperience = [
  { value: "5-10", label: "5-10" },
  { value: "10-15", label: "10-15" },
  { value: "15-20", label: "15-20" },  
];

export const totalSales = [
  { value: "1-10", label: "1-10" },
  { value: "10-20", label: "10-20" },
  { value: "20-30", label: "20-30" },
  { value: "30-40", label: "30-40" },
  { value: "40-50", label: "40-50" },
  { value: "More than 50", label: "More than 50" },  
]

export const homeTypes = [
  { value: "single-family-home", label: "Single-Family Home" },
  { value: "townhouse", label: "Townhouse" },
  { value: "condominium", label: "Condominium (Condo)" },
  { value: "apartment", label: "Apartment" },
  { value: "duplex-triplex", label: "Duplex/Triplex" },
  { value: "bungalow", label: "Bungalow" },
  { value: "ranch-house", label: "Ranch House" },
  { value: "cottage", label: "Cottage" },
  { value: "mansion", label: "Mansion" },
  { value: "villa", label: "Villa" },
  { value: "cabin", label: "Cabin" },
  { value: "mobile-home", label: "Mobile Home/Manufactured Home" },
  { value: "tiny-house", label: "Tiny House" },
  { value: "farmhouse", label: "Farmhouse" },
  { value: "split-level-home", label: "Split-Level Home" },
  { value: "all", label: "All" }
];