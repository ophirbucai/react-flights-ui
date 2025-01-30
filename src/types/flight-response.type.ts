import type { Itinerary } from "./itinerary.type";

export type FlightResponse = {
  status: boolean;
  timestamp: number;
  sessionId: string;
  data: {
    context: {
      status: "incomplete" | string;
      sessionId: string;
      totalResults: number;
    };
    itineraries: Itinerary[];
    messages: unknown[];
    filterStats: {
      duration: {
        min: number;
        max: number;
        multiCityMin: number;
        multiCityMax: number;
      };
      airports: {
        city: string;
        airports: {
          id: string;
          entityId: string;
          name: string;
        }[];
      }[];
      carriers: [
        {
          id: -32480;
          alternateId: "BA";
          logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/BA.png";
          name: "British Airways";
        },
        {
          id: -30789;
          alternateId: "PA";
          logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/PA.png";
          name: "Fly Play";
        },
      ];
      stopPrices: {
        direct: { isPresent: boolean; formattedPrice: string };
        one: { isPresent: boolean; formattedPrice: string };
        twoOrMore: { isPresent: boolean };
      };
    };
    flightsSessionId: string;
    destinationImageUrl: string;
  };
};
