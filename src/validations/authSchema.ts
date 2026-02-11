import * as Yup from "yup";

// ========================================
// Auth Validations
// ========================================
export const getLoginSchema = () =>
   Yup.object({
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required"),
   });

export const getForgotPasswordSchema = () =>
   Yup.object({
      email: Yup.string()
         .required("Email address is required.")
         .email("Email address is not valid."),
   });

export const getResetPasswordSchema = () =>
   Yup.object({
      newPassword: Yup.string()
         .required("New password is required.")
         .min(8, "Password must be at least 8 characters"),
      confirmPassword: Yup.string()
         .required("Confirm password is required.")
         .oneOf([Yup.ref("newPassword")], "Passwords must match"),
   });

export const getUpdatePasswordSchema = () =>
   Yup.object({
      oldPassword: Yup.string()
         .required("Current password is required")
         .min(8, "Current password length at least 8 characters"),
      newPassword: Yup.string()
         .required("New password is required")
         .min(8, "New password length at least 8 characters"),
      confirmPassword: Yup.string()
         .required("Confirm password is required")
         .min(8, "Confirm password length at least 8 characters")
         .oneOf([Yup.ref("newPassword")], "Password didn't match"),
   });

export const getUpdateProfileSchema = () =>
   Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().required("Email is required"),
      avatar: Yup.mixed<File | string>()
         .nullable()
         .test("fileType", "File format not supported", (value: any) => {
            // jika string (misal URL lama), lewati validasi
            if (!value || typeof value === "string") return true;
            return (value.type as string).startsWith("image/");
         })
         .test("fileSize", "Maximum file size is 2MB", (value: any) => {
            // jika string (misal URL lama), lewati validasi
            if (!value || typeof value === "string") return true;
            return value.size <= 2 * 1024 * 1024;
         }),
   });

// ========================================
// Types
// ========================================
export type LoginFormData = Yup.InferType<ReturnType<typeof getLoginSchema>>;
export type ForgotPasswordFormData = Yup.InferType<
   ReturnType<typeof getForgotPasswordSchema>
>;
export type ResetPasswordFormData = Yup.InferType<
   ReturnType<typeof getResetPasswordSchema>
>;
export type UpdatePasswordFormData = Yup.InferType<
   ReturnType<typeof getUpdatePasswordSchema>
>;
export type UpdateProfileFormData = Yup.InferType<
   ReturnType<typeof getUpdateProfileSchema>
>;
