import {
   Box,
   Card,
   CardContent,
   Grid,
   Typography,
   LinearProgress,
   Button,
} from "@mui/material";
import {
   MdPlayLesson,
   MdHistory,
   MdStar,
   MdChevronRight,
} from "react-icons/md";
import { Link } from "react-router-dom";
import useUserStore from "@/store/useUserStore";
import { useMyCourses } from "@/services/course.service";
import { useMyTransactions } from "@/services/transaction.service";

const courseQs = { limit: 3 };
const trxQs = { limit: 5 };

const Dashboard = () => {
   const { user } = useUserStore();
   const { data: myCoursesRes, loading: loadingCourses } =
      useMyCourses(courseQs);
   const { data: transactionsRes } = useMyTransactions(trxQs);

   const stats = [
      {
         label: "Kursus Saya",
         value: myCoursesRes?.meta.total || 0,
         icon: <MdPlayLesson size={24} />,
         color: "#3b82f6",
      },
      {
         label: "Transaksi Berhasil",
         value:
            transactionsRes?.data.filter((t) => t.status === "success")
               .length || 0,
         icon: <MdHistory size={24} />,
         color: "#10b981",
      },
      {
         label: "Sertifikat",
         value: 0,
         icon: <MdStar size={24} />,
         color: "#f59e0b",
      },
   ];

   return (
      <Box>
         <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
               Halo, {user?.name}! 👋
            </Typography>
            <Typography variant="body1" color="text.secondary">
               Senang melihatmu kembali. Lanjutkan belajarmu hari ini!
            </Typography>
         </Box>

         <Grid container spacing={3} sx={{ mb: 4 }}>
            {stats.map((stat, index) => (
               <Grid size={{ xs: 12, sm: 4 }} key={index}>
                  <Card
                     elevation={0}
                     sx={{
                        borderRadius: 4,
                        border: "1px solid",
                        borderColor: "divider",
                     }}
                  >
                     <CardContent
                        sx={{ display: "flex", alignItems: "center", p: 3 }}
                     >
                        <Box
                           sx={{
                              p: 1.5,
                              borderRadius: 3,
                              bgcolor: `${stat.color}15`,
                              color: stat.color,
                              mr: 2,
                              display: "flex",
                           }}
                        >
                           {stat.icon}
                        </Box>
                        <Box>
                           <Typography variant="h5" sx={{ fontWeight: 800 }}>
                              {stat.value}
                           </Typography>
                           <Typography variant="body2" color="text.secondary">
                              {stat.label}
                           </Typography>
                        </Box>
                     </CardContent>
                  </Card>
               </Grid>
            ))}
         </Grid>

         <Grid container spacing={4}>
            {/* Recent Courses */}
            <Grid size={{ xs: 12, lg: 8 }}>
               <Box
                  sx={{
                     display: "flex",
                     justifyContent: "space-between",
                     alignItems: "center",
                     mb: 2,
                  }}
               >
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                     Lanjutkan Belajar
                  </Typography>
                  <Button
                     component={Link}
                     to="/my-courses"
                     endIcon={<MdChevronRight />}
                  >
                     Semua Kursus
                  </Button>
               </Box>

               {loadingCourses ? (
                  <LinearProgress sx={{ borderRadius: 2 }} />
               ) : myCoursesRes?.data.length === 0 ? (
                  <Card
                     elevation={0}
                     sx={{
                        borderRadius: 4,
                        border: "1px dashed",
                        borderColor: "divider",
                        p: 4,
                        textAlign: "center",
                     }}
                  >
                     <Typography color="text.secondary">
                        Belum ada kursus yang diambil. Ayo mulai belajar!
                     </Typography>
                     <Button
                        component={Link}
                        to="/courses"
                        variant="contained"
                        sx={{ mt: 2, borderRadius: 2 }}
                     >
                        Cari Kursus
                     </Button>
                  </Card>
               ) : (
                  <Grid container spacing={2}>
                     {myCoursesRes?.data.map((course) => (
                        <Grid size={{ xs: 12 }} key={course._id}>
                           <Card
                              elevation={0}
                              sx={{
                                 borderRadius: 3,
                                 border: "1px solid",
                                 borderColor: "divider",
                                 "&:hover": { borderColor: "primary.main" },
                              }}
                           >
                              <CardContent
                                 sx={{
                                    p: 2,
                                    display: "flex",
                                    alignItems: "center",
                                 }}
                              >
                                 <Box
                                    component="img"
                                    src={course.thumbnailUrl}
                                    sx={{
                                       width: 80,
                                       height: 60,
                                       borderRadius: 2,
                                       objectFit: "cover",
                                       mr: 2,
                                    }}
                                 />
                                 <Box sx={{ flexGrow: 1 }}>
                                    <Typography
                                       variant="subtitle1"
                                       sx={{ fontWeight: 700 }}
                                    >
                                       {course.title}
                                    </Typography>
                                    <Box
                                       sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          mt: 0.5,
                                       }}
                                    >
                                       <LinearProgress
                                          variant="determinate"
                                          value={0}
                                          sx={{
                                             flexGrow: 1,
                                             height: 6,
                                             borderRadius: 3,
                                             mr: 1,
                                          }}
                                       />
                                       <Typography
                                          variant="caption"
                                          color="text.secondary"
                                       >
                                          0%
                                       </Typography>
                                    </Box>
                                 </Box>
                                 <Button
                                    component={Link}
                                    to={`/courses/${course._id}`}
                                    variant="outlined"
                                    size="small"
                                    sx={{ ml: 2, borderRadius: 2 }}
                                 >
                                    Lanjut
                                 </Button>
                              </CardContent>
                           </Card>
                        </Grid>
                     ))}
                  </Grid>
               )}
            </Grid>

            {/* Recent Activity / Transactions */}
            <Grid size={{ xs: 12, lg: 4 }}>
               <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Transaksi Terakhir
               </Typography>
               <Card
                  elevation={0}
                  sx={{
                     borderRadius: 4,
                     border: "1px solid",
                     borderColor: "divider",
                  }}
               >
                  <CardContent sx={{ p: 0 }}>
                     {transactionsRes?.data.length === 0 ? (
                        <Box sx={{ p: 3, textAlign: "center" }}>
                           <Typography variant="body2" color="text.secondary">
                              Belum ada riwayat transaksi.
                           </Typography>
                        </Box>
                     ) : (
                        transactionsRes?.data.slice(0, 5).map((t, i) => (
                           <Box
                              key={t._id}
                              sx={{
                                 p: 2,
                                 display: "flex",
                                 alignItems: "center",
                                 borderBottom: i === 4 ? "none" : "1px solid",
                                 borderColor: "divider",
                              }}
                           >
                              <Box
                                 sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: "50%",
                                    bgcolor:
                                       t.status === "success"
                                          ? "success.main"
                                          : t.status === "pending"
                                            ? "warning.main"
                                            : "error.main",
                                    mr: 2,
                                 }}
                              />
                              <Box sx={{ flexGrow: 1 }}>
                                 <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 600 }}
                                 >
                                    {(t.course as any).title}
                                 </Typography>
                                 <Typography
                                    variant="caption"
                                    color="text.secondary"
                                 >
                                    {new Date(t.createdAt).toLocaleDateString()}
                                 </Typography>
                              </Box>
                              <Typography
                                 variant="body2"
                                 sx={{ fontWeight: 700 }}
                              >
                                 Rp {t.amount.toLocaleString()}
                              </Typography>
                           </Box>
                        ))
                     )}
                  </CardContent>
               </Card>
            </Grid>
         </Grid>
      </Box>
   );
};

export default Dashboard;
