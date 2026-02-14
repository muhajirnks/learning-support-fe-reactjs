import useFetch from "@/hooks/useFetch";
import myFetch from "@/lib/fetch/myFetch";
import type { DataResponse, MessageResponse, Pagination, PaginationQs, SuccessResponse } from "@/types/api/api.type";
import type {
   Category,
   CreateCategoryRequest,
   UpdateCategoryRequest,
} from "@/types/api/category.type";

export const useListCategories = (qs?: PaginationQs) => {
   return useFetch<Pagination<Category>>("/api/v1/categories", {
      qs,
   });
};

export const getCategoryById = (id: string) => {
   return myFetch<DataResponse<Category>>(`/api/v1/categories/${id}`);
};

export const createCategory = (data: CreateCategoryRequest) => {
   return myFetch<SuccessResponse<Category>>("/api/v1/categories", {
      method: "POST",
      body: data,
   });
};

export const updateCategory = (
   id: string,
   data: UpdateCategoryRequest,
) => {
   return myFetch<SuccessResponse<Category>>(`/api/v1/categories/${id}`, {
      method: "PUT",
      body: data,
   });
};

export const deleteCategory = (id: string) => {
   return myFetch<MessageResponse>(`/api/v1/categories/${id}`, {
      method: "DELETE",
   });
};
