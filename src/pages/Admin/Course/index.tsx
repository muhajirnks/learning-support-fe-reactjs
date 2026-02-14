import { useEffect, useMemo, useState } from "react";
import DataTable, { createTableConfig } from "@/components/DataTable";
import {
   Box,
   Button,
   Container,
   IconButton,
   Typography,
   Card,
   CardContent,
   InputAdornment,
   debounce,
   MenuItem,
} from "@mui/material";
import {
   MdAdd,
   MdDelete,
   MdEdit,
   MdList,
   MdSearch,
} from "react-icons/md";
import CourseForm from "./components/CourseForm";
import LessonAdmin from "./components/LessonAdmin";
import { deleteCourse, useListCourses } from "@/services/course.service";
import { useListCategories } from "@/services/category.service";
import { useSnackbarStore } from "@/store/useSnackbarStore";
import type { Course, ListCourseParams } from "@/types/api/course.type";
import Input from "@/components/form/Input";
import Pagination from "@/components/Pagination";
import { useSearchParams } from "react-router-dom";
import { sanitizePaginationQs } from "@/utils/sanitizeQs";
import { toQueryString } from "@/lib/fetch/createFetch";

const tableConfig = createTableConfig({
   uniqueField: "_id",
   columns: [
      { key: "title", sortKey: "title", label: "Title", type: "string" },
      {
         key: "instructor",
         sortKey: "instructor",
         label: "Instructor",
         type: "string",
      },
      { key: "category.name", label: "Category", type: "string" },
      { key: "price", sortKey: "price", label: "Price", type: "number" },
      {
         key: "createdAt",
         sortKey: "createdAt",
         label: "Created At",
         type: "datetime",
      },
   ],
});

const rowsPerPageOptions = [10, 25, 50];

const AdminCourse = () => {
   const [searchParams, setSearchParams] = useSearchParams();
   const [searchQuery, setSearchQuery] = useState(
      searchParams.get("search") || "",
   );

   const [qs, setQs] = useState<ListCourseParams>(() =>
      sanitizePaginationQs(searchParams, rowsPerPageOptions, [
         "title",
         "instructor",
         "price",
         "createdAt",
      ]),
   );

   const { data: categoriesRes } = useListCategories();

   const [open, setOpen] = useState(false);
   const [openLessons, setOpenLessons] = useState(false);
   const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

   const { data, loading, fetchData } = useListCourses(qs);
   const setSnackbar = useSnackbarStore((s) => s.setSnackbar);

   const handleAdd = () => {
      setSelectedCourse(null);
      setOpen(true);
   };

   const handleEdit = (course: Course) => {
      setSelectedCourse(course);
      setOpen(true);
   };

   const handleManageLessons = (course: Course) => {
      setSelectedCourse(course);
      setOpenLessons(true);
   };

   const handleDelete = async (id: string) => {
      if (window.confirm("Are you sure you want to delete this course?")) {
         const { data, error } = await deleteCourse(id);
         if (data) {
            setSnackbar({
               type: "success",
               message: data.message || "Course deleted successfully",
            });
            fetchData();
         }
         if (error) {
            setSnackbar({
               type: "failure",
               message: error.message || "Failed to delete course",
            });
         }
      }
   };

   const handleClose = () => {
      setOpen(false);
      setOpenLessons(false);
      setSelectedCourse(null);
   };

   const handleSuccess = () => {
      handleClose();
      fetchData();
   };

   const handleChangeSort = (sortKey: string) => {
      const isAsc = qs.sort === sortKey && qs.direction === "asc";
      setQs({
         ...qs,
         sort: sortKey,
         direction: isAsc ? "desc" : "asc",
      });
   };

   const handleChangePage = (page: number) => {
      setQs({
         ...qs,
         page,
      });
   };

   const handleChangeRowsPerPage = (limit: number) => {
      setQs({
         ...qs,
         page: 1,
         limit,
      });
   };

   const debouncedSearch = useMemo(
      () =>
         debounce((search: string) => {
            setQs({
               ...qs,
               page: 1,
               search,
            });
         }, 800),
      [qs],
   );

   useEffect(() => {
      setSearchParams(toQueryString(qs));
   }, [qs]);

   return (
      <Container maxWidth="2xl" sx={{ mt: 4, mb: 4 }}>
         <Card>
            <CardContent>
               <Typography
                  variant="h5"
                  className="text-foreground-primary mb-5"
               >
                  Manage Courses
               </Typography>

               <Box className="flex justify-between items-center gap-4 mb-5">
                  <Box className="flex items-center gap-4 grow">
                     <Input
                        fullWidth
                        placeholder="Search courses..."
                        value={searchQuery}
                        onChange={(e) => {
                           setSearchQuery(e.target.value);
                           debouncedSearch(e.target.value);
                        }}
                        size="small"
                        className="grow basis-0"
                        InputProps={{
                           startAdornment: (
                              <InputAdornment position="start">
                                 <MdSearch />
                              </InputAdornment>
                           ),
                        }}
                     />
                     <Input
                        select
                        size="small"
                        label="Category"
                        value={qs.category || ""}
                        onChange={(e) =>
                           setQs({ ...qs, category: e.target.value || undefined, page: 1 })
                        }
                        sx={{ minWidth: 200 }}
                     >
                        <MenuItem value="">All Categories</MenuItem>
                        {categoriesRes?.data.map((cat) => (
                           <MenuItem key={cat._id} value={cat._id}>
                              {cat.name}
                           </MenuItem>
                        ))}
                     </Input>
                  </Box>
                  <Button
                     variant="contained"
                     startIcon={<MdAdd />}
                     onClick={handleAdd}
                     sx={{ borderRadius: 2 }}
                  >
                     Add Course
                  </Button>
               </Box>

               <DataTable
                  loading={loading}
                  rows={data?.data || []}
                  config={tableConfig}
                  sortBy={qs.sort || "createdAt"}
                  sort={qs.direction || "desc"}
                  onChangeSort={handleChangeSort}
                  renderAction={(row) => (
                     <Box display="flex" justifyContent="center" gap={1}>
                        <IconButton
                           size="small"
                           onClick={() => handleManageLessons(row)}
                           title="Manage Lessons"
                        >
                           <MdList />
                        </IconButton>
                        <IconButton
                           size="small"
                           onClick={() => handleEdit(row)}
                        >
                           <MdEdit />
                        </IconButton>
                        <IconButton
                           size="small"
                           color="error"
                           onClick={() => handleDelete(row._id)}
                        >
                           <MdDelete />
                        </IconButton>
                     </Box>
                  )}
               />

               <Box className="mt-5">
                  <Pagination
                     page={qs.page || 1}
                     lastPage={data?.meta.lastPage || 1}
                     total={data?.meta.total || 0}
                     limit={qs.limit || 10}
                     rowsPerPageOptions={rowsPerPageOptions}
                     onChangePage={handleChangePage}
                     onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
               </Box>

               <CourseForm
                  open={open}
                  initialValues={selectedCourse}
                  onSuccess={handleSuccess}
                  onClose={handleClose}
               />

               <LessonAdmin
                  open={openLessons}
                  onClose={handleClose}
                  courseId={selectedCourse?._id || ""}
                  courseTitle={selectedCourse?.title || ""}
               />
            </CardContent>
         </Card>
      </Container>
   );
};

export default AdminCourse;
