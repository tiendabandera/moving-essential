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