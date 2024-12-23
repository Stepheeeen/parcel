import Button from "../ui/custom/button";
import InputField from "../ui/InputField";


const SignUpForm = () => (
  <div className="p-6 bg-white rounded-md max-w-md mx-auto">
    <h2 className="text-2xl font-bold mb-4">Let's Get Started</h2>
    <InputField type="text" placeholder="Username" />
    <InputField type="email" placeholder="Email" />
    <InputField type="password" placeholder="Password" />
    <InputField type="password" placeholder="Confirm Password" />
    <div className="flex items-center gap-2 my-4">
      <input type="checkbox" />
      <p className="text-sm">I Agree To The Terms And Conditions & Privacy Policy</p>
    </div>
    <Button label="Proceed" />
    <div className="text-center mt-4">Or</div>
    <Button label="Continue With Google" variant="secondary" />
    <p className="text-center text-sm mt-4">
      Already Have An Account? <a href="/signin" className="text-yellow-400">Sign In</a>
    </p>
  </div>
);

export default SignUpForm;