
import { z } from "zod";

export const roomFormSchema = z.object({
  roomId: z.string().min(3, "Room ID must be at least 3 characters").max(20),
  passcode: z.string().min(4, "Passcode must be at least 4 characters"),
});


export type roomFormValues = z.infer<typeof roomFormSchema>;