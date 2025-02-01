import { Button, CircularProgress, Container, Grid2 } from "@mui/material";
import dayjs from "dayjs";
import { useRef } from "react";
import { useSearchForm } from "../hooks/useSearchForm";
import { AirportsPicker } from "./airports-picker";
import { FlightDatePicker } from "./flight-date-picker";
import { FlightResultsEmpty } from "./flight-results-empty";
import { FlightResultsTable } from "./flight-results-table";
import PassengerCountPicker from "./passengers-count-picker";
import { TripTypePicker } from "./trip-type-picker";

export const FlightSearchForm = () => {
  const today = useRef(dayjs());

  const {
    loading,
    result,
    tripType,
    searchData,
    isFormValid,
    setTripType,
    handleSearch,
    handleSwapLocations,
    handleSearchDataChange,
  } = useSearchForm();

  const showResults = !!result;

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

        {tripType === "round-trip" && (
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
          {result.context.totalResults > 0 ? (
            <FlightResultsTable result={result} />
          ) : (
            <FlightResultsEmpty result={result} />
          )}
        </Grid2>
      )}
    </Container>
  );
};
