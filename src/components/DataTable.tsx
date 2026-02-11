import { formatDate, formatDateTime, formatTime } from "@/utils/dateUtils";
import { getFileName, getFullUrl } from "@/utils/fileUtils";
import {
   Avatar,
   Box,
   Checkbox,
   Skeleton,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   TableSortLabel,
   Tooltip,
   Typography,
} from "@mui/material";
import { useMemo } from "react";
import { MdInsertDriveFile, MdOutlineInsertDriveFile } from "react-icons/md";

interface Props<T extends Record<string, any>> {
   selected?: any[];
   rows: T[];
   config: TableConfig;
   sortBy: string;
   sort: "asc" | "desc";
   loading: boolean;
   onCheckAll?: (checked: boolean) => void;
   onCheck?: (id: any) => void;
   onChangeSort?: (sortKey: string) => void;
   renderAction?: (row: T, idx: number) => React.ReactNode;
}

export interface TableConfig {
   uniqueField?: string;
   columns: Column[];
}

export type Column = BaseColumn & (ColumnRender | ColumnType);

interface BaseColumn {
   key: string;
   sortKey?: string;
   label: string;
   getLabel?: (value: any, row: Record<string, any>) => string;
}

interface ColumnRender {
   type: "custom";
   renderValue: (value: any, row: Record<string, any>) => React.ReactNode;
}

interface ColumnType {
   type:
      | "string"
      | "file"
      | "date"
      | "datetime"
      | "image"
      | "number"
      | "url"
      | "time"
      | "avatar";
}

export const createTableConfig = (config: TableConfig) => {
   return config;
};

const DataTable = <T extends Record<string, any>>({
   selected,
   rows,
   config,
   sortBy,
   sort,
   loading,
   onCheckAll,
   onCheck,
   onChangeSort,
   renderAction,
}: Props<T>) => {
   const { columns, uniqueField } = config;
   const selectedSet = useMemo(() => new Set(selected), [selected]);

   return (
      <TableContainer className="h-full">
         <Table stickyHeader>
            <TableHead>
               <TableRow className="bg-background-paper">
                  {selected && (
                     <TableCell
                        padding="checkbox"
                        className="pl-6 font-bold bg-transparent border-0 text-sm"
                     >
                        <Checkbox
                           color="primary"
                           size="small"
                           disabled={loading}
                           checked={
                              rows.length > 0 &&
                              rows.every((r, idx) =>
                                 selectedSet.has(
                                    uniqueField ? r[uniqueField] : idx
                                 )
                              )
                           }
                           indeterminate={
                              rows.some((r, idx) =>
                                 selectedSet.has(
                                    uniqueField ? r[uniqueField] : idx
                                 )
                              ) &&
                              !rows.every((r, idx) =>
                                 selectedSet.has(
                                    uniqueField ? r[uniqueField] : idx
                                 )
                              )
                           }
                           onChange={(_, checked) =>
                              onCheckAll && onCheckAll(checked)
                           }
                        />
                     </TableCell>
                  )}
                  {columns.map((col, colIdx) => {
                     const isActive = col.sortKey
                        ? sortBy == col.sortKey
                        : sortBy == col.key;

                     return (
                        <TableCell
                           key={col.key}
                           className={`py-3 whitespace-nowrap font-bold bg-transparent border-0 text-sm ${
                              !selected && colIdx == 0 ? "pl-7" : ""
                           } ${
                              !renderAction && colIdx == columns.length - 1
                                 ? "pr-7"
                                 : ""
                           }`}
                           align={col.type == "number" ? "right" : "left"}
                        >
                           {col.sortKey ? (
                              <TableSortLabel
                                 active={isActive}
                                 direction={isActive ? sort : "asc"}
                                 onClick={() =>
                                    onChangeSort &&
                                    onChangeSort(col.sortKey || col.key)
                                 }
                              >
                                 <Box className="max-w-76 truncate">
                                    {col.label}
                                 </Box>
                              </TableSortLabel>
                           ) : (
                              <Box className="max-w-76 truncate">
                                 {col.label}
                              </Box>
                           )}
                        </TableCell>
                     );
                  })}
                  {renderAction && !loading && (
                     <TableCell className="font-bold text-center bg-transparent border-0 pr-6 text-sm">
                        Action
                     </TableCell>
                  )}
               </TableRow>
            </TableHead>
            <TableBody className="relative">
               {loading ? (
                  Array.from({ length: 10 }).map((_, idx) => (
                     <TableRow
                        key={idx + "loading"}
                        sx={{
                           "&:last-child td, &:last-child th": { border: 0 },
                        }}
                     >
                        {selected && (
                           <TableCell
                              padding="checkbox"
                              className="pl-6 border-0"
                           >
                              <Checkbox
                                 disabled
                                 color="primary"
                                 size="small"
                                 checked={false}
                              />
                           </TableCell>
                        )}
                        {columns.map((col, colIdx) => (
                           <Cell
                              key={idx + col.key}
                              row={{}}
                              col={col}
                              loading={true}
                              pl={!selected && colIdx == 0}
                              pr={!renderAction && colIdx == columns.length - 1}
                           />
                        ))}
                     </TableRow>
                  ))
               ) : !rows.length ? (
                  <TableRow>
                     <TableCell
                        colSpan={999}
                        className="text-center py-10 border-0"
                     >
                        <Typography variant="body1">No Data</Typography>
                     </TableCell>
                  </TableRow>
               ) : (
                  rows.map((row, idx) => (
                     <TableRow
                        key={uniqueField ? row[uniqueField] : idx}
                        className={`${
                           idx % 2 == 0
                              ? "bg-background-paper-dark"
                              : "bg-background-paper"
                        }`}
                        sx={{
                           "&:last-child td, &:last-child th": {
                              border: 0,
                           },
                        }}
                     >
                        {selected && (
                           <TableCell
                              padding="checkbox"
                              className="pl-6 border-0"
                           >
                              <Checkbox
                                 color="primary"
                                 size="small"
                                 onChange={() =>
                                    onCheck &&
                                    onCheck(
                                       uniqueField ? row[uniqueField] : idx
                                    )
                                 }
                                 checked={selectedSet.has(
                                    uniqueField ? row[uniqueField] : idx
                                 )}
                              />
                           </TableCell>
                        )}
                        {columns.map((col, colIdx) => (
                           <Cell
                              key={`{${
                                 uniqueField ? row[uniqueField] : idx
                              } + ${col.key}}`}
                              row={row}
                              col={col}
                              loading={false}
                              pl={!selected && colIdx == 0}
                              pr={!renderAction && colIdx == columns.length - 1}
                           />
                        ))}
                        {renderAction && (
                           <TableCell
                              className="py-4.5 whitespace-nowrap max-w-76 pr-6 text-sm border-0"
                              align={"center"}
                           >
                              {renderAction(row, idx)}
                           </TableCell>
                        )}
                     </TableRow>
                  ))
               )}
            </TableBody>
         </Table>
      </TableContainer>
   );
};

interface CellProps {
   row: Record<string, any>;
   col: Column;
   loading: boolean;
   pl: boolean;
   pr: boolean;
}

function getValueByPath<T extends object>(obj: T, path: string): any {
   return path.split(".").reduce((acc, key) => acc?.[key], obj as any);
}

const Cell = ({ row, col, loading, pl, pr }: CellProps) => {
   const cell = useMemo(() => {
      if (loading)
         return (
            <TableCell className="py-4.5 whitespace-nowrap max-w-76 border-0">
               <Skeleton variant="text" width={150} />
            </TableCell>
         );

      const rawValue = getValueByPath(row, col.key);

      let value: React.ReactNode;
      let label: string = col.getLabel ? col.getLabel(rawValue, row) : rawValue;

      if (col.type == "custom") {
         value = col.renderValue(rawValue, row);
      } else if (col.type == "file") {
         value = rawValue ? (
            <MdInsertDriveFile className="text-lg" />
         ) : (
            <MdOutlineInsertDriveFile className="text-lg" />
         );

         label = getFileName(rawValue);
      } else if (col.type == "url") {
         value = (
            <a
               href={
                  rawValue?.startsWith("http")
                     ? rawValue
                     : "https://" + rawValue
               }
               target="_blank"
               className="text-primary hover:underline"
            >
               {label}
            </a>
         );
      } else if (col.type == "date") {
         value = formatDate(rawValue);
      } else if (col.type == "time") {
         value = formatTime(rawValue);
      } else if (col.type == "datetime") {
         value = formatDateTime(rawValue);
      } else if (col.type == "image") {
         value = (
            <Box className="w-20 h-20">
               <img
                  src={getFullUrl(rawValue)}
                  className="w-full h-full object-contain"
               />
            </Box>
         );
      } else if (col.type == "avatar") {
         value = (
            <Avatar src={getFullUrl(rawValue)} className="w-12 h-12">
               {label}
            </Avatar>
         );
      } else {
         value = label || "-";
      }

      return (
         <TableCell
            className={`whitespace-nowrap max-w-76 border-0 text-sm ${
               col.type == "image" ? "py-1" : "py-4.5"
            } ${pl ? "pl-7" : ""} ${pr ? "pr-7" : ""}`}
            align={col.type == "number" ? "right" : "left"}
         >
            <Tooltip title={label} followCursor>
               <Box
                  className={`truncate max-w-min ${
                     col.type == "number" ? "text-right ml-auto" : "text-left"
                  }`}
               >
                  {value}
               </Box>
            </Tooltip>
         </TableCell>
      );
   }, [row, col, loading]);

   return cell;
};

export default DataTable;
