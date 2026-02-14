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
      <Box className="flex flex-col md:flex-row min-h-[calc(80dvh)] items-stretch gap-4 p-5 md:p-10">
         <Box className="w-full md:w-auto">
            <Box className="flex items-center gap-2 mb-5">
               <MdSettings className="text-2xl text-foreground-primary" />
               <Typography variant="h5" className="text-foreground-primary">
                  Settings
               </Typography>
            </Box>

            <List className="flex w-full flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
               {menu.map((m) => {
                  const isActive =
                     m.link == "/"
                        ? m.link == pathname
                        : pathname.startsWith(m.link);

                  return (
                     <ListItem key={m.link} className="py-0 px-0 md:px-0 w-auto md:w-full">
                        <ListItemButton
                           className={`rounded-md items-center gap-2 w-max md:w-52 whitespace-nowrap ${
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
         <Divider orientation="horizontal" className="block md:hidden border-background-paper-light" />
         <Divider orientation="vertical" flexItem className="hidden md:block border-background-paper-light" />
         <Box className="grow basis-0 mt-4 md:mt-0">
            <Outlet />
         </Box>
      </Box>
   );
};

export default SettingsLayout;
