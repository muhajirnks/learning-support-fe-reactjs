import { camelizeKeys, decamelizeKeys } from "humps";

export type HandleRefresh = (opt: CreateOptions) => Promise<void>;

export interface Options {
   method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
   qs?: Record<string, any>;
   body?: Record<string, any> | any[] | FormData;
   camelize?: boolean;
   decamelize?: boolean;
   mode?: RequestMode;
   cache?: RequestCache;
   skipRetry?: boolean; // Flag to prevent infinite retry loop
}

interface CreateOptions {
   baseUrl?: string;
   tokenKey?: string;
   refreshTokenKey?: string;
   defaultHeaders?: Record<string, string>;
   handleRefresh?: HandleRefresh;
   camelize?: boolean;
   decamelize?: boolean;
}

export interface FetchResult<T> {
   data: null | T;
   error: null | any;
   status: number;
}

// Global state for manage refresh token process
let isRefreshing = false;
let refreshQueue: Array<{
   resolve: () => void;
   reject: (error: any) => void;
}> = [];

const createFetch = (opts: CreateOptions = {}) => {
   const {
      baseUrl = "",
      tokenKey,
      defaultHeaders = {},
      handleRefresh,
      camelize: _camelize = true,
      decamelize: _decamelize = true,
   } = opts;

   // Handle refresh token with queue
   const handleTokenRefresh = (): Promise<void> => {
      return new Promise((resolve, reject) => {
         if (isRefreshing) {
            // Jika sudah ada yang melakukan refresh, masukkan ke queue
            refreshQueue.push({ resolve, reject });
            return;
         }

         isRefreshing = true;

         handleRefresh!(opts)
            .then(() => {
               // Resolve semua request yang menunggu
               refreshQueue.forEach(({ resolve: queueResolve }) => {
                  queueResolve();
               });
               refreshQueue = [];
               resolve();
            })
            .catch((error) => {
               // Reject semua request yang menunggu
               refreshQueue.forEach(({ reject: queueReject }) => {
                  queueReject(error);
               });
               refreshQueue = [];

               reject(error);
            })
            .finally(() => {
               isRefreshing = false;
            });
      });
   };

   return async <T>(
      endpoint: string,
      opts: Options = {}
   ): Promise<FetchResult<T>> => {
      const {
         method = "GET",
         qs = {},
         body,
         camelize = _camelize ?? true,
         decamelize = _decamelize ?? true,
         mode,
         skipRetry = false,
         cache = "default",
      } = opts;

      const makeRequest = async (): Promise<FetchResult<T>> => {
         const headers: Record<string, string> = {
            Accept: "application/json",
            ...defaultHeaders,
         };

         const requestInit: RequestInit = {
            method,
            headers,
            mode,
            cache,
            credentials: "include",
         };

         const result: FetchResult<T> = {
            data: null,
            error: null,
            status: 0,
         };

         if (body) {
            if (body instanceof FormData) {
               requestInit.body = body;
            } else {
               requestInit.body = JSON.stringify(
                  decamelize ? decamelizeKeys(body) : body
               );
               headers["Content-Type"] = "application/json";
            }
         }

         if (typeof window !== "undefined" && window.localStorage && tokenKey) {
            const token = localStorage.getItem(tokenKey);

            if (token) {
               headers["Authorization"] = `Bearer ${token}`;
            }
         }

         let url = `${baseUrl}${endpoint}`;

         if (Object.keys(qs).length > 0) {
            const finaleQs = decamelize ? decamelizeKeys(qs) : qs;
            url += "?" + toQueryString(finaleQs);
         }

         try {
            const res = await fetch(url, requestInit);

            result.status = res.status;
            const data = await res.json();

            if (res.ok) {
               if (camelize) {
                  result.data = camelizeKeys(data) as T;
               } else {
                  result.data = data;
               }
            } else {
               result.error = camelizeKeys(data);
            }
         } catch (error: any) {
            result.error = error;
         }

         return result;
      };

      // Lakukan request pertama
      const firstResult = await makeRequest();

      // Jika mendapat 401 dan belum pernah retry, coba refresh token
      if (handleRefresh && firstResult.status === 401 && !skipRetry) {
         try {
            // Refresh token dengan queue system
            await handleTokenRefresh();

            // Retry request dengan token baru
            return await makeRequest();
         } catch (refreshError) {
            // Jika refresh token gagal, return hasil 401 original
            return firstResult;
         }
      }

      return firstResult;
   };
};

export const toQueryString = (params: Record<string, any>): string => {
   const query = new URLSearchParams();

   function build(obj: Record<string, any>, parentKey?: string) {
      for (const key in obj) {
         const value = obj[key];
         const paramKey = parentKey ? `${parentKey}[${key}]` : key;

         if (Array.isArray(value)) {
            value.forEach((val) => {
               query.append(`${paramKey}[]`, String(val));
            });
         } else if (value !== null && typeof value === "object") {
            build(value, paramKey); // recursive
         } else if (typeof value === 'boolean') {
            query.append(paramKey, value ? '1' : '0');
         } else if (value !== undefined && value !== null && value !== '') {
            query.append(paramKey, String(value));
         }
      }
   }

   build(params);
   return query.toString();
};

export default createFetch;
