import Input from "@/components/form/Input";
import AuthLayout from "@/layouts/AuthLayout";
import { register } from "@/services/auth.service";
import useSnackbar from "@/hooks/useSnackbar";
import type { FieldAttributes, HandleSubmit } from "@/types/formik.type";
import { getRegisterSchema, type RegisterFormData } from "@/validations/authSchema";
import {
   Alert,
   Button,
   Fade,
   FormLabel,
   InputAdornment,
   Typography,
   Box,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { MdLock, MdPerson, MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const formData: RegisterFormData = {
   name: "",
   email: "",
   password: "",
   confirmPassword: "",
};

const registerSchema = getRegisterSchema();

const Register = () => {
   const [error, setError] = useState("");
   const snackbar = useSnackbar();
   const navigate = useNavigate();

   const handleSubmit: HandleSubmit<RegisterFormData> = async (
      values,
      { setErrors }
   ) => {
      setError("");

      const { data, error } = await register({
         name: values.name,
         email: values.email,
         password: values.password,
      });

      if (data) {
         snackbar({
            type: "success",
            message: "Registration successful! Please log in.",
         });
         navigate("/login");
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
      <AuthLayout
         title="Create Account"
         description="Fill in the details below to create your account"
      >
         {error && (
            <Fade in={!!error}>
               <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
            </Fade>
         )}

         <Formik
            initialValues={formData}
            validationSchema={registerSchema}
            onSubmit={handleSubmit}
            enableReinitialize
         >
            {({ isSubmitting }) => (
               <Form>
                  <Box sx={{ display: 'grid', gap: 3 }}>
                     <Box sx={{ display: 'grid', gap: 1.5 }}>
                        <FormLabel htmlFor="name">Full Name</FormLabel>
                        <Field name="name">
                           {({
                              field,
                              meta,
                           }: FieldAttributes<RegisterFormData>) => (
                              <Input
                                 {...field}
                                 id="name"
                                 type="text"
                                 required
                                 autoFocus
                                 placeholder="Enter your full name"
                                 error={meta.touched && Boolean(meta.error)}
                                 helperText={meta.touched && meta.error}
                                 slotProps={{
                                    input: {
                                       startAdornment: (
                                          <InputAdornment position="start">
                                             <MdPerson className="text-xl" />
                                          </InputAdornment>
                                       ),
                                    },
                                 }}
                              />
                           )}
                        </Field>
                     </Box>

                     <Box sx={{ display: 'grid', gap: 1.5 }}>
                        <FormLabel htmlFor="email">Email Address</FormLabel>
                        <Field name="email">
                           {({
                              field,
                              meta,
                           }: FieldAttributes<RegisterFormData>) => (
                              <Input
                                 {...field}
                                 id="email"
                                 type="email"
                                 required
                                 placeholder="Enter your email"
                                 error={meta.touched && Boolean(meta.error)}
                                 helperText={meta.touched && meta.error}
                                 slotProps={{
                                    input: {
                                       startAdornment: (
                                          <InputAdornment position="start">
                                             <MdEmail className="text-xl" />
                                          </InputAdornment>
                                       ),
                                    },
                                 }}
                              />
                           )}
                        </Field>
                     </Box>

                     <Box sx={{ display: 'grid', gap: 1.5 }}>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Field name="password">
                           {({
                              field,
                              meta,
                           }: FieldAttributes<RegisterFormData>) => (
                              <Input
                                 {...field}
                                 id="password"
                                 type="password"
                                 required
                                 placeholder="Create a password"
                                 error={meta.touched && Boolean(meta.error)}
                                 helperText={meta.touched && meta.error}
                                 slotProps={{
                                    input: {
                                       startAdornment: (
                                          <InputAdornment position="start">
                                             <MdLock className="text-xl" />
                                          </InputAdornment>
                                       ),
                                    },
                                 }}
                              />
                           )}
                        </Field>
                     </Box>

                     <Box sx={{ display: 'grid', gap: 1.5 }}>
                        <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                        <Field name="confirmPassword">
                           {({
                              field,
                              meta,
                           }: FieldAttributes<RegisterFormData>) => (
                              <Input
                                 {...field}
                                 id="confirmPassword"
                                 type="password"
                                 required
                                 placeholder="Confirm your password"
                                 error={meta.touched && Boolean(meta.error)}
                                 helperText={meta.touched && meta.error}
                                 slotProps={{
                                    input: {
                                       startAdornment: (
                                          <InputAdornment position="start">
                                             <MdLock className="text-xl" />
                                          </InputAdornment>
                                       ),
                                    },
                                 }}
                              />
                           )}
                        </Field>
                     </Box>

                     <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        disabled={isSubmitting}
                        sx={{ mt: 2, py: 1.5, borderRadius: 2, fontWeight: 'bold' }}
                     >
                        {isSubmitting ? "Creating Account..." : "Sign Up"}
                     </Button>

                     <Typography variant="body1" align="center" sx={{ mt: 4 }}>
                        Already have an account?{" "}
                        <Link
                           to="/login"
                           className="font-bold underline"
                        >
                           Sign In
                        </Link>
                     </Typography>
                  </Box>
               </Form>
            )}
         </Formik>
      </AuthLayout>
   );
};

export default Register;
