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
  House,
} from "lucide-react";

const path = "company";

export const dataGeneral = [
  {
    id: 0,
    label: "Home",
    href: "/",
    icon: House,
    services: [1, 2],
  },
  {
    id: 1,
    label: "Dashboard",
    href: `/${path}/dashboard`,
    icon: PanelsTopLeft,
    services: [1, 2],
  },
  {
    id: 2,
    label: "Data",
    href: `/${path}/data`,
    icon: ChartNoAxesCombined,
    services: [1, 2],
  },
  {
    id: 3,
    label: "Notifications",
    href: `/${path}/notifications`,
    icon: BellRing,
    services: [1, 2],
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
        label: "Integrations",
        href: `/${path}/crm/integrations`,
        icon: BookUser,
      },
    ],
    services: [1],
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
    services: [1],
  },
];

export const dataMembership = [
  /* {
    id: 6,
    label: "Subscriptions plan",
    href: `/${path}/membership`,
    icon: BadgeCheck,
  }, */
  {
    id: 7,
    label: "Premium features",
    href: `/${path}/membership-premium-features`,
    icon: Gem,
  },
];
