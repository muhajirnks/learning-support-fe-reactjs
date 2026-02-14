import myFetch from "@/lib/fetch/myFetch";
import type { DataResponse, MessageResponse, Pagination, SuccessResponse } from "@/types/api/api.type";
import type {
   CreateLessonRequest,
   UpdateLessonRequest,
   ListLessonParams,
   Lesson,
   CourseProgress,
} from "@/types/api/lesson.type";

export const getLessons = (qs: ListLessonParams) => {
   return myFetch<Pagination<Lesson>>(`/api/v1/lessons`, {
      qs,
   });
};

export const getLessonById = (id: string) => {
   return myFetch<DataResponse<Lesson>>(`/api/v1/lessons/${id}`);
};

export const createLesson = (body: CreateLessonRequest) => {
   return myFetch<SuccessResponse<Lesson>>("/api/v1/lessons", {
      method: "POST",
      body,
   });
};

export const updateLesson = (id: string, body: UpdateLessonRequest) => {
   return myFetch<SuccessResponse<Lesson>>(`/api/v1/lessons/${id}`, {
      method: "PUT",
      body,
   });
};

export const deleteLesson = (id: string) => {
   return myFetch<MessageResponse>(`/api/v1/lessons/${id}`, {
      method: "DELETE",
   });
};

// Progress Tracking
export const getCourseProgress = (courseId: string) => {
   return myFetch<DataResponse<CourseProgress>>(
      `/api/v1/progress/course/${courseId}`,
   );
};

export const markAsCompleted = (lessonId: string) => {
   return myFetch<MessageResponse>(
      `/api/v1/progress/lesson/${lessonId}/complete`,
      {
         method: "POST",
      },
   );
};
