import React, { useEffect, useState } from "react";
import {
   Box,
   Button,
   IconButton,
   List,
   ListItem,
   ListItemText,
   Typography,
   Dialog,
   DialogTitle,
   DialogContent,
   Grid,
   DialogActions,
} from "@mui/material";
import { MdAdd, MdDelete, MdEdit, MdClose } from "react-icons/md";
import {
   getLessons,
   createLesson,
   updateLesson,
   deleteLesson,
} from "@/services/lesson.service";
import type { Lesson } from "@/types/api/lesson.type";
import { useSnackbarStore } from "@/store/useSnackbarStore";
import { useFormik } from "formik";
import {
   getCreateLessonSchema,
   type CreateLessonFormData,
} from "@/validations/courseSchema";
import Input from "@/components/form/Input";

interface LessonAdminProps {
   open: boolean;
   onClose: () => void;
   courseId: string;
   courseTitle: string;
}

const validationSchema = getCreateLessonSchema();

const LessonAdmin: React.FC<LessonAdminProps> = ({
   open,
   onClose,
   courseId,
   courseTitle,
}) => {
   const [lessons, setLessons] = useState<Lesson[]>([]);
   const [openForm, setOpenForm] = useState(false);
   const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
   const setSnackbar = useSnackbarStore((s) => s.setSnackbar);

   const fetchLessons = async () => {
      try {
         const { data } = await getLessons({ course: courseId, limit: 100 });

         if (data) {
            setLessons(data.data);
         }
      } catch (err) {
         console.error(err);
      }
   };

   useEffect(() => {
      if (open && courseId) {
         fetchLessons();
      }
   }, [open, courseId]);

   const formik = useFormik<CreateLessonFormData>({
      initialValues: {
         title: selectedLesson?.title || "",
         content: selectedLesson?.content || "",
         order: selectedLesson?.order || lessons.length + 1,
      },
      validationSchema,
      enableReinitialize: true,
      onSubmit: async (values) => {
         try {
            if (selectedLesson) {
               await updateLesson(selectedLesson._id, values);
               setSnackbar({ type: "success", message: "Lesson updated successfully" });
            } else {
               await createLesson({ ...values, course: courseId });
               setSnackbar({ type: "success", message: "Lesson created successfully" });
            }
            setOpenForm(false);
            fetchLessons();
         } catch (err: any) {
            setSnackbar({ type: "failure", message: err.message });
         }
      },
   });

   const handleAdd = () => {
      setSelectedLesson(null);
      setOpenForm(true);
   };

   const handleEdit = (lesson: Lesson) => {
      setSelectedLesson(lesson);
      setOpenForm(true);
   };

   const handleDelete = async (id: string) => {
      if (window.confirm("Are you sure you want to delete this lesson?")) {
         await deleteLesson(id);
         setSnackbar({ type: "success", message: "Lesson deleted successfully" });
         fetchLessons();
      }
   };

   return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
         <DialogTitle className="px-8 py-5">
            <Box className="flex items-center justify-between">
               <Typography variant="h5" className="font-semibold">
                  {courseTitle}
               </Typography>
               <IconButton
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600"
               >
                  <MdClose className="text-[20px]" />
               </IconButton>
            </Box>
         </DialogTitle>
         <DialogContent dividers>
            <Box sx={{ mt: 2 }}>
               <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography variant="h6">Curriculum</Typography>
                  <Button
                     variant="outlined"
                     startIcon={<MdAdd />}
                     onClick={handleAdd}
                     sx={{ borderRadius: 2 }}
                  >
                     Add Lesson
                  </Button>
               </Box>

               <List>
                  {lessons.map((lesson) => (
                     <ListItem
                        key={lesson._id}
                        divider
                        secondaryAction={
                           <Box>
                              <IconButton onClick={() => handleEdit(lesson)}>
                                 <MdEdit />
                              </IconButton>
                              <IconButton
                                 color="error"
                                 onClick={() => handleDelete(lesson._id)}
                              >
                                 <MdDelete />
                              </IconButton>
                           </Box>
                        }
                     >
                        <ListItemText
                           primary={`${lesson.order}. ${lesson.title}`}
                           secondary={lesson.content.substring(0, 50) + "..."}
                        />
                     </ListItem>
                  ))}
               </List>

               <Dialog
                  open={openForm}
                  onClose={() => setOpenForm(false)}
                  fullWidth
                  maxWidth="lg"
                  component="form"
                  onSubmit={formik.handleSubmit as any}
               >
                  <DialogTitle className="px-8 py-5">
                     <Box className="flex items-center justify-between">
                        <Typography variant="h5" className="font-semibold">
                           {selectedLesson ? "Edit Lesson" : "Add Lesson"}
                        </Typography>
                        <IconButton
                           onClick={() => setOpenForm(false)}
                           className="text-gray-400 hover:text-gray-600"
                        >
                           <MdClose className="text-[20px]" />
                        </IconButton>
                     </Box>
                  </DialogTitle>
                  <DialogContent dividers>
                     <Grid container spacing={2}>
                        <Grid size={{ xs: 9 }}>
                           <Input
                              fullWidth
                              label="Title"
                              name="title"
                              value={formik.values.title}
                              onChange={formik.handleChange}
                              error={
                                 formik.touched.title &&
                                 Boolean(formik.errors.title)
                              }
                              helperText={
                                 formik.touched.title && formik.errors.title
                              }
                           />
                        </Grid>
                        <Grid size={{ xs: 3 }}>
                           <Input
                              fullWidth
                              type="number"
                              label="Order"
                              name="order"
                              value={formik.values.order}
                              onChange={formik.handleChange}
                           />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                           <Input
                              fullWidth
                              multiline
                              rows={4}
                              label="Content"
                              name="content"
                              value={formik.values.content}
                              onChange={formik.handleChange}
                              error={
                                 formik.touched.content &&
                                 Boolean(formik.errors.content)
                              }
                              helperText={
                                 formik.touched.content && formik.errors.content
                              }
                           />
                        </Grid>
                     </Grid>
                  </DialogContent>
                  <DialogActions>
                     <Box display="flex" justifyContent="flex-end" gap={2}>
                        <Button onClick={() => setOpenForm(false)}>
                           Cancel
                        </Button>
                        <Button type="submit" variant="contained">
                           Save
                        </Button>
                     </Box>
                  </DialogActions>
               </Dialog>
            </Box>
         </DialogContent>
      </Dialog>
   );
};

export default LessonAdmin;
