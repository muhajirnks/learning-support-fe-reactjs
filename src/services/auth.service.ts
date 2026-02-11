import myFetch from "@/lib/fetch/myFetch";
import type { MessageResponse } from "@/types/api/api.type";
import type {
   ForgotPasswordRequest,
   LoginRequest,
   LoginResponse,
   ResetPasswordRequest,
   UpdatePasswordRequest,
   UpdateProfileRequest,
} from "@/types/api/auth.type";
import { prepareFormData } from "@/utils/prepareFormData";

export const getProfile = () => {
   return myFetch<LoginResponse>("/api/v1/auth/profile");
};

export const login = (body: LoginRequest) => {
   return myFetch<LoginResponse>("/api/v1/auth/login", {
      method: "POST",
      body,
   });
};

export const logout = () => {
   return myFetch<MessageResponse>("/api/v1/auth/logout");
};

export const refresh = () => {
   return myFetch("/api/v1/auth/refresh", {
      method: "POST",
      skipRetry: true,
   });
};

export const forgotPassword = (body: ForgotPasswordRequest) => {
   return myFetch<MessageResponse>("/api/v1/auth/forgot-password", {
      method: "POST",
      body,
   });
};

export const resetPassword = (body: ResetPasswordRequest) => {
   return myFetch<MessageResponse>("/api/v1/auth/reset-password", {
      method: "PUT",
      body,
   });
};

export const updateProfile = (body: UpdateProfileRequest) => {
   const formData = prepareFormData(body);
   return myFetch<MessageResponse>("/api/v1/auth/profile", {
      method: "PUT",
      body: formData,
   });
};

export const updatePassword = (body: UpdatePasswordRequest) => {
   return myFetch<MessageResponse>("/api/v1/auth/password", {
      method: "PUT",
      body,
   });
};
