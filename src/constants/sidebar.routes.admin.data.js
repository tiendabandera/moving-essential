import {
  History,
  House,
  MessageCircleQuestion,
  MessageCircleX,
  PanelsTopLeft,
  UserRoundCheck,
} from "lucide-react";

const path = "admin";

export const dataGeneral = (currentPath) => {
  return [
    {
      id: 1,
      label: "Home",
      href: "/",
      icon: House,
    },
    {
      id: 2,
      label: "Dashboard",
      href: `/${currentPath}/dashboard`,
      icon: PanelsTopLeft,
    },
  ];
};

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
    label: "Appeals",
    href: `/${path}/reviews/appeals`,
    icon: MessageCircleQuestion,
  },
  {
    id: 6,
    label: "Deleted",
    href: `/${path}/reviews/deleted`,
    icon: MessageCircleX,
  },
  /* {
    id: 6,
    label: "Deleted appealed",
    href: `/${path}/leads/create`,
    icon: History,
  }, */
];
