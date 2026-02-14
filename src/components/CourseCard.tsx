import {
   Box,
   Typography,
   Card,
   CardContent,
   Button,
   Stack,
   alpha,
   useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { MdStar, MdPeople } from "react-icons/md";
import type { Course } from "@/types/api/course.type";

interface CourseCardProps {
   course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
   const theme = useTheme();
   const navigate = useNavigate();

   return (
      <Card
         sx={{
            height: "100%",
            borderRadius: 4,
            overflow: "hidden",
            transition: "0.3s",
            cursor: "pointer",
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            "&:hover": {
               transform: "translateY(-10px)",
               boxShadow: 15,
            },
         }}
         onClick={() => navigate(`/courses/${course._id}`)}
      >
         <Box sx={{ position: "relative" }}>
            <Box
               component="img"
               src={
                  course.thumbnailUrl ||
                  "https://via.placeholder.com/400x250?text=No+Thumbnail"
               }
               alt={course.title}
               sx={{
                  width: "100%",
                  height: 200,
                  objectFit: "cover",
               }}
            />
            <Box
               sx={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  bgcolor: "white",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "primary.main",
                  boxShadow: 2,
               }}
            >
               {typeof course.category === "object"
                  ? course.category.name
                  : "Uncategorized"}
            </Box>
         </Box>
         <CardContent sx={{ p: 3 }}>
            <Typography
               variant="h6"
               fontWeight={700}
               gutterBottom
               sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
               }}
            >
               {course.title}
            </Typography>
            <Typography
               variant="body2"
               color="text.secondary"
               sx={{ mb: 2 }}
            >
               Oleh <strong>{course.instructor}</strong>
            </Typography>

            <Stack
               direction="row"
               alignItems="center"
               spacing={2}
               sx={{ mb: 3 }}
            >
               <Stack
                  direction="row"
                  alignItems="center"
                  spacing={0.5}
               >
                  <MdStar
                     color={theme.palette.warning.main}
                  />
                  <Typography
                     variant="subtitle2"
                     fontWeight={700}
                  >
                     4.8
                  </Typography>
               </Stack>
               <Stack
                  direction="row"
                  alignItems="center"
                  spacing={0.5}
               >
                  <MdPeople
                     color={theme.palette.text.secondary}
                  />
                  <Typography
                     variant="caption"
                     color="text.secondary"
                  >
                     1,200 Siswa
                  </Typography>
               </Stack>
            </Stack>

            <Box
               sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  pt: 2,
                  borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
               }}
            >
               <Typography
                  variant="h6"
                  color="primary.main"
                  fontWeight={800}
               >
                  Rp {course.price.toLocaleString()}
               </Typography>
               <Button
                  component={Link}
                  to={`/courses/${course._id}`}
                  size="small"
                  variant="outlined"
                  sx={{ borderRadius: 2, fontWeight: 700 }}
                  onClick={(e) => e.stopPropagation()}
               >
                  Detail
               </Button>
            </Box>
         </CardContent>
      </Card>
   );
};

export default CourseCard;
