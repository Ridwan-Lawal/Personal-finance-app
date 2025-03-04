import React from "react";

interface BasicFormFieldProps {
  children: React.ReactNode;
  htmlFor: string;
  label: string;
  error?: string;
}

export default function BasicFormField({
  children,
  htmlFor,
  label,
  error,
}: BasicFormFieldProps) {
  return (
    <div className="fleid">
      <label htmlFor={htmlFor}>{label}</label>
      <div className="field-container">{children}</div>
      {error && <p className="error-msg small">{error}</p>}
    </div>
  );
}
