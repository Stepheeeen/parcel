import Button from "../ui/custom/button";
import InputField from "../ui/InputField";


const ResetPasswordForm = () => (
  <div className="p-6 bg-white rounded-md max-w-md mx-auto">
    <h2 className="text-2xl font-bold mb-4">Create Password</h2>
    <InputField type="password" placeholder="Password" />
    <InputField type="password" placeholder="Confirm Password" />
    <Button label="Proceed" />
  </div>
);

export default ResetPasswordForm;