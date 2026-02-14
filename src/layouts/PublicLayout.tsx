import FooterPublic from "@/components/FooterPublic";
import HeaderPublic from "@/components/HeaderPublic";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
   return (
      <Box className="flex flex-col min-h-screen">
         <HeaderPublic />

         <Box component="main" className="grow">
            <Outlet />
         </Box>

         <FooterPublic />
      </Box>
   );
};

export default PublicLayout;
