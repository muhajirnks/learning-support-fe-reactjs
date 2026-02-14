import * as Yup from "yup";

export const getCreateCourseSchema = () =>
   Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      instructor: Yup.string().required("Instructor is required"),
      price: Yup.number()
         .required("Price is required")
         .min(0, "Price must be at least 0"),
      category: Yup.string().required("Category is required"),
      goals: Yup.array().required()
         .of(Yup.string().required("Goal content is required"))
         .min(1, "At least one goal is required"),
      thumbnail: Yup.mixed<File>().nullable().optional(),
   });

export const getCreateLessonSchema = () =>
   Yup.object({
      title: Yup.string().required("Title is required"),
      content: Yup.string().required("Content is required"),
      order: Yup.number().required("Order is required").min(0),
   });

export type CreateCourseFormData = Yup.InferType<
   ReturnType<typeof getCreateCourseSchema>
>;

export type CreateLessonFormData = Yup.InferType<
   ReturnType<typeof getCreateLessonSchema>
>;
