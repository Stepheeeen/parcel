import Button from "../ui/custom/button";
import InputField from "../ui/InputField";


const SignInForm = () => (
  <div className="p-6 bg-white rounded-md max-w-md mx-auto">
    <h2 className="text-2xl font-bold mb-4">Welcome Back</h2>
    <InputField type="email" placeholder="Email" />
    <InputField type="password" placeholder="Password" />
    <a href="/forgot-password" className="text-sm text-yellow-400 float-right mb-4">Forgot Password?</a>
    <Button label="Proceed" />
    <div className="text-center mt-4">Or</div>
    <Button label="Continue With Google" variant="secondary" />
    <p className="text-center text-sm mt-4">
      Don't Have An Account? <a href="/signup" className="text-yellow-400">Sign Up</a>
    </p>
  </div>
);

export default SignInForm;
