interface InputFieldProps {
    label?: string;
    type: string;
    placeholder: string;
  }
  
  const InputField = ({ label, type, placeholder }: InputFieldProps) => (
    <div className="flex flex-col space-y-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
    </div>
  );
  
  export default InputField;  