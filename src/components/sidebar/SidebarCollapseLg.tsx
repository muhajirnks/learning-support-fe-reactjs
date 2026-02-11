import type { MenuItem } from "@/configs/menu/menu";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IoChevronDown } from "react-icons/io5";
import { List, ListItemButton, Collapse, Box } from "@mui/material";
import SidebarItem from "./SidebarItem";
import SidebarCollapse from "./SidebarCollapse";

interface Props {
   menuItem: MenuItem;
   isCollapseItem: boolean;
   drawerIsCollapsed: boolean;
   collapseDrawer: () => void;
}

const SidebarCollapseLg: React.FC<Props> = ({
   menuItem,
   isCollapseItem = false,
   drawerIsCollapsed,
   collapseDrawer,
}) => {
   const [openDropdown, setOpenDropdown] = useState(false);
   const location = useLocation();

   useEffect(() => {
      if (location.pathname.startsWith(menuItem.link)) {
         setOpenDropdown(true);
      }
   }, [menuItem, location.pathname]);

   return (
      <Box
         component="li"
         sx={{
            listStyle: "none",
            ...(isCollapseItem && {
               position: "relative",
               "&::before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "2px",
                  bgcolor: "divider",
               },
            }),
         }}
      >
         <ListItemButton
            onClick={() => setOpenDropdown((prev) => !prev)}
            sx={{
               mb: 1,
               position: "relative",
               display: "flex",
               alignItems: "center",
               whiteSpace: "nowrap",
               width: "100%",
               overflow: "hidden",
               textOverflow: "ellipsis",
               gap: 1.5,
               borderRadius: 2,
               p: 1.5,
               justifyContent: "flex-start",
               "&:hover": {
                  bgcolor: "action.hover",
               },
            }}
         >
            {menuItem.icon && (
               <Box
                  component={menuItem.icon}
                  sx={{
                     fontSize: "1.25rem",
                     flexShrink: 0,
                  }}
               />
            )}
            <Box sx={{ flex: 1 }}>{menuItem.label}</Box>

            <IoChevronDown
               style={{
                  rotate: openDropdown ? '180deg' : '0deg',
                  transition: "rotate 0.2s ease",
               }}
            />
         </ListItemButton>

         <Collapse in={openDropdown} timeout="auto" unmountOnExit>
            <List
               component="ul"
               sx={{
                  overflow: "hidden",
                  height: "100%",
                  position: "relative",
                  pl: 2,
                  py: 0,
               }}
            >
               {menuItem.children?.map((childItem) =>
                  childItem.children ? (
                     <SidebarCollapse
                        key={childItem.label + childItem.link}
                        menuItem={childItem}
                        isCollapseItem
                        drawerIsCollapsed={drawerIsCollapsed}
                        collapseDrawer={collapseDrawer}
                     />
                  ) : (
                     <SidebarItem
                        key={childItem.label + childItem.link}
                        menuItem={childItem}
                        isCollapseItem
                        collapseDrawer={collapseDrawer}
                        drawerIsCollapsed={drawerIsCollapsed}
                     />
                  )
               )}
            </List>
         </Collapse>
      </Box>
   );
};

export default SidebarCollapseLg;