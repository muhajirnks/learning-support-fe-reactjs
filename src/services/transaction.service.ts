import useFetch from "@/hooks/useFetch";
import myFetch from "@/lib/fetch/myFetch";
import type {
   DataResponse,
   Pagination,
   SuccessResponse,
} from "@/types/api/api.type";
import type {
   ListTransactionParams,
   Transaction,
   UpdateTransactionStatusRequest,
   CreateTransactionRequest,
} from "@/types/api/transaction.type";

export const useListTransactions = (qs?: ListTransactionParams) => {
   return useFetch<Pagination<Transaction>>("/api/v1/transactions", {
      qs,
   });
};

export const getTransactionById = (id: string) => {
   return myFetch<DataResponse<Transaction>>(`/api/v1/transactions/${id}`);
};

export const updateTransactionStatus = (id: string, body: UpdateTransactionStatusRequest) => {
   return myFetch<SuccessResponse<Transaction>>(`/api/v1/transactions/${id}/status`, {
      method: "PATCH",
      body: body,
   });
};

export const createTransaction = (body: CreateTransactionRequest) => {
   return myFetch<SuccessResponse<Transaction>>("/api/v1/transactions", {
      method: "POST",
      body: body,
   });
};

export const checkTransactionStatus = (courseId: string) => {
   return myFetch<DataResponse<Transaction | null>>(`/api/v1/transactions/check/${courseId}`);
};

export const useMyTransactions = (qs?: ListTransactionParams) => {
   return useFetch<Pagination<Transaction>>("/api/v1/transactions/my", {
      qs,
   });
};
