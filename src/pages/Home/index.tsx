import {
   Box,
   Button,
   Container,
   Typography,
   Grid,
   Card,
   CardContent,
   Stack,
   Avatar,
   useTheme,
   alpha,
   CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
   MdRocketLaunch,
   MdSchool,
   MdTrendingUp,
   MdPsychology,
   MdPlayCircleFilled,
   MdCheckCircle,
} from "react-icons/md";
import { useListCourses } from "@/services/course.service";
import { useListCategories } from "@/services/category.service";
import CourseCard from "@/components/CourseCard";
import type { Course, ListCourseParams } from "@/types/api/course.type";
import type { Category } from "@/types/api/category.type";

const courseQs: ListCourseParams = {
   limit: 3,
   sort: "createdAt",
   direction: "desc",
};

const categoryQs = {
   limit: 5,
};

const Home = () => {
   const navigate = useNavigate();
   const theme = useTheme();

   const { data: coursesData, loading: isLoadingCourses } =
      useListCourses(courseQs);

   const { data: categoriesData, loading: isLoadingCategories } =
      useListCategories(categoryQs);

   const features = [
      {
         title: "Structured Content",
         description:
            "Curriculum designed by industry experts to ensure you learn what's relevant.",
         icon: <MdSchool size={32} />,
         color: theme.palette.primary.main,
      },
      {
         title: "Flexible Learning",
         description:
            "Access materials anytime and anywhere. Learn at your own pace.",
         icon: <MdTrendingUp size={32} />,
         color: theme.palette.secondary.main,
      },
      {
         title: "Progress Tracking",
         description:
            "Monitor your learning progress with a detailed and motivating tracking system.",
         icon: <MdPsychology size={32} />,
         color: theme.palette.success.main,
      },
   ];

   const popularCategories = categoriesData?.data || [];
   const popularCourses = coursesData?.data || [];

   return (
      <Box>
         {/* Hero Section */}
         <Box
            sx={{
               pt: { xs: 8, md: 15 },
               pb: { xs: 8, md: 12 },
               background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.background.paper, 1)} 100%)`,
               position: "relative",
               overflow: "hidden",
            }}
         >
            <Container maxWidth="xl">
               <Grid container spacing={6} alignItems="center">
                  <Grid size={{ xs: 12, md: 7 }}>
                     <Stack spacing={4}>
                        <Box>
                           <Typography
                              variant="overline"
                              sx={{
                                 fontWeight: 700,
                                 color: "primary.main",
                                 letterSpacing: 2,
                                 display: "flex",
                                 alignItems: "center",
                                 gap: 1,
                              }}
                           >
                              <MdRocketLaunch /> THE FUTURE STARTS HERE
                           </Typography>
                           <Typography
                              variant="h1"
                              sx={{
                                 fontWeight: 800,
                                 fontSize: { xs: "2.5rem", md: "4rem" },
                                 lineHeight: 1.2,
                                 mt: 2,
                                 background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                 WebkitBackgroundClip: "text",
                                 WebkitTextFillColor: "transparent",
                              }}
                           >
                              Level Up Your Skills with Experts
                           </Typography>
                           <Typography
                              variant="h5"
                              color="text.secondary"
                              sx={{
                                 mt: 3,
                                 fontWeight: 400,
                                 maxWidth: 600,
                                 lineHeight: 1.6,
                              }}
                           >
                              The most comprehensive online learning platform to help
                              you master the latest technologies and achieve your
                              dream career.
                           </Typography>
                        </Box>

                        <Stack
                           direction={{ xs: "column", sm: "row" }}
                           spacing={2}
                        >
                           <Button
                              variant="contained"
                              size="large"
                              onClick={() => navigate("/admin/dashboard")}
                              sx={{
                                 px: 4,
                                 py: 2,
                                 borderRadius: 2,
                                 fontSize: "1.1rem",
                                 fontWeight: 600,
                                 boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.3)}`,
                              }}
                           >
                              Start Learning Now
                           </Button>
                           <Button
                              variant="outlined"
                              size="large"
                              startIcon={<MdPlayCircleFilled />}
                              sx={{
                                 px: 4,
                                 py: 2,
                                 borderRadius: 2,
                                 fontSize: "1.1rem",
                                 fontWeight: 600,
                              }}
                           >
                              View Demo
                           </Button>
                        </Stack>

                        <Stack direction="row" spacing={3} alignItems="center">
                           <Box display="flex">
                              {[1, 2, 3, 4].map((i) => (
                                 <Avatar
                                    key={i}
                                    src={`https://i.pravatar.cc/150?u=${i}`}
                                    sx={{
                                       width: 40,
                                       height: 40,
                                       border: `2px solid ${theme.palette.background.paper}`,
                                       ml: i === 1 ? 0 : -1.5,
                                    }}
                                 />
                              ))}
                           </Box>
                           <Typography variant="body2" color="text.secondary">
                              Join over <strong>10,000+</strong> other students
                           </Typography>
                        </Stack>
                     </Stack>
                  </Grid>
                  <Grid
                     size={{ xs: 12, md: 5 }}
                     sx={{ display: { xs: "none", md: "block" } }}
                  >
                     <Box
                        sx={{
                           position: "relative",
                           "&::after": {
                              content: '""',
                              position: "absolute",
                              top: -20,
                              right: -20,
                              width: "100%",
                              height: "100%",
                              border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                              borderRadius: 8,
                              zIndex: -1,
                           },
                        }}
                     >
                        <Box
                           component="img"
                           src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                           sx={{
                              width: "100%",
                              borderRadius: 8,
                              boxShadow: 20,
                           }}
                        />
                        <Card
                           sx={{
                              position: "absolute",
                              bottom: 30,
                              left: -40,
                              p: 2,
                              borderRadius: 4,
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              boxShadow: 10,
                           }}
                        >
                           <Avatar sx={{ bgcolor: "success.light" }}>
                              <MdCheckCircle />
                           </Avatar>
                           <Box>
                              <Typography variant="subtitle2" fontWeight={700}>
                                 Progress Maintained
                              </Typography>
                              <Typography
                                 variant="caption"
                                 color="text.secondary"
                              >
                                 Continue from where you left off
                              </Typography>
                           </Box>
                        </Card>
                     </Box>
                  </Grid>
               </Grid>
            </Container>
         </Box>

         {/* Features Section */}
         <Container maxWidth="xl" sx={{ py: 12 }}>
            <Box textAlign="center" mb={8}>
               <Typography variant="h3" fontWeight={800} gutterBottom>
                  Why Learn With Us?
               </Typography>
               <Typography
                  variant="h6"
                  color="text.secondary"
                  maxWidth={700}
                  mx="auto"
               >
                  We provide a learning ecosystem specifically designed for
                  your effectiveness and comfort.
               </Typography>
            </Box>

            <Grid container spacing={4}>
               {features.map((feature, index) => (
                  <Grid size={{ xs: 12, md: 4 }} key={index}>
                     <Card
                        sx={{
                           height: "100%",
                           p: 3,
                           borderRadius: 4,
                           transition: "0.3s",
                           "&:hover": {
                              transform: "translateY(-10px)",
                              boxShadow: 10,
                           },
                        }}
                     >
                        <CardContent>
                           <Box
                              sx={{
                                 width: 64,
                                 height: 64,
                                 borderRadius: 3,
                                 display: "flex",
                                 alignItems: "center",
                                 justifyContent: "center",
                                 bgcolor: alpha(feature.color, 0.1),
                                 color: feature.color,
                                 mb: 3,
                              }}
                           >
                              {feature.icon}
                           </Box>
                           <Typography
                              variant="h5"
                              fontWeight={700}
                              gutterBottom
                           >
                              {feature.title}
                           </Typography>
                           <Typography
                              variant="body1"
                              color="text.secondary"
                              lineHeight={1.7}
                           >
                              {feature.description}
                           </Typography>
                        </CardContent>
                     </Card>
                  </Grid>
               ))}
            </Grid>
         </Container>

         {/* Categories Section */}
         <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.02), py: 10 }}>
            <Container maxWidth="xl">
               <Stack
                  direction={{ xs: "column", md: "row" }}
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={4}
               >
                  <Box>
                     <Typography variant="h4" fontWeight={800} gutterBottom>
                        Popular Categories
                     </Typography>
                     <Typography variant="body1" color="text.secondary">
                        Choose topics that match your interests and career goals.
                     </Typography>
                  </Box>
                  <Stack
                     direction="row"
                     flexWrap="wrap"
                     gap={2}
                     justifyContent="center"
                  >
                     {isLoadingCategories ? (
                        <CircularProgress size={24} />
                     ) : (
                        popularCategories.map((cat: Category) => (
                           <Button
                              key={cat._id}
                              variant="outlined"
                              sx={{
                                 borderRadius: 8,
                                 px: 3,
                                 py: 1,
                                 borderColor: alpha(theme.palette.divider, 0.5),
                                 color: "text.primary",
                                 "&:hover": {
                                    bgcolor: "primary.main",
                                    color: "white",
                                    borderColor: "primary.main",
                                 },
                              }}
                           >
                              {cat.name}
                           </Button>
                        ))
                     )}
                  </Stack>
               </Stack>
            </Container>
         </Box>

         {/* Popular Courses Section */}
         <Container maxWidth="xl" sx={{ py: 12 }}>
            <Box
               sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-between",
                  alignItems: { xs: "flex-start", md: "flex-end" },
                  mb: 6,
                  gap: 2,
               }}
            >
               <Box>
                  <Typography
                     variant="overline"
                     sx={{
                        color: "primary.main",
                        fontWeight: 700,
                        letterSpacing: 1.2,
                     }}
                  >
                     TOP COURSES
                  </Typography>
                  <Typography variant="h3" fontWeight={800} sx={{ mt: 1 }}>
                     Most Popular Courses
                  </Typography>
               </Box>
               <Button
                  component={Link}
                  to="/courses"
                  variant="text"
                  color="primary"
                  sx={{ fontWeight: 700, fontSize: "1rem" }}
               >
                  View All Courses →
               </Button>
            </Box>

            {isLoadingCourses ? (
               <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                  <CircularProgress />
               </Box>
            ) : (
               <Grid container spacing={4}>
                  {popularCourses.map((course: Course) => (
                     <Grid size={{ xs: 12, sm: 6, md: 4 }} key={course._id}>
                        <CourseCard course={course} />
                     </Grid>
                  ))}
               </Grid>
            )}
         </Container>

         {/* CTA Section */}
         <Container maxWidth="xl" sx={{ py: 15 }}>
            <Card
               sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  borderRadius: 8,
                  p: { xs: 4, md: 8 },
                  textAlign: "center",
                  boxShadow: `0 20px 50px ${alpha(theme.palette.primary.main, 0.4)}`,
                  position: "relative",
                  overflow: "hidden",
               }}
            >
               {/* Decorative Circle */}
               <Box
                  sx={{
                     position: "absolute",
                     top: -100,
                     right: -100,
                     width: 300,
                     height: 300,
                     borderRadius: "50%",
                     bgcolor: alpha("#fff", 0.1),
                  }}
               />

               <Stack
                  spacing={4}
                  alignItems="center"
                  position="relative"
                  zIndex={1}
               >
                  <Typography
                     variant="h2"
                     className="text-primary-contrast"
                     fontWeight={800}
                     sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
                  >
                     Ready to Start Your Learning Journey?
                  </Typography>
                  <Typography
                     variant="h6"
                     className="text-primary-contrast"
                     sx={{ opacity: 0.9, maxWidth: 600 }}
                  >
                     Register now and get access to hundreds of high-quality materials from experts in their fields.
                  </Typography>
                  <Button
                     variant="contained"
                     size="large"
                     sx={{
                        bgcolor: "white",
                        color: "primary.main",
                        px: 6,
                        py: 2,
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        "&:hover": {
                           bgcolor: alpha("#fff", 0.9),
                        },
                     }}
                     onClick={() => navigate("/register")}
                  >
                     Register for Free
                  </Button>
               </Stack>
            </Card>
         </Container>
      </Box>
   );
};

export default Home;
