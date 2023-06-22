import type { FieldValues, UseFormProps } from "react-hook-form";
import { useForm as useHookForm } from "react-hook-form";

export const useForm = <
  TFieldValues extends FieldValues,
  TContext extends object = object
>(
  customOptions: Omit<
    UseFormProps<TFieldValues, TContext>,
    "mode" | "reValidateMode"
  > = {}
) => {
  const options: UseFormProps<TFieldValues, TContext> = {
    mode: "onTouched",
    criteriaMode: "firstError",
    shouldFocusError: true,
    ...customOptions,
  };

  return useHookForm<TFieldValues, TContext>(options);
};
