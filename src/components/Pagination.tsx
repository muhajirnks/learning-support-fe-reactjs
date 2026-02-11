import { Box, Button, List, MenuItem, Select, Typography } from "@mui/material";
import usePagination from "@mui/material/usePagination";
import React from "react";
import { MdArrowBack, MdArrowForward, MdExpandMore } from "react-icons/md";

interface Props {
   lastPage: number;
   total: number;
   page: number;
   limit: number;
   rowsPerPageOptions: number[];
   onChangeRowsPerPage: (limit: number) => void;
   onChangePage: (page: number) => void;
}

const Pagination: React.FC<Props> = ({
   lastPage,
   total,
   page,
   limit,
   rowsPerPageOptions,
   onChangeRowsPerPage,
   onChangePage,
}) => {
   const { items } = usePagination({
      count: lastPage,
      page: page,
      siblingCount: 1,
      boundaryCount: 1,
   });

   return (
      <Box className="flex items-center justify-between mt-4 px-2">
         <Typography variant="body1" className="text-foreground-primary">
            {Math.min((page - 1) * limit + 1, total)} -{" "}
            {Math.min(limit * page, total)} of {total}
         </Typography>
         <Box className="flex items-center gap-12">
            <Box className="flex items-center gap-2 text-sm text-gray-600">
               <Typography variant="body1">Show</Typography>
               <Select
                  value={limit}
                  onChange={(e) => onChangeRowsPerPage(e.target.value)}
                  size="small"
                  sx={{
                     minWidth: 64,
                     color: "var(--color-foreground-primary)", // warna teks
                     backgroundColor: "var(--color-background-paper-dark)", // warna latar belakang
                     border: "1px solid var(--color-background-paper-light)",
                     borderRadius: "8px",
                     "& .MuiSelect-select": {
                        padding: "6px 28px 6px 12px", // jarak teks dan icon
                        display: "flex",
                        alignItems: "center",
                     },
                     "& .MuiOutlinedInput-notchedOutline": {
                        border: "none", // hilangkan border
                     },
                     "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                     },
                     "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                     },
                     "& .MuiSvgIcon-root": {
                        color: "#8b90a0", // warna icon dropdown
                     },
                  }}
                  IconComponent={MdExpandMore}
                  MenuProps={{
                     PaperProps: {
                        sx: {
                           backgroundColor: "var(--color-background-paper)", // warna background dropdown
                           color: "var(--color-foreground-secondary)", // warna teks menu
                           borderRadius: "8px",
                           mt: 1,
                           boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                           "& .MuiMenuItem-root": {
                              "&:hover": {
                                 backgroundColor: "rgba(255,255,255,0.08)", // efek hover lembut
                              },
                              "&.Mui-selected": {
                                 backgroundColor: "rgba(255,255,255,0.12)", // warna saat terpilih
                                 "&:hover": {
                                    backgroundColor: "rgba(255,255,255,0.18)",
                                 },
                              },
                           },
                        },
                     },
                  }}
               >
                  {rowsPerPageOptions.map((option) => (
                     <MenuItem key={option} value={option}>
                        {option}
                     </MenuItem>
                  ))}
               </Select>
            </Box>
            <List className="flex items-center gap-1 shrink-0">
               {items.map(({ page: _page, type, selected, ...item }, index) => {
                  let children = null;

                  if (type === "start-ellipsis" || type === "end-ellipsis") {
                     children = <Box className="w-9 h-9 grid place-items-center">...</Box>;
                  } else if (type === "page") {
                     children = (
                        <Button
                           {...item}
                           className={`bg-background-paper-dark hover:bg-background-paper border border-background-paper-light min-w-0 p-0 w-9 h-9 grid place-items-center ${
                              selected ? "text-primary" : "text-foreground-secondary"
                           }`}
                           type="button"
                           style={{
                              fontWeight: selected ? "bold" : undefined,
                           }}
                           onClick={() => onChangePage(_page!)}
                        >
                           {_page}
                        </Button>
                     );
                  } else {
                     children = (
                        <Button
                           {...item}
                           className={`${
                              item.disabled
                                 ? ""
                                 : "bg-background-paper-dark hover:bg-background-paper border border-background-paper-light"
                           } min-w-0 p-0 w-9 h-9 grid place-items-center`}
                           type="button"
                           onClick={() =>
                              onChangePage(
                                 type === "previous" ? page - 1 : page + 1
                              )
                           }
                        >
                           {type === "previous" ? (
                              <MdArrowBack
                                 className={`${
                                    item.disabled ? "" : "text-foreground-secondary"
                                 } text-lg`}
                              />
                           ) : type === "next" ? (
                              <MdArrowForward
                                 className={`${
                                    item.disabled ? "" : "text-foreground-secondary"
                                 } text-lg`}
                              />
                           ) : null}
                        </Button>
                     );
                  }

                  return <li key={index}>{children}</li>;
               })}
            </List>
         </Box>
      </Box>
   );
};

export default Pagination;
