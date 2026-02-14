import type { IconType } from "react-icons";
import {
   MdOutlineDashboard,
   MdOutlineLibraryBooks,
   MdOutlineCategory,
   MdOutlineReceiptLong,
} from "react-icons/md";

export interface MenuItem {
   icon?: IconType;
   label: string;
   link: string;
   role?: "admin" | "user";
   children?: MenuItem[];
}

export const menu: MenuItem[] = [
   {
      icon: MdOutlineDashboard,
      label: "Dashboard",
      link: "/admin/dashboard",
      role: "admin",
   },
   {
      icon: MdOutlineLibraryBooks,
      label: "Manage Courses",
      link: "/admin/courses",
      role: "admin",
   },
   {
      icon: MdOutlineCategory,
      label: "Manage Categories",
      link: "/admin/categories",
      role: "admin",
   },
   {
      icon: MdOutlineReceiptLong,
      label: "Manage Transactions",
      link: "/admin/transactions",
      role: "admin",
   },
];
