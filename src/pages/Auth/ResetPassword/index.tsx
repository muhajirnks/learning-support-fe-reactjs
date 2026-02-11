import { useEffect, useState } from "react";
import {
   Button,
   Alert,
   Typography,
   Box,
   InputAdornment,
   IconButton,
} from "@mui/material";
import { Form, Formik } from "formik";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import type { HandleSubmit } from "@/types/formik.type";
import {
   MdArrowBack,
   MdArrowForward,
   MdLock,
   MdVisibility,
   MdVisibilityOff,
} from "react-icons/md";
import { resetPassword } from "@/services/auth.service";
import useSnackbar from "@/hooks/useSnackbar";
import AuthLayout from "@/layouts/AuthLayout";
import Input from "@/components/form/Input";
import {
   getResetPasswordSchema,
   type ResetPasswordFormData,
} from "@/validations/authSchema";

const initialValues: ResetPasswordFormData = {
   newPassword: "",
   confirmPassword: "",
};

const resetPasswordSchema = getResetPasswordSchema();

const ResetPassword = () => {
   const [error, setError] = useState("");
   const [showPassword, setShowPassword] = useState(false);

   const [searchParams] = useSearchParams();
   const navigate = useNavigate();
   const snackbar = useSnackbar();

   const handleSubmit: HandleSubmit<ResetPasswordFormData> = async (
      values,
      { setErrors }
   ) => {
      setError("");

      const token = searchParams.get("token");

      const { data, error } = await resetPassword({
         password: values.newPassword,
         token: token!,
      });

      if (data) {
         snackbar({
            message: data.message,
            type: "success",
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

   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };

   useEffect(() => {
      const token = searchParams.get("token");

      console.log(token);
      if (!token) {
         snackbar({
            message: "Token is invalid.",
            type: "failure",
         });
         navigate("/login");
      }
   }, [searchParams]);

   return (
      <AuthLayout
         title="Create New Password"
         description="A secure password helps protect your account."
      >
         <Formik
            initialValues={initialValues}
            validationSchema={resetPasswordSchema}
            onSubmit={handleSubmit}
         >
            {({
               isSubmitting,
               errors,
               touched,
               values,
               handleChange,
               handleBlur,
            }) => (
               <Form className="space-y-6">
                  {error && (
                     <Alert
                        severity="error"
                        className="rounded-xl border-0 shadow-lg"
                     >
                        {error}
                     </Alert>
                  )}

                  <Box className="space-y-2">
                     <Typography className="text-[15px] font-medium">
                        New Password
                     </Typography>
                     <Input
                        name="newPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your new password"
                        fullWidth
                        value={values.newPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.newPassword && !!errors.newPassword}
                        helperText={touched.newPassword && errors.newPassword}
                        slotProps={{
                           input: {
                              startAdornment: (
                                 <InputAdornment position="start">
                                    <MdLock className="text-gray-500 text-xl" />
                                 </InputAdornment>
                              ),
                              endAdornment: (
                                 <InputAdornment position="end">
                                    <IconButton
                                       onClick={togglePasswordVisibility}
                                       edge="end"
                                       className="text-gray-500 hover:text-black transition-colors"
                                    >
                                       {showPassword ? (
                                          <MdVisibilityOff className="text-xl" />
                                       ) : (
                                          <MdVisibility className="text-xl" />
                                       )}
                                    </IconButton>
                                 </InputAdornment>
                              ),
                           },
                        }}
                     />
                  </Box>

                  <Box className="space-y-2">
                     <Typography className="text-[15px] font-medium">
                        Confirm New Password
                     </Typography>
                     <Input
                        name="confirmPassword"
                        type={"password"}
                        placeholder="Confirm your new password"
                        fullWidth
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                           touched.confirmPassword && !!errors.confirmPassword
                        }
                        helperText={
                           touched.confirmPassword && errors.confirmPassword
                        }
                        slotProps={{
                           input: {
                              startAdornment: (
                                 <InputAdornment position="start">
                                    <MdLock className="text-gray-500 text-xl" />
                                 </InputAdornment>
                              ),
                           },
                        }}
                     />
                  </Box>

                  {/* Send Reset Link Button */}
                  <Button
                     type="submit"
                     variant="contained"
                     fullWidth
                     className="group relative overflow-hidden"
                     loading={isSubmitting}
                     endIcon={
                        !isSubmitting && (
                           <MdArrowForward className="group-hover:translate-x-1 transition-transform duration-200" />
                        )
                     }
                  >
                     Update Password
                  </Button>

                  {/* Back to Sign In Link */}
                  <div className="text-center pt-2">
                     <Link
                        type="button"
                        to="/login"
                        className="flex items-center justify-center gap-2 text-blue-500 hover:text-blue-600 transition-colors font-medium text-sm mx-auto bg-transparent border-none cursor-pointer"
                     >
                        <MdArrowBack className="text-base" />
                        Back to Sign In
                     </Link>
                  </div>
               </Form>
            )}
         </Formik>
      </AuthLayout>
   );
};

export default ResetPassword;
