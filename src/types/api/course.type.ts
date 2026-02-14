import { type Category } from "./category.type";

export interface Course {
   _id: string;
   title: string;
   description: string;
   instructor: string;
   price: number;
   category: string | Category;
   thumbnailUrl: string;
   goals: string[];
   isPurchased?: boolean;
   transactionStatus?: "pending" | "success" | "failed";
   completedLessonsCount?: number;
   updatedAt: string;
   createdAt: string;
}

export interface CreateCourseRequest {
   title: string;
   description: string;
   instructor: string;
   price: number;
   category: string;
   goals: string[];
   thumbnail: File;
}

export interface UpdateCourseRequest extends Omit<CreateCourseRequest, "thumbnail"> {
   thumbnail?: File | null;
}

export interface ListCourseParams {
   page?: number;
   limit?: number;
   search?: string;
   sort?: string;
   direction?: "asc" | "desc";
   category?: string;
   minPrice?: number;
   maxPrice?: number;
}

