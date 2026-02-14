import {
   Box,
   Grid,
   Typography,
   Card,
   CardContent,
   CardMedia,
   Button,
   LinearProgress,
   InputAdornment,
   debounce,
   MenuItem,
} from "@mui/material";
import { MdSearch, MdPlayArrow } from "react-icons/md";
import { Link } from "react-router-dom";
import { useMyCourses } from "@/services/course.service";
import { useListCategories } from "@/services/category.service";
import { useState, useMemo } from "react";
import type { ListCourseParams } from "@/types/api/course.type";
import Input from "@/components/form/Input";

const MyCourse = () => {
   const [search, setSearch] = useState("");
   const [qs, setQs] = useState<ListCourseParams>({
      limit: 12,
      page: 1,
      category: undefined,
   });

   const { data: res, loading } = useMyCourses(qs);
   const { data: categoriesRes } = useListCategories();

   const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setQs((prev) => ({
         ...prev,
         page: 1,
         category: e.target.value || undefined,
      }));
   };

   const debouncedSearch = useMemo(
      () =>
         debounce((search: string) => {
            setQs((prev) => ({
               ...prev,
               page: 1,
               search,
            }));
         }, 800),
      [],
   );

   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearch(value);
      debouncedSearch(value);
   };

   return (
      <Box>
         <Box
            sx={{
               mb: 4,
               display: "flex",
               flexDirection: { xs: "column", md: "row" },
               justifyContent: "space-between",
               alignItems: { xs: "flex-start", md: "center" },
               gap: 2,
            }}
         >
            <Box>
               <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                  Kursus Saya
               </Typography>
               <Typography variant="body1" color="text.secondary">
                  Kelola dan lanjutkan progres belajarmu di sini.
               </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 2, width: { xs: "100%", md: "auto" } }}>
               <Input
                  select
                  size="small"
                  label="Kategori"
                  value={qs.category || ""}
                  onChange={handleCategoryChange}
                  sx={{ width: { xs: "100%", md: 200 } }}
               >
                  <MenuItem value="">Semua Kategori</MenuItem>
                  {categoriesRes?.data.map((cat) => (
                     <MenuItem key={cat._id} value={cat._id}>
                        {cat.name}
                     </MenuItem>
                  ))}
               </Input>

               <Input
                  placeholder="Cari kursus..."
                  size="small"
                  value={search}
                  onChange={handleSearchChange}
                  sx={{ width: { xs: "100%", md: 300 } }}
                  InputProps={{
                     startAdornment: (
                        <InputAdornment position="start">
                           <MdSearch size={20} />
                        </InputAdornment>
                     ),
                     sx: { borderRadius: 3 },
                  }}
               />
            </Box>
         </Box>

         {loading ? (
            <LinearProgress sx={{ borderRadius: 2 }} />
         ) : res?.data.length === 0 ? (
            <Card
               elevation={0}
               sx={{
                  borderRadius: 4,
                  border: "1px dashed",
                  borderColor: "divider",
                  p: 8,
                  textAlign: "center",
               }}
            >
               <Typography variant="h6" sx={{ mb: 1 }}>
                  {search ? "Kursus tidak ditemukan" : "Belum ada kursus"}
               </Typography>
               <Typography color="text.secondary" sx={{ mb: 3 }}>
                  {search
                     ? `Tidak ada hasil untuk "${search}"`
                     : "Anda belum memiliki kursus aktif. Ayo mulai cari kursus yang menarik!"}
               </Typography>
               {!search && (
                  <Button
                     component={Link}
                     to="/courses"
                     variant="contained"
                     sx={{ borderRadius: 2 }}
                  >
                     Jelajahi Kursus
                  </Button>
               )}
            </Card>
         ) : (
            <Grid container spacing={3}>
               {res?.data.map((course) => (
                  <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={course._id}>
                     <Card
                        elevation={0}
                        sx={{
                           height: "100%",
                           borderRadius: 4,
                           border: "1px solid",
                           borderColor: "divider",
                           transition: "all 0.3s ease",
                           "&:hover": {
                              transform: "translateY(-4px)",
                              boxShadow: "0 12px 24px rgba(0,0,0,0.05)",
                              borderColor: "primary.main",
                           },
                        }}
                     >
                        <CardMedia
                           component="img"
                           height="160"
                           image={course.thumbnailUrl}
                           alt={course.title}
                           sx={{
                              width: "100%",
                              height: 200,
                              objectFit: "cover",
                           }}
                        />
                        <CardContent sx={{ p: 2.5 }}>
                           <Typography
                              variant="subtitle1"
                              sx={{
                                 fontWeight: 700,
                                 mb: 1,
                                 height: 48,
                                 overflow: "hidden",
                                 display: "-webkit-box",
                                 WebkitLineClamp: 2,
                                 WebkitBoxOrient: "vertical",
                                 lineHeight: 1.3,
                              }}
                           >
                              {course.title}
                           </Typography>

                           <Box sx={{ mb: 2 }}>
                              <Box
                                 sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    mb: 0.5,
                                 }}
                              >
                                 <Typography
                                    variant="caption"
                                    color="text.secondary"
                                 >
                                    Progres
                                 </Typography>
                                 <Typography
                                    variant="caption"
                                    sx={{ fontWeight: 600 }}
                                 >
                                    {course.progressPercentage}%
                                 </Typography>
                              </Box>
                              <LinearProgress
                                 variant="determinate"
                                 value={course.progressPercentage}
                                 sx={{ height: 6, borderRadius: 3 }}
                              />
                           </Box>

                           <Button
                              fullWidth
                              component={Link}
                              to={`/courses/${course._id}`}
                              variant="contained"
                              startIcon={<MdPlayArrow />}
                              sx={{ borderRadius: 2, py: 1 }}
                           >
                              Lanjutkan
                           </Button>
                        </CardContent>
                     </Card>
                  </Grid>
               ))}
            </Grid>
         )}
      </Box>
   );
};

export default MyCourse;
