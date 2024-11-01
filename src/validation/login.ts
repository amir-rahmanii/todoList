import { z } from "zod";

const FormSchema = z.object({
    idenity: z
        .string()
        .min(3, { message: "Idenity must be at least 3 characters." })
        .max(50, { message: "Idenity must be no more than 50 characters." }),

    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters." })
        .max(30, { message: "Password must be no more than 30 characters." })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
        .regex(/[0-9]/, { message: "Password must contain at least one number." }),
});

export default FormSchema;