import type { PaginationQs } from "./api.type";

export interface Lesson {
   _id: string;
   course: string;
   title: string;
   content: string;
   order: number;
   createdAt: string;
   updatedAt: string;
}

export interface ListLessonParams extends PaginationQs {
   course: string;
   search?: string;
}

export interface CreateLessonRequest {
   course: string;
   title: string;
   content: string;
   order: number;
}

export interface UpdateLessonRequest extends Partial<Omit<CreateLessonRequest, "course">> {}

export interface CourseProgress {
   course: string;
   percentage: number;
   totalLessons: number;
   completedLessons: number;
   lessons: (Lesson & { isCompleted: boolean })[];
}
