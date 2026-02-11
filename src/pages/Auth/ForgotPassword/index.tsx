import { useState } from "react";
import PasswordResetSent from "./components/PasswordResetSent";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import AuthLayout from "@/layouts/AuthLayout";
import { MdMail } from "react-icons/md";

const ForgotPassword = () => {
   const [step, setStep] = useState(1);
   const [email, setEmail] = useState("");

   const props =
      step == 1
         ? {
              title: "Lost Your Password?",
              description:
                 "No worries, getting back into your account is quick and simple.",
           }
         : {
              title: "Check your inbox",
              description: `We've sent a password reset link to ${email}.`,
              icon: <MdMail className="text-center text-8xl text-gray-300 mx-auto" />
           };

   return (
      <AuthLayout {...props}>
         {/* Main Card */}
         {step == 1 ? (
            <ForgotPasswordForm
               nextStep={(email: string) => {
                  setEmail(email);
                  setStep(2);
               }}
            />
         ) : (
            <PasswordResetSent email={email} />
         )}
      </AuthLayout>
   );
};

export default ForgotPassword;
