import { Autocomplete, Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { MdOutlineLocationOn, MdSwapHoriz, MdTripOrigin } from "react-icons/md";
import { getNearbyAirports } from "../services/sky-scrapper.service";
import type { AirportResult, SearchData } from "../types";

type Props = {
  searchData: SearchData;
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
  onChange: (newValue: AirportResult | null) => void;
  showNearbyAirports?: boolean;
}) {
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

  async function handleInput(e: React.SyntheticEvent) {
    const input = e.target as HTMLInputElement;
    console.log(input.value);
  }

  return (
    <Autocomplete<AirportResult>
      value={value}
      onChange={(_e, newValue) => onChange(newValue)}
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
