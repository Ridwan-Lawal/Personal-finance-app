interface FormInput {
  children: React.ReactNode;
  htmlFor: string;
  label: string;
  error?: string;
}

export default function PotsFormInput({
  children,
  htmlFor,
  label,
  error,
}: FormInput) {
  return (
    <fieldset className="field">
      <label htmlFor={htmlFor}>{label}</label>

      <div className="field-container border">{children}</div>
      {error && <p className="error-msg text-preset-5">{error}</p>}
    </fieldset>
  );
}
