import {
   Box,
   Typography,
   Card,
   Chip,
   LinearProgress,
   useMediaQuery,
   useTheme,
   Stack,
   Divider,
   MenuItem,
   Grid,
   Button,
} from "@mui/material";
import { MdReceipt, MdClose } from "react-icons/md";
import { useMyTransactions } from "@/services/transaction.service";
import { useEffect, useMemo, useState } from "react";
import type { ListTransactionParams } from "@/types/api/transaction.type";
import Input from "@/components/form/Input";
import DataTable, { createTableConfig } from "@/components/DataTable";
import { useSearchParams } from "react-router-dom";
import { toQueryString } from "@/lib/fetch/createFetch";
import { createPaginationSchema, createQsSchema, sanitizeQs } from "@/utils/sanitizeQs";

const tableConfig = createTableConfig({
   uniqueField: "_id",
   columns: [
      { key: "createdAt", label: "Date", type: "datetime" },
      {
         key: "course.title",
         label: "Course",
         type: "string",
      },
      {
         key: "paymentMethod",
         label: "Method",
         type: "custom",
         renderValue: (value) => (
            <Box sx={{ textTransform: "uppercase" }}>{value}</Box>
         ),
      },
      {
         key: "amount",
         label: "Amount",
         type: "custom",
         renderValue: (value) => `Rp ${value.toLocaleString()}`,
      },
      {
         key: "status",
         label: "Status",
         type: "custom",
         renderValue: (value) => {
            const getStatusColor = (status: string) => {
               switch (status) {
                  case "success":
                     return "success";
                  case "pending":
                     return "warning";
                  case "failed":
                     return "error";
                  default:
                     return "default";
               }
            };

            const getStatusLabel = (status: string) => {
               switch (status) {
                  case "success":
                     return "Success";
                  case "pending":
                     return "Pending";
                  case "failed":
                     return "Failed";
                  default:
                     return status;
               }
            };

            return (
               <Chip
                  label={getStatusLabel(value)}
                  color={getStatusColor(value) as any}
                  size="small"
                  sx={{ fontWeight: 600, borderRadius: 1.5 }}
               />
            );
         },
      },
   ],
});

const paginationSchema = createPaginationSchema(
   [10, 25, 50],
   ["_id", "createdAt", "paymentMethod", "amount"],
);

const qsSchema = createQsSchema<ListTransactionParams>({
   ...paginationSchema,
   startDate: {
      type: "string",
   },
   endDate: {
      type: "string",
   },
   status: {
      type: "string",
      validate(val) {
         return (
            !val || ["success", "failed", "pending"].includes(val as string)
         );
      },
   },
});

const Transaction = () => {
   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down("md"));
   const [searchParams, setSearchParams] = useSearchParams();

   const [qs, setQs] = useState<ListTransactionParams>(() => sanitizeQs(searchParams, qsSchema));

   const transformedQs = useMemo(() => {
      const result = { ...qs };

      if (result.startDate) {
         const [y, m, d] = result.startDate.split("-").map(Number);
         const date = new Date(y, m - 1, d, 0, 0, 0, 0);
         result.startDate = date.toISOString();
      }

      if (result.endDate) {
         const [y, m, d] = result.endDate.split("-").map(Number);
         const date = new Date(y, m - 1, d, 23, 59, 59, 999);
         result.endDate = date.toISOString();
      }

      return result;
   }, [qs]);

   const { data: res, loading } = useMyTransactions(transformedQs);

   useEffect(() => {
      const _qs = {...qs}
      delete _qs.page
      delete _qs.limit
      setSearchParams(toQueryString(_qs));
   }, [qs]);

   const handleFilterChange = (
      field: keyof ListTransactionParams,
      value: any,
   ) => {
      setQs((prev) => ({
         ...prev,
         [field]: value || undefined,
      }));
   };

   const handleReset = () => {
      setQs({
         limit: 50,
         status: undefined,
         startDate: undefined,
         endDate: undefined,
      });
   };

   return (
      <Box>
         <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
               Transaction History
            </Typography>
            <Typography variant="body1" color="text.secondary">
               Monitor all your course payment activities.
            </Typography>
         </Box>

         <Card
            elevation={0}
            sx={{
               p: 2,
               mb: 3,
               borderRadius: 4,
               border: "1px solid",
               borderColor: "divider",
            }}
         >
            <Grid container spacing={2} alignItems="center">
               <Grid size={{ xs: 12, sm: 3 }}>
                  <Input
                     select
                     fullWidth
                     label="Status"
                     size="small"
                     value={qs.status || ""}
                     onChange={(e) =>
                        handleFilterChange("status", e.target.value)
                     }
                  >
                     <MenuItem value="">All Status</MenuItem>
                     <MenuItem value="success">Success</MenuItem>
                     <MenuItem value="pending">Pending</MenuItem>
                     <MenuItem value="failed">Failed</MenuItem>
                  </Input>
               </Grid>
               <Grid size={{ xs: 12, sm: 3 }}>
                  <Input
                     fullWidth
                     label="Start Date"
                     type="date"
                     size="small"
                     InputLabelProps={{ shrink: true }}
                     value={qs.startDate || ""}
                     onChange={(e) =>
                        handleFilterChange("startDate", e.target.value)
                     }
                  />
               </Grid>
               <Grid size={{ xs: 12, sm: 3 }}>
                  <Input
                     fullWidth
                     label="End Date"
                     type="date"
                     size="small"
                     InputLabelProps={{ shrink: true }}
                     value={qs.endDate || ""}
                     onChange={(e) =>
                        handleFilterChange("endDate", e.target.value)
                     }
                  />
               </Grid>
               <Grid size={{ xs: 12, sm: 3 }}>
                  {(qs.status || qs.startDate || qs.endDate) && (
                     <Button
                        onClick={handleReset}
                        variant="outlined"
                        className="min-w-0 gap-1 max-sm:w-full"
                     >
                        <MdClose />
                        <Typography
                           variant="body2"
                           color="primary"
                           className="font-semibold"
                        >
                           Reset
                        </Typography>
                     </Button>
                  )}
               </Grid>
            </Grid>
         </Card>

         {loading ? (
            <LinearProgress sx={{ borderRadius: 2 }} />
         ) : res?.data.length === 0 ? (
            <Card
               elevation={0}
               sx={{
                  borderRadius: 4,
                  border: "1px dashed",
                  borderColor: "divider",
                  p: 8,
                  textAlign: "center",
               }}
            >
               <MdReceipt
                  size={48}
                  color="lightgray"
                  style={{ marginBottom: 16 }}
                  className="text-center mx-auto"
               />
               <Typography variant="h6" color="text.secondary">
                  No transaction history yet
               </Typography>
            </Card>
         ) : isMobile ? (
            <Stack spacing={2}>
               {res?.data.map((transaction) => (
                  <Card
                     key={transaction._id}
                     elevation={0}
                     sx={{
                        borderRadius: 4,
                        border: "1px solid",
                        borderColor: "divider",
                     }}
                  >
                     <Box sx={{ p: 2 }}>
                        <Box
                           sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                              mb: 1.5,
                           }}
                        >
                           <Box>
                              <Typography
                                 variant="caption"
                                 color="text.secondary"
                                 display="block"
                                 gutterBottom
                              >
                                 {new Date(
                                    transaction.createdAt,
                                 ).toLocaleDateString("en-US", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                 })}
                              </Typography>
                              <Typography
                                 variant="subtitle1"
                                 sx={{ fontWeight: 700, lineHeight: 1.2 }}
                              >
                                 {(transaction.course as any).title}
                              </Typography>
                           </Box>
                           <Chip
                              label={
                                 transaction.status === "success"
                                    ? "Success"
                                    : transaction.status === "pending"
                                      ? "Pending"
                                      : transaction.status === "failed"
                                        ? "Failed"
                                        : transaction.status
                              }
                              color={
                                 transaction.status === "success"
                                    ? "success"
                                    : transaction.status === "pending"
                                      ? "warning"
                                      : transaction.status === "failed"
                                        ? "error"
                                        : "default"
                              }
                              size="small"
                              sx={{ fontWeight: 600, borderRadius: 1.5 }}
                           />
                        </Box>

                        <Divider sx={{ my: 1.5, borderStyle: "dashed" }} />

                        <Box
                           sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                           }}
                        >
                           <Box>
                              <Typography
                                 variant="caption"
                                 color="text.secondary"
                              >
                                 Payment Method
                              </Typography>
                              <Typography
                                 variant="body2"
                                 sx={{
                                    fontWeight: 600,
                                    textTransform: "uppercase",
                                 }}
                              >
                                 {transaction.paymentMethod}
                              </Typography>
                           </Box>
                           <Box sx={{ textAlign: "right" }}>
                              <Typography
                                 variant="caption"
                                 color="text.secondary"
                              >
                                 Total
                              </Typography>
                              <Typography
                                 variant="subtitle1"
                                 sx={{ fontWeight: 800, color: "primary.main" }}
                              >
                                 Rp {transaction.amount.toLocaleString()}
                              </Typography>
                           </Box>
                        </Box>
                     </Box>
                  </Card>
               ))}
            </Stack>
         ) : (
            <Card
               elevation={0}
               sx={{
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: "divider",
                  overflow: "hidden",
               }}
            >
               <DataTable
                  loading={loading}
                  rows={res?.data || []}
                  config={tableConfig}
                  sortBy="createdAt"
                  sort="desc"
               />
            </Card>
         )}
      </Box>
   );
};

export default Transaction;
