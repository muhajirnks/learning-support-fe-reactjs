import {
   type Options,
   type FetchResult,
} from "@/lib/fetch/createFetch";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import myFetch from "@/lib/fetch/myFetch";
import { useSnackbarStore } from "@/store/useSnackbarStore";

interface Result<T> {
   loading: boolean;
   data: T | null;
   error: any;
}

export type FetchData<T> = () => Promise<FetchResult<T>>;
type UseFetchOptions = Options & { immediate?: boolean, showToast?: boolean }

const useFetch = <T>(url: string, opts: UseFetchOptions = {}) => {
   const { immediate = true, showToast = true } = opts;

   const [result, setResult] = useState<Result<T>>({
      loading: immediate,
      data: null,
      error: null,
   });

   const navigate = useNavigate();
   const setSnackbar = useSnackbarStore(s=>s.setSnackbar);
   const state = useRef(0);

   const setLoading = useCallback((value: boolean) => setResult({...result, loading: value}), [result])
   const setData = useCallback((value: T) => setResult({...result, data: value}), [result])

   const fetchData: FetchData<T> = useCallback(async () => {
      setResult((prev) => ({ ...prev, loading: true }));

      const { data, error, status } = await myFetch<T>(url, opts);

      if (error && showToast && !error.errors) {
         setSnackbar({
            type: 'failure',
            message: error.message,
         });
      }

      if (status === 401) navigate('/login')

      const msg = (data as any)?.message;

      if (msg && !immediate && showToast) {
         setSnackbar({
            type: 'success',
            message: msg,
         });
      }

      state.current = 2
      setResult({ data, error, loading: false });

      return { data, error, status };
   }, [url, opts?.qs, opts?.body]);

   useEffect(() => {
      if (immediate) {
         if(!state.current || state.current == 2) {
            fetchData();
         }
         if(!state.current) {
            state.current = 1;
         }
      }
   }, [fetchData]);

   return { ...result, fetchData, setData, setLoading };
};

export default useFetch;
