import { debounce, type AutocompleteInputChangeReason } from "@mui/material";
import { useState, useMemo, useEffect, useCallback } from "react";
import type { DropdownData } from "@/types/api/dropdown.type";

const useAutocomplete = <T>(
   value: T | null,
   data: DropdownData<T>[] | null,
   onDebouncedSearch: (v: string) => void,
   preloadedData?: DropdownData<T>
) => {
   const [allData, setAllData] = useState<DropdownData<T>[]>([]);

   // Update all data when new data comes in
   useEffect(() => {
      if (data) {
         setAllData((prevData) => {
            const newData = data;
            const combined = [...prevData];

            const mapCombined = new Map<T, boolean>();
            combined.forEach((item) => {
               mapCombined.set(item.value, true);
            });

            newData.forEach((nd) => {
               if (!mapCombined.has(nd.value)) {
                  mapCombined.set(nd.value, true);
                  combined.push(nd);
               }
            });

            // Add pre-loaded data if exists
            if (
               preloadedData &&
               !mapCombined.has(preloadedData.value)
            ) {
               mapCombined.set(preloadedData.value, true);
               combined.push(preloadedData);
            }

            return combined;
         });
      }
   }, [preloadedData, data]);

   // Get current selected
   const selected = useMemo(() => {
      return allData.find((d) => d.value === value) || null;
   }, [allData, value]);

   // Debounced search function
   const debouncedSearch = useMemo(
      () =>
         debounce((searchValue: string) => {
            onDebouncedSearch(searchValue);
         }, 300),
      []
   );

   // Options for autocomplete
   const options = useMemo(() => {
      const searchResults = data || [];
      const options = [...searchResults];

      // Add selected if it's not in current search results
      if (selected && !options.find((opt) => opt.value === selected.value)) {
         options.unshift(selected);
      }

      return options;
   }, [data, selected]);

   const onInputChange = useCallback(
      (
         _: React.SyntheticEvent,
         value: string,
         reason: AutocompleteInputChangeReason
      ) => {
         if (reason === "input" || reason === "clear") {
            debouncedSearch(value);
         }
      },
      []
   );

   return {
      options,
      value: selected,
      onInputChange,
      filterOptions: (x: any[]) => x,
   };
};

export default useAutocomplete;
