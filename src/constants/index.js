import {
  Book,
  Box,
  House,
  MessageCircleMore,
  Pin,
  Rocket,
  UserRound,
  UserRoundPlus,
} from "lucide-react";

export const navigation = {
  profile: [
    {
      id: 1,
      label: "Profile",
      icon: UserRound,
    },
  ],
  main: [
    {
      id: 1,
      label: "Services",
      href: "/services",
      icon: Box,
      options: [
        {
          id: 0,
          label: "Residential/Local Moving",
          href: "/local-moving/compare",
          icon: House,
        },
        {
          id: 1,
          label: "Realtors",
          href: "/realtors/compare",
          icon: UserRound,
        },
      ],
    },
    {
      id: 2,
      label: "Blog",
      href: "https://blog.movingessential.com",
      icon: Book,
    },
    {
      id: 3,
      label: "FAQs",
      href: "/faqs",
      icon: MessageCircleMore,
    },
    {
      id: 4,
      label: "Tips & Tricks",
      href: "/tips",
      icon: Pin,
    },
  ],
  signup: [
    {
      id: "join-us",
      label: "Join Us!",
      href: "/join",
      icon: Rocket,
    },
    {
      id: "register",
      label: "Register now",
      href: "/register",
      icon: UserRoundPlus,
    },
  ],
};

export const roles = {
  user: "user",
  company: "company",
  admin: "admin",
};

export const states = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
  { value: "DC", label: "District of Columbia" },
  { value: "PR", label: "Puerto Rico" },
  { value: "VI", label: "Virgin Islands" },
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
];

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
  { value: "all", label: "All" },
];

export const reportingTypes = [
  { label: "I just don't like it", value: "dislike", bg: "bg-red-800" },
  { label: "It's spam", value: "spam", bg: "bg-blue-400" },
  {
    label: "Nudity or sexual activity",
    value: "nudity-or-sexual-activity",
    bg: "bg-green-400",
  },
  {
    label: "Bullying or harassment",
    value: "bullying-or-harassment",
    bg: "bg-yellow-400",
  },
  { label: "False information", value: "false-information", bg: "bg-red-500" },
  { label: "Scam or fraud", value: "scam-or-fraud", bg: "bg-sky-400" },
  {
    label: "Violence or dangerous organizations",
    value: "violence-or-dangerous-orgs",
    bg: "bg-fuchsia-500",
  },
];

export const servicesNames = {
  local_moving: "local_moving",
  realtors: "realtors",
};

export const faqs = [
  {
    title: "What services do moving companies typically offer?",
    description:
      "Moving companies offer a range of services, including packing, loading, transporting, unloading, and unpacking belongings during a move. Some also provide additional services like storage, specialty item handling, and furniture disassembly/reassembly.",
  },
  {
    title: "How do I choose the right moving company for my needs?",
    description:
      "Start by researching local moving companies, reading reviews, and asking for recommendations. Obtain multiple quotes to compare pricing. Ensure the company is licensed, insured, and has a good track record. Choose a company that specializes in the type of move you need (e.g., local, long-distance, residential, or commercial).",
  },
  {
    title: "What factors influence the cost of a move?",
    description:
      "The cost of a move is influenced by factors like distance, the volume and weight of your belongings, the time of year, the need for packing services, and any additional services you require. Be sure to get a detailed estimate from the moving company.",
  },
  {
    title: "How far in advance should I book a moving company?",
    description:
      "You can edit the title from the Settings tab in the app. If you don’t want to display the title, simply disable the Title under “Info to Display”.",
  },
  {
    title: "Should I tip the moving crew, and if so, how much is appropriate?",
    description:
      "Tipping is a common practice. A standard guideline is to tip 5-10% of the total moving cost, divided among the crew members. However, tipping is discretionary, and you can adjust it based on the quality of service provided.",
  },
  {
    title: "Do I need to purchase moving insurance?",
    description:
      "Many moving companies offer basic liability coverage, but it may not cover the full value of your belongings. Consider purchasing additional insurance for added protection. Review the insurance options with the moving company.",
  },
  {
    title: "How should I prepare for moving day?",
    description:
      "Create a moving checklist, pack items securely, label boxes, and disassemble furniture if necessary.",
  },
];

/* FUNCTIONS
_______________________________ */
export function decodeJWT(token) {
  const [header, payload, signature] = token.split(".");
  /* const decodedPayload = JSON.parse(atob(payload));
  return decodedPayload; */

  // Base64URL → Base64
  const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "="
  );

  const decodedPayload = JSON.parse(atob(padded));
  return decodedPayload;
}

export function formatPhone(phone) {
  if (phone) {
    const regex = /(\d{3})(\d{3})(\d{4})/;
    return phone.replace(regex, "$1-$2-$3");
  }

  return null;
}

export function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
