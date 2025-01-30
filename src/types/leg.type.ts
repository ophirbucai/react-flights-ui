import type { Airport } from "./airport.type";
import type { Carrier } from "./carrier.type";
import type { LegSegment } from "./leg-segment.type";

export type Leg = {
  id: string;
  origin: Airport;
  destination: Airport;
  durationInMinutes: number;
  stopCount: number;
  isSmallestStops: boolean;
  departure: string;
  arrival: string;
  timeDeltaInDays: number;
  carriers: {
    marketing: Carrier[];
    operating?: Carrier[];
    operationType: "not_operated" | string;
  };
  segments: LegSegment[];
};
