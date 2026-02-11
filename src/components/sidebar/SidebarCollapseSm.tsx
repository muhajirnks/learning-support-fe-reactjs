import type { MenuItem } from "@/configs/menu/menu";
import { Link, useLocation } from "react-router-dom";
import {
   Menu,
   MenuItem as MuiMenuItem,
   IconButton,
   Button,
   Tooltip,
} from "@mui/material";
import { IoChevronForward } from "react-icons/io5";
import { useState, type MouseEvent } from "react";
import SidebarCollapse from "./SidebarCollapse";

interface Props {
   menuItem: MenuItem;
   isCollapseItem: boolean;
   drawerIsCollapsed: boolean;
   collapseDrawer: () => void;
}

const SidebarCollapseSm: React.FC<Props> = ({
   menuItem,
   isCollapseItem = false,
   drawerIsCollapsed,
   collapseDrawer,
}) => {
   const location = useLocation();
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);

   const handleClick = (event: MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   return isCollapseItem ? (
      <>
         <Button
            onClick={handleClick}
            sx={{
               position: "relative",
               display: "flex",
               justifyContent: "space-between",
               alignItems: "center",
               textAlign: "start",
               whiteSpace: "nowrap",
               py: 1,
               px: 2,
               width: "100%",
               textTransform: "none",
               color: "text.primary",
               gap: 1.5,
               borderRadius: 2,
               "&:hover": {
                  bgcolor: "grey.100",
               },
            }}
         >
            {menuItem.label}
            <IoChevronForward />
         </Button>
         <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
               vertical: "top",
               horizontal: "right",
            }}
            transformOrigin={{
               vertical: "top",
               horizontal: "left",
            }}
         >
            {menuItem.children?.map((childItem) =>
               !childItem.children ? (
                  <MuiMenuItem
                     key={childItem.label + childItem.link}
                     component={Link}
                     to={childItem.link}
                     onClick={handleClose}
                     sx={{
                        color: "var(--color-foreground-primary) !important",
                        ...(location.pathname.startsWith(childItem.link)
                           ? {
                                bgcolor: "var(--color-background-paper-dark)",
                                fontWeight: 600,
                             }
                           : {
                                "&:hover": {
                                   bgcolor:
                                      "var(--color-background-paper-dark)",
                                },
                             }),
                     }}
                  >
                     {childItem.label}
                  </MuiMenuItem>
               ) : (
                  <SidebarCollapse
                     key={childItem.label + childItem.link}
                     menuItem={childItem}
                     isCollapseItem
                     drawerIsCollapsed={drawerIsCollapsed}
                     collapseDrawer={collapseDrawer}
                  />
               )
            )}
         </Menu>
      </>
   ) : (
      <>
         <Tooltip title={menuItem.label}>
            <IconButton
               onClick={handleClick}
               sx={{
                  mb: 1,
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  whiteSpace: "nowrap",
                  width: "100%",
                  gap: 1.5,
                  borderRadius: 2,
                  p: 1.5,
                  justifyContent: "center",
                  color: "var(--color-foreground-primary) !important",
                  ...(location.pathname.startsWith(menuItem.link)
                     ? {
                          bgcolor: "var(--color-background-paper-dark)",
                          fontWeight: 600,
                       }
                     : {
                          fontWeight: 600,
                          "&:hover": {
                             bgcolor: "var(--color-background-paper-dark)",
                          },
                       }),
               }}
            >
               {menuItem.icon && <menuItem.icon className="text-xl" />}
            </IconButton>
         </Tooltip>
         <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
               vertical: "top",
               horizontal: "right",
            }}
            transformOrigin={{
               vertical: "top",
               horizontal: "left",
            }}
            sx={{
               "& .MuiPaper-root": {
                  borderRadius: "8px",
                  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
               },
            }}
         >
            {menuItem.children?.map((childItem) =>
               !childItem.children ? (
                  <MuiMenuItem
                     key={childItem.label + childItem.link}
                     component={Link}
                     to={childItem.link}
                     onClick={handleClose}
                     sx={{
                        color: "var(--color-foreground-primary) !important",
                        ...(location.pathname.startsWith(childItem.link)
                           ? {
                                bgcolor: "var(--color-background-paper-dark)",
                                fontWeight: 600,
                             }
                           : {
                                "&:hover": {
                                   bgcolor:
                                      "var(--color-background-paper-dark)",
                                },
                             }),
                     }}
                  >
                     {childItem.label}
                  </MuiMenuItem>
               ) : (
                  <SidebarCollapse
                     key={childItem.label + childItem.link}
                     menuItem={childItem}
                     isCollapseItem
                     drawerIsCollapsed={drawerIsCollapsed}
                     collapseDrawer={collapseDrawer}
                  />
               )
            )}
         </Menu>
      </>
   );
};

export default SidebarCollapseSm;
