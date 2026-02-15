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
   alpha,
   useTheme,
   IconButton,
   Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import {
   MdArrowBack,
   MdPlayCircleOutline,
   MdCheckCircle,
} from "react-icons/md";
import { useGetCourseById } from "@/services/course.service";
import { useGetCourseProgress } from "@/services/lesson.service";
import type { Lesson } from "@/types/api/lesson.type";

const LessonLayout = () => {
   const { id: courseId, lessonId } = useParams<{
      id: string;
      lessonId: string;
   }>();
   const theme = useTheme();
   const navigate = useNavigate();

   const { data: course } = useGetCourseById(courseId!);
   const { data: progress } = useGetCourseProgress(courseId!);

   const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);

   useEffect(() => {
      if (course && course.data.price > 0 && !course.data.isPurchased) {
         navigate(`/courses/${courseId}`, { replace: true });
         return;
      }
   }, [course]);

   useEffect(() => {
      if (progress) {
         setCurrentLesson(
            progress.data.lessons.find((l) => l._id === lessonId!) || null,
         );
      }
   }, [progress]);

   if (!course) {
      return (
         <Container maxWidth="xl" sx={{ py: 12, textAlign: "center" }}>
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
                           {course.data.title}
                        </Typography>
                        <Typography
                           variant="h6"
                           fontWeight={700}
                           noWrap
                           sx={{ maxWidth: { xs: 200, md: 500 } }}
                        >
                           {currentLesson?.title}
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
                           Your Progress: {progress.data.completedLessons} /{" "}
                           {progress.data.totalLessons}
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
                                 width: `${progress.data.percentage}%`,
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
                  <Outlet context={{lessons: progress?.data.lessons || []}} />
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
                        {progress?.data.lessons.map((lesson, index) => {
                           const isActive = lesson._id === lessonId;

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
                                          {lesson.isCompleted ? (
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
                                 {index < progress.data.lessons.length - 1 && (
                                    <Divider />
                                 )}
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

export default LessonLayout;
