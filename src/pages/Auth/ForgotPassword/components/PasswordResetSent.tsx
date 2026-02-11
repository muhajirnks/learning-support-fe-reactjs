import { Button, Box, Fade, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { useCallback, useEffect, useRef, useState } from "react";
import { forgotPassword } from "@/services/auth.service";
import { formatCountdown } from "@/utils/dateUtils";

interface Props {
   email: string;
}

const initialCountdown = 60;

const PasswordResetSent: React.FC<Props> = ({ email }) => {
   const [countdown, setCountdown] = useState<number>(initialCountdown);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
   const intervalRef = useRef<NodeJS.Timeout | null>(null);

   const startCountdown = useCallback(() => {
      setCountdown(initialCountdown);

      if (intervalRef.current) {
         clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
         setCountdown((prev) => {
            if (prev <= 1) {
               if (intervalRef.current) {
                  clearInterval(intervalRef.current);
               }
               return 0;
            }
            return prev - 1;
         });
      }, 1000);
   }, [initialCountdown]);

   const handleResend = async () => {
      if (loading || countdown > 0) return;
      setError("");

      setLoading(true);

      const { data, error } = await forgotPassword({
         email,
         verifyEmailUrl: window.origin + "/reset-password",
      });

      if (data) {
         startCountdown();
      }

      if (error) {
         setError(error.message);
      }

      setLoading(false);
   };

   useEffect(() => {
      startCountdown();
   }, []);

   return (
      <Box className="space-y-6">
         {error && (
            <Fade in={Boolean(error)}>
               <Alert severity="error" className="rounded-xl border-0">
                  {error}
               </Alert>
            </Fade>
         )}

         {/* Send Reset Link Button */}
         <Button
            variant="contained"
            fullWidth
            className="group relative overflow-hidden"
            sx={{
               borderRadius: "12px",
            }}
            endIcon={
               !loading &&
               !Boolean(countdown) && (
                  <MdArrowForward className="group-hover:translate-x-1 transition-transform duration-200" />
               )
            }
            disabled={Boolean(countdown) || loading}
            onClick={handleResend}
         >
            {Boolean(countdown)
               ? formatCountdown(countdown)
               : loading
               ? "Sending Reset Link..."
               : "Send again"}
         </Button>

         {/* Back to Sign In Link */}
         <div className="text-center pt-2">
            <Link
               type="button"
               to="/login"
               className="flex items-center justify-center gap-2 text-blue-500 hover:text-blue-600 transition-colors font-medium text-sm mx-auto bg-transparent border-none cursor-pointer"
            >
               <MdArrowBack className="text-[15px]" />
               Back to Sign In
            </Link>
         </div>
      </Box>
   );
};

export default PasswordResetSent;
