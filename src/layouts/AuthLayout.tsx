import { Box, Fade, Slide, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "@/assets/react.svg";

interface Props {
   title?: string;
   description?: string;
   icon?: React.ReactNode;
   children?: React.ReactNode;
}

const AuthLayout: React.FC<Props> = ({
   title,
   description,
   icon,
   children,
}) => {
   return (
      <Box className="min-h-screen relative overflow-hidden">
         {/* Light Background with Patterns */}
         <Box className="absolute inset-0 bg-linear-to-br from-background via-background-paper-dark to-background-paper">
            {/* Floating Elements */}
            <Box className="absolute top-20 left-20 w-32 h-32 bg-black/5 rounded-full blur-xl animate-pulse" />
            <Box
               className="absolute bottom-32 right-20 w-48 h-48 bg-gray-800/5 rounded-full blur-2xl animate-pulse"
               style={{ animationDelay: "2s" }}
            />
            <Box
               className="absolute top-1/2 left-10 w-24 h-24 bg-black/10 rounded-full blur-xl animate-pulse"
               style={{ animationDelay: "4s" }}
            />
         </Box>

         <Box className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
            <Slide direction="up" in={true} timeout={600}>
               <Box className="w-full max-w-md">
                  {/* Logo Section */}
                  <Fade in={true} timeout={1000}>
                     <Box className="text-center mb-8">
                        <Link
                           to="/"
                           className="inline-flex items-center justify-center w-full h-full mb-4"
                        >
                           <img
                              src={logo}
                              alt="logo danantara"
                              className="w-20"
                           />
                        </Link>
                        <Typography variant="h3" className="text-foreground-primary">
                           {import.meta.env.VITE_APP_NAME}
                        </Typography>
                     </Box>
                  </Fade>

                  <Fade in={true} timeout={1200}>
                     <Box className="bg-background-paper backdrop-blur-xl rounded-3xl shadow-2xl border border-background-paper-light overflow-hidden">
                        {/* Card Header */}
                        <Box className="p-8 pb-6">
                           {icon}
                           <Typography
                              className={`text-[30px] font-semibold mb-2 text-foreground-primary ${
                                 icon ? "text-center" : "text-start"
                              }`}
                           >
                              {title}
                           </Typography>
                           <Typography
                              className={`text-[15px] ${
                                 icon ? "text-center" : "text-start"
                              }`}
                           >
                              {description}
                           </Typography>
                        </Box>

                        {/* Form Section */}
                        <Box className="px-8 pb-8">{children}</Box>
                     </Box>
                  </Fade>
               </Box>
            </Slide>
         </Box>

         {/* Footer */}
         <Fade in={true} timeout={1500}>
            <Box className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
               <Typography className="text-[16px] text-center">
                  Copyright © 2025 | All Rights Reserved.
               </Typography>
            </Box>
         </Fade>

         {/* Additional decorative elements */}
         <Box className="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-gray-300/10 to-transparent rounded-full blur-3xl" />
         <Box className="absolute bottom-0 left-0 w-96 h-96 bg-linear-to-tr from-black/5 to-transparent rounded-full blur-3xl" />
      </Box>
   );
};

export default AuthLayout;
