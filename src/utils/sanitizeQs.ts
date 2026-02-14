import type { PaginationQs } from "@/types/api/api.type";

export type QsSchema<T> = {
   [K in keyof T]: {
      type: "string" | "number" | "boolean" | "array";
      default?: T[K];
      validate?: (val: any) => boolean;
   };
};

export const createQsSchema = <T>(config: QsSchema<T>) => config;

export const sanitizeQs = <T extends Record<string, any>>(
   params: URLSearchParams,
   schema: QsSchema<T>
): T => {
   const result = {} as T;

   for (const key in schema) {
      const rule = schema[key];
      let raw = params.get(key);

      let value: any;

      switch (rule.type) {
         case "array":
            const arr = params.getAll(key + "[]");
            value = arr.length > 0 ? arr : rule.default;
            break;

         case "number":
            const num = Number(raw);
            value = !isNaN(num) ? num : rule.default;
            break;

         case "boolean":
            value =
               raw === "true" || raw === "1" ? true : raw === "false" || raw === "0" ? false : rule.default;
            break;

         case "string":
         default:
            value = raw ?? rule.default;
            break;
      }

      if (rule.validate && !rule.validate(value)) {
         value = rule.default;
      }

      result[key] = value;
   }

   return result;
};

export const createPaginationSchema = (
   rowsPerPage: number[] = [10, 25, 50],
   sortOptions: string[] = ["id", "name"]
): QsSchema<PaginationQs> => {
   return {
      search: { type: "string", default: "" },
      page: {
         type: "number",
         default: 1,
         validate: (v: number) => v > 0,
      },
      limit: {
         type: "number",
         default: 10,
         validate: (v: number) => rowsPerPage.includes(v),
      },
      sort: {
         type: "string",
         default: undefined,
         validate: (v: string) => sortOptions.includes(v),
      },
      direction: {
         type: "string",
         default: undefined,
         validate: (v: string) => v === "asc" || v === "desc",
      },
   };
};

export const sanitizePaginationQs = (
   params: URLSearchParams,
   rowsPerPage: number[],
   sortOptions: string[]
) => {
   const schema = createPaginationSchema(rowsPerPage, sortOptions);
   return sanitizeQs<PaginationQs>(params, schema);
};
