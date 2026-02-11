import {
   Box,
   CircularProgress,
   debounce,
   InputAdornment,
   List,
   ListItem,
   ListItemButton,
   TextField,
   Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const HeaderSearch = () => {
   const [search, setSearch] = useState("");
   const [loading, setLoading] = useState(false);
   const [openSearch, setOpenSearch] = useState(false);
   const [searchResult, setSearchResult] = useState<Record<string, any>>({})

   const navigate = useNavigate();

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const search = e.target.value;
      setLoading(true);
      setSearch(search);
      handleSearch(search);
      if (search) {
         setOpenSearch(true);
      } else {
         handleSearch.clear();
         setOpenSearch(false);
      }
   };

   const handleSearch = useMemo(
      () =>
         debounce(async (q: string) => {
            if (q) {
               // TODO: Implement global search
               setSearchResult({});
            }
            setLoading(false);
         }, 800),
      []
   );

   const handleClickOption = (url: string) => {
      setOpenSearch(false);
      setSearch("");
      navigate(url);
   };

   return (
      <Box className="relative">
         <TextField
            placeholder="Search for..."
            value={search}
            className={`bg-background-paper text-foreground-secondary w-100`}
            sx={{
               "& input": {
                  py: "13px",
                  borderRadius: "6px",
               },
               "& fieldset": {
                  border: "0.6px solid var(--color-background-paper-light)",
                  borderRadius: "6px",
                  transitionProperty: "border-color",
                  transitionDuration: "100ms",
               },
               "& .MuiInputBase-root:hover fieldset": {
                  border: "0.6px solid var(--color-foreground-secondary)",
               },
               "& input:focus ~ fieldset": {
                  border: "0.6px solid var(--color-primary) !important",
               },
               borderRadius: "6px",
            }}
            slotProps={{
               input: {
                  startAdornment: (
                     <InputAdornment position="start">
                        <HiMiniMagnifyingGlass className="text-foreground-secondary text-lg" />
                     </InputAdornment>
                  ),
               },
            }}
            onChange={handleChange}
            onFocus={() => search && setOpenSearch(true)}
            onBlur={() => setOpenSearch(false)}
         />

         {openSearch && (
            <Box
               className="absolute top-14 rounded-xl bg-background-paper border border-background-paper-light shadow-xl w-full"
               onMouseDown={(e) => {
                  e.preventDefault();
               }}
            >
               {loading ? (
                  <Box className="flex justify-center py-3 px-4">
                     <CircularProgress size={20} />
                  </Box>
               ) : !searchResult.employees.length &&
                 !searchResult.visitors.length ? (
                  <Box className="flex justify-center py-3 px-4">No Data</Box>
               ) : (
                  // TODO: Change search result
                  <Box className="pt-3">
                     {Boolean(searchResult.employees.length) && (
                        <>
                           <Typography
                              variant="body1"
                              className="text-foreground-primary font-bold px-4"
                           >
                              Employee
                           </Typography>
                           <List>
                              {searchResult.employees.map((employee: any) => (
                                 <ListItem key={employee.id} disablePadding>
                                    <ListItemButton
                                       onClick={() =>
                                          handleClickOption(
                                             `/employee?search=${employee.name}`
                                          )
                                       }
                                    >
                                       <Typography variant="body1">
                                          {employee.name}
                                       </Typography>
                                    </ListItemButton>
                                 </ListItem>
                              ))}
                           </List>
                        </>
                     )}
                     {Boolean(searchResult.visitors.length) && (
                        <>
                           <Typography
                              variant="body1"
                              className="text-foreground-primary font-bold px-4"
                           >
                              Visitor
                           </Typography>
                           <List>
                              {searchResult.visitors.map((visitor: any) => (
                                 <ListItem key={visitor.id} disablePadding>
                                    <ListItemButton
                                       onClick={() =>
                                          handleClickOption(
                                             `/visitor?search=${visitor.name}`
                                          )
                                       }
                                    >
                                       <Typography variant="body1">
                                          {visitor.name}
                                       </Typography>
                                    </ListItemButton>
                                 </ListItem>
                              ))}
                           </List>
                        </>
                     )}
                  </Box>
               )}
            </Box>
         )}
      </Box>
   );
};

export default HeaderSearch;
