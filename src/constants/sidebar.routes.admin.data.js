import {
  History,
  House,
  MessageCircleQuestion,
  MessageCircleX,
  PanelsTopLeft,
  UserRoundCheck,
  UserRoundPlus,
  UserRoundSearch,
} from "lucide-react";

const path = "admin";

export const dataGeneral = [
  {
    id: 1,
    label: "Home",
    href: "/",
    icon: House,
  },
  {
    id: 2,
    label: "Dashboard",
    href: `/${path}/dashboard`,
    icon: PanelsTopLeft,
  },
];

export const dataLeads = [
  {
    id: 3,
    label: "Phone pool",
    href: `/${path}/phone-pool`,
    icon: UserRoundCheck,
  },
  /*  {
    id: 4,
    label: "Create",
    href: `/${path}/leads/create`,
    icon: UserRoundPlus,
  }, */
];

export const dataReviews = [
  {
    id: 5,
    label: "Appealed",
    href: `/${path}/leads/phone-pool`,
    icon: MessageCircleQuestion,
  },
  {
    id: 6,
    label: "Deleted",
    href: `/${path}/leads/create`,
    icon: MessageCircleX,
  },
  {
    id: 6,
    label: "Deleted appealed",
    href: `/${path}/leads/create`,
    icon: History,
  },
];
