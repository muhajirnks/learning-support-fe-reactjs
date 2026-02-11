import { Box, LinearProgress } from "@mui/material";
import logo from "@/assets/react.svg";

const Loading = () => {
   return (
      <Box className="w-screen fixed top-0 left-0 z-9999 h-dvh grid place-items-center px-5">
         <Box className="w-full max-w-100">
            <Box className="flex items-center mx-auto justify-center mb-8">
               <img className="w-28" src={logo} alt="" />
            </Box>
            <LinearProgress />
         </Box>
      </Box>
   );
};

export default Loading;
