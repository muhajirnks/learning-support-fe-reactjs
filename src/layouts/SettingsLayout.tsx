import {
   Box,
   Divider,
   List,
   ListItem,
   ListItemButton,
   ListItemIcon,
   ListItemText,
   Typography,
} from "@mui/material";
import { MdLockOutline, MdOutlineColorLens, MdPersonOutline, MdSettings } from "react-icons/md";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const menu = [
   {
      icon: MdPersonOutline,
      label: "Profile",
      link: "/settings/profile",
   },
   {
      icon: MdLockOutline,
      label: "Password",
      link: "/settings/password",
   },
   {
      icon: MdOutlineColorLens,
      label: "Appearance",
      link: "/settings/appearance",
   },
];

const SettingsLayout = () => {
   const { pathname } = useLocation();
   const navigate = useNavigate();

   return (
      <Box className="flex min-h-[calc(80dvh)] items-stretch gap-4 p-10">
         <Box>
            <Box className="flex items-center gap-2 mb-5">
               <MdSettings className="text-2xl text-foreground-primary" />
               <Typography variant="h5" className="text-foreground-primary">
                  Settings
               </Typography>
            </Box>

            <List className="flex w-full flex-col gap-2">
               {menu.map((m) => {
                  const isActive =
                     m.link == "/"
                        ? m.link == pathname
                        : pathname.startsWith(m.link);

                  return (
                     <ListItem key={m.link} className="py-0">
                        <ListItemButton
                           className={`rounded-md items-center gap-2 w-52 ${
                              isActive ? "bg-background-paper" : ""
                           }`}
                           onClick={() => navigate(m.link)}
                        >
                           <ListItemIcon
                              className={`min-w-0 grid place-items-center`}
                           >
                              <m.icon className={`text-base`} />
                           </ListItemIcon>
                           <ListItemText>{m.label}</ListItemText>
                        </ListItemButton>
                     </ListItem>
                  );
               })}
            </List>
         </Box>
         <Divider orientation="vertical" flexItem className="border-background-paper-light" />
         <Box className="grow basis-0">
            <Outlet />
         </Box>
      </Box>
   );
};

export default SettingsLayout;
