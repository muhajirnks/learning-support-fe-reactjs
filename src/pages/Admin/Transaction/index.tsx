import { useEffect, useMemo, useState } from "react";
import DataTable, { createTableConfig } from "@/components/DataTable";
import {
   Box,
   Container,
   IconButton,
   Typography,
   Card,
   CardContent,
   InputAdornment,
   debounce,
   Chip,
   Menu,
   MenuItem,
} from "@mui/material";
import {
   MdSearch,
   MdMoreVert,
   MdCheck,
   MdClose,
} from "react-icons/md";
import {
   useListTransactions,
   updateTransactionStatus,
} from "@/services/transaction.service";
import { useSnackbarStore } from "@/store/useSnackbarStore";
import type {
   ListTransactionParams,
   TransactionStatus,
} from "@/types/api/transaction.type";
import Input from "@/components/form/Input";
import Pagination from "@/components/Pagination";
import { useSearchParams } from "react-router-dom";
import { sanitizePaginationQs } from "@/utils/sanitizeQs";
import { toQueryString } from "@/lib/fetch/createFetch";

const tableConfig = createTableConfig({
   uniqueField: "_id",
   columns: [
      {
         key: "user",
         label: "User",
         type: "custom",
         renderValue: (user: any) => (
            <Box>
               <Typography variant="body2" fontWeight="medium">
                  {user?.name}
               </Typography>
               <Typography variant="caption" color="text.secondary">
                  {user?.email}
               </Typography>
            </Box>
         ),
      },
      {
         key: "course",
         label: "Course",
         type: "custom",
         renderValue: (course: any) => course?.title || "-",
      },
      {
         key: "amount",
         sortKey: "amount",
         label: "Amount",
         type: "custom",
         renderValue: (amount: number) =>
            new Intl.NumberFormat("id-ID", {
               style: "currency",
               currency: "IDR",
               maximumFractionDigits: 0,
            }).format(amount),
      },
      {
         key: "status",
         sortKey: "status",
         label: "Status",
         type: "custom",
         renderValue: (status: TransactionStatus) => {
            const color =
               status === "success"
                  ? "success"
                  : status === "failed"
                    ? "error"
                    : "warning";
            return (
               <Chip
                  label={status.toUpperCase()}
                  color={color}
                  size="small"
                  variant="outlined"
               />
            );
         },
      },
      {
         key: "createdAt",
         sortKey: "createdAt",
         label: "Date",
         type: "datetime",
      },
   ],
});

const rowsPerPageOptions = [10, 25, 50];

const AdminTransaction = () => {
   const [searchParams, setSearchParams] = useSearchParams();
   const [searchQuery, setSearchQuery] = useState(
      searchParams.get("search") || "",
   );
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
   const [selectedId, setSelectedId] = useState<string | null>(null);

   const [qs, setQs] = useState<ListTransactionParams>(() =>
      sanitizePaginationQs(searchParams, rowsPerPageOptions, ["createdAt"]),
   );

   const { data, loading, fetchData } = useListTransactions(qs);
   const setSnackbar = useSnackbarStore((s) => s.setSnackbar);

   const handleOpenMenu = (
      event: React.MouseEvent<HTMLButtonElement>,
      id: string,
   ) => {
      setAnchorEl(event.currentTarget);
      setSelectedId(id);
   };

   const handleCloseMenu = () => {
      setAnchorEl(null);
      setSelectedId(null);
   };

   const handleUpdateStatus = async (status: TransactionStatus) => {
      if (!selectedId) return;

      const { data, error } = await updateTransactionStatus(selectedId, {
         status,
      });
      if (data) {
         setSnackbar({
            type: "success",
            message: "Transaction status updated",
         });
         fetchData();
      }
      if (error) {
         setSnackbar({
            type: "failure",
            message: error.message || "Failed to update status",
         });
      }
      handleCloseMenu();
   };

   const handleChangeSort = (sortKey: string) => {
      const isAsc = qs.sort === sortKey && qs.direction === "asc";
      setQs({ ...qs, sort: sortKey, direction: isAsc ? "desc" : "asc" });
   };

   const handleChangePage = (page: number) => {
      setQs({ ...qs, page });
   };

   const handleChangeRowsPerPage = (limit: number) => {
      setQs({ ...qs, page: 1, limit });
   };

   const debouncedSearch = useMemo(
      () =>
         debounce((search: string) => {
            setQs({ ...qs, page: 1, search });
         }, 800),
      [qs],
   );

   useEffect(() => {
      setSearchParams(toQueryString(qs));
   }, [qs]);

   return (
      <Container maxWidth="2xl" sx={{ mt: 4, mb: 4 }}>
         <Card>
            <CardContent>
               <Typography
                  variant="h5"
                  className="text-foreground-primary mb-5"
               >
                  Manage Transactions
               </Typography>

               <Box className="flex justify-end items-center gap-4 mb-5">
                  <Input
                     fullWidth
                     placeholder="Search transactions..."
                     value={searchQuery}
                     onChange={(e) => {
                        setSearchQuery(e.target.value);
                        debouncedSearch(e.target.value);
                     }}
                     size="small"
                     InputProps={{
                        startAdornment: (
                           <InputAdornment position="start">
                              <MdSearch />
                           </InputAdornment>
                        ),
                     }}
                  />
               </Box>

               <DataTable
                  loading={loading}
                  rows={data?.data || []}
                  config={tableConfig}
                  sortBy={qs.sort || "createdAt"}
                  sort={qs.direction || "desc"}
                  onChangeSort={handleChangeSort}
                  renderAction={(row) => (
                     row.status == 'pending' && <IconButton
                        size="small"
                        onClick={(e) => handleOpenMenu(e, row._id)}
                     >
                        <MdMoreVert />
                     </IconButton>
                  )}
               />

               <Box className="mt-5">
                  <Pagination
                     page={qs.page || 1}
                     lastPage={data?.meta.lastPage || 1}
                     total={data?.meta.total || 0}
                     limit={qs.limit || 10}
                     rowsPerPageOptions={rowsPerPageOptions}
                     onChangePage={handleChangePage}
                     onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
               </Box>

               <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
               >
                  <MenuItem onClick={() => handleUpdateStatus("success")}>
                     <MdCheck className="mr-2 text-success" /> Approve
                  </MenuItem>
                  <MenuItem onClick={() => handleUpdateStatus("failed")}>
                     <MdClose className="mr-2 text-error" /> Reject
                  </MenuItem>
               </Menu>
            </CardContent>
         </Card>
      </Container>
   );
};

export default AdminTransaction;
