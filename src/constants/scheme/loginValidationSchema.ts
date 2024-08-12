import { object } from 'yup';
import { emailValidationSchema } from "./emailValidationSchema.ts";

export const loginValidationSchema = object({
	email: emailValidationSchema,
});
