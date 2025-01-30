import axios from "axios";
import { z } from "zod";
import type { AirportResponse, AirportResult, FlightResponse } from "../types";

const clientV1 = axios.create({
  baseURL: "https://sky-scrapper.p.rapidapi.com/api/v1",
  headers: {
    "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
    "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
  },
});

const CABIN_CLASSES = ["economy", "premium_economy", "business", "first"] as const;
type CabinClass = (typeof CABIN_CLASSES)[number];

const formatDate = (date?: Date) => date?.toISOString().slice(0, 10);

const searchFlightsParamsSchema = z.object({
  originSkyId: z.string(),
  destinationSkyId: z.string(),
  originEntityId: z.preprocess(Number, z.number().int()),
  destinationEntityId: z.preprocess(Number, z.number().int()),
  date: z.coerce.date().transform(formatDate),
  returnDate: z.coerce.date().optional().transform(formatDate),
  cabinClass: z.enum(CABIN_CLASSES).default("economy"),
  adults: z.number().int().min(1).default(1),
  children: z.number().int().optional(),
  infants: z.number().int().optional(),
});

interface SearchFlightOptions {
  origin: AirportResult;
  destination: AirportResult;
  date: string;
  returnDate?: string;
  cabinClass?: CabinClass;
  adults?: number;
  children?: number;
  infants?: number;
}

export async function searchFlights({ origin, destination, ...options }: SearchFlightOptions) {
  const params = searchFlightsParamsSchema.parse({
    ...options,
    originSkyId: origin.skyId,
    originEntityId: origin.entityId,
    destinationSkyId: destination.skyId,
    destinationEntityId: destination.entityId,
  });

  const { data } = await clientV1.get<FlightResponse>("/flights/search", { params });

  return data.data;
}

export async function searchAirport(query: string) {
  const params = { query };
  const { data } = await clientV1.get<AirportResponse>("/flights/searchAirport", { params });

  return data.data;
}
