import { type Dayjs, isDayjs } from "dayjs";
import { z } from "zod";

export const searchFormSchema = z
  .object({
    origin: z.object({ skyId: z.string(), entityId: z.string() }),
    destination: z.object({ skyId: z.string(), entityId: z.string() }),
    date: z.custom<Dayjs>(isDayjs, "Invalid departure date"),
    returnDate: z.custom<Dayjs>(isDayjs, "Invalid return date").optional(),
    passengers: z.object({
      adults: z.number().min(1),
    }),
  })
  .refine(
    (data) => !data.returnDate || !data.returnDate.isBefore(data.date),
    "Return date cannot be before departure date",
  );
