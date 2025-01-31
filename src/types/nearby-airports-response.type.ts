import type { AirportResult } from "./airport-response.type";
import type { APIResponse } from "./api-response.type";

export type NearbyAirportsResult = {
  current: AirportResult;
  nearby: AirportResult[];
  recent: object[];
};

export type NearbyAirportsResponse = APIResponse<NearbyAirportsResult>;
