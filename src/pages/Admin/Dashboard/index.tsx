import {
   Box,
   Card,
   CardContent,
   Grid,
   Typography,
   Container,
   Stack,
   useTheme,
   alpha,
} from "@mui/material";
import {
   MdOutlineLibraryBooks,
   MdOutlineCategory,
   MdOutlinePeople,
   MdOutlineAttachMoney,
} from "react-icons/md";
import { useListCategories } from "@/services/category.service";
import { useListCourses } from "@/services/course.service";

const qs = {limit: 1}

const Dashboard = () => {
   const theme = useTheme();
   const { data: coursesData } = useListCourses(qs);
   const { data: categoriesData } = useListCategories(qs);

   const stats = [
      {
         label: "Total Courses",
         value: coursesData?.meta.total || 0,
         icon: MdOutlineLibraryBooks,
         color: theme.palette.primary.main,
      },
      {
         label: "Total Categories",
         value: categoriesData?.meta.total || 0,
         icon: MdOutlineCategory,
         color: theme.palette.secondary.main,
      },
      {
         label: "Total Students",
         value: "1,234", // Mock data
         icon: MdOutlinePeople,
         color: theme.palette.success.main,
      },
      {
         label: "Total Revenue",
         value: "Rp 12.5M", // Mock data
         icon: MdOutlineAttachMoney,
         color: theme.palette.warning.main,
      },
   ];

   return (
      <Container maxWidth="2xl" sx={{ py: 4 }}>
         <Box sx={{ mb: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
               Dashboard Overview
            </Typography>
            <Typography variant="body1" color="text.secondary">
               Welcome back! Here's what's happening on your platform today.
            </Typography>
         </Box>

         <Grid container spacing={3}>
            {stats.map((stat, index) => (
               <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                  <Card
                     sx={{
                        borderRadius: 4,
                        boxShadow: "0 4px 20px 0 rgba(0,0,0,0.05)",
                        border: `1px solid ${theme.palette.divider}`,
                        overflow: "visible",
                        position: "relative",
                     }}
                  >
                     <CardContent sx={{ p: 3 }}>
                        <Stack
                           direction="row"
                           spacing={2}
                           alignItems="center"
                           justifyContent="space-between"
                        >
                           <Box>
                              <Typography
                                 variant="body2"
                                 color="text.secondary"
                                 fontWeight="500"
                                 gutterBottom
                              >
                                 {stat.label}
                              </Typography>
                              <Typography variant="h4" fontWeight="bold">
                                 {stat.value}
                              </Typography>
                           </Box>
                           <Box
                              sx={{
                                 p: 1.5,
                                 borderRadius: 3,
                                 backgroundColor: alpha(stat.color, 0.1),
                                 color: stat.color,
                                 display: "flex",
                                 alignItems: "center",
                                 justifyContent: "center",
                              }}
                           >
                              <stat.icon size={32} />
                           </Box>
                        </Stack>
                     </CardContent>
                  </Card>
               </Grid>
            ))}
         </Grid>

         {/* Placeholder for more content like charts or recent activities */}
         <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid size={{ xs: 12, md: 8 }}>
               <Card
                  sx={{
                     borderRadius: 4,
                     height: 400,
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "center",
                     border: `1px solid ${theme.palette.divider}`,
                  }}
               >
                  <Typography color="text.secondary">
                     Chart Placeholder (Analytics coming soon)
                  </Typography>
               </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
               <Card
                  sx={{
                     borderRadius: 4,
                     height: 400,
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "center",
                     border: `1px solid ${theme.palette.divider}`,
                  }}
               >
                  <Typography color="text.secondary">
                     Recent Activities Placeholder
                  </Typography>
               </Card>
            </Grid>
         </Grid>
      </Container>
   );
};

export default Dashboard;
