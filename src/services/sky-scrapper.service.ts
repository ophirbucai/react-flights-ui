import axios from "axios";
import { z } from "zod";
import type {
  AirportResponse,
  AirportResult,
  FlightResponse,
  NearbyAirportsResponse,
  NearbyAirportsResult,
} from "../types";
import type { APIResponse } from "../types/api-response.type";

const clientV1 = axios.create({
  baseURL: "https://sky-scrapper.p.rapidapi.com/api/v1/flights",
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

  const { data } = await clientV1.get<FlightResponse>("/search", { params });

  return data.data;
}

export async function searchAirport(query: string) {
  if (!query.trim()) return [];
  const params = { query };
  const cache = new APIResponseCache<AirportResponse>(query);
  const getter = () => clientV1.get<AirportResponse>("/searchAirport", { params });

  const { data } = cache.response || (await getter());
  cache.store(data);
  return data.data;
}

export async function getNearbyAirports({
  latitude,
  longitude,
}: GeolocationCoordinates): Promise<NearbyAirportsResult> {
  const params = { lng: longitude, lat: latitude };
  const cacheKey = [longitude.toFixed(2), latitude.toFixed(2)].join(","); // ~1km proximity
  const cache = new APIResponseCache<NearbyAirportsResponse>(cacheKey);

  const getter = () => clientV1.get<NearbyAirportsResponse>("/getNearByAirports", { params });
  const { data } = cache.response || (await getter());
  cache.store(data);
  return data.data;
}

class APIResponseCache<T extends APIResponse<unknown>> {
  constructor(private readonly cacheKey: string) {}
  get response() {
    const cachedData = window.localStorage.getItem(this.cacheKey);

    if (!cachedData) return null;

    return { data: JSON.parse(cachedData) as T };
  }

  store(data: T) {
    window.localStorage.setItem(this.cacheKey, JSON.stringify(data));
  }
}
