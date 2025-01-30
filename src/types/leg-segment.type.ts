import type { Carrier } from "./carrier.type";

export type LegSegment = {
  id: string;
  origin: LegSegmentPoint;
  destination: LegSegmentPoint;
  departure: string;
  arrival: string;
  durationInMinutes: number;
  flightNumber: string;
  marketingCarrier: Omit<Carrier, "logoUrl">;
  operatingCarrier: Omit<Carrier, "logoUrl">;
};

export type LegSegmentPoint = {
  flightPlaceId: string;
  displayCode: string;
  name: string;
  type: string;
  country?: string;
  parent?: LegSegmentPoint;
};
