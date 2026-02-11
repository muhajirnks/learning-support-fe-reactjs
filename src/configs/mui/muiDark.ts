"use client";

import { createTheme, alpha } from "@mui/material/styles";

// Augment the palette to include custom colors
declare module "@mui/material/styles" {
   interface Palette {}

   interface PaletteOptions {}
}

const theme = createTheme({
   typography: {
      allVariants: {
         fontSize: 14,
         fontFamily: '"Poppins", sans-serif',
         color: "var(--color-foreground-secondary)",
      },
      h1: {
         fontSize: 50,
         lineHeight: 1.5,
         fontFamily: '"Poppins", sans-serif',
         fontWeight: 700,
      },
      h2: {
         fontSize: 30,
         lineHeight: 1.5,
         fontFamily: '"Poppins", sans-serif',
         fontWeight: 700,
      },
      h3: {
         fontSize: 25,
         lineHeight: 1.5,
         fontFamily: '"Poppins", sans-serif',
         fontWeight: 600,
      },
      h4: {
         fontSize: 22,
         lineHeight: 1.5,
         fontFamily: '"Poppins", sans-serif',
         fontWeight: 600,
      },
      h5: {
         fontSize: 20,
         lineHeight: 1.5,
         fontFamily: '"Poppins", sans-serif',
         fontWeight: 500,
      },
      h6: {
         fontSize: 18,
         lineHeight: 1.5,
         fontFamily: '"Poppins", sans-serif',
         fontWeight: 500,
      },
      body1: {
         fontSize: 14,
         lineHeight: 1.5,
      },
      body2: {
         fontSize: 12,
         lineHeight: 1.5,
      },
      caption: {
         fontSize: 12,
         lineHeight: 1.5,
         fontFamily: '"Poppins", sans-serif',
      },
      fontFamily: '"Poppins", sans-serif',
   },
   palette: {
      mode: "dark",
      primary: {
         light: "#2c649c",
         main: "#255A8F",
         dark: "#1d4c7a",
         contrastText: "#fff",
      },
      secondary: {
         light: "#acb2fa",
         main: "#00C2FF",
         dark: "#9299f0",
         contrastText: "#fff",
      },
      background: {
         default: "#0D1120",
         paper: "#131629",
      },
      text: {
         primary: "#FFFFFF",
         secondary: "#AEB9E1",
      },
   },
   components: {
      MuiButton: {
         styleOverrides: {
            root: {
               borderRadius: 8,
               textTransform: "none",
               fontWeight: 600,
               boxShadow: "none",
               lineHeight: 1.5,
               padding: "10px 20px",
               "&:hover": {
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
               },
            },
         },
      },
      MuiCard: {
         styleOverrides: {
            root: {
               borderRadius: 10,
               boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.05)",
            },
         },
      },
      MuiCardContent: {
         styleOverrides: {
            root: {
               padding: 30,
            },
         },
      },
      MuiChip: {
         styleOverrides: {
            root: ({ ownerState, theme }) => ({
               borderRadius: 6,
               fontWeight: 500,
               fontSize: 12,
               ...(ownerState.color === "success" && {
                  backgroundColor: "#064E3B",
                  color: "#6EE7B7",
               }),
               ...(ownerState.color === "error" && {
                  backgroundColor: "#7F1D1D",
                  color: "#FCA5A5",
               }),
               ...(ownerState.color === "warning" && {
                  backgroundColor: "#78350F",
                  color: "#FCD34D",
               }),
               ...(ownerState.color === "primary" && {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
               }),
            }),
         },
      },
      MuiPaper: {
         styleOverrides: {
            root: {
               borderRadius: 10,
               backgroundImage: "unset",
            },
         },
      },
   },
   breakpoints: {
      values: {
         xs: 0,
         sm: 640,
         md: 768,
         lg: 1024,
         xl: 1280,
      },
   },
});

export default theme;
