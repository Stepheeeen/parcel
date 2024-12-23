import Button from "../ui/custom/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const ForgotPasswordForm = () => (
  <div className="p-6 bg-white rounded-md max-w-md mx-auto">
    <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
    <p className="text-sm text-gray-500 mb-4">
      A 6-digit code was sent to your email.
    </p>
    <div className="flex justify-between mb-14 gap-3">
      <InputOTP maxLength={6}>
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <InputOTPGroup key={`group-1-${index}`}>
            <InputOTPSlot index={index} className="p-7 text-2xl" />
          </InputOTPGroup>
        ))}
      </InputOTP>
    </div>
    <Button label="Proceed" />
  </div>
);

export default ForgotPasswordForm;
