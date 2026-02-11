import useProgressBarHandler from "@/hooks/useProgressHandler";
import { useSnackbarStore } from "@/store/useSnackbarStore";
import {
   Snackbar,
   GlobalStyles,
   StyledEngineProvider,
   ThemeProvider,
} from "@mui/material";
import { Outlet, ScrollRestoration } from "react-router-dom";
import lightTheme from "@/configs/mui/muiLight";
import darkTheme from "@/configs/mui/muiDark";
import SilentAuthMiddleware from "@/middleware/SilentAuthMiddleware.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect } from "react";
import useThemeStore from "@/store/useThemeStore";

const Root = () => {
   const { snackbar, setSnackbar } = useSnackbarStore();
   const theme = useThemeStore(s => s.theme)
   useProgressBarHandler();

   useEffect(() => {
      const root = document.documentElement;
      if (theme === "dark") {
         root.classList.add("dark");
      } else {
         root.classList.remove("dark");
      }
      localStorage.setItem("theme", theme);
   }, [theme]);

   return (
      <StyledEngineProvider enableCssLayer>
         <SilentAuthMiddleware />
         <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
         <ThemeProvider theme={theme == "light" ? lightTheme : darkTheme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
               <Snackbar
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  open={Boolean(snackbar)}
                  onClose={() => setSnackbar(null)}
                  message={snackbar?.message}
                  autoHideDuration={5000}
               />
               <ScrollRestoration />
               <Outlet />
            </LocalizationProvider>
         </ThemeProvider>
      </StyledEngineProvider>
   );
};

export default Root;
