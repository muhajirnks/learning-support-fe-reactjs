import {
   Box,
   Container,
   Grid,
   Typography,
   Button,
   Stack,
   Card,
   Divider,
   Avatar,
   List,
   ListItem,
   ListItemIcon,
   ListItemText,
   CircularProgress,
   alpha,
   useTheme,
   CardContent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
   MdPlayCircleOutline,
   MdAccessTime,
   MdPeople,
   MdStar,
   MdCheckCircle,
} from "react-icons/md";
import { getCourseById } from "@/services/course.service";
import { getLessons, getCourseProgress } from "@/services/lesson.service";
import { createTransaction } from "@/services/transaction.service";
import type { Course } from "@/types/api/course.type";
import type { Lesson, CourseProgress } from "@/types/api/lesson.type";
import useUserStore from "@/store/useUserStore";
import useSnackbar from "@/hooks/useSnackbar";

const CourseDetail = () => {
   const { id } = useParams<{ id: string }>();
   const theme = useTheme();
   const navigate = useNavigate();
   const snackbar = useSnackbar();

   const user = useUserStore((s) => s.user);
   const [course, setCourse] = useState<Course | null>(null);
   const [lessons, setLessons] = useState<Lesson[]>([]);
   const [progress, setProgress] = useState<CourseProgress | null>(null);
   const [loading, setLoading] = useState(true);
   const [submitting, setSubmitting] = useState(false);

   useEffect(() => {
      const fetchData = async () => {
         if (!id) return;
         try {
            const [courseRes, lessonsRes, progressRes] = await Promise.all([
               getCourseById(id),
               getLessons({
                  course: id,
                  limit: 100,
                  sort: "order",
                  direction: "asc",
               }),
               getCourseProgress(id).catch(() => ({ data: null })),
            ]);

            if (courseRes.data) setCourse(courseRes.data.data);
            if (lessonsRes.data) setLessons(lessonsRes.data.data);
            if (progressRes?.data) setProgress(progressRes.data.data);
         } catch (error) {
            console.error("Error fetching course detail:", error);
         } finally {
            setLoading(false);
         }
      };

      fetchData();
   }, [id, user]);

   const isLessonCompleted = (lessonId: string) => {
      return progress?.lessons.find((l) => l._id === lessonId)?.isCompleted;
   };

   const handleEnroll = async () => {
      if (!user) {
         navigate("/login");
         return;
      }

      if (!course || !id) return;

      try {
         setSubmitting(true);
         const res = await createTransaction({
            course: id,
            paymentMethod: "Manual Transfer", // Default for now
         });

         if (res.data) {
            snackbar({
               type: "success",
               message: "Enrollment successful! Please proceed with payment.",
            });
            setCourse((prev) =>
               prev ? { ...prev, transactionStatus: "pending" } : null,
            );
         }
      } catch (error: any) {
         snackbar({
            type: "failure",
            message: error.message || "Failed to enroll in course.",
         });
      } finally {
         setSubmitting(false);
      }
   };

   if (loading) {
      return (
         <Box
            sx={{
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               minHeight: "80vh",
            }}
         >
            <CircularProgress size={60} />
         </Box>
      );
   }

   if (!course) {
      return (
         <Container sx={{ py: 12, textAlign: "center" }}>
            <Typography variant="h4">Course not found</Typography>
            <Button onClick={() => navigate("/courses")} sx={{ mt: 2 }}>
               Back to Course List
            </Button>
         </Container>
      );
   }

   return (
      <Box sx={{ bgcolor: "white", minHeight: "100vh" }}>
         {/* Hero Section */}
         <Box
            sx={{
               bgcolor: "primary.main",
               color: "white",
               py: { xs: 8, md: 12 },
            }}
         >
            <Container maxWidth="xl">
               <Grid container spacing={6}>
                  <Grid size={{ xs: 12, md: 7 }}>
                     <Stack
                        spacing={3}
                        height={"100%"}
                        justifyContent={"center"}
                     >
                        <Box
                           sx={{
                              display: "inline-flex",
                              bgcolor: "rgba(255,255,255,0.2)",
                              px: 2,
                              py: 0.5,
                              borderRadius: 2,
                              width: "fit-content",
                           }}
                        >
                           <Typography
                              variant="subtitle2"
                              fontWeight={700}
                              color="primary.contrastText"
                           >
                              {typeof course.category === "object"
                                 ? course.category.name
                                 : "Uncategorized"}
                           </Typography>
                        </Box>
                        <Typography
                           color="primary.contrastText"
                           variant="h1"
                           fontWeight={800}
                           sx={{ lineHeight: 1.2 }}
                        >
                           {course.title}
                        </Typography>
                        <Typography
                           color="primary.contrastText"
                           variant="h6"
                           sx={{ opacity: 0.7, fontWeight: 400 }}
                        >
                           {course.description}
                        </Typography>

                        <Stack
                           direction={{ xs: "column", sm: "row" }}
                           spacing={4}
                        >
                           <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1}
                           >
                              <MdStar
                                 size={24}
                                 color={theme.palette.warning.main}
                              />
                              <Typography
                                 color="primary.contrastText"
                                 variant="h6"
                                 fontWeight={700}
                              >
                                 4.8{" "}
                                 <Box
                                    component="span"
                                    sx={{
                                       fontWeight: 400,
                                       opacity: 0.7,
                                       fontSize: "0.9rem",
                                    }}
                                 >
                                    (2.5k reviews)
                                 </Box>
                              </Typography>
                           </Stack>
                           <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1}
                           >
                              <MdPeople size={24} />
                              <Typography
                                 color="primary.contrastText"
                                 variant="h6"
                                 fontWeight={700}
                              >
                                 1,250{" "}
                                 <Box
                                    component="span"
                                    sx={{
                                       fontWeight: 400,
                                       opacity: 0.7,
                                       fontSize: "0.9rem",
                                    }}
                                 >
                                    Students enrolled
                                 </Box>
                              </Typography>
                           </Stack>
                           <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1}
                           >
                              <MdAccessTime size={24} />
                              <Typography
                                 color="primary.contrastText"
                                 variant="h6"
                                 fontWeight={700}
                              >
                                 12 Hours{" "}
                                 <Box
                                    component="span"
                                    sx={{
                                       fontWeight: 400,
                                       opacity: 0.7,
                                       fontSize: "0.9rem",
                                    }}
                                 >
                                    Total material
                                 </Box>
                              </Typography>
                           </Stack>
                        </Stack>

                        <Stack
                           direction="row"
                           alignItems="center"
                           spacing={2}
                           sx={{ pt: 2 }}
                        >
                           <Avatar
                              sx={{
                                 width: 48,
                                 height: 48,
                                 bgcolor: "secondary.main",
                              }}
                           >
                              {course.instructor.charAt(0)}
                           </Avatar>
                           <Box>
                              <Typography
                                 color="primary.contrastText"
                                 variant="subtitle2"
                                 sx={{ opacity: 0.7 }}
                              >
                                 Instructor
                              </Typography>
                              <Typography
                                 color="primary.contrastText"
                                 variant="subtitle1"
                                 fontWeight={700}
                              >
                                 {course.instructor}
                              </Typography>
                           </Box>
                        </Stack>
                     </Stack>
                  </Grid>

                  <Grid size={{ xs: 12, md: 5 }}>
                     <Card
                        sx={{
                           borderRadius: 4,
                           overflow: "hidden",
                           boxShadow: 20,
                           position: "sticky",
                           top: 100,
                        }}
                     >
                        <Box sx={{ position: "relative" }}>
                           <Box
                              component="img"
                              src={
                                 course.thumbnailUrl ||
                                 "https://via.placeholder.com/600x400"
                              }
                              sx={{
                                 width: "100%",
                                 height: 280,
                                 objectFit: "cover",
                              }}
                           />
                           <Box
                              sx={{
                                 position: "absolute",
                                 top: 0,
                                 left: 0,
                                 right: 0,
                                 bottom: 0,
                                 display: "flex",
                                 alignItems: "center",
                                 justifyContent: "center",
                                 bgcolor: "rgba(0,0,0,0.3)",
                              }}
                           >
                              <MdPlayCircleOutline
                                 size={80}
                                 color="white"
                                 style={{ cursor: "pointer" }}
                              />
                           </Box>
                        </Box>
                        <CardContent sx={{ p: 4 }}>
                           <Typography
                              variant="h3"
                              fontWeight={800}
                              color="primary.main"
                              gutterBottom
                           >
                              Rp {course.price.toLocaleString()}
                           </Typography>
                           <Button
                              fullWidth
                              variant="contained"
                              size="large"
                              disabled={
                                 !user ||
                                 user.role === "admin" ||
                                 course.transactionStatus === "pending" ||
                                 course.transactionStatus === "success"
                              }
                              loading={submitting}
                              onClick={handleEnroll}
                              sx={{
                                 py: 2,
                                 borderRadius: 3,
                                 fontWeight: 700,
                                 fontSize: "1.1rem",
                                 mb: 2,
                              }}
                           >
                              {course.transactionStatus === "pending"
                                 ? "Awaiting confirmation"
                                 : course.transactionStatus === "success"
                                   ? "Already Enrolled"
                                   : "Enroll Now"}
                           </Button>
                           <Typography
                              variant="caption"
                              color="text.secondary"
                              align="center"
                              display="block"
                           >
                              Lifetime access • Certificate of completion
                           </Typography>
                        </CardContent>
                     </Card>
                  </Grid>
               </Grid>
            </Container>
         </Box>

         {/* Content Section */}
         <Container maxWidth="xl" sx={{ py: 8 }}>
            <Grid container spacing={8}>
               <Grid size={{ xs: 12, md: 7 }}>
                  <Box sx={{ mb: 6 }}>
                     <Typography variant="h4" fontWeight={800} gutterBottom>
                        What will you learn?
                     </Typography>
                     <Grid container spacing={2} sx={{ mt: 2 }}>
                        {course.goals && course.goals.length > 0
                           ? course.goals.map((goal, idx) => (
                                <Grid size={{ xs: 12, sm: 6 }} key={idx}>
                                   <Stack
                                      direction="row"
                                      spacing={1.5}
                                      alignItems="center"
                                   >
                                      <MdCheckCircle
                                         color={theme.palette.success.main}
                                         className="shrink-0"
                                         size={24}
                                      />
                                      <Typography variant="body1">
                                         {goal}
                                      </Typography>
                                   </Stack>
                                </Grid>
                             ))
                           : [
                                "Basics and fundamental concepts",
                                "Real-world project implementation",
                                "Best practices and industry tips",
                                "Access to exclusive community",
                             ].map((item, idx) => (
                                <Grid size={{ xs: 12, sm: 6 }} key={idx}>
                                   <Stack
                                      direction="row"
                                      spacing={1.5}
                                      alignItems="center"
                                   >
                                      <MdCheckCircle
                                         color={theme.palette.success.main}
                                         size={24}
                                      />
                                      <Typography variant="body1">
                                         {item}
                                      </Typography>
                                   </Stack>
                                </Grid>
                             ))}
                     </Grid>
                  </Box>

                  <Divider sx={{ mb: 6 }} />

                  <Box>
                     <Typography variant="h4" fontWeight={800} gutterBottom>
                        Course Curriculum
                     </Typography>
                     <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mb: 4 }}
                     >
                        {lessons.length} Lessons • Total Duration 12h 30m
                     </Typography>

                     <List
                        sx={{
                           bgcolor: alpha(theme.palette.divider, 0.05),
                           borderRadius: 4,
                           p: 2,
                        }}
                     >
                        {lessons.length > 0 ? (
                           lessons.map((lesson, index) => (
                              <ListItem
                                 key={lesson._id}
                                 sx={{
                                    mb: 1,
                                    bgcolor: "white",
                                    borderRadius: 3,
                                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                    cursor: "pointer",
                                    "&:hover": {
                                       bgcolor: alpha(
                                          theme.palette.primary.main,
                                          0.02,
                                       ),
                                    },
                                 }}
                                 onClick={() => {
                                    (course.price == 0 || course.isPurchased) &&
                                       navigate(
                                          `/courses/${id}/lessons/${lesson._id}`,
                                       );
                                 }}
                              >
                                 <ListItemIcon sx={{ minWidth: 40 }}>
                                    {isLessonCompleted(lesson._id) ? (
                                       <MdCheckCircle
                                          color={theme.palette.success.main}
                                          size={24}
                                       />
                                    ) : (
                                       <Typography
                                          variant="h6"
                                          fontWeight={700}
                                          color="text.disabled"
                                       >
                                          {(index + 1)
                                             .toString()
                                             .padStart(2, "0")}
                                       </Typography>
                                    )}
                                 </ListItemIcon>
                                 <ListItemText
                                    primary={lesson.title}
                                    secondary="15:00"
                                    primaryTypographyProps={{
                                       fontWeight: 600,
                                       color: isLessonCompleted(lesson._id)
                                          ? "text.secondary"
                                          : "text.primary",
                                       sx: {
                                          textDecoration: isLessonCompleted(
                                             lesson._id,
                                          )
                                             ? "line-through"
                                             : "none",
                                       },
                                    }}
                                 />
                                 <MdPlayCircleOutline
                                    size={24}
                                    color={theme.palette.primary.main}
                                 />
                              </ListItem>
                           ))
                        ) : (
                           <Typography
                              sx={{ p: 4, textAlign: "center" }}
                              color="text.secondary"
                           >
                              There are no study materials for this course yet.
                           </Typography>
                        )}
                     </List>
                  </Box>
               </Grid>
            </Grid>
         </Container>
      </Box>
   );
};

export default CourseDetail;
