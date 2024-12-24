"use client"
import { FcGoogle } from "react-icons/fc";
import Button from "../ui/custom/button";
import InputField from "../ui/InputField";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const SignInForm = () => {

  const { toast } = useToast()
  const { login } = useAuth(); 

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

    const handleChange = (e:any) => {
    const  {  name, value, type, checked  } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const {email, password} = formData;


    if(!email){
       toast({title: "Validation Error", description: "Email is a required field", variant: "destructive"})
      return
    }

    if(!password){
        toast({title: "Validation Error", description: "Password is a required field", variant: "destructive"})
      return
    }
    try {
      
       const response = await fetch(`/api/users/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password}),
      });

      const data = await response.json();

      if(response.ok){
         localStorage.setItem("user_data", JSON.stringify(data))
        
         login(data.user, data.accessToken, data.refreshToken);
      }else{
        toast({title: "Error", description: data.message, variant: "destructive"})
        return
      }

    } catch (error) {
            toast({title: "Error", description: e?.message ? e.message: e, variant: "destructive"})
      return
    }
  }

return (
    <div className="p-6 bg-white rounded-md w-full md:max-w-md mx-auto h-full md:h-auto shadow-md">
    <h2 className="text-3xl font-bold mb-1 mx-1">Welcome Back</h2>
    <p className="mb-6 md:mb-3 mx-1">login into your account.</p>
    <form className="flex flex-col gap-4 w-full">
      <InputField type="email" placeholder="Email" 
          name="email"
          value={formData.email}
          onChange={handleChange}/>
      <InputField type="password" placeholder="Password" 
       name="password" 
          value={formData.password}
          onChange={handleChange}/>
      <a
        href="authentication/forget-password"
        className="text-sm text-yellow-400 text-right mb-4"
      >
        Forgot Password?
      </a>
    </form>
    <Button label="Proceed" onClick={handleSubmit}/>
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
      Don't Have An Account?{" "}
      <a href="/authentication/signup" className="text-yellow-400">
        Sign Up
      </a>
    </p>
  </div>
)
};

export default SignInForm;
