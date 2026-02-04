import { FileText, LayoutDashboard, Library } from "lucide-react";

export const DASHBOARD_NAV = [
  {
    name: "Overview",
    icon: LayoutDashboard,
    link: `/writer/dashboard`,
  },
  {
    name: "My Stories",
    icon: FileText,
    link: `/writer/stories`,
  },

  {
    name: "Collections",
    icon: Library,
    link: `/writer/collections`,
  },
];
