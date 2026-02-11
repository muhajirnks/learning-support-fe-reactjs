import { debounce, type AutocompleteInputChangeReason } from "@mui/material";
import { useState, useMemo, useEffect, useCallback } from "react";
import type { DropdownData } from "@/types/api/dropdown.type";

const useAutocompleteMulti = <T>(
   value: T[],
   data: DropdownData<T>[] | null,
   onDebouncedSearch: (v: string) => void,
   preloadedData?: DropdownData<T>[]
) => {
   const [inputValue, setInputValue] = useState("");
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

            (preloadedData || []).forEach((pd) => {
               if (!mapCombined.has(pd.value)) {
                  mapCombined.set(pd.value, true);
                  combined.push(pd);
               }
            });

            return combined;
         });
      }
   }, [preloadedData, data]);

   // Get current selected
   const selected = useMemo(() => {
      return allData.filter((d) => (value || []).includes(d.value));
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

      // Add selected that are not in current search results
      selected.forEach((s) => {
         if (!options.find((opt) => opt.value === s.value)) {
            options.unshift(s);
         }
      });

      return options;
   }, [data, selected]);

   const onInputChange = useCallback(
      (
         _: React.SyntheticEvent,
         value: string,
         reason: AutocompleteInputChangeReason
      ) => {
         if (
            reason == "input" ||
            reason == "clear" ||
            reason == "selectOption"
         ) {
            setInputValue(value);
            debouncedSearch(value);
         }
      },
      []
   );

   return {
      inputValue,
      options,
      value: selected,
      onInputChange,
      filterOptions: (x: any[]) => x,
   };
};

export default useAutocompleteMulti;
