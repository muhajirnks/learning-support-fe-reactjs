import {
   Box,
   Container,
   Grid,
   Typography,
   Card,
   TextField,
   InputAdornment,
   MenuItem,
   Select,
   FormControl,
   CircularProgress,
   alpha,
   useTheme,
   Button,
   Stack,
   Divider,
   debounce,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { MdSearch, MdFilterList, MdClear } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import { useListCourses } from "@/services/course.service";
import { useListCategories } from "@/services/category.service";
import CourseCard from "@/components/CourseCard";
import type { Course, ListCourseParams } from "@/types/api/course.type";
import type { Category } from "@/types/api/category.type";
import { toQueryString } from "@/lib/fetch/createFetch";
import { useSearchParams } from "react-router-dom";
import { sanitizeQs } from "@/utils/sanitizeQs";
import { qsSchema } from "./qsSchema";

const categoryQs = { limit: 100 };
const initialQs: ListCourseParams = {
   search: "",
   category: "",
   minPrice: undefined,
   maxPrice: undefined,
   limit: 6,
   page: 1,
};

const CourseList = () => {
   const [searchParams, setSearchParams] = useSearchParams();
   const theme = useTheme();

   const [filter, setFilter] = useState(() =>
      sanitizeQs(searchParams, qsSchema),
   );
   const [qs, setQs] = useState<ListCourseParams>({ ...initialQs, ...filter });
   const [courses, setCourses] = useState<Course[]>([]);

   const { data: categoriesData } = useListCategories(categoryQs);
   const { data: coursesData, loading: isLoadingCourses } = useListCourses(qs);

   const categories = categoriesData?.data || [];

   useEffect(() => {
      if (coursesData?.data) {
         if ((coursesData.meta.page) === 1) {
            setCourses(coursesData.data);
         } else {
            setCourses((prev) => [...prev, ...coursesData.data]);
         }
      }
   }, [coursesData]);

   const handleClearFilters = () => {
      setQs(initialQs);
      setFilter(initialQs);
   };

   const loadMore = () => {
      if (coursesData && (qs.page || 1) < coursesData.meta.lastPage) {
         setQs((prev) => ({ ...prev, page: (prev.page || 1) + 1 }));
      }
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

   const debouncedMinPrice = useMemo(
      () =>
         debounce((minPrice?: number) => {
            setQs({
               ...qs,
               page: 1,
               minPrice,
            });
         }, 800),
      [qs],
   );

   const debouncedMaxPrice = useMemo(
      () =>
         debounce((maxPrice?: number) => {
            setQs({
               ...qs,
               page: 1,
               maxPrice,
            });
         }, 800),
      [qs],
   );

   useEffect(() => {
      setSearchParams(toQueryString(filter), { preventScrollReset: true });
   }, [qs]);

   return (
      <Box
         sx={{
            bgcolor: alpha(theme.palette.primary.main, 0.01),
            minHeight: "100vh",
            pb: 10,
         }}
      >
         {/* Hero Section */}
         <Box
            sx={{
               background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
               color: "white",
               pt: { xs: 8, md: 10 },
               pb: { xs: 12, md: 15 },
               mb: -8,
               position: "relative",
            }}
         >
            <Container maxWidth="xl">
               <Stack spacing={2} sx={{ maxWidth: 800 }}>
                  <Typography
                     variant="overline"
                     color="primary.contrastText"
                     sx={{
                        fontWeight: 700,
                        letterSpacing: 2,
                        color: alpha("#fff", 0.7),
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                     }}
                  >
                     <MdFilterList /> COURSE EXPLORATION
                  </Typography>
                  <Typography
                     variant="h2"
                     color="primary.contrastText"
                     fontWeight={850}
                     sx={{
                        fontSize: { xs: "2.5rem", md: "3.75rem" },
                        lineHeight: 1.1,
                        textShadow: "0 2px 10px rgba(0,0,0,0.1)",
                     }}
                  >
                     Level Up Your Skills With Experts
                  </Typography>
                  <Typography
                     variant="h6"
                     color="primary.contrastText"
                     sx={{ opacity: 0.85, fontWeight: 400, maxWidth: 600 }}
                  >
                     Find the latest curriculum specifically designed to help you achieve your dream career.
                  </Typography>
               </Stack>
            </Container>
         </Box>

         <Container maxWidth="xl">
            <Grid container spacing={4}>
               {/* Sidebar Filters */}
               <Grid size={{ xs: 12, lg: 3 }} className="z-1">
                  <Card
                     sx={{
                        p: 3,
                        borderRadius: 5,
                        boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
                        position: { lg: "sticky" },
                        top: { lg: 100 },
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                     }}
                  >
                     <Stack spacing={4}>
                        <Stack
                           direction="row"
                           justifyContent="space-between"
                           alignItems="center"
                        >
                           <Typography variant="h6" fontWeight={800}>
                              Filters
                           </Typography>
                           <Button
                              size="small"
                              onClick={handleClearFilters}
                              startIcon={<MdClear />}
                              sx={{ color: "text.secondary", fontWeight: 600 }}
                           >
                              Reset
                           </Button>
                        </Stack>

                        <Divider />

                        {/* Search */}
                        <Box>
                           <Typography
                              variant="subtitle2"
                              fontWeight={700}
                              gutterBottom
                              sx={{ mb: 1.5 }}
                           >
                              Search Keywords
                           </Typography>
                           <TextField
                              fullWidth
                              placeholder="Type course title..."
                              value={filter.search}
                              onChange={(e) => {
                                 debouncedSearch(e.target.value);
                                 setFilter({
                                    ...filter,
                                    search: e.target.value,
                                 });
                              }}
                              InputProps={{
                                 startAdornment: (
                                    <InputAdornment position="start">
                                       <MdSearch
                                          size={20}
                                          color={theme.palette.primary.main}
                                       />
                                    </InputAdornment>
                                 ),
                                 sx: {
                                    borderRadius: 3,
                                    bgcolor: alpha(
                                       theme.palette.primary.main,
                                       0.03,
                                    ),
                                    "& fieldset": { border: "none" },
                                    "&:hover": {
                                       bgcolor: alpha(
                                          theme.palette.primary.main,
                                          0.05,
                                       ),
                                    },
                                 },
                              }}
                           />
                        </Box>

                        {/* Category */}
                        <Box>
                           <Typography
                              variant="subtitle2"
                              fontWeight={700}
                              gutterBottom
                              sx={{ mb: 1.5 }}
                           >
                              Category
                           </Typography>
                           <FormControl fullWidth size="small">
                              <Select
                                 value={qs.category || ""}
                                 displayEmpty
                                 onChange={(e) =>
                                    setQs({ ...qs, category: e.target.value })
                                 }
                                 sx={{
                                    borderRadius: 3,
                                    bgcolor: alpha(
                                       theme.palette.primary.main,
                                       0.03,
                                    ),
                                    "& fieldset": { border: "none" },
                                 }}
                              >
                                 <MenuItem value="">All Categories</MenuItem>
                                 {categories.map((cat: Category) => (
                                    <MenuItem key={cat._id} value={cat._id}>
                                       {cat.name}
                                    </MenuItem>
                                 ))}
                              </Select>
                           </FormControl>
                        </Box>

                        {/* Price Range */}
                        <Box>
                           <Typography
                              variant="subtitle2"
                              fontWeight={700}
                              gutterBottom
                              sx={{ mb: 1.5 }}
                           >
                              Price Range
                           </Typography>
                           <Stack spacing={2}>
                              <TextField
                                 fullWidth
                                 size="small"
                                 type="number"
                                 placeholder="Min (Rp)"
                                 value={filter.minPrice || ""}
                                 onChange={(e) => {
                                    const val = e.target.value
                                       ? Number(e.target.value)
                                       : undefined;
                                    debouncedMinPrice(val);
                                    setFilter({
                                       ...filter,
                                       minPrice: val,
                                    });
                                 }}
                                 InputProps={{
                                    sx: {
                                       borderRadius: 3,
                                       bgcolor: alpha(
                                          theme.palette.primary.main,
                                          0.03,
                                       ),
                                       "& fieldset": { border: "none" },
                                    },
                                 }}
                              />
                              <TextField
                                 fullWidth
                                 size="small"
                                 type="number"
                                 placeholder="Max (Rp)"
                                 value={filter.maxPrice || ""}
                                 onChange={(e) => {
                                    const val = e.target.value ? Number(e.target.value) : undefined
                                    debouncedMaxPrice(val);
                                    setFilter({
                                       ...filter,
                                       maxPrice: val,
                                    });
                                 }}
                                 InputProps={{
                                    sx: {
                                       borderRadius: 3,
                                       bgcolor: alpha(
                                          theme.palette.primary.main,
                                          0.03,
                                       ),
                                       "& fieldset": { border: "none" },
                                    },
                                 }}
                              />
                           </Stack>
                        </Box>
                     </Stack>
                  </Card>
               </Grid>

               {/* Course List Section */}
               <Grid size={{ xs: 12, lg: 9 }}>
                  {(courses.length > 0 || isLoadingCourses) ? (
                     <InfiniteScroll
                        dataLength={courses.length}
                        next={loadMore}
                        hasMore={
                           coursesData
                              ? qs.page! < coursesData.meta.lastPage
                              : false
                        }
                        loader={
                           <Box
                              sx={{
                                 display: "flex",
                                 justifyContent: "center",
                                 py: 4,
                              }}
                           >
                              <CircularProgress size={30} thickness={5} />
                           </Box>
                        }
                        scrollThreshold={0.8}
                     >
                        <Grid container spacing={3}>
                           {courses.map((course: Course) => (
                              <Grid
                                 size={{ xs: 12, sm: 6, md: 4 }}
                                 key={course._id}
                              >
                                 <CourseCard course={course} />
                              </Grid>
                           ))}
                        </Grid>
                     </InfiniteScroll>
                  ) : (
                     <Card
                        sx={{ textAlign: "center", py: 15, borderRadius: 5 }}
                     >
                        <Typography
                           variant="h5"
                           color="text.secondary"
                           fontWeight={600}
                        >
                           Oops! Course not found
                        </Typography>
                        <Typography
                           variant="body1"
                           color="text.secondary"
                           sx={{ mt: 1, mb: 3 }}
                        >
                           Try adjusting your filters for better results.
                        </Typography>
                        <Button
                           variant="contained"
                           onClick={handleClearFilters}
                           sx={{ borderRadius: 10, px: 4 }}
                        >
                           Reset Filters
                        </Button>
                     </Card>
                  )}
               </Grid>
            </Grid>
         </Container>
      </Box>
   );
};

export default CourseList;
