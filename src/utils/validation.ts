import * as yup from "yup"

export const numberWithCustomValidation = (
  min: number,
  max: number,
  requiredMessage: string,
  minMessage: string,
  maxMessage: string
) =>
  yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(min, minMessage)
    .max(max, maxMessage)
    .required(requiredMessage)
