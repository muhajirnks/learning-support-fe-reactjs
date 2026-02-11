import { useEffect } from "react";
import { menu } from "@/configs/menu/menu";
import { Box, Drawer, List, Typography, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "@/assets/react.svg";
import smallLogo from "@/assets/react.svg";
import theme from "@/configs/mui/muiLight";
import useThemeStore from "@/store/useThemeStore";
import SidebarCollapse from "./SidebarCollapse";
import SidebarItem from "./SidebarItem";

export const DRAWER_WIDTH_EXPANDED = 270;
export const DRAWER_WIDTH_COLLAPSED = 80;

interface Props {
   isCollapsed: boolean;
   setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<Props> = ({ isCollapsed, setIsCollapsed }) => {
   const themeMode = useThemeStore((s) => s.theme);
   const isDownLg = useMediaQuery(theme.breakpoints.down("lg"));

   const currentWidth = isCollapsed
      ? DRAWER_WIDTH_COLLAPSED
      : DRAWER_WIDTH_EXPANDED;

   useEffect(() => {
      if (isDownLg) {
         setIsCollapsed(true);
      } else {
         setIsCollapsed(false);
      }
   }, [isDownLg]);

   return (
      <Box
         className="shrink-0 transition-[width] duration-300"
         component="nav"
         sx={{ width: currentWidth }}
      >
         <Drawer
            variant="permanent"
            className="transition-[width] duration-300"
            sx={{
               "& .MuiDrawer-paper": {
                  transitionProperty: "width",
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                  transitionDuration: "300ms",
                  boxSizing: "border-box",
                  overflow: "hidden",
                  borderRadius: "0",
                  borderRight: "1px solid var(--color-background-paper-light)",
                  background:
                     themeMode == "dark"
                        ? "var(--color-background)"
                        : "var(--color-background-paper)",
                  color: "var(--color-foreground)",
                  paddingBlock: {
                     xs: "40px",
                  },
                  paddingInline: {
                     xs: isCollapsed ? "15px" : "20px",
                  },
                  width: currentWidth,
               },
            }}
         >
            {/* Logo Section */}
            {!isCollapsed && (
               <Box className="flex items-center gap-2 justify-center transition-opacity duration-300">
                  <Link className="items-center flex gap-3 mx-auto" to="/">
                     <img
                        src={logo}
                        alt="logo hrease"
                        className="items-center w-9 h-9"
                     />

                     <Typography
                        variant="h5"
                        className="text-foreground-primary"
                     >
                        {import.meta.env.VITE_APP_NAME}
                     </Typography>
                  </Link>
               </Box>
            )}

            {/* Collapsed Logo */}
            {isCollapsed && (
               <Box className="flex items-center justify-center transition-opacity duration-300">
                  <Link className="items-center mx-auto w-[35px]" to="/">
                     <img
                        src={smallLogo}
                        alt="logo hrease"
                        className="items-center"
                     />
                  </Link>
               </Box>
            )}

            <Box className="my-5 w-full h-px"></Box>

            {/* Menu */}
            <Box className="flex flex-col justify-between items-end h-dvh">
               <List className="flex w-full flex-col gap-1">
                  {menu.map((menuItem) => {
                     if (menuItem.children) {
                        return (
                           <SidebarCollapse
                              key={menuItem.label + menuItem.link}
                              menuItem={menuItem}
                              drawerIsCollapsed={isCollapsed}
                              collapseDrawer={() => setIsCollapsed(true)}
                           />
                        );
                     }

                     return (
                        <SidebarItem
                           key={menuItem.label + menuItem.link}
                           menuItem={menuItem}
                           drawerIsCollapsed={isCollapsed}
                           collapseDrawer={() => setIsCollapsed(true)}
                        />
                     );
                  })}
               </List>
            </Box>
         </Drawer>
      </Box>
   );
};

export default Sidebar;
