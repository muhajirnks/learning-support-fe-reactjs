import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidebar, {
   DRAWER_WIDTH_COLLAPSED,
   DRAWER_WIDTH_EXPANDED,
} from "@/components/sidebar/Sidebar";
import { Box } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
   const [isCollapsed, setIsCollapsed] = useState(false);

   const toggleSidebar = () => {
      setIsCollapsed(!isCollapsed);
   };

   return (
      <Box className="flex w-full">
         <Box className="min-h-dvh shadow-card z-1201">
            <Sidebar
               isCollapsed={isCollapsed}
               setIsCollapsed={setIsCollapsed}
            />
         </Box>

         <Box
            sx={{
               width: `calc(100% - ${
                  isCollapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH_EXPANDED
               }px)`,
            }}
         >
            <Header toggleSidebar={toggleSidebar} />

            <Box className="min-h-[80%]">
               <Outlet />
            </Box>

            <Footer />
         </Box>
      </Box>
   );
};

export default MainLayout;
