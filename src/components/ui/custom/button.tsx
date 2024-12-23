interface ButtonProps {
    label: any;
    onClick?: () => void;
    variant?: "primary" | "secondary";
  }
  
  const Button = ({ label, onClick, variant = "primary" }: ButtonProps) => (
    <button
      onClick={onClick}
      className={`w-full py-3 rounded-full font-medium ${
        variant === "primary" ? "bg-[#F9CA44] hover:bg-yellow-500 text-white text-lg" : "text-black text-lg outline outline-1 outline-[#F9CA44]"
      }`}
    >
      {label}
    </button>
  );
  
  export default Button;