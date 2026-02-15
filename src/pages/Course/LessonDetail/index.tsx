import {
   Box,
   Container,
   Typography,
   Button,
   Card,
   CircularProgress,
} from "@mui/material";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import {
   MdArrowBack,
   MdPlayCircleOutline,
   MdCheckCircle,
   MdRadioButtonUnchecked,
   MdChevronLeft,
   MdChevronRight,
} from "react-icons/md";
import { markAsCompleted, useLessonById } from "@/services/lesson.service";
import type { Lesson } from "@/types/api/lesson.type";

const LessonDetail = () => {
   const { id: courseId, lessonId } = useParams<{
      id: string;
      lessonId: string;
   }>();
   const navigate = useNavigate();
   const { lessons } = useOutletContext<{
      lessons: (Lesson &
         {
            isCompleted: boolean;
         })[];
   }>();

   const {
      data: lesson,
      loading,
      setData: setLesson,
   } = useLessonById(lessonId!);

   const handleMarkComplete = async () => {
      if (!lesson || lesson.data.isCompleted) return;
      try {
         await markAsCompleted(lesson.data._id);
         // Refresh progress
         if (courseId) {
            setLesson({ data: { ...lesson.data, isCompleted: true } });
         }
      } catch (error) {
         console.error("Error marking lesson complete:", error);
      }
   };

   const currentIndex = lessons.findIndex((l) => l._id === lessonId);
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

   if (!lesson) {
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
      <>
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
                  <Typography variant="h5" sx={{ mt: 2, opacity: 0.8 }}>
                     Video Player Placeholder
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, opacity: 0.6 }}>
                     Video content for "{lesson?.data.title}" will appear here.
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
                     navigate(`/courses/${courseId}/lessons/${prevLesson?._id}`)
                  }
               >
                  Previous
               </Button>
               <Button
                  variant="contained"
                  color={lesson?.data.isCompleted ? "success" : "primary"}
                  startIcon={
                     lesson?.data.isCompleted ? (
                        <MdCheckCircle />
                     ) : (
                        <MdRadioButtonUnchecked />
                     )
                  }
                  onClick={handleMarkComplete}
                  disabled={lesson?.data.isCompleted}
               >
                  {lesson?.data.isCompleted ? "Completed" : "Mark as Complete"}
               </Button>
               <Button
                  endIcon={<MdChevronRight />}
                  disabled={!nextLesson}
                  onClick={() =>
                     navigate(`/courses/${courseId}/lessons/${nextLesson?._id}`)
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
               {lesson?.data.content ||
                  "No written content available for this lesson."}
            </Typography>
         </Card>
      </>
   );
};

export default LessonDetail;
