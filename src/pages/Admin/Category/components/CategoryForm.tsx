import React from "react";
import {
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   Button,
   Box,
   IconButton,
   Typography,
} from "@mui/material";
import { useFormik } from "formik";
import type {
   Category,
   CreateCategoryRequest,
} from "@/types/api/category.type";
import {
   getCreateCategorySchema,
   type CreateCategoryFormData,
} from "@/validations/categorySchema";
import { MdClose } from "react-icons/md";
import Input from "@/components/form/Input";

interface CategoryFormProps {
   open: boolean;
   onClose: () => void;
   onSubmit: (values: CreateCategoryRequest) => void;
   initialValues?: Category | null;
}

const validationSchema = getCreateCategorySchema();

const CategoryForm: React.FC<CategoryFormProps> = ({
   open,
   onClose,
   onSubmit,
   initialValues,
}) => {
   const formik = useFormik<CreateCategoryFormData>({
      initialValues: {
         name: initialValues?.name || "",
         description: initialValues?.description || "",
      },
      validationSchema,
      enableReinitialize: true,
      onSubmit: (values) => {
         onSubmit(values);
         formik.resetForm();
      },
   });

   return (
      <Dialog
         open={open}
         onClose={onClose}
         maxWidth="sm"
         fullWidth
         component={"form"}
         onSubmit={formik.handleSubmit as any}
      >
         <DialogTitle className="px-8 py-5">
            <Box className="flex items-center justify-between">
               <Typography variant="h5" className="font-semibold">
                  {initialValues ? "Edit Category" : "Add New Category"}
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
            <Box
               sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  mt: 1,
               }}
            >
               <Input
                  fullWidth
                  id="name"
                  name="name"
                  label="Category Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
               />
               <Input
                  fullWidth
                  id="description"
                  name="description"
                  label="Description"
                  multiline
                  rows={3}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={
                     formik.touched.description &&
                     Boolean(formik.errors.description)
                  }
                  helperText={
                     formik.touched.description && formik.errors.description
                  }
               />
            </Box>
         </DialogContent>
         <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
               {initialValues ? "Update" : "Create"}
            </Button>
         </DialogActions>
      </Dialog>
   );
};

export default CategoryForm;
