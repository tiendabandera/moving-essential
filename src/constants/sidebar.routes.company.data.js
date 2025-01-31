import {
  Blocks,
  ChartNoAxesCombined,
  PanelsTopLeft,
  BadgeCheck,
  User2,
  Gem,
  BellRing,
  UserRoundSearch,
  BookUser,
} from "lucide-react";

const path = "company";

export const dataGeneral = [
  {
    id: 1,
    label: "Dashboard",
    href: `/${path}/dashboard`,
    icon: PanelsTopLeft,
  },
  {
    id: 2,
    label: "Data",
    href: `/${path}/data`,
    icon: ChartNoAxesCombined,
  },
  {
    id: 3,
    label: "Notifications",
    href: `/${path}/notifications`,
    icon: BellRing,
  },
  {
    id: 4,
    label: "CRM",
    href: `/${path}/crm`,
    icon: Blocks,
    options: [
      {
        id: 1,
        label: "My integrations",
        href: `/${path}/crm/my-integrations`,
        icon: UserRoundSearch,
      },
      {
        id: 2,
        label: "All integrations",
        href: `/all-integrations`,
        icon: BookUser,
      },
    ],
  },
  {
    id: 5,
    label: "Leads",
    href: `/${path}/leads`,
    icon: User2,
    options: [
      {
        id: 1,
        label: "Phone pool",
        href: `/${path}/leads/phone-pool`,
        icon: UserRoundSearch,
      },
      {
        id: 2,
        label: "My leads",
        href: `/${path}/leads/my-leads`,
        icon: BookUser,
      },
    ],
  },
];

export const dataMembership = [
  {
    id: 6,
    label: "Subscriptions plan",
    href: `/${path}/membership`,
    icon: BadgeCheck,
  },
  {
    id: 7,
    label: "Premium features",
    href: `/${path}/membership-premium-features`,
    icon: Gem,
  },
];

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
