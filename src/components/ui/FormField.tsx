import React from "react";

interface FormFieldProps {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({ label, name, required, error, children }) => (
  <div>
    <label htmlFor={name} className="mb-1 block text-xs font-semibold text-gray-900 md:text-sm">
      {label}
      {required && <span className="ml-0.5 text-mrdj-error">*</span>}
    </label>
    {children}
    {error && (
      <p id={`${name}-error`} role="alert" className="mt-1 text-xs text-mrdj-error">{error}</p>
    )}
  </div>
);
