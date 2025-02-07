"use server";

import FormButton from "./FormButton";

const Form = ({ action }) => {
  const formInputs = [
    { label: "Email", type: "email", placeholder: "your@email.com" },
    { label: "Password", type: "password", placeholder: "••••••••" },
  ];
  return (
    <form onSubmit={action} className="space-y-4">
      {formInputs.map(({ label, type, placeholder }) => (
        // --- Email and Password Input
        <div key={label}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
          <input
            type={type}
            name={type}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder={placeholder}
          />
        </div>
      ))}
      <FormButton />
    </form>
  );
};

export default Form;
