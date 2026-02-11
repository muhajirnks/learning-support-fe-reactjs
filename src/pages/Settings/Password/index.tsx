import useSnackbar from "@/hooks/useSnackbar";
import { updatePassword } from "@/services/auth.service";
import type { FieldAttributes, HandleSubmit } from "@/types/formik.type";
import {
   getUpdatePasswordSchema,
   type UpdatePasswordFormData,
} from "@/validations/authSchema";
import {
   Alert,
   Box,
   Button,
   Divider,
   Fade,
   FormLabel,
   TextField,
   Typography,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useState } from "react";

const formData: UpdatePasswordFormData = {
   newPassword: "",
   oldPassword: "",
   confirmPassword: "",
};

const updatePasswordSchema = getUpdatePasswordSchema();

const Password = () => {
   const [error, setError] = useState("");

   const snackbar = useSnackbar();

   const handleSubmit: HandleSubmit<UpdatePasswordFormData> = async (
      values,
      { setErrors, resetForm }
   ) => {
      setError("");
      const { data, error } = await updatePassword(values);

      if (data) {
         snackbar({
            type: "success",
            message: data.message,
         });

         resetForm();
      }

      if (error) {
         if (error.errors) {
            setErrors(error.errors);
         } else {
            setError(error.message);
         }
      }
   };

   return (
      <Box className="px-3">
         <Box className="mb-5">
            <Typography variant="h5" className="text-foreground-primary">
               Update Password
            </Typography>
            <Typography variant="body1">
               Ensure your account is using along, random password to stay
               secure
            </Typography>
         </Box>

         <Box className="p-8 rounded-xl border-[0.6px] border-background-paper-light bg-background-paper w-full max-w-200">
            <Formik
               initialValues={formData}
               validationSchema={updatePasswordSchema}
               onSubmit={handleSubmit}
               enableReinitialize
            >
               {({ isSubmitting }) => (
                  <Form className="flex flex-col gap-4">
                     {error && (
                        <Fade in={!!error}>
                           <Alert severity="error">{error}</Alert>
                        </Fade>
                     )}

                     <Box className="grid grid-cols-3 w-full">
                        <Box className="col-span-1">
                           <FormLabel>Current Password</FormLabel>
                        </Box>
                        <Box className="col-span-2">
                           <Field name="oldPassword">
                              {({
                                 field,
                                 meta,
                              }: FieldAttributes<UpdatePasswordFormData>) => (
                                 <TextField
                                    {...field}
                                    id="oldPassword"
                                    type="password"
                                    required
                                    autoFocus
                                    autoComplete="oldPassword"
                                    fullWidth
                                    placeholder="Enter your current password"
                                    sx={{
                                       "& .MuiOutlinedInput-root": {
                                          borderRadius: "12px",
                                       },
                                    }}
                                    error={meta.touched && Boolean(meta.error)}
                                    helperText={meta.touched && meta.error}
                                 />
                              )}
                           </Field>
                        </Box>
                     </Box>
                     <Divider flexItem orientation="horizontal" />
                     <Box className="grid grid-cols-3 w-full">
                        <Box className="col-span-1">
                           <FormLabel>New Password</FormLabel>
                        </Box>
                        <Box className="col-span-2">
                           <Field name="newPassword">
                              {({
                                 field,
                                 meta,
                              }: FieldAttributes<UpdatePasswordFormData>) => (
                                 <TextField
                                    {...field}
                                    id="newPassword"
                                    type="password"
                                    required
                                    autoComplete="newPassword"
                                    fullWidth
                                    placeholder="Enter your new password"
                                    sx={{
                                       "& .MuiOutlinedInput-root": {
                                          borderRadius: "12px",
                                       },
                                    }}
                                    error={meta.touched && Boolean(meta.error)}
                                    helperText={meta.touched && meta.error}
                                 />
                              )}
                           </Field>
                        </Box>
                     </Box>
                     <Divider flexItem orientation="horizontal" />
                     <Box className="grid grid-cols-3 w-full">
                        <Box className="col-span-1">
                           <FormLabel>Confirm Password</FormLabel>
                        </Box>
                        <Box className="col-span-2">
                           <Field name="confirmPassword">
                              {({
                                 field,
                                 meta,
                              }: FieldAttributes<UpdatePasswordFormData>) => (
                                 <TextField
                                    {...field}
                                    id="confirmPassword"
                                    type="password"
                                    required
                                    autoComplete="confirmPassword"
                                    fullWidth
                                    placeholder="Confirm your new password"
                                    sx={{
                                       "& .MuiOutlinedInput-root": {
                                          borderRadius: "12px",
                                       },
                                    }}
                                    error={meta.touched && Boolean(meta.error)}
                                    helperText={meta.touched && meta.error}
                                 />
                              )}
                           </Field>
                        </Box>
                     </Box>

                     <Box></Box>

                     <Button
                        loading={isSubmitting}
                        variant="contained"
                        type="submit"
                     >
                        Save
                     </Button>
                  </Form>
               )}
            </Formik>
         </Box>
      </Box>
   );
};

export default Password;
