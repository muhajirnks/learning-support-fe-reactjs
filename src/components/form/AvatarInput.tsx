import { Avatar, Box, FormHelperText, IconButton, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { MdCameraAlt } from "react-icons/md";

interface Props {
   placeholder?: string;
   value?: File | string | null;
   accept?: string;
   onChange?: (file: File | "_delete" | null) => void;
   error?: boolean;
   helperText?: React.ReactNode;
}

const AvatarInput = ({
   placeholder,
   value,
   onChange,
   accept,
   error,
   helperText,
}: Props) => {
   const inputRef = useRef<HTMLInputElement>(null);

   // const handleDelete = () => {
   //    if (inputRef.current) {
   //       if (onChange) {
   //          if (inputRef.current?.files?.length || value === "_delete") {
   //             onChange(null);
   //          } else {
   //             onChange("_delete");
   //          }
   //       }
   //    }
   // };

   useEffect(() => {
      if ((!value || typeof value === "string") && inputRef.current) {
         const dt = new DataTransfer();
         inputRef.current.files = dt.files;
      }
   }, [value]);

   return (
      <Box>
         <Box className="flex items-center gap-3">
            <IconButton className="rounded-full p-0 relative group" onClick={() => inputRef.current?.click()}>
               <Box className="absolute rounded-full w-full h-full opacity-0 group-hover:opacity-100 z-10 transition-opacity grid place-items-center bg-background/30 cursor-pointer select-none">
                  <MdCameraAlt />
               </Box>

               <Avatar
                  src={
                     value ? typeof value === "string"
                        ? value
                        : URL.createObjectURL(value!) : ''
                  }
                  className="w-20 h-20"
               />
               <input
                  ref={inputRef}
                  type="file"
                  hidden
                  accept={accept}
                  onChange={(e) =>
                     onChange && onChange(e.target.files?.[0] || null)
                  }
               />
            </IconButton>

            {/* <Button onClick={handleDelete} color="error" variant="outlined">Delete</Button> */}
            <Typography>{placeholder}</Typography>
         </Box>

         {helperText && (
            <FormHelperText
               className={`${
                  error ? "text-red-700" : "text-gray-500"
               } text-xs/normal max-sm:text-[10px]/normal max-md:text-[11px]/normal`}
            >
               {helperText}
            </FormHelperText>
         )}
      </Box>
   );
};

export default AvatarInput;
