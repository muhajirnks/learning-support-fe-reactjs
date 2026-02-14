import Input from "@/components/form/Input";
import AuthLayout from "@/layouts/AuthLayout";
import { login } from "@/services/auth.service";
import useUserStore from "@/store/useUserStore";
import type { FieldAttributes, HandleSubmit } from "@/types/formik.type";
import { getLoginSchema, type LoginFormData } from "@/validations/authSchema";
import { Alert, Button, Fade, FormLabel, InputAdornment } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { MdLock, MdPerson } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const formData: LoginFormData = {
   email: "",
   password: "",
};

const loginSchema = getLoginSchema();

const Login = () => {
   const [error, setError] = useState("");

   const setUser = useUserStore((s) => s.setUser);
   const navigate = useNavigate();

   const handleSubmit: HandleSubmit<LoginFormData> = async (
      values,
      { setErrors },
   ) => {
      setError("");

      const { data, error } = await login({ ...values, fcmToken: "" });

      if (data) {
         setUser(data.data);
         navigate("/");
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
         title="Sign In"
         description="Enter your email and password below to log in"
      >
         {error && (
            <Fade in={!!error}>
               <Alert severity="error">{error}</Alert>
            </Fade>
         )}

         <Formik
            initialValues={formData}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
            enableReinitialize
            className="flex flex-col gap-6"
         >
            {({ isSubmitting }) => (
               <Form>
                  <div className="grid gap-5">
                     <div className="grid gap-[13px]">
                        <FormLabel htmlFor="email">Email</FormLabel>

                        <Field name="email">
                           {({
                              field,
                              meta,
                           }: FieldAttributes<LoginFormData>) => (
                              <Input
                                 {...field}
                                 id="email"
                                 type="text"
                                 required
                                 autoFocus
                                 tabIndex={1}
                                 autoComplete="email"
                                 placeholder="Enter your email"
                                 slotProps={{
                                    input: {
                                       startAdornment: (
                                          <InputAdornment position="start">
                                             <MdPerson className="text-xl" />
                                          </InputAdornment>
                                       ),
                                    },
                                 }}
                                 sx={{
                                    "& input": {
                                       pl: "8px",
                                    },
                                 }}
                                 error={meta.touched && Boolean(meta.error)}
                                 helperText={meta.touched && meta.error}
                                 fullWidth
                              />
                           )}
                        </Field>
                     </div>

                     <div className="grid gap-[13px]">
                        <div className="flex items-center">
                           <FormLabel htmlFor="password">Password</FormLabel>
                           <Link
                              to={"/forgot-password"}
                              className="ml-auto text-sm"
                              tabIndex={5}
                           >
                              Forgot password?
                           </Link>
                        </div>
                        <Field name="password">
                           {({
                              field,
                              meta,
                           }: FieldAttributes<LoginFormData>) => (
                              <Input
                                 {...field}
                                 id="password"
                                 type="password"
                                 required
                                 tabIndex={2}
                                 autoComplete="current-password"
                                 placeholder="Enter your password"
                                 slotProps={{
                                    input: {
                                       startAdornment: (
                                          <InputAdornment position="start">
                                             <MdLock className="text-xl" />
                                          </InputAdornment>
                                       ),
                                    },
                                 }}
                                 sx={{
                                    "& input": {
                                       pl: "8px",
                                    },
                                 }}
                                 error={meta.touched && Boolean(meta.error)}
                                 helperText={meta.touched && meta.error}
                                 fullWidth
                              />
                           )}
                        </Field>
                     </div>

                     <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        tabIndex={4}
                        loading={isSubmitting}
                     >
                        Log in
                     </Button>

                     <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link to="/register" className="underline font-bold">
                           Sign up
                        </Link>
                     </div>
                  </div>
               </Form>
            )}
         </Formik>
      </AuthLayout>
   );
};

export default Login;
