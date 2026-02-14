import type { User } from "./auth.type";
import type { Course } from "./course.type";

export type TransactionStatus = "pending" | "success" | "failed";

export interface Transaction {
   _id: string;
   user: User;
   course: Course;
   amount: number;
   status: TransactionStatus;
   paymentMethod: string;
   updatedAt: string;
   createdAt: string;
}

export interface ListTransactionParams {
   page?: number;
   limit?: number;
   search?: string;
   sort?: string;
   direction?: "asc" | "desc";
   status?: TransactionStatus;
   startDate?: string;
   endDate?: string;
}

export interface CreateTransactionRequest {
   course: string;
   paymentMethod: string;
}

export interface UpdateTransactionStatusRequest {
   status: TransactionStatus;
}
