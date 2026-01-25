export const desktopNavigationItems = [
  {
    section_name: "services",
    label: "Services",
    href: "/services",
    hasDropdown: true,
    subNavItems: [
      {
        label: "UI/UX Design",
        description:
          "Creating intuitive and user-friendly digital experiences.",
        href: "/services/#ui-ux-design",
      },
      {
        label: "Web & App Development",
        description: "Start your journey with cutting-edge solutions.",
        href: "/services/#web-app-development",
      },
      {
        label: "Data Analytics",
        description: "Unlock insights with powerful data-driven strategies.",
        href: "/services/#data-analytics",
      },
      {
        label: "WebFlow Development",
        description: "Build responsive, high-performing websites effortlessly.",
        href: "/services/#webflow-development",
      },
      {
        label: "SaaS Design & Development",
        description: "Crafting scalable solutions for modern businesses.",
        href: "/services/#saas-design-development",
      },
    ],
  },
  {
    section_name: "about",
    label: "About Us",
    href: "/about-us",
    hasDropdown: false,
  },
  // {
  //   section_name: "works",
  //   label: "Works",
  //   href: "/our-works",
  //   hasDropdown: false,
  // },
  {
    section_name: "more",
    label: "More",
    href: "#",
    hasDropdown: true,
    subNavItems: [
      {
        label: "Home",
        description: "Where creativity meets innovation",
        href: "/",
      },
      {
        label: "Career",
        description: "Start your journey with us",
        href: "/career",
      },
      {
        label: "Meet the Team",
        description: "Get to know the minds behind the magic",
        href: "/about-us#team-section",
      },
    ],
  },
];

// Mobile Navigation Items

export const mobileNavigationItems = [
  {
    section_name: "home",
    label: "Home",
    href: "/home",
    hasDropdown: false,
  },
  {
    section_name: "about",
    label: "About Us",
    href: "/about-us",
    hasDropdown: false,
  },
  {
    section_name: "works",
    label: "Works",
    href: "/our-works",
    hasDropdown: false,
  },
  {
    section_name: "career",
    label: "Career",
    href: "/career",
    hasDropdown: false,
  },
  {
    section_name: "meet-the-team",
    label: "Meet the Team",
    href: "/meet-the-team",
    hasDropdown: false,
  },
  {
    section_name: "services",
    label: "Services",
    href: "#",
    hasDropdown: true,
    subNavItems: [
      {
        label: "UI/UX Design",
        description:
          "Creating intuitive and user-friendly digital experiences.",
        href: "/services/web-development",
      },
      {
        label: "Web & App Development",
        description: "Start your journey with cutting-edge solutions.",
        href: "/services/web-app-development",
      },
      {
        label: "Data Analytics",
        description: "Unlock insights with powerful data-driven strategies.",
        href: "/services/data-analytics",
      },
      {
        label: "WebFlow Development",
        description: "Build responsive, high-performing websites effortlessly.",
        href: "/services/webflow-development",
      },
      {
        label: "SaaS Design & Development",
        description: "Crafting scalable solutions for modern businesses.",
        href: "/services/saas-design-development",
      },
    ],
  },
] as const;
