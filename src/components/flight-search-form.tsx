import { Button, CircularProgress, Container, Grid2, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import type { SearchData, TripType } from "../types";
import { AirportsPicker } from "./airports-picker";
import PassengerCountPicker from "./passengers-count-picker";
import { TripTypePicker } from "./trip-type-picker";

export const FlightSearchForm = () => {
  const [tripType, setTripType] = useState<TripType>("roundtrip");
  const [searchData, setSearchData] = useState<SearchData>({
    origin: null,
    destination: null,
    departDate: null,
    returnDate: null,
    passengers: {
      adults: 1,
      children: 0,
      infants: 0,
    },
  });
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setShowResults(true);
    }, 1500);
  };

  const handleBackToSearch = () => {
    setShowResults(false);
  };

  if (showResults) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Button variant="outlined" onClick={handleBackToSearch} sx={{ mb: 2 }}>
          Back to Search
        </Button>
        {/* Results table would go here */}
        <Typography variant="h6">Flight Results</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Grid2 container spacing={3}>
        <Grid2 size={12} display="flex" gap={2}>
          <TripTypePicker tripType={tripType} setTripType={setTripType} />
          <PassengerCountPicker
            passengers={searchData.passengers}
            setPassengers={(value) =>
              setSearchData((prev) => ({
                ...prev,
                passengers: typeof value === "function" ? value(prev.passengers) : value,
              }))
            }
          />
        </Grid2>
        <Grid2 size={12}>
          <AirportsPicker searchData={searchData} setSearchData={setSearchData} />
        </Grid2>
        <Grid2 size={tripType === "one-way" ? 12 : 6}>
          <DatePicker
            label="Departure Date"
            value={searchData.departDate}
            onChange={(newValue) => {
              setSearchData((prev) => ({ ...prev, departDate: newValue }));
            }}
            slotProps={{
              textField: {
                fullWidth: true,
              },
            }}
          />
        </Grid2>

        {tripType === "roundtrip" && (
          <Grid2 size={6}>
            <DatePicker
              label="Return Date"
              value={searchData.returnDate}
              onChange={(newValue) => {
                setSearchData((prev) => ({ ...prev, returnDate: newValue }));
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                },
              }}
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
            disabled={
              loading || !searchData.origin || !searchData.destination || !searchData.departDate
            }
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Search Flights"}
          </Button>
        </Grid2>
      </Grid2>
    </Container>
  );
};
