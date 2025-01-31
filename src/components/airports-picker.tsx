import { Autocomplete, Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdOutlineLocationOn, MdSwapHoriz, MdTripOrigin } from "react-icons/md";
import { getNearbyAirports, searchAirport } from "../services/sky-scrapper.service";
import type { AirportResult, SearchFlightOptions } from "../types";

type Props = {
  searchData: SearchFlightOptions;
  handleSwapLocations: () => void;
  handleSearchDataChange: (
    key: "destination" | "origin",
  ) => React.Dispatch<React.SetStateAction<AirportResult | null>>;
};
export const AirportsPicker = ({
  searchData,
  handleSwapLocations,
  handleSearchDataChange,
}: Props) => {
  return (
    <>
      <Box display="flex" alignItems="center" gap={1}>
        <Box flex={1}>
          <AirportAutocomplete
            value={searchData.origin}
            icon={
              <InputAdornment position="start" sx={{ marginInlineStart: 0.5 }}>
                <MdTripOrigin size={16} />
              </InputAdornment>
            }
            label="From"
            onChange={handleSearchDataChange("origin")}
            showNearbyAirports
          />
        </Box>

        <Box>
          <IconButton
            onClick={handleSwapLocations}
            sx={{
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <MdSwapHoriz />
          </IconButton>
        </Box>

        <Box flex={1}>
          <AirportAutocomplete
            value={searchData.destination}
            icon={
              <InputAdornment position="start">
                <MdOutlineLocationOn size={28} />
              </InputAdornment>
            }
            label="To"
            onChange={handleSearchDataChange("destination")}
          />
        </Box>
      </Box>
    </>
  );
};

function AirportAutocomplete({
  value,
  icon,
  label,
  onChange,
  showNearbyAirports,
}: {
  value: AirportResult | null;
  icon?: React.ReactNode;
  label: string;
  onChange: (newValue: AirportResult) => void;
  showNearbyAirports?: boolean;
}) {
  const timeoutRef = useRef<number | null>(null);
  const initialRender = useRef(true);
  const [options, setOptions] = useState<AirportResult[]>([]);

  useEffect(() => {
    if (!showNearbyAirports) return;

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { current, nearby } = await getNearbyAirports(position.coords);
      if (initialRender.current) {
        onChange(current);
        initialRender.current = false;
      }
      setOptions(nearby);
    });
  }, [onChange, showNearbyAirports]);

  const handleInput = useCallback((e: React.SyntheticEvent) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      const input = e.target as HTMLInputElement;
      const airports = await searchAirport(input.value);
      setOptions(airports);
      timeoutRef.current = null;
    }, 300);
  }, []);

  return (
    <Autocomplete<AirportResult>
      value={value}
      onChange={(_e, newValue) => newValue && onChange(newValue)}
      options={options} // Todo: Inject airports
      getOptionLabel={(option) => (option ? option.presentation.suggestionTitle : "")}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          fullWidth
          onChange={handleInput}
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment: icon,
            },
          }}
        />
      )}
    />
  );
}
