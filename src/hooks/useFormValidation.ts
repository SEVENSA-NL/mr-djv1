import { useState } from "react";

type Rules = Record<string, { required?: boolean; email?: boolean; minLength?: number }>;
type Errors = Record<string, string>;

export function useFormValidation(rules: Rules) {
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (values: Record<string, unknown>): boolean => {
    const next: Errors = {};
    for (const [field, rule] of Object.entries(rules)) {
      const val = values[field];
      const str = typeof val === "string" ? val.trim() : "";
      if (rule.required && !str) {
        next[field] = "Dit veld is verplicht";
      } else if (rule.email && str && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str)) {
        next[field] = "Ongeldig e-mailadres";
      } else if (rule.minLength && str.length < rule.minLength) {
        next[field] = `Minimaal ${rule.minLength} tekens`;
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const clearFieldError = (field: string) => {
    setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
  };

  return { errors, validate, submitted, setSubmitted, clearFieldError };
}
