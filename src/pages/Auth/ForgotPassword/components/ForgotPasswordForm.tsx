import { useState } from "react";
import { Button, Alert, Box, InputAdornment, FormLabel } from "@mui/material";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import type { HandleSubmit } from "@/types/formik.type";
import { MdArrowBack, MdArrowForward, MdEmail } from "react-icons/md";
import { forgotPassword } from "@/services/auth.service";
import Input from "@/components/form/Input";
import {
   getForgotPasswordSchema,
   type ForgotPasswordFormData,
} from "@/validations/authSchema";

interface Props {
   nextStep: (email: string) => void;
}

const initialValues: ForgotPasswordFormData = {
   email: "",
};

const forgotPasswordSchema = getForgotPasswordSchema();

const ForgotPasswordForm: React.FC<Props> = ({ nextStep }) => {
   const [error, setError] = useState("");

   const handleSubmit: HandleSubmit<ForgotPasswordFormData> = async (
      values,
      { setErrors }
   ) => {
      setError("");

      const { data, error } = await forgotPassword({
         ...values,
         verifyEmailUrl: window.origin + "/reset-password",
      });

      if (data) {
         nextStep(values.email);
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
      <Formik
         initialValues={initialValues}
         validationSchema={forgotPasswordSchema}
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
            <Form className="grid gap-5">
               {error && (
                  <Alert
                     severity="error"
                     className="rounded-xl border-0 shadow-lg"
                  >
                     {error}
                  </Alert>
               )}

               <Box className="grid gap-[13px]">
                  <FormLabel>Email Address</FormLabel>
                  <Input
                     name="email"
                     type="email"
                     placeholder="Enter your email address"
                     fullWidth
                     value={values.email}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     error={touched.email && !!errors.email}
                     helperText={touched.email && errors.email}
                     slotProps={{
                        input: {
                           startAdornment: (
                              <InputAdornment position="start">
                                 <MdEmail className="text-gray-500 text-xl" />
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
                  loading={isSubmitting}
                  className="group relative overflow-hidden"
                  endIcon={
                     !isSubmitting && (
                        <MdArrowForward className="group-hover:translate-x-1 transition-transform duration-200" />
                     )
                  }
               >
                  Send Reset Link
               </Button>

               {/* Back to Sign In Link */}
               <div className="text-center pt-2">
                  <Link
                     type="button"
                     to="/login"
                     className="flex items-center justify-center gap-2 text-blue-500 hover:text-blue-600 transition-colors font-medium text-sm mx-auto bg-transparent border-none cursor-pointer group"
                  >
                     <MdArrowBack className="text-base group-hover:-translate-x-1 transition-transform duration-200" />
                     Back to Sign In
                  </Link>
               </div>
            </Form>
         )}
      </Formik>
   );
};

export default ForgotPasswordForm;
