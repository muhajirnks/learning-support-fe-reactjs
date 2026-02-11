import {
   Box,
   Button,
   type ButtonProps,
   type ButtonTypeMap,
   type ExtendButtonBase,
} from "@mui/material";

const ButtonLinear = (props: ButtonProps) => {
   return (
      <Button
         variant="contained"
         {...props}
         className={`relative overflow-hidden group ${props.className}`}
      >
         <Box
            className={`${
               props.loading || props.disabled ? "opacity-0" : "opacity-100"
            } duration-100 transition-opacity absolute w-full aspect-square`}
         >
            <Box
               className={`bg-linear-to-r from-primary to-secondary w-full h-full group-hover:rotate-180 group-hover:brightness-75 transition-all duration-700`}
            ></Box>
         </Box>
         <Box className="relative z-10 flex items-center gap-2">
            {props.children}
         </Box>
      </Button>
   );
}; 

export default ButtonLinear as ExtendButtonBase<ButtonTypeMap>;
