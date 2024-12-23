import Button from "../ui/custom/button";
import InputField from "../ui/InputField";
import { FcGoogle } from "react-icons/fc";

const SignUpForm = () => (
  <div className="p-6 bg-white rounded-md w-full md:max-w-md mx-auto h-full md:h-auto shadow-md">
    <h2 className="text-3xl font-bold mb-1 mx-1">Let's Get Started</h2>
    <p className="mb-6 md:mb-3 mx-1">
      Fill in the fields, let’s get to know you.
    </p>
    <form className="flex flex-col gap-4 my-4">
      <InputField type="text" placeholder="Username" />
      <InputField type="email" placeholder="Email" />
      <InputField type="password" placeholder="Password" />
      <InputField type="password" placeholder="Confirm Password" />
    </form>
    <div className="flex items-center gap-2 mt-3 mb-5 mx-2">
      <input type="checkbox" className="cursor-pointer" />
      <p className="text-sm">
        I Agree To The Terms And Conditions & Privacy Policy
      </p>
    </div>
    <Button label="Proceed" />
    <div className="text-center my-1 text-base">Or</div>
    <Button
      label={
        <div className="flex items-center justify-center gap-3">
          <FcGoogle size={35}/>
          <p>Continue With Google</p>
        </div>
      }
      variant="secondary"
    />
    <p className="text-center text-sm mt-4">
      Already Have An Account?{" "}
      <a href="/authentication/signin" className="text-yellow-400">
        Sign In
      </a>
    </p>
  </div>
);

export default SignUpForm;
