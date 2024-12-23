import Button from "../ui/custom/button";

const ForgotPasswordForm = () => (
  <div className="p-6 bg-white rounded-md max-w-md mx-auto">
    <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
    <p className="text-sm text-gray-500 mb-4">
      A 6-digit code was sent to your email.
    </p>
    <div className="flex gap-2 justify-center mb-4">
      {[...Array(6)].map((_, i) => (
        <input
          key={i}
          maxLength={1}
          className="w-12 h-12 text-center border border-gray-300 rounded-md"
        />
      ))}
    </div>
    <Button label="Proceed" />
  </div>
);

export default ForgotPasswordForm;
