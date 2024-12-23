import Button from "../ui/custom/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const VerificationForm = () => (
  <div className="p-6 bg-white rounded-md max-w-md mx-auto shadow-md">
    <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
    <p className="text-sm text-gray-500 mb-4">
      A 6-digit code was sent to your email.
    </p>
    <div className="flex justify-between gap-2 mb-6">
      <InputOTP maxLength={6}>
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <InputOTPGroup key={`group-1-${index}`}>
            <InputOTPSlot index={index} className="p-6" />
          </InputOTPGroup>
        ))}
      </InputOTP>
    </div>
    <Button label="Verify" />
  </div>
);

export default VerificationForm;
