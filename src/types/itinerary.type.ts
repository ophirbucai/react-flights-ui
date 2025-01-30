import type { Leg } from "./leg.type";

export type Itinerary = {
  id: string;
  price: { raw: number; formatted: string; pricingOptionId: string };
  legs: Leg[];
  isSelfTransfer: boolean;
  isProtectedSelfTransfer: boolean;
  farePolicy: {
    isChangeAllowed: boolean;
    isPartiallyChangeable: boolean;
    isCancellationAllowed: boolean;
    isPartiallyRefundable: boolean;
  };
  fareAttributes: object;
  tags?: ("third_cheapest" | "second_shortest" | string)[];
  isMashUp: boolean;
  hasFlexibleOptions: boolean;
  score: number;
};
