import Button from "../ui/custom/button";
import InputField from "../ui/InputField";

const ResetPasswordForm = () => (
  <div className="p-6 bg-white rounded-md w-full md:max-w-md mx-auto h-full md:h-auto shadow-md">
    <h2 className="text-3xl font-bold mb-1 mx-1">Create Password</h2>
    <p className="mb-6 md:mb-3 mx-1">Input a new password</p>
    <form className="flex flex-col gap-4 w-full my-4 mb-10">
      <InputField type="password" placeholder="Password" />
      <InputField type="password" placeholder="Confirm Password" />
    </form>
    <Button label="Proceed" />

    <p className="text-center text-sm mt-4">
      Already Have An Account?{" "}
      <a href="/authentication/signin" className="text-yellow-400">
        Sign In
      </a>
    </p>
  </div>
);

export default ResetPasswordForm;
