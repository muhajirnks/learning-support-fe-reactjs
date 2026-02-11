export function getFormattedDateTime(): string {
   const now = new Date();

   const day = String(now.getDate()).padStart(2, "0");
   const month = String(now.getMonth() + 1).padStart(2, "0"); // bulan mulai dari 0
   const year = now.getFullYear();

   const hours = String(now.getHours()).padStart(2, "0");
   const minutes = String(now.getMinutes()).padStart(2, "0");

   return `${day} - ${month} - ${year} | ${hours}:${minutes}`;
}

export const formatDate = (
   dateString: string,
   locale: Intl.LocalesArgument = "en-US"
): string => {
   const date = new Date(dateString);
   return Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
   }).format(date);
};

export const formatShortDate = (
   timestamp: string,
   locale: Intl.LocalesArgument = "en-US"
) => {
   const date = new Date(timestamp);
   return Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
   }).format(date);
};

export const formatTime = (
   timestamp: string,
   locale: Intl.LocalesArgument = "en-US"
) => {
   const date = new Date(timestamp);
   return Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
   }).format(date);
};

export const formatDateTime = (
   timestamp: string,
   locale: Intl.LocalesArgument = "en-US"
) => {
   const date = new Date(timestamp);
   return Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
   }).format(date);
};

export const formatCountdown = (seconds: number): string => {
   const minutes = Math.floor(seconds / 60);
   const remainingSeconds = seconds % 60;
   return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
};
