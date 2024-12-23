"use client"
import { useState } from "react";
import Button from "../ui/custom/button";
import InputField from "../ui/InputField";
import { DEV_URL } from "../../../constants";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })

  const handleChange = (e:any) => {
    const  {  name, value, type, checked  } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

   const handleSubmit = async (e:any) => {
    console.log(formData)

    if(!formData.agreeToTerms){
      console.log("You have to agree to terms in order to proceed")
    }

    if(formData.confirmPassword !== formData.password){
      console.log("Password does not match")
    }

    e.preventDefault();
    try {

      const {email, password, username} = formData;

      const response = await fetch(`/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password, username}),
      });

      if(response.status < 300 && response.status >= 200){
        router.replace("/application/verify");
      }

      console.log(await response.json());

    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return(
      <div className="p-6 bg-white rounded-md w-full md:max-w-md mx-auto h-full md:h-auto">
        <h2 className="text-3xl font-bold mb-1 mx-1">Let's Get Started</h2>
        <p className="mb-6 md:mb-3 mx-1">Fill in the fields, let’s get to know you.</p>
        <form className="flex flex-col gap-4">
          <InputField type="text" placeholder="Username" 
            name="username"
          value={formData.username}
          onChange={handleChange}/>
          <InputField type="email" placeholder="Email" 
            name="email"
              value={formData.email}
          onChange={handleChange}
          />
          <InputField type="password" placeholder="Password" 
          name="password" 
          value={formData.password}
          onChange={handleChange}
          />
          <InputField type="password" placeholder="Confirm Password" 
           name="confirmPassword" 
           value={formData.confirmPassword}
          onChange={handleChange}
          />
        </form>
        <div className="flex items-center gap-2 mt-3 mb-5 mx-2">
          <input type="checkbox" className="cursor-pointer"  name="agreeToTerms"
           checked={formData.agreeToTerms}
            onChange={handleChange}/>
          <p className="text-sm">
            I Agree To The Terms And Conditions & Privacy Policy
          </p>
        </div>
        <Button label="Proceed" onClick={handleSubmit}/>
        <div className="text-center my-1 text-base">Or</div>
        <Button label="Continue With Google" variant="secondary" />
        <p className="text-center text-sm mt-4">
          Already Have An Account?{" "}
          <a href="/authentication/signin" className="text-yellow-400">
            Sign In
          </a>
        </p>
  </div>
  )
};

export default SignUpForm;
