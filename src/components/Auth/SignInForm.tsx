import Button from "../ui/custom/button";
import InputField from "../ui/InputField";

const SignInForm = () => (
  <div className="p-6 bg-white rounded-md w-full md:max-w-md mx-auto h-full md:h-auto">
    <h2 className="text-3xl font-bold mb-1 mx-1">Welcome Back</h2>
    <p className="mb-6 md:mb-3 mx-1">login into your account.</p>
    <form className="flex flex-col gap-4 w-full">
      <InputField type="email" placeholder="Email" />
      <InputField type="password" placeholder="Password" />
      <a
        href="authentication/forget-password"
        className="text-sm text-yellow-400 text-right mb-4"
      >
        Forgot Password?
      </a>
    </form>
    <Button label="Proceed" />
    <div className="text-center my-1 text-base">Or</div>
    <Button label="Continue With Google" variant="secondary" />
    <p className="text-center text-sm mt-4">
      Don't Have An Account?{" "}
      <a href="/authentication/signup" className="text-yellow-400">
        Sign Up
      </a>
    </p>
  </div>
);

export default SignInForm;
