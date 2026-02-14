export interface User {
   _id: string;
   avatarUrl: string;
   name: string;
   email: string;
   role: "admin" | "user";
   phone: string | null;
}

export interface Token {
   type: "bearer";
   accessToken: string;
   expiresIn: number;
}

export interface RegisterRequest {
   name: string;
   email: string;
   password: string;
}

export interface LoginRequest {
   email: string;
   password: string;
   fcmToken: string;
}

export interface ForgotPasswordRequest {
   email: string;
   verifyEmailUrl: string;
}

export interface ResetPasswordRequest {
   token: string;
   password: string;
}

export interface UpdateProfileRequest {
   avatar?: File;
   name: string;
   email: string;
}

export interface UpdatePasswordRequest {
   oldPassword: string;
   newPassword: string;
}

export interface LoginResponse {
   message: string;
   // token: Token
   data: User;
}
