import { useEffect, useMemo, useState } from "react";
import {
   Box,
   Button,
   Card,
   Container,
   IconButton,
   Typography,
   InputAdornment,
   CardContent,
   debounce,
} from "@mui/material";
import {
   createCategory,
   updateCategory,
   deleteCategory,
   useListCategories,
} from "@/services/category.service";
import { MdAdd, MdDelete, MdEdit, MdSearch } from "react-icons/md";
import type { Category } from "@/types/api/category.type";
import CategoryForm from "./components/CategoryForm";
import useSnackbar from "@/hooks/useSnackbar";
import DataTable, { createTableConfig } from "@/components/DataTable";
import Input from "@/components/form/Input";
import Pagination from "@/components/Pagination";
import { toQueryString } from "@/lib/fetch/createFetch";
import { useSearchParams } from "react-router-dom";
import { sanitizePaginationQs } from "@/utils/sanitizeQs";

const tableConfig = createTableConfig({
   uniqueField: "_id",
   columns: [
      { key: "name", sortKey: "name", label: "Name", type: "string" },
      {
         key: "description",
         sortKey: "description",
         label: "Description",
         type: "string",
      },
      {
         key: "createdAt",
         sortKey: "createdAt",
         label: "Created At",
         type: "datetime",
      },
   ],
});

const rowsPerPageOptions = [10, 25, 50];

const CategoryAdminPage: React.FC = () => {
   const [searchParams, setSearchParams] = useSearchParams();

   const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
   const [qs, setQs] = useState(() =>
      sanitizePaginationQs(searchParams, rowsPerPageOptions, [
         "_id",
         "name",
         "description",
      ]),
   );

   const { data, loading, fetchData } = useListCategories(qs);

   const [openForm, setOpenForm] = useState(false);
   const [selectedCategory, setSelectedCategory] = useState<Category | null>(
      null,
   );
   const snackbar = useSnackbar();

   const handleAdd = () => {
      setSelectedCategory(null);
      setOpenForm(true);
   };

   const handleEdit = (category: Category) => {
      setSelectedCategory(category);
      setOpenForm(true);
   };

   const handleDelete = async (id: string) => {
      if (window.confirm("Are you sure you want to delete this category?")) {
         const { data, error } = await deleteCategory(id);

         if (data) {
            snackbar({
               type: "success",
               message: data.message || "Category deleted successfully",
            });
         }

         if (error) {
            snackbar({
               type: "failure",
               message: error.message || "Failed to delete category",
            });
         }
         fetchData();
      }
   };

   const handleFormSubmit = async (values: any) => {
      try {
         if (selectedCategory) {
            await updateCategory(selectedCategory._id, values);
            snackbar({
               type: "success",
               message: "Category updated successfully",
            });
         } else {
            await createCategory(values);
            snackbar({
               type: "success",
               message: "Category created successfully",
            });
         }
         setOpenForm(false);
         fetchData();
      } catch (error: any) {
         snackbar({
            type: "failure",
            message: error.message || "Failed to save category",
         });
      }
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
                  Manage Categories
               </Typography>

               <Box className="flex justify-end items-center gap-4 mb-5">
                  <Input
                     fullWidth
                     placeholder="Search categories..."
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
                  <Button
                     variant="contained"
                     startIcon={<MdAdd />}
                     onClick={handleAdd}
                     sx={{ borderRadius: 2 }}
                  >
                     Add Category
                  </Button>
               </Box>

               <DataTable
                  loading={loading}
                  rows={data?.data || []}
                  config={tableConfig}
                  sortBy={qs.sort || "_id"}
                  sort={qs.direction || "desc"}
                  onChangeSort={handleChangeSort}
                  renderAction={(row) => (
                     <Box display="flex" justifyContent="center" gap={1}>
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

               <CategoryForm
                  open={openForm}
                  onClose={() => setOpenForm(false)}
                  onSubmit={handleFormSubmit}
                  initialValues={selectedCategory}
               />
            </CardContent>
         </Card>
      </Container>
   );
};

export default CategoryAdminPage;
