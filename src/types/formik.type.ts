import { type FormikHelpers, type FormikProps } from "formik";

export type HandleSubmit<Values> = (
   values: Values,
   formikHelpers: FormikHelpers<Values>
) => void | Promise<any>;

export interface FieldAttributes<T> {
   meta: Meta;
   field: Field;
   form: FormikProps<T>;
}

interface Meta {
   error?: string
   initialError?: string
   initialTouched: boolean
   touched: boolean
   initialValue: any
   value: any
}

interface Field {
   name: string;
   value: any
   onChange: (e: any) => void
   onBlur: (e: any) => void
}