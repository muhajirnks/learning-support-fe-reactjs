import { Box, Button, FormHelperText, IconButton } from "@mui/material";
import { useEffect, useMemo, useRef } from "react";
import { FaFile } from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";
import { MdDelete, MdSync, MdUpload } from "react-icons/md";
import {
   RiFileExcel2Fill,
   RiFilePdf2Fill,
   RiFileWord2Fill,
} from "react-icons/ri";

interface BaseProps {
   placeholder?: string;
   accept?: string;
   error?: boolean;
   helperText?: React.ReactNode;
   clearable?: boolean;
}

interface SingleProps extends BaseProps {
   multiple?: false;
   value?: File | string | null;
   onChange?: (file: File | "_delete" | null) => void;
}

interface MultipleProps extends BaseProps {
   multiple: true;
   value?: FileList | (File | string)[] | null;
   onChange?: (files: FileList | null) => void;
}

type Props = SingleProps | MultipleProps;

const getExtension = (fileName: string) => {
   return fileName.split(".").pop()?.toLowerCase() || "";
};

const getFileName = (file: File | string | null) => {
   if (typeof file === "string") {
      const path = file.split("?")[0];
      return path.split("/").pop() || "";
   }
   return file ? file.name : "";
};

const getIcon = (fileName: string) => {
   const ext = getExtension(fileName);
   switch (ext) {
      case "pdf":
         return <RiFilePdf2Fill className="text-6xl mx-auto text-gray-400" />; // PDF icon
      case "doc":
      case "docx":
         return <RiFileWord2Fill className="text-6xl mx-auto text-gray-400" />; // Word document icon
      case "xls":
      case "xlsx":
         return <RiFileExcel2Fill className="text-6xl mx-auto text-gray-400" />; // Excel document icon
      case "txt":
         return <IoDocumentText className="text-6xl mx-auto text-gray-400" />; // Text file icon
      default:
         return <FaFile className="text-6xl mx-auto text-gray-400" />; // Generic file icon
   }
};

const fileIsImage = (file: File | string | null) => {
   if (typeof file === "string") {
      return file.match(/\.(jpg|jpeg|png|gif)$/i) !== null;
   }

   return file ? file.type.startsWith("image") : false;
};

const FileInput = (props: Props) => {
   const {
      placeholder,
      value,
      onChange,
      accept,
      error,
      helperText,
      multiple = false,
      clearable = true,
   } = props;

   const fileName = useMemo(() => {
      if (multiple) {
         if (!value) return "";
         if (value instanceof FileList) {
            return `${value.length} files selected`;
         }
         if (Array.isArray(value)) {
            return `${value.length} files selected`;
         }
         return "";
      }
      return getFileName(value as File | string | null);
   }, [multiple, value]);

   const hasValue = useMemo(() => {
      return multiple
         ? !!value &&
              ((value instanceof FileList && value.length > 0) ||
                 (Array.isArray(value) && value.length > 0))
         : !!value && value !== "_delete";
   }, [multiple, value]);

   const fileIcon = useMemo(() => {
      return hasValue ? (
         getIcon(fileName)
      ) : (
         <MdUpload className="text-4xl mx-auto text-gray-400" />
      );
   }, [hasValue, fileName]);

   const isImage = useMemo(
      () => !multiple && fileIsImage(value as File | string | null),
      [value, multiple]
   );

   const inputRef = useRef<HTMLInputElement>(null);

   const handleDelete = () => {
      if (inputRef.current) {
         if (onChange) {
            if (multiple) {
               (onChange as (files: FileList | null) => void)(null);
            } else {
               const singleOnChange = onChange as (
                  file: File | "_delete" | null
               ) => void;
               if (inputRef.current?.files?.length || value === "_delete") {
                  singleOnChange(null);
               } else {
                  singleOnChange("_delete");
               }
            }
         }
      }
   };

   const handleDrop = async (e: React.DragEvent<any>) => {
      e.preventDefault();

      e.currentTarget.classList.remove("bg-gray-100");

      const dt = e.dataTransfer;
      if (!dt || !dt.files || dt.files.length === 0) return;

      if (onChange) {
         if (multiple) {
            (onChange as (files: FileList | null) => void)(dt.files);
         } else {
            (onChange as (file: File | "_delete" | null) => void)(
               dt.files[0] || null
            );
         }
      }
   };

   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.currentTarget.classList.add("bg-gray-100");
   };

   const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.currentTarget.classList.remove("bg-gray-100");
   };

   useEffect(() => {
      if (multiple) {
         if (!value && inputRef.current) {
            const dt = new DataTransfer();
            inputRef.current.files = dt.files;
         }
      } else {
         if ((!value || typeof value === "string") && inputRef.current) {
            const dt = new DataTransfer();
            inputRef.current.files = dt.files;
         }
      }
   }, [value, multiple]);

   return (
      <Box>
         <Box
            className="w-full relative overflow-hidden"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
         >
            {hasValue && clearable && (
               <IconButton
                  className={`absolute top-2 right-2 z-10 ${
                     value !== "_delete" ? "text-red-600" : "text-gray-400"
                  }`}
                  onClick={handleDelete}
               >
                  {value !== "_delete" ? <MdDelete /> : <MdSync />}
               </IconButton>
            )}
            <Box
               color="inherit"
               className={`w-full rounded-lg py-10 p-0 border-2 border-dashed relative grid place-items-center ${
                  error ? "border-red-600" : "border-gray-300"
               }`}
            >
               {isImage && !multiple ? (
                  <Box>
                     <img
                        src={
                           typeof value === "string"
                              ? value
                              : URL.createObjectURL(value as File)
                        }
                        alt={fileName}
                        className="w-full h-full object-cover"
                     />
                  </Box>
               ) : (
                  <Box className="flex flex-col items-center gap-3 px-3">
                     {fileIcon}
                     <span className="font-normal text-gray-500 text-center break-all">
                        {hasValue ? fileName : placeholder || "Upload File"}
                     </span>
                     <Button
                        variant="outlined"
                        startIcon={<MdUpload />}
                        sx={{
                           borderColor: "#000000",
                           color: "#000000",
                           borderRadius: "12px",
                           textTransform: "none",
                           fontWeight: 600,
                        }}
                        onClick={() => inputRef.current?.click()}
                     >
                        {hasValue ? "Change File" : "Choose Files"}
                     </Button>
                  </Box>
               )}

               <input
                  ref={inputRef}
                  type="file"
                  hidden
                  accept={accept}
                  multiple={multiple}
                  onChange={(e) => {
                     if (!onChange) return;
                     if (multiple) {
                        (onChange as (files: FileList | null) => void)(
                           e.target.files
                        );
                        const dt = new DataTransfer();
                        e.target.files = dt.files;
                     } else {
                        (onChange as (file: File | "_delete" | null) => void)(
                           e.target.files?.[0] || null
                        );
                     }
                  }}
               />
            </Box>
         </Box>

         {helperText && (
            <FormHelperText
               className={`${
                  error ? "text-red-700" : "text-gray-500"
               } text-[12px]/normal max-sm:text-[10px]/normal max-md:text-[11px]/normal`}
            >
               {helperText}
            </FormHelperText>
         )}
      </Box>
   );
};

export default FileInput;
