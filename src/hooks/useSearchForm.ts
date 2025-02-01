import { useCallback, useMemo, useState } from "react";
import { searchFormSchema } from "../schemas/search-form.schema";
import { searchFlights } from "../services/sky-scrapper.service";
import type { FlightResult, SearchFlightOptions, TripType } from "../types";
import { CabinClass } from "../types";

export const useSearchForm = () => {
  const [tripType, setTripType] = useState<TripType>("round-trip");
  const [searchData, setSearchData] = useState<SearchFlightOptions>({
    origin: null,
    destination: null,
    date: null,
    returnDate: null,
    cabinClass: CabinClass.Economy,
    passengers: {
      adults: 1,
      children: 0,
      infants: 0,
    },
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FlightResult | null>(null);

  const { success: isFormValid } = useMemo(
    () => searchFormSchema.safeParse({ ...searchData, tripType }),
    [searchData, tripType],
  );

  async function handleSearch() {
    try {
      if (!isFormValid) return; // Todo: Descriptive error / focus on relevant input

      setLoading(true);
      const result = await searchFlights(searchData);
      setResult(result);
    } catch (e) {
      console.error(e);
      // Todo: Handle errors gracefully
    } finally {
      setLoading(false);
    }
  }

  const handleSwapLocations = useCallback(() => {
    setSearchData((prev) => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin,
    }));
  }, []);

  const handleSearchDataChange = useCallback(
    <K extends keyof SearchFlightOptions>(
      key: K,
    ): React.Dispatch<React.SetStateAction<(typeof searchData)[K]>> =>
      (dispatch) =>
        setSearchData((prev) => ({
          ...prev,
          [key]: typeof dispatch !== "function" ? dispatch : dispatch(prev[key]),
        })),
    [],
  );

  return {
    loading,
    result,
    tripType,
    searchData,
    isFormValid,
    setTripType,
    handleSearch,
    handleSwapLocations,
    handleSearchDataChange,
  };
};
