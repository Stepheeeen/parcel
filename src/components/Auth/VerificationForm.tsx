import Button from "../ui/custom/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const VerificationForm = () => (
  <div className="p-6 bg-white rounded-md max-w-md mx-auto shadow-none md:shadow-md">
    <h2 className="text-2xl font-bold mb-1 mx-1">Email Verification</h2>
    <p className="mb-9 text-base mx-1 text-gray-500">
      A 6 digit code was sent to the address roonie**********@gmail.com
    </p>
    <div className="flex justify-between items-center w-full gap-3 mb-14">
      <InputOTP maxLength={6}>
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <InputOTPGroup key={`group-1-${index}`}>
            <InputOTPSlot index={index} className="p-7 text-2xl" />
          </InputOTPGroup>
        ))}
      </InputOTP>
    </div>
    <Button label="Verify" />
  </div>
);

export default VerificationForm;
