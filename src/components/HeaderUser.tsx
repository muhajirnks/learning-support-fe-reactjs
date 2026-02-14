import useUserStore from "@/store/useUserStore";
import {
   Avatar,
   Box,
   Button,
   CircularProgress,
   Divider,
   IconButton,
   ListItemIcon,
   ListItemText,
   Menu,
   MenuItem,
   Typography,
} from "@mui/material";
import { useState } from "react";
import {
   MdChevronRight,
   MdLogout,
   MdSettings,
} from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import { LuPanelLeft } from "react-icons/lu";
import useThemeStore from "@/store/useThemeStore";
import { logout } from "@/services/auth.service";

interface Props {
   toggleSidebar?: () => void;
   isSeller?: boolean;
}

const HeaderUser: React.FC<Props> = ({ toggleSidebar, isSeller = false }) => {
   const [avatarMenuAnchor, setAvatarMenuAnchor] = useState<null | HTMLElement>(
      null,
   );

   const { user, setUser, loading, setLoading } = useUserStore();
   const navigate = useNavigate();
   const themeMode = useThemeStore((s) => s.theme);

   const handleClose = () => {
      setAvatarMenuAnchor(null);
   };

   const handleLogoout = async () => {
      setLoading(true);

      const { data } = await logout();
      if (data) {
         setUser(null);
      }

      handleClose();
      setLoading(false);
   };

   const avatarMenuItems = [
      { path: "/settings/profile", label: "Settings", icon: <MdSettings /> },
   ];

   return (
      <Box
         component="header"
         className={`sticky left-0 top-0 z-1199 flex justify-between items-center border-b border-background-paper-light py-5 max-sm:px-4 px-10 ${themeMode == "dark" ? "bg-background" : "bg-background-paper"}`}
         id="header"
         sx={{
            height: "75px",
         }}
      >
         <Box className="flex gap-3 items-center">
            {isSeller ? (
               <IconButton onClick={toggleSidebar}>
                  <LuPanelLeft className="text-base" />
               </IconButton>
            ) : (
               <Typography
                  variant="h6"
                  component={Link}
                  to="/"
                  className="font-bold text-primary no-underline mr-4"
               >
                  {import.meta.env.VITE_APP_NAME}
               </Typography>
            )}
         </Box>

         <Box className="flex gap-[15px] items-center">
            {user ? (
               <Button
                  color="inherit"
                  onClick={(e) => setAvatarMenuAnchor(e.currentTarget)}
                  className="flex gap-2 items-center"
               >
                  <Avatar
                     alt={user.name || "User Avatar"}
                     sx={{
                        width: "35px",
                        height: "35px",
                        cursor: "pointer",
                        "&:hover": {
                           opacity: 0.8,
                           transition: "opacity 0.2s ease-in-out",
                        },
                     }}
                  />
                  <Box className="flex flex-col items-start text-left normal-case">
                     <Typography
                        variant="body2"
                        className="font-semibold line-clamp-1"
                     >
                        {user.name}
                     </Typography>
                     <Typography variant="caption" color="text.secondary">
                        {user.role}
                     </Typography>
                  </Box>
                  <MdChevronRight
                     className={`${
                        avatarMenuAnchor ? "rotate-270" : "rotate-90"
                     } transition-transform text-foreground-secondary ml-1`}
                  />
               </Button>
            ) : (
               <Box className="flex gap-2">
                  <Button
                     component={Link}
                     to="/login"
                     variant="outlined"
                     color="primary"
                     size="small"
                     className="rounded-full px-6"
                  >
                     Login
                  </Button>
                  <Button
                     component={Link}
                     to="/register"
                     variant="contained"
                     color="primary"
                     size="small"
                     className="rounded-full px-6"
                  >
                     Register
                  </Button>
               </Box>
            )}
         </Box>

         {/* Avatar Dropdown Menu */}
         <Menu
            anchorEl={avatarMenuAnchor}
            open={Boolean(avatarMenuAnchor)}
            onClose={handleClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            sx={{
               "& .MuiPaper-root": {
                  background: "var(--color-background-paper)",
                  mt: 1,
                  borderRadius: "10px",
                  minWidth: "220px",
                  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
               },
            }}
         >
            {/* User Info Header */}
            <Box className="px-5 pt-0.5 pb-2.5 border-b border-[#1E1E1E0D]">
               <Typography variant="h6" className="text-foreground-primary">
                  {user?.name}
               </Typography>
               <Typography
                  variant="body1"
                  className="text-foreground-secondary"
               >
                  {user?.email}
               </Typography>
            </Box>

            <Divider orientation="horizontal" />

            {/* Navigation Menu Items */}
            {avatarMenuItems.map((item) => (
               <MenuItem
                  key={item.path}
                  onClick={() => {
                     navigate(item.path);
                     handleClose();
                  }}
                  className="py-3 px-5 hover:bg-background-paper-light transition-colors"
               >
                  <ListItemIcon className="text-xl text-foreground-secondary min-w-[35px]">
                     {item.icon}
                  </ListItemIcon>
                  <ListItemText
                     primary={item.label}
                     primaryTypographyProps={{
                        variant: "body2",
                        className: "font-medium",
                     }}
                  />
               </MenuItem>
            ))}

            {/* Logout */}
            <MenuItem
               onClick={handleLogoout}
               className="px-5 py-3"
               disabled={loading}
            >
               <ListItemIcon className="text-red-600 text-xl">
                  {loading ? <CircularProgress size={18} /> : <MdLogout />}
               </ListItemIcon>
               <ListItemText
                  primary="Logout"
                  slotProps={{
                     primary: {
                        className: "font-[12px] leading-[150%] text-red-600",
                     },
                  }}
               />
            </MenuItem>
         </Menu>
      </Box>
   );
};

export default HeaderUser;
