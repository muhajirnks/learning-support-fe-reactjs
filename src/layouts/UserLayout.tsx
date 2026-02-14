import Footer from "@/components/Footer";
import HeaderUser from "@/components/HeaderUser";
import {
   Box,
   Container,
   List,
   ListItemButton,
   ListItemIcon,
   ListItemText,
   Paper,
   useTheme,
   useMediaQuery,
   BottomNavigation,
   BottomNavigationAction,
} from "@mui/material";
import { Outlet, useLocation, Link } from "react-router-dom";
import { MdDashboard, MdHistory, MdPerson, MdPlayLesson } from "react-icons/md";

const UserLayout = () => {
   const location = useLocation();
   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

   const menuItems = [
      {
         label: "Dashboard",
         path: "/dashboard",
         icon: <MdDashboard size={22} />,
      },
      {
         label: "Kursus Saya",
         path: "/my-courses",
         icon: <MdPlayLesson size={22} />,
      },
      {
         label: "Riwayat Transaksi",
         path: "/transactions",
         icon: <MdHistory size={22} />,
      },
      {
         label: "Settings",
         path: "/settings/profile",
         icon: <MdPerson size={22} />,
      },
   ];

   const mobileMenuItems = [
      {
         label: "Dashboard",
         path: "/dashboard",
         icon: <MdDashboard size={22} />,
      },
      {
         label: "Kursus",
         path: "/my-courses",
         icon: <MdPlayLesson size={22} />,
      },
      {
         label: "Transaksi",
         path: "/transactions",
         icon: <MdHistory size={22} />,
      },
      {
         label: "Settings",
         path: "/settings/profile",
         icon: <MdPerson size={22} />,
      },
   ];

   return (
      <Box className="flex flex-col min-h-screen bg-gray-50" sx={{pb: isMobile ? 10 : 0}}>
         <HeaderUser />

         <Box
            component="main"
            className="grow py-6 md:py-8"
            sx={{
               pb: isMobile ? "80px" : "32px", // Space for bottom nav on mobile
            }}
         >
            <Container maxWidth="xl">
               <Box className="flex flex-col md:flex-row gap-8">
                  {/* Sidebar for Desktop */}
                  {!isMobile && (
                     <Box sx={{ width: 280, flexShrink: 0 }}>
                        <Paper
                           elevation={0}
                           sx={{
                              p: 2,
                              borderRadius: 4,
                              border: "1px solid",
                              borderColor: "divider",
                              position: "sticky",
                              top: 100,
                           }}
                        >
                           <List component="nav" sx={{ p: 0 }}>
                              {menuItems.map((item) => {
                                 const isActive =
                                    location.pathname === item.path;
                                 return (
                                    <ListItemButton
                                       key={item.path}
                                       component={Link}
                                       to={item.path}
                                       selected={isActive}
                                       sx={{
                                          borderRadius: 2,
                                          mb: 1,
                                          py: 1.5,
                                          "&.Mui-selected": {
                                             bgcolor: "primary.light",
                                             "&:hover": {
                                                bgcolor: "primary.light",
                                             },
                                             "& .MuiListItemIcon-root": {
                                                color: "primary.contrastText",
                                             },
                                             "& .MuiListItemText-primary": {
                                                color: "primary.contrastText",
                                             },
                                          },
                                       }}
                                    >
                                       <ListItemIcon
                                          sx={{
                                             minWidth: 40,
                                             color: isActive
                                                ? "primary.main"
                                                : "text.secondary",
                                          }}
                                       >
                                          {item.icon}
                                       </ListItemIcon>
                                       <ListItemText
                                          primary={item.label}
                                          primaryTypographyProps={{
                                             fontWeight: isActive ? 700 : 500,
                                          }}
                                       />
                                    </ListItemButton>
                                 );
                              })}
                           </List>
                        </Paper>
                     </Box>
                  )}

                  {/* Main Content */}
                  <Box className="grow">
                     <Outlet />
                  </Box>
               </Box>
            </Container>
         </Box>

         {/* Bottom Navigation for Mobile */}
         {isMobile && (
            <Paper
               sx={{
                  position: "fixed",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  zIndex: 1200,
                  borderTop: "1px solid",
                  borderColor: "divider",
                  borderRadius: "20px 20px 0 0",
                  overflow: "hidden",
                  boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
               }}
               elevation={3}
            >
               <BottomNavigation
                  showLabels
                  value={location.pathname}
                  sx={{ height: 70 }}
               >
                  {mobileMenuItems.map((item) => (
                     <BottomNavigationAction
                        key={item.path}
                        label={item.label}
                        value={item.path}
                        icon={item.icon}
                        component={Link}
                        to={item.path}
                        sx={{
                           color: "text.secondary",
                           textAlign: 'center',
                           "&.Mui-selected": {
                              color: "primary.main",
                              fontWeight: 700,
                           },
                        }}
                     />
                  ))}
               </BottomNavigation>
            </Paper>
         )}

         {!isMobile && <Footer />}
      </Box>
   );
};

export default UserLayout;
