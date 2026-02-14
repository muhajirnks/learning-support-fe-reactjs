export interface ErrorApi {
   message: string;
   errors?: Record<string, string[]>;
}

export interface MessageResponse {
   message: string;
}

export interface DataResponse<T> {
   data: T;
}

export interface SuccessResponse<T> {
   message: string;
   data: T;
}

export interface PaginationMeta {
   total: number;
   limit: number;
   page: number;
   lastPage: number;
}

export interface Pagination<T> {
   meta: PaginationMeta;
   data: T[];
}

export interface PaginationQs {
   search?: string;
   page?: number;
   limit?: number;
   sort?: string;
   direction?: DirectionQs;
}

export type DirectionQs = "asc" | "desc";
