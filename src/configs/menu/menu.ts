import type { IconType } from "react-icons";
import { MdOutlineDashboard } from "react-icons/md";

export interface MenuItem {
   icon?: IconType;
   label: string;
   link: string;
   children?: MenuItem[];
}

export const menu: MenuItem[] = [
   {
      icon: MdOutlineDashboard,
      label: "Dashboard",
      link: "/",
   },
];
