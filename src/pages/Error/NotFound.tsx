import { Link } from "react-router-dom";
import { MdArrowLeft, MdHome } from "react-icons/md";
import ButtonLinear from "@/components/form/ButtonLinear";
import { Button } from "@mui/material";

export default function NotFound() {
   return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
         <div className="max-w-md w-full text-center">
            {/* 404 Illustration */}
            <div className="mb-8">
               <div className="relative">
                  <div className="text-8xl font-bold text-gray-200 mb-4">
                     404
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-16 h-16 bg-linear-to-br from-primary to-secondary rounded-4xl flex items-center justify-center shadow-lg">
                        <span className="text-white text-5xl">0</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
               <h1 className="text-2xl font-bold text-gray-900 mb-3">
                  Page Not Found
               </h1>
               <p className="text-gray-600 mb-6 leading-relaxed">
                  Oops! The page you're looking for doesn't exist. It might have
                  been moved, deleted, or you entered the wrong URL.
               </p>

               {/* Action Buttons */}
               <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <ButtonLinear className="py-2" component={Link} to={"/"}>
                     <MdHome className="text-lg" />
                     Back to Dashboard
                  </ButtonLinear>

                  <Button
                     onClick={() => window.history.back()}
                     className="py-2 px-3"
                  >
                     <MdArrowLeft className="text-lg" />
                     Go Back
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
}
