import { z } from "zod";
export declare const roomFormSchema: z.ZodObject<{
    roomId: z.ZodString;
    passcode: z.ZodString;
}, z.core.$strip>;
export type roomFormValues = z.infer<typeof roomFormSchema>;
//# sourceMappingURL=room-form-schema.d.ts.map