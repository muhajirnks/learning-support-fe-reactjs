import type { ListCourseParams } from "@/types/api/course.type";
import { createQsSchema } from "@/utils/sanitizeQs";

export const qsSchema = createQsSchema<ListCourseParams>({
   category: {
      type: 'string',
      default: '',
   },
   minPrice: {
      type: 'number',
      default: undefined,
   },
   maxPrice: {
      type: 'number',
      default: undefined,
   }
});
