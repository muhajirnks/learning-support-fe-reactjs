import { Select, type SelectProps } from "@mui/material";

const SelectInput = <T,>(props: SelectProps<T>) => {
   return (
      <Select
         {...props}
         sx={{
            "&": {
               borderRadius: "800px",
               backgroundColor: "var(--color-background-paper-dark)",
            },
            ...((props.sx as Record<string, any>)?.["&"] ?? {}),
            "& input": {
               borderRadius: props.size == "small" ? "8px" : "12px",
               ...((props.sx as Record<string, any>)?.["& input"] ?? {}),
            },
            "& fieldset": {
               border: "0.6px solid var(--color-background-paper-light)",
               transitionProperty: "border-color",
               transitionDuration: "100ms",
               borderRadius: props.size == "small" ? "8px" : "12px",
               ...((props.sx as Record<string, any>)?.["& fieldset"] ?? {}),
            },
            "&:hover fieldset": {
               borderColor: "var(--color-foreground-secondary) !important",
               ...((props.sx as Record<string, any>)?.["&:hover fieldset"] ??
                  {}),
            },
            "& input:focus ~ fieldset": {
               border: "0.6px solid var(--color-primary) !important",
               ...((props.sx as Record<string, any>)?.[
                  "& input:focus ~ fieldset"
               ] ?? {}),
            },
            ...(props.sx ?? {}),
         }}
      />
   );
};

export default SelectInput;
