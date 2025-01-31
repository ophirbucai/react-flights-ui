import { Autocomplete, type AutocompleteProps, Box, IconButton, TextField } from "@mui/material";
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
            icon={<MdTripOrigin color="#9aa0a6" size={16} style={{ marginInline: 6 }} />}
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
            icon={<MdOutlineLocationOn color="#9aa0a6" size={28} />}
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
