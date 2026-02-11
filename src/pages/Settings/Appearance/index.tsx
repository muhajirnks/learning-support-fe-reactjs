import useThemeStore from "@/store/useThemeStore";
import {
   Box,
   ToggleButton,
   ToggleButtonGroup,
   Typography,
} from "@mui/material";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const themes = [
   {
      label: "Light",
      value: "light",
      icon: MdLightMode
   },
   {
      label: "Dark",
      value: "dark",
      icon: MdDarkMode
   },
];

const Appearance = () => {
   const { theme, setTheme } = useThemeStore();

   const handleChange = (
      _: React.MouseEvent<HTMLElement, MouseEvent>,
      val: any
   ) => {
      if (val === null) {
         return
      }
      setTheme(val);
   };

   return (
      <Box className="px-3">
         <Box className="mb-5">
            <Typography variant="h5" className="text-foreground-primary">
               Appearance
            </Typography>
            <Typography variant="body1">Update your appearance</Typography>
         </Box>

         <Box>
            <ToggleButtonGroup
               color="primary"
               value={theme}
               exclusive
               onChange={handleChange}
            >
               {themes.map((t) => (
                  <ToggleButton key={t.value} value={t.value} className="normal-case gap-2 py-2">
                     <t.icon />
                     {t.label}
                  </ToggleButton>
               ))}
            </ToggleButtonGroup>
         </Box>
      </Box>
   );
};

export default Appearance;
