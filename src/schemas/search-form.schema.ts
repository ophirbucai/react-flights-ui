import { type Dayjs, isDayjs } from "dayjs";
import { z } from "zod";

const baseSchema = z.object({
  origin: z.object({ skyId: z.string(), entityId: z.string() }),
  destination: z.object({ skyId: z.string(), entityId: z.string() }),
  date: z.custom<Dayjs>(isDayjs, "Invalid departure date"),
  passengers: z.object({
    adults: z.number().min(1),
  }),
});

const oneWaySchema = baseSchema.extend({
  tripType: z.literal("one-way"),
  returnDate: z.custom<Dayjs>(isDayjs).optional(),
});

const roundTripSchema = baseSchema.extend({
  tripType: z.literal("round-trip"),
  returnDate: z.custom<Dayjs>(isDayjs),
});

export const searchFormSchema = z
  .discriminatedUnion("tripType", [oneWaySchema, roundTripSchema])
  .refine(
    (data) => data.tripType !== "round-trip" || !data.returnDate.isBefore(data.date),
    "Return date cannot be before departure date",
  )
  .transform((data) => {
    if (data.tripType === "one-way") {
      const { returnDate, ...rest } = data;
      return rest;
    }
    return data;
  });
