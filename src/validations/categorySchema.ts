import * as Yup from "yup";

export const getCreateCategorySchema = () =>
   Yup.object({
      name: Yup.string().required("Name is required"),
      description: Yup.string().optional(),
   });

export type CreateCategoryFormData = Yup.InferType<
   ReturnType<typeof getCreateCategorySchema>
>;
