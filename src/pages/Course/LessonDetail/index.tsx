import {
   Box,
   Container,
   Grid,
   Typography,
   Button,
   Stack,
   Card,
   Divider,
   List,
   ListItem,
   ListItemButton,
   ListItemIcon,
   ListItemText,
   CircularProgress,
   alpha,
   useTheme,
   IconButton,
   Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
   MdArrowBack,
   MdPlayCircleOutline,
   MdCheckCircle,
   MdRadioButtonUnchecked,
   MdChevronLeft,
   MdChevronRight,
} from "react-icons/md";
import { getCourseById } from "@/services/course.service";
import {
   getLessons,
   markAsCompleted,
   getCourseProgress,
} from "@/services/lesson.service";
import type { Course } from "@/types/api/course.type";
import type { Lesson, CourseProgress } from "@/types/api/lesson.type";

const LessonDetail = () => {
   const { id: courseId, lessonId } = useParams<{
      id: string;
      lessonId: string;
   }>();
   const theme = useTheme();
   const navigate = useNavigate();

   const [course, setCourse] = useState<Course | null>(null);
   const [lessons, setLessons] = useState<Lesson[]>([]);
   const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
   const [progress, setProgress] = useState<CourseProgress | null>(null);
   const [loading, setLoading] = useState(true);
   const [markingComplete, setMarkingComplete] = useState(false);

   useEffect(() => {
      const fetchData = async () => {
         if (!courseId) return;
         try {
            setLoading(true);
            const [courseRes, lessonsRes, progressRes] = await Promise.all([
               getCourseById(courseId),
               getLessons({ course: courseId, limit: 100, sort: 'order', direction: 'asc' }),
               getCourseProgress(courseId).catch(() => ({ data: null })), // Optional auth
            ]);

            if (courseRes.data) {
               const courseData = courseRes.data.data;
               setCourse(courseData);

               // Logic: Jika berbayar (price > 0) dan belum dibeli, redirect ke detail kursus
               // Catatan: backend saat ini me-mock isPurchased sebagai true jika login, 
               // namun kita tetap tambahkan pengecekan ini untuk keamanan di frontend.
               if (courseData.price > 0 && !(courseData as any).isPurchased) {
                  navigate(`/courses/${courseId}`, { replace: true });
                  return;
               }
            }
            if (lessonsRes.data) {
               setLessons(lessonsRes.data.data);

               // Set current lesson based on lessonId from URL or first lesson
               const found = lessonId
                  ? lessonsRes.data.data.find((l) => l._id === lessonId)
                  : lessonsRes.data.data[0];
               setCurrentLesson(found || null);
            }
            if (progressRes?.data) setProgress(progressRes.data.data);
         } catch (error) {
            console.error("Error fetching lesson detail:", error);
         } finally {
            setLoading(false);
         }
      };

      fetchData();
   }, [courseId, lessonId]);

   const handleMarkComplete = async () => {
      if (!currentLesson || markingComplete) return;
      try {
         setMarkingComplete(true);
         await markAsCompleted(currentLesson._id);
         // Refresh progress
         if (courseId) {
            const progressRes = await getCourseProgress(courseId);
            if (progressRes.data) setProgress(progressRes.data.data);
         }
      } catch (error) {
         console.error("Error marking lesson complete:", error);
      } finally {
         setMarkingComplete(false);
      }
   };

   const isLessonCompleted = (id: string) => {
      return progress?.lessons.find((l) => l._id === id)?.isCompleted;
   };

   const currentIndex = lessons.findIndex((l) => l._id === currentLesson?._id);
   const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
   const nextLesson =
      currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

   if (loading) {
      return (
         <Box
            sx={{
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               minHeight: "100vh",
            }}
         >
            <CircularProgress size={60} />
         </Box>
      );
   }

   if (!course || !currentLesson) {
      return (
         <Container maxWidth='xl' sx={{ py: 12, textAlign: "center" }}>
            <Typography variant="h4">Lesson not found</Typography>
            <Button
               onClick={() => navigate(`/courses/${courseId}`)}
               sx={{ mt: 2 }}
               startIcon={<MdArrowBack />}
            >
               Back to Course Details
            </Button>
         </Container>
      );
   }

   return (
      <Box
         sx={{
            bgcolor: alpha(theme.palette.background.default, 0.5),
            minHeight: "100vh",
         }}
      >
         {/* Top Header Navigation */}
         <Box
            sx={{
               bgcolor: "white",
               borderBottom: `1px solid ${theme.palette.divider}`,
               py: 2,
               position: "sticky",
               top: 0,
               zIndex: 10,
            }}
         >
            <Container maxWidth="xl">
               <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
               >
                  <Stack direction="row" alignItems="center" spacing={2}>
                     <Tooltip title="Back to Course Details">
                        <IconButton
                           onClick={() => navigate(`/courses/${courseId}`)}
                        >
                           <MdArrowBack />
                        </IconButton>
                     </Tooltip>
                     <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ height: 24 }}
                     />
                     <Box>
                        <Typography
                           variant="subtitle2"
                           color="text.secondary"
                           fontWeight={500}
                        >
                           {course.title}
                        </Typography>
                        <Typography
                           variant="h6"
                           fontWeight={700}
                           noWrap
                           sx={{ maxWidth: { xs: 200, md: 500 } }}
                        >
                           {currentLesson.title}
                        </Typography>
                     </Box>
                  </Stack>
                  {progress && (
                     <Box sx={{ display: { xs: "none", sm: "block" } }}>
                        <Typography
                           variant="body2"
                           fontWeight={700}
                           align="right"
                        >
                           Your Progress: {progress.completedLessons} /{" "}
                           {progress.totalLessons}
                        </Typography>
                        <Box
                           sx={{
                              width: 150,
                              height: 6,
                              bgcolor: alpha(theme.palette.primary.main, 0.1),
                              borderRadius: 3,
                              mt: 0.5,
                              overflow: "hidden",
                           }}
                        >
                           <Box
                              sx={{
                                 width: `${progress.percentage}%`,
                                 height: "100%",
                                 bgcolor: "primary.main",
                                 transition: "width 0.3s",
                              }}
                           />
                        </Box>
                     </Box>
                  )}
               </Stack>
            </Container>
         </Box>

         <Container maxWidth="xl" sx={{ py: 4 }}>
            <Grid container spacing={4}>
               {/* Main Content Area */}
               <Grid size={{ xs: 12, lg: 8 }}>
                  {/* Video/Media Placeholder */}
                  <Card
                     sx={{
                        borderRadius: 4,
                        overflow: "hidden",
                        mb: 4,
                        boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
                     }}
                  >
                     <Box
                        sx={{
                           position: "relative",
                           pt: "56.25%",
                           bgcolor: "black",
                        }}
                     >
                        <Box
                           sx={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "white",
                              textAlign: "center",
                              p: 4,
                           }}
                        >
                           <MdPlayCircleOutline size={80} opacity={0.5} />
                           <Typography
                              variant="h5"
                              sx={{ mt: 2, opacity: 0.8 }}
                           >
                              Video Player Placeholder
                           </Typography>
                           <Typography
                              variant="body2"
                              sx={{ mt: 1, opacity: 0.6 }}
                           >
                              Video content for "{currentLesson.title}" will
                              appear here.
                           </Typography>
                        </Box>
                     </Box>
                     <Box
                        sx={{
                           p: 3,
                           display: "flex",
                           justifyContent: "space-between",
                           alignItems: "center",
                           bgcolor: "white",
                        }}
                     >
                        <Button
                           startIcon={<MdChevronLeft />}
                           disabled={!prevLesson}
                           onClick={() =>
                              navigate(
                                 `/courses/${courseId}/lessons/${prevLesson?._id}`,
                              )
                           }
                        >
                           Previous
                        </Button>
                        <Button
                           variant="contained"
                           color={
                              isLessonCompleted(currentLesson._id)
                                 ? "success"
                                 : "primary"
                           }
                           startIcon={
                              isLessonCompleted(currentLesson._id) ? (
                                 <MdCheckCircle />
                              ) : (
                                 <MdRadioButtonUnchecked />
                              )
                           }
                           onClick={handleMarkComplete}
                           disabled={
                              markingComplete ||
                              isLessonCompleted(currentLesson._id)
                           }
                        >
                           {isLessonCompleted(currentLesson._id)
                              ? "Completed"
                              : "Mark as Complete"}
                        </Button>
                        <Button
                           endIcon={<MdChevronRight />}
                           disabled={!nextLesson}
                           onClick={() =>
                              navigate(
                                 `/courses/${courseId}/lessons/${nextLesson?._id}`,
                              )
                           }
                        >
                           Next
                        </Button>
                     </Box>
                  </Card>

                  {/* Material Content */}
                  <Typography variant="h4" fontWeight={800} gutterBottom>
                     Lesson Description
                  </Typography>
                  <Card
                     sx={{
                        p: 4,
                        borderRadius: 4,
                        boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
                     }}
                  >
                     <Typography
                        variant="body1"
                        sx={{
                           whiteSpace: "pre-wrap",
                           color: "text.primary",
                           lineHeight: 1.8,
                        }}
                     >
                        {currentLesson.content ||
                           "No written content available for this lesson."}
                     </Typography>
                  </Card>
               </Grid>

               {/* Sidebar Lesson List */}
               <Grid size={{ xs: 12, lg: 4 }}>
                  <Typography
                     variant="h6"
                     fontWeight={800}
                     sx={{ mb: 2, px: 1 }}
                  >
                     Lesson List
                  </Typography>
                  <Card
                     sx={{
                        borderRadius: 4,
                        overflow: "hidden",
                        boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
                     }}
                  >
                     <List sx={{ p: 0 }}>
                        {lessons.map((lesson, index) => {
                           const isActive = lesson._id === currentLesson._id;
                           const isCompleted = isLessonCompleted(lesson._id);

                           return (
                              <Box key={lesson._id}>
                                 <ListItem disablePadding>
                                    <ListItemButton
                                       selected={isActive}
                                       onClick={() =>
                                          navigate(
                                             `/courses/${courseId}/lessons/${lesson._id}`,
                                          )
                                       }
                                       sx={{
                                          py: 2,
                                          px: 3,
                                          borderLeft: isActive
                                             ? `4px solid ${theme.palette.primary.main}`
                                             : "4px solid transparent",
                                          bgcolor: isActive
                                             ? alpha(
                                                  theme.palette.primary.main,
                                                  0.05,
                                               )
                                             : "transparent",
                                          "&.Mui-selected": {
                                             bgcolor: alpha(
                                                theme.palette.primary.main,
                                                0.08,
                                             ),
                                             "&:hover": {
                                                bgcolor: alpha(
                                                   theme.palette.primary.main,
                                                   0.12,
                                                ),
                                             },
                                          },
                                       }}
                                    >
                                       <ListItemIcon sx={{ minWidth: 40 }}>
                                          {isCompleted ? (
                                             <MdCheckCircle
                                                color={
                                                   theme.palette.success.main
                                                }
                                                size={24}
                                             />
                                          ) : (
                                             <Typography
                                                variant="h6"
                                                fontWeight={700}
                                                color={
                                                   isActive
                                                      ? "primary.main"
                                                      : "text.disabled"
                                                }
                                             >
                                                {(index + 1)
                                                   .toString()
                                                   .padStart(2, "0")}
                                             </Typography>
                                          )}
                                       </ListItemIcon>
                                       <ListItemText
                                          primary={lesson.title}
                                          primaryTypographyProps={{
                                             fontWeight: isActive ? 700 : 500,
                                             color: isActive
                                                ? "primary.main"
                                                : "text.primary",
                                          }}
                                          secondary="15:00"
                                       />
                                       {isActive && (
                                          <MdPlayCircleOutline
                                             size={20}
                                             color={theme.palette.primary.main}
                                          />
                                       )}
                                    </ListItemButton>
                                 </ListItem>
                                 {index < lessons.length - 1 && <Divider />}
                              </Box>
                           );
                        })}
                     </List>
                  </Card>
               </Grid>
            </Grid>
         </Container>
      </Box>
   );
};

export default LessonDetail;
