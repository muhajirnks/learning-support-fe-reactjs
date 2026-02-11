import type { MenuItem } from "@/configs/menu/menu";
import theme from "@/configs/mui/muiLight";
import { Button, Tooltip, useMediaQuery } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
   menuItem: MenuItem;
   drawerIsCollapsed: boolean;
   collapseDrawer: () => void;
   isCollapseItem?: boolean;
}

const SidebarItem: React.FC<Props> = ({
   menuItem,
   drawerIsCollapsed,
   collapseDrawer,
   isCollapseItem = false,
}) => {
   const isDownLg = useMediaQuery(theme.breakpoints.down("lg"));
   const { pathname } = useLocation();
   const navigate = useNavigate()

   const isActive =
      menuItem.link == "/"
         ? menuItem.link == pathname
         : pathname.startsWith(menuItem.link);

   return (
      <Tooltip
         key={menuItem.label}
         title={drawerIsCollapsed ? menuItem.label : ""}
         placement="right"
      >
         <li className={`mb-2 ${isCollapseItem ? "menu-line" : ""}`}>
            <Button
               className={`flex w-full shadow-none items-center text-foreground-primary! whitespace-nowrap text-ellipsis overflow-hidden gap-3 rounded-md py-[10px] px-3 min-w-0 ${
                  !drawerIsCollapsed ? "justify-start" : "justify-center"
               } ${
                  isActive
                     ? "bg-background-paper-dark font-semibold"
                     : "hover:bg-background-paper-dark font-normal"
               }`}
               onClick={() => {
                  isDownLg && collapseDrawer();
                  navigate(menuItem.link)
               }}
            >
               {menuItem.icon && <menuItem.icon className="text-xl" />}
               {!drawerIsCollapsed && menuItem.label}
            </Button>
         </li>
      </Tooltip>
   );
};

export default SidebarItem;
