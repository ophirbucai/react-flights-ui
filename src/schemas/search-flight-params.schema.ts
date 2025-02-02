import { z } from "zod";
import { CabinClass } from "../types";

const formatDate = (date?: Date | null) => date?.toISOString().slice(0, 10);

export const searchFlightsParamsSchema = z.object({
  originSkyId: z.string(),
  destinationSkyId: z.string(),
  originEntityId: z.preprocess(Number, z.number().int()),
  destinationEntityId: z.preprocess(Number, z.number().int()),
  date: z.coerce.date().transform(formatDate),
  returnDate: z.coerce.date().nullish().transform(formatDate),
  cabinClass: z.nativeEnum(CabinClass).default(CabinClass.Economy),
  adults: z.number().int().min(1).default(1),
  children: z.number().int().optional(),
  infants: z.number().int().optional(),
});
