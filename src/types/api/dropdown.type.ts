export interface DropdownRequest {
   page?: number;
   limit?: number;
   search?: string;
}

export interface DropdownData<T> {
   label: string;
   value: T;
}
