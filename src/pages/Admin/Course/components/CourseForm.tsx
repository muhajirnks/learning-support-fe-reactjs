import { useFormik, FieldArray, FormikProvider } from "formik";
import type { Course, CreateCourseRequest } from "@/types/api/course.type";
import { createCourse, updateCourse } from "@/services/course.service";
import {
   Box,
   Button,
   Grid,
   MenuItem,
   FormControl,
   FormHelperText,
   InputLabel,
   IconButton,
   Typography,
   Stack,
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
} from "@mui/material";
import { MdAdd, MdDelete, MdClose } from "react-icons/md";
import Input from "@/components/form/Input";
import SelectInput from "@/components/form/SelectInput";
import { useSnackbarStore } from "@/store/useSnackbarStore";
import { useListCategories } from "@/services/category.service";
import FileInput from "@/components/form/FIleInput";
import {
   getCreateCourseSchema,
   type CreateCourseFormData,
} from "@/validations/courseSchema";

interface Props {
   open: boolean;
   initialValues: Course | null;
   onSuccess: () => void;
   onClose: () => void;
}

const qs = { limit: 100 };
const validationSchema = getCreateCourseSchema();

const CourseForm = ({ open, initialValues, onSuccess, onClose }: Props) => {
   const setSnackbar = useSnackbarStore((s) => s.setSnackbar);

   const { data: categories } = useListCategories(qs);

   const formik = useFormik<CreateCourseFormData>({
      initialValues: {
         title: initialValues?.title || "",
         description: initialValues?.description || "",
         instructor: initialValues?.instructor || "",
         price: initialValues?.price || 0,
         category:
            typeof initialValues?.category === "string"
               ? initialValues.category
               : initialValues?.category?._id || "",
         goals: initialValues?.goals || [""],
         thumbnail: null,
      },
      enableReinitialize: true,
      validationSchema,
      onSubmit: async (values) => {
         try {
            if (initialValues) {
               const { error } = await updateCourse(initialValues._id, values);
               if (!error) {
                  setSnackbar({
                     type: "success",
                     message: "Course updated successfully",
                  });
                  onSuccess();
               }
            } else {
               const { error } = await createCourse(
                  values as CreateCourseRequest,
               );
               if (!error) {
                  setSnackbar({
                     type: "success",
                     message: "Course created successfully",
                  });
                  onSuccess();
               }
            }
         } catch (err) {
            console.error(err);
         }
      },
   });

   return (
      <FormikProvider value={formik}>
         <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
            component="form"
            onSubmit={formik.handleSubmit as any}
         >
            <DialogTitle className="px-8 py-5">
               <Box className="flex items-center justify-between">
                  <Typography variant="h5" className="font-semibold">
                     {initialValues ? "Edit Course" : "Add New Course"}
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
               <Grid container spacing={2} sx={{ mt: 0.5 }}>
                  <Grid size={{ xs: 12 }}>
                     <Input
                        fullWidth
                        label="Title"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        error={
                           formik.touched.title && Boolean(formik.errors.title)
                        }
                        helperText={formik.touched.title && formik.errors.title}
                     />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                     <Input
                        fullWidth
                        multiline
                        rows={3}
                        label="Description"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={
                           formik.touched.description &&
                           Boolean(formik.errors.description)
                        }
                        helperText={
                           formik.touched.description &&
                           formik.errors.description
                        }
                     />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                     <Input
                        fullWidth
                        label="Instructor"
                        name="instructor"
                        value={formik.values.instructor}
                        onChange={formik.handleChange}
                        error={
                           formik.touched.instructor &&
                           Boolean(formik.errors.instructor)
                        }
                        helperText={
                           formik.touched.instructor && formik.errors.instructor
                        }
                     />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                     <FormControl
                        fullWidth
                        error={
                           formik.touched.category &&
                           Boolean(formik.errors.category)
                        }
                     >
                        <InputLabel id="category-label">Category</InputLabel>
                        <SelectInput
                           labelId="category-label"
                           id="category"
                           name="category"
                           label="Category"
                           value={formik.values.category}
                           onChange={formik.handleChange}
                        >
                           {categories?.data.map((cat) => (
                              <MenuItem key={cat._id} value={cat._id}>
                                 {cat.name}
                              </MenuItem>
                           ))}
                        </SelectInput>
                        {formik.touched.category && formik.errors.category && (
                           <FormHelperText>
                              {formik.errors.category}
                           </FormHelperText>
                        )}
                     </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                     <Input
                        fullWidth
                        type="number"
                        label="Price"
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        error={
                           formik.touched.price && Boolean(formik.errors.price)
                        }
                        helperText={formik.touched.price && formik.errors.price}
                     />
                  </Grid>

                  {/* Goals FieldArray */}
                  <Grid size={{ xs: 12 }}>
                     <Typography
                        variant="subtitle2"
                        sx={{ mb: 1, fontWeight: 700 }}
                     >
                        Course Goals
                     </Typography>
                     <FieldArray
                        name="goals"
                        render={(arrayHelpers) => (
                           <Stack spacing={2}>
                              {formik.values.goals.map((_, index) => (
                                 <Stack
                                    key={index}
                                    direction="row"
                                    spacing={1}
                                    alignItems="flex-start"
                                 >
                                    <Input
                                       fullWidth
                                       placeholder={`Goal #${index + 1}`}
                                       name={`goals.${index}`}
                                       value={formik.values.goals[index]}
                                       onChange={formik.handleChange}
                                       error={Boolean(
                                          (formik.touched.goals as any)?.[
                                             index
                                          ] &&
                                          (formik.errors.goals as any)?.[index],
                                       )}
                                       helperText={
                                          (formik.touched.goals as any)?.[
                                             index
                                          ] &&
                                          (formik.errors.goals as any)?.[index]
                                       }
                                       size="small"
                                    />
                                    <IconButton
                                       color="error"
                                       onClick={() =>
                                          arrayHelpers.remove(index)
                                       }
                                       disabled={
                                          formik.values.goals.length === 1
                                       }
                                       size="small"
                                       sx={{ mt: 0.5 }}
                                    >
                                       <MdDelete />
                                    </IconButton>
                                 </Stack>
                              ))}
                              <Button
                                 startIcon={<MdAdd />}
                                 variant="outlined"
                                 size="small"
                                 onClick={() => arrayHelpers.push("")}
                                 sx={{
                                    alignSelf: "flex-start",
                                    borderRadius: 2,
                                 }}
                              >
                                 Add Goal
                              </Button>
                              {typeof formik.errors.goals === "string" && (
                                 <Typography variant="caption" color="error">
                                    {formik.errors.goals}
                                 </Typography>
                              )}
                           </Stack>
                        )}
                     />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                     <FileInput
                        placeholder="Upload thumbnail"
                        value={formik.values.thumbnail}
                        onChange={(val) => {
                           if (val instanceof File) {
                              formik.setFieldValue("thumbnail", val);
                           } else {
                              formik.setFieldValue("thumbnail", null);
                           }
                        }}
                        error={
                           formik.touched.thumbnail &&
                           Boolean(formik.errors.thumbnail)
                        }
                        helperText={
                           formik.touched.thumbnail &&
                           (formik.errors.thumbnail as string)
                        }
                     />
                  </Grid>
               </Grid>
            </DialogContent>
            <DialogActions>
               <Box display="flex" justifyContent="flex-end" gap={2}>
                  <Button onClick={onClose}>Cancel</Button>
                  <Button type="submit" variant="contained">
                     {initialValues ? "Update" : "Create"}
                  </Button>
               </Box>
            </DialogActions>
         </Dialog>
      </FormikProvider>
   );
};

export default CourseForm;
