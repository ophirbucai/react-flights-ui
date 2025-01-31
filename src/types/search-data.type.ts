import type { Dayjs } from "dayjs";
import type { AirportResult } from "./airport-response.type";

export type SearchData = {
  origin: AirportResult | null;
  destination: AirportResult | null;
  departDate: Dayjs | null;
  returnDate: Dayjs | null;
  passengers: Record<"adults" | "children" | "infants", number>;
};
