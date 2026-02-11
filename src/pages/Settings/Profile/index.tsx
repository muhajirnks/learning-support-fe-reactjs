import AvatarInput from "@/components/form/AvatarInput";
import useSnackbar from "@/hooks/useSnackbar";
import { getProfile, updateProfile } from "@/services/auth.service";
import useUserStore from "@/store/useUserStore";
import type { UpdateProfileRequest } from "@/types/api/auth.type";
import type { FieldAttributes, HandleSubmit } from "@/types/formik.type";
import { getFullUrl } from "@/utils/fileUtils";
import { getUpdateProfileSchema, type UpdateProfileFormData } from "@/validations/authSchema";
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
import { useMemo, useState } from "react";

const updateProfileSchema = getUpdateProfileSchema();

const Profile = () => {
   const [error, setError] = useState("");

   const snackbar = useSnackbar();
   const { user, setUser } = useUserStore();

   const handleSubmit: HandleSubmit<UpdateProfileFormData> = async (
      values,
      { setErrors, resetForm }
   ) => {
      setError("");
      const body: UpdateProfileRequest = {
         email: values.email,
         name: values.name,
      }

      if(values.avatar && typeof values.avatar !== "string") {
         body.avatar = values.avatar
      }

      const { data, error } = await updateProfile(body);

      if (data) {
         snackbar({
            type: "success",
            message: data.message,
         });

         const { data: profile } = await getProfile();

         if (profile) {
            setUser(profile?.data);
         }

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

   const formData: UpdateProfileFormData = useMemo(
      () => ({
         name: user?.name || "",
         email: user?.email || "",
         avatar: null,
      }),
      [user]
   );

   return (
      <Box className="px-3">
         <Box className="mb-5">
            <Typography variant="h5" className="text-foreground-primary">
               Profile Information
            </Typography>
            <Typography variant="body1">
               Update your name and email address
            </Typography>
         </Box>

         <Box className="p-8 rounded-xl border-[0.6px] border-background-paper-light bg-background-paper w-full max-w-200">
            <Formik
               initialValues={formData}
               validationSchema={updateProfileSchema}
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
                           <FormLabel>Username</FormLabel>
                        </Box>
                        <Box className="col-span-2">
                           <Field name="name">
                              {({
                                 field,
                                 meta,
                              }: FieldAttributes<UpdateProfileFormData>) => (
                                 <TextField
                                    {...field}
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    autoComplete="name"
                                    fullWidth
                                    placeholder="Enter your username"
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
                           <FormLabel>Email Address</FormLabel>
                        </Box>
                        <Box className="col-span-2">
                           <Field name="email">
                              {({
                                 field,
                                 meta,
                              }: FieldAttributes<UpdateProfileFormData>) => (
                                 <TextField
                                    {...field}
                                    id="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    fullWidth
                                    placeholder="Enter your email"
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
                           <FormLabel>Avatar</FormLabel>
                        </Box>
                        <Box className="col-span-2">
                           <Field name="avatar">
                              {({
                                 form,
                                 field,
                                 meta,
                              }: FieldAttributes<UpdateProfileFormData>) => (
                                 <Box>
                                    <AvatarInput
                                       value={field.value || (user?.avatarUrl ? getFullUrl(user.avatarUrl) : null)}
                                       accept={"image/*"}
                                       onChange={(file) =>
                                          form.setFieldValue("avatar", file)
                                       }
                                       placeholder="Max file size: 2MB"
                                       error={
                                          meta.touched && Boolean(meta.error)
                                       }
                                       helperText={meta.touched && meta.error}
                                    />
                                 </Box>
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

export default Profile;
