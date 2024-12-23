interface ButtonProps {
    label: string;
    onClick?: () => void;
    variant?: "primary" | "secondary";
  }
  
  const Button = ({ label, onClick, variant = "primary" }: ButtonProps) => (
    <button
      onClick={onClick}
      className={`w-full py-2 rounded-md text-white font-medium ${
        variant === "primary" ? "bg-yellow-400 hover:bg-yellow-500" : "bg-gray-200"
      }`}
    >
      {label}
    </button>
  );
  
  export default Button;