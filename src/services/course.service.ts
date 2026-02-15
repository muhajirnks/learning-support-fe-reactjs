import useFetch from "@/hooks/useFetch";
import myFetch from "@/lib/fetch/myFetch";
import type {
   DataResponse,
   MessageResponse,
   Pagination,
   SuccessResponse,
} from "@/types/api/api.type";
import type {
   CreateCourseRequest,
   UpdateCourseRequest,
   ListCourseParams,
   Course,
   MyCourse,
} from "@/types/api/course.type";
import { prepareFormData } from "@/utils/prepareFormData";

export const useListCourses = (qs?: ListCourseParams) => {
   return useFetch<Pagination<Course>>("/api/v1/courses", {
      qs,
   });
};

export const useGetCourseById = (id: string) => {
   return useFetch<DataResponse<Course>>(`/api/v1/courses/${id}`);
};

export const getCourseById = (id: string) => {
   return myFetch<DataResponse<Course>>(`/api/v1/courses/${id}`);
};

export const createCourse = (body: CreateCourseRequest) => {
   const formdata = prepareFormData(body)
   return myFetch<SuccessResponse<Course>>("/api/v1/courses", {
      method: "POST",
      body: formdata,
   });
};

export const updateCourse = (id: string, body: UpdateCourseRequest) => {
   const formdata = prepareFormData(body)
   return myFetch<SuccessResponse<Course>>(`/api/v1/courses/${id}`, {
      method: "PUT",
      body: formdata,
   });
};

export const deleteCourse = (id: string) => {
   return myFetch<MessageResponse>(`/api/v1/courses/${id}`, {
      method: "DELETE",
   });
};

export const useMyCourses = (qs?: ListCourseParams) => {
   return useFetch<Pagination<MyCourse>>("/api/v1/courses/my", {
      qs,
   });
};

export const useUserStats = () => {
   return useFetch<DataResponse<{
      totalCourses: number;
      completedCourses: number;
      totalTransactions: number;
   }>>("/api/v1/courses/stats");
};
