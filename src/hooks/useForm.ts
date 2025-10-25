import { useState, useCallback } from 'react';

/**
 * Form field configuration
 */
export interface FormField {
  value: any;
  error?: string;
  touched?: boolean;
}

/**
 * Form state type
 */
export type FormState<T> = {
  [K in keyof T]: FormField;
};

/**
 * Form validation function type
 */
export type ValidationFn<T> = (values: Partial<T>) => Partial<Record<keyof T, string>>;

/**
 * Custom hook for form management
 */
export function useForm<T extends Record<string, any>>(
  initialValues: T,
  validationFn?: ValidationFn<T>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setValues(prev => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const setFieldTouched = useCallback(<K extends keyof T>(field: K, isTouched = true) => {
    setTouched(prev => ({ ...prev, [field]: isTouched }));
  }, []);

  const validate = useCallback(() => {
    if (!validationFn) return true;

    const validationErrors = validationFn(values);
    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  }, [values, validationFn]);

  const handleSubmit = useCallback(async (
    onSubmit: (values: T) => Promise<void> | void
  ) => {
    setIsSubmitting(true);

    try {
      // Mark all fields as touched
      const allTouched = Object.keys(values).reduce((acc, key) => {
        acc[key as keyof T] = true;
        return acc;
      }, {} as Partial<Record<keyof T, boolean>>);
      setTouched(allTouched);

      // Validate
      if (!validate()) {
        return;
      }

      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validate]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const isValid = Object.keys(errors).length === 0;
  const isDirty = JSON.stringify(values) !== JSON.stringify(initialValues);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    isDirty,
    setValue,
    setFieldTouched,
    validate,
    handleSubmit,
    reset,
  };
}