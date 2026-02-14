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
import { MdChevronRight, MdLogout, MdPerson, MdSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { LuPanelLeft } from "react-icons/lu";
import { getFullUrl } from "@/utils/fileUtils";
import useThemeStore from "@/store/useThemeStore";
import { logout } from "@/services/auth.service";

const menuItems = [
   { path: "/settings/profile", label: "Settings", icon: <MdSettings /> },
];

interface Props {
   toggleSidebar: () => void;
}

const HeaderAdmin: React.FC<Props> = ({ toggleSidebar }) => {
   const [avatarMenuAnchor, setAvatarMenuAnchor] = useState<null | HTMLElement>(
      null
   );

   const { user, setUser, loading, setLoading } = useUserStore();
   const navigate = useNavigate();
   const themeMode = useThemeStore(s => s.theme)

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

   return (
      <Box
         component="header"
         className={`sticky left-0 top-0 z-1199 flex justify-between items-center border-b border-background-paper-light py-5 pl-5 pr-10 ${themeMode == 'dark' ? "bg-background" : "bg-background-paper"}`}
         id="header"
         sx={{
            height: "75px",
         }}
      >
         <Box className="flex gap-3 items-center">
            <IconButton onClick={toggleSidebar}>
               <LuPanelLeft className="text-base" />
            </IconButton>

         </Box>

         <Box className="flex gap-[15px] items-center">
            {/* <Tooltip title='Notifications'>
               <Notif />
            </Tooltip> */}

            <Button
               color="inherit"
               onClick={(e) => setAvatarMenuAnchor(e.currentTarget)}
               className="flex gap-2 items-center"
            >
               <Avatar
                  alt="User Avatar"
                  src={user ? getFullUrl(user.avatarUrl) : ""}
                  sx={{
                     width: "35px",
                     height: "35px",
                     cursor: "pointer",
                     "&:hover": {
                        opacity: 0.8,
                        transition: "opacity 0.2s ease-in-out",
                     },
                  }}
               >
                  {!user?.avatarUrl && (
                     <MdPerson size="35px" className="text-[#515151]/20" />
                  )}
               </Avatar>
               <Box>
                  <Typography
                     variant="body1"
                     className="text-start text-foreground-primary"
                  >
                     {user?.name}
                  </Typography>
                  <Typography
                     variant="body2"
                     className="text-start text-foreground-secondary"
                  >
                     {user?.email}
                  </Typography>
               </Box>
               <MdChevronRight
                  className={`${
                     avatarMenuAnchor ? "rotate-270" : "rotate-90"
                  } transition-transform text-foreground-secondary`}
               />
            </Button>
         </Box>

         {/* Avatar Dropdown Menu */}
         <Menu
            anchorEl={avatarMenuAnchor}
            open={Boolean(avatarMenuAnchor)}
            onClose={() => handleClose()}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            slotProps={{
               paper: {
                  sx: {
                     background: "var(--color-background-paper)",
                     mt: 1,
                     borderRadius: "10px",
                     minWidth: "240px",
                     boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
                     border: "1px solid rgba(0, 0, 0, 0.1)",
                  },
               },
            }}
         >
            {/* User Info Header */}
            <Box className="px-5 pt-0.5 pb-2.5 border-b border-[#1E1E1E0D]">
               <Typography variant="h6" className="text-foreground-primary">
                  {user?.name}
               </Typography>
               <Typography variant="body1" className="text-foreground-secondary">
                  {user?.email}
               </Typography>
            </Box>

            <Divider orientation="horizontal" />

            {/* Navigation Menu Items */}
            {menuItems.map((item) => {
               return (
                  <MenuItem
                     key={item.path}
                     onClick={() => {
                        navigate(item.path);
                        handleClose();
                     }}
                     className={`px-5 py-3`}
                  >
                     <ListItemIcon className="text-foreground-secondary text-xl">
                        {item.icon}
                     </ListItemIcon>
                     <ListItemText
                        primary={item.label}
                        slotProps={{
                           primary: {
                              className: "text-foreground-secondary",
                           },
                        }}
                     />
                  </MenuItem>
               );
            })}

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

export default HeaderAdmin;
