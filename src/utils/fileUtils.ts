import { API_URL } from "@/lib/fetch/myFetch";

export const getExtension = (fileName: string) => {
   return fileName.split(".").pop()?.toLowerCase() || "";
};

export const getFileName = (file: File | string | null) => {
   if (typeof file === "string") {
      return file.split("?")[0].split("/").pop() || "";
   }
   return file ? file.name : "";
};

export const getFullUrl = (url: string) => {
   return url.startsWith('http') ? url : API_URL + url
}

export const formatFileSize = (bytes: number | string | undefined | null) => {
   const numBytes = Number(bytes);
   if (isNaN(numBytes) || numBytes === 0) return "0 B";
   const k = 1024;
   const sizes = ["B", "KB", "MB", "GB", "TB"];
   const i = Math.floor(Math.log(numBytes) / Math.log(k));
   return (
      parseFloat((numBytes / Math.pow(k, i)).toFixed(2)).toString() +
      " " +
      sizes[i]
   );
};
