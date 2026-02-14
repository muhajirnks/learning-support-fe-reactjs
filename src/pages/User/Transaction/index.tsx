import {
   Box,
   Typography,
   Card,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Chip,
   LinearProgress,
   useMediaQuery,
   useTheme,
   Stack,
   Divider,
} from "@mui/material";
import { MdReceipt } from "react-icons/md";
import { useMyTransactions } from "@/services/transaction.service";

const qs = { limit: 50 };

const Transaction = () => {
   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down("md"));
   const { data: res, loading } = useMyTransactions(qs);

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
            return "Berhasil";
         case "pending":
            return "Menunggu";
         case "failed":
            return "Gagal";
         default:
            return status;
      }
   };

   return (
      <Box>
         <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
               Riwayat Transaksi
            </Typography>
            <Typography variant="body1" color="text.secondary">
               Pantau semua aktivitas pembayaran kursus Anda.
            </Typography>
         </Box>

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
                  Belum ada riwayat transaksi
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
                                 ).toLocaleDateString("id-ID", {
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
                              label={getStatusLabel(transaction.status)}
                              color={getStatusColor(transaction.status) as any}
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
                                 Metode Pembayaran
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
            <TableContainer
               component={Card}
               elevation={0}
               sx={{
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: "divider",
               }}
            >
               <Table>
                  <TableHead sx={{ bgcolor: "gray.50" }}>
                     <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>Tanggal</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Kursus</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Metode</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Jumlah</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {res?.data.map((transaction) => (
                        <TableRow key={transaction._id} hover>
                           <TableCell>
                              {new Date(
                                 transaction.createdAt,
                              ).toLocaleDateString("id-ID", {
                                 day: "2-digit",
                                 month: "short",
                                 year: "numeric",
                              })}
                           </TableCell>
                           <TableCell sx={{ fontWeight: 600 }}>
                              {(transaction.course as any).title}
                           </TableCell>
                           <TableCell sx={{ textTransform: "uppercase" }}>
                              {transaction.paymentMethod}
                           </TableCell>
                           <TableCell sx={{ fontWeight: 700 }}>
                              Rp {transaction.amount.toLocaleString()}
                           </TableCell>
                           <TableCell>
                              <Chip
                                 label={getStatusLabel(transaction.status)}
                                 color={
                                    getStatusColor(transaction.status) as any
                                 }
                                 size="small"
                                 sx={{ fontWeight: 600, borderRadius: 1.5 }}
                              />
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </TableContainer>
         )}
      </Box>
   );
};

export default Transaction;
