import { decamelize } from "humps";

export const prepareFormData = (data: Record<string, any>) => {
   const formData = new FormData();

   const appendValue = (key: string, value: any) => {
      if (value === null || value === undefined) {
         formData.append(key, "");
      } else if (Array.isArray(value)) {
         value.forEach((v, index) => {
            appendValue(`${key}[${index}]`, v);
         });
      } else if (
         typeof value === "object" &&
         !(value instanceof File) &&
         !(value instanceof Blob) &&
         !(value instanceof Date)
      ) {
         Object.entries(value).forEach(([k, v]) => {
            appendValue(`${key}[${decamelize(k)}]`, v);
         });
      } else {
         switch (value) {
            case true:
               formData.append(key, "1");
               break;
            case false:
               formData.append(key, "0");
               break;
            default:
               formData.append(key, value);
               break;
         }
      }
   };

   Object.entries(data).forEach(([key, value]) => {
      appendValue(decamelize(key), value);
   });

   return formData;
};
