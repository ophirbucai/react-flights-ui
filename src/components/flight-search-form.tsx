import { Button, CircularProgress, Container, Grid2 } from "@mui/material";
import dayjs from "dayjs";
import { useCallback, useRef, useState } from "react";
import { searchFlights } from "../services/sky-scrapper.service";
import { CabinClass, type FlightResult, type SearchFlightOptions, type TripType } from "../types";
import { AirportsPicker } from "./airports-picker";
import { FlightDatePicker } from "./flight-date-picker";
import PassengerCountPicker from "./passengers-count-picker";
import { TripTypePicker } from "./trip-type-picker";

export const FlightSearchForm = () => {
  const today = useRef(dayjs());
  const [tripType, setTripType] = useState<TripType>("roundtrip");
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
  const [results, setResults] = useState<FlightResult[] | null>(null);

  const isFormValid =
    !searchData.origin ||
    !searchData.destination ||
    !searchData.date ||
    (tripType === "roundtrip" && !searchData.returnDate?.isAfter(searchData.date)) ||
    !searchData.passengers ||
    searchData.passengers.adults < 1;

  async function handleSearch() {
    try {
      if (isFormValid) return; // Todo: Descriptive error / focus on relevant input

      setLoading(true);
      const results = await searchFlights(searchData);
      console.log(results);
      setResults(results);
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

  const showResults = !!results;

  return (
    <Container maxWidth="md">
      <Grid2 container spacing={3}>
        <Grid2 size={12} display="flex" gap={2}>
          <TripTypePicker tripType={tripType} setTripType={setTripType} />
          <PassengerCountPicker
            passengers={searchData.passengers}
            setPassengers={handleSearchDataChange("passengers")}
          />
        </Grid2>
        <Grid2 size={12}>
          <AirportsPicker
            searchData={searchData}
            handleSwapLocations={handleSwapLocations}
            handleSearchDataChange={handleSearchDataChange}
          />
        </Grid2>
        <Grid2 size={tripType === "one-way" ? 12 : 6}>
          <FlightDatePicker
            label="Departure Date"
            onSelectDate={handleSearchDataChange("date")}
            value={searchData.date}
            minDate={today.current}
            showDaysOutsideCurrentMonth
          />
        </Grid2>

        {tripType === "roundtrip" && (
          <Grid2 size={6}>
            <FlightDatePicker
              label="Return Date"
              value={searchData.returnDate}
              onSelectDate={handleSearchDataChange("returnDate")}
              minDate={searchData.date || today.current}
              disableHighlightToday
            />
          </Grid2>
        )}

        <Grid2 size={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={handleSearch}
            disabled={!isFormValid}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Search Flights"}
          </Button>
        </Grid2>
      </Grid2>
      {showResults && (
        <Grid2 container sx={{ mt: 4 }}>
          {/* Results table would go here */}
        </Grid2>
      )}
    </Container>
  );
};
