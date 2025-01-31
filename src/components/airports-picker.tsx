import {
  Autocomplete,
  type AutocompleteProps,
  Box,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useCallback } from "react";
import { MdOutlineLocationOn, MdSwapHoriz, MdTripOrigin } from "react-icons/md";
import type { Airport, SearchData } from "../types";

type Props = {
  searchData: SearchData;
  setSearchData: React.Dispatch<React.SetStateAction<SearchData>>;
};
export const AirportsPicker = ({ searchData, setSearchData }: Props) => {
  const handleSwapLocations = () => {
    setSearchData((prev) => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin,
    }));
  };

  const onAirportSelect = useCallback(
    (_e: React.SyntheticEvent, newValue: Airport | null) => {
      setSearchData((prev) => ({ ...prev, origin: newValue }));
    },
    [setSearchData],
  );

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
            onChange={onAirportSelect}
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
            onChange={onAirportSelect}
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
}: {
  value: Airport | null;
  icon?: React.ReactNode;
  label: string;
  onChange: AutocompleteProps<Airport, false, false, false>["onChange"];
}) {
  return (
    <Autocomplete<Airport>
      value={value}
      onChange={onChange}
      options={[]} // Todo: Inject airports
      getOptionLabel={(option) => (option ? `${option.city} (${option.displayCode})` : "")}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          fullWidth
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
