import { createRoot } from "react-dom/client";
import "@/assets/css/index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./configs/routes/routes.tsx";
import { GlobalStyles, StyledEngineProvider, ThemeProvider } from "@mui/material";
import theme from "./configs/mui/muiLight.ts";

createRoot(document.getElementById("root")!).render(
   <StyledEngineProvider enableCssLayer>
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      <ThemeProvider theme={theme}>
         <RouterProvider router={router} />
      </ThemeProvider>
   </StyledEngineProvider>
);
