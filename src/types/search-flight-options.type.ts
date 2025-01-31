import type { Dayjs } from "dayjs";
import type { AirportResult } from "./airport-response.type";
import type { CabinClass } from "./cabin-class.enum";

export type SearchFlightOptions = {
  origin: AirportResult | null;
  destination: AirportResult | null;
  departDate: Dayjs | null;
  returnDate: Dayjs | null;
  cabinClass: CabinClass;
  passengers: Record<"adults" | "children" | "infants", number>;
};
