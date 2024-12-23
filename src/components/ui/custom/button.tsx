interface ButtonProps {
    label: any;
    onClick?: any;
    variant?: "primary" | "secondary";
  }
  
  const Button = ({ label, onClick, variant = "primary" }: ButtonProps) => (
    <button
      onClick={onClick}
      className={`w-full py-3 rounded-full font-medium ${
        variant === "primary" ? "bg-[#F9CA44] hover:bg-yellow-500 text-white text-lg" : "bg-gray-200 text-black text-lg"
      }`}
    >
      {label}
    </button>
  );
  
  export default Button;