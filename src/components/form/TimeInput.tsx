import type { SxProps } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import type { PickerValue } from "@mui/x-date-pickers/internals";
import type {
   PickerChangeHandlerContext,
   TimeValidationError,
} from "@mui/x-date-pickers/models";

interface Props {
   label?: string;
   className?: string;
   fullWidth?: boolean;
   value?: PickerValue;
   onChange?: (
      value: PickerValue,
      context: PickerChangeHandlerContext<TimeValidationError>
   ) => void;
   onBlur?: React.FocusEventHandler<HTMLDivElement>;
   error?: boolean;
   helperText?: React.ReactNode;
   required?: boolean;
   sx?: SxProps<Theme>;
   size?: "small" | "medium";
}

const TimeInput = ({
   label,
   value,
   onChange,
   className,
   fullWidth,
   onBlur,
   error,
   helperText,
   required,
   sx,
   size,
}: Props) => {
   return (
      <TimePicker
         className={className}
         slotProps={{
            textField: {
               fullWidth,
               error,
               helperText,
               required,
               size,
            },
            field: { clearable: true, onBlur },
         }}
         label={label}
         value={value}
         onChange={onChange}
         sx={{
            "& .MuiPickersInputBase-root": {
               backgroundColor: "var(--color-background-paper-dark)",
               borderRadius: size == 'small' ? "8px" : "12px",
               ...((sx as Record<string, any>)?.[
                  "& .MuiPickersInputBase-root"
               ] ?? {}),
            },
            "& fieldset": {
               border: "0.6px solid var(--color-background-paper-light)",
               transitionProperty: "border-color",
               transitionDuration: "100ms",
               borderRadius: size == "small" ? "8px" : "12px",
               ...((sx as Record<string, any>)?.[
                  "& fieldset"
               ] ?? {}),
            },
            "& .MuiPickersInputBase-root:hover fieldset": {
               border: "0.6px solid var(--color-foreground-secondary)",
               ...((sx as Record<string, any>)?.[
                  "& .MuiPickersInputBase-root:hover fieldset"
               ] ?? {}),
            },
            "& input:focus ~ fieldset": {
               border: "0.6px solid var(--color-primary) !important",
               ...((sx as Record<string, any>)?.[
                  "& input:focus ~ fieldset"
               ] ?? {}),
            },
            ...sx,
         }}
      />
   );
};

export default TimeInput;
