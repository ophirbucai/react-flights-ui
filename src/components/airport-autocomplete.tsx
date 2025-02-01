import { Autocomplete, TextField } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { getNearbyAirports, searchAirport } from "../services/sky-scrapper.service";
import type { AirportResult } from "../types";

type Props = {
  value: AirportResult | null;
  icon?: React.ReactNode;
  label: string;
  onChange: (newValue: AirportResult) => void;
  showNearbyAirports?: boolean;
};

export const AirportAutocomplete = (props: Props) => {
  const { value, icon, label, onChange, showNearbyAirports } = props;
  const timeoutRef = useRef<number | null>(null);
  const initialRender = useRef(true);
  const [options, setOptions] = useState<AirportResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

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
    setLoading(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        const input = e.target as HTMLInputElement;
        const airports = await searchAirport(input.value);
        setOptions(airports);
        timeoutRef.current = null;
      } catch (e) {
        console.error(e);
        // Handle errors gracefully
      } finally {
        setLoading(false);
      }
    }, 300);
  }, []);

  function handleShouldOpen(e: React.SyntheticEvent) {
    const hasSearchValue = (e.target as HTMLInputElement).value.trim().length > 0;
    setIsOpen(hasSearchValue);
  }

  return (
    <Autocomplete<AirportResult>
      value={value}
      onChange={(_e, newValue) => {
        newValue && onChange(newValue);
        setIsOpen(false);
      }}
      onFocus={handleShouldOpen}
      onBlur={() => setIsOpen(false)}
      options={options}
      getOptionLabel={(option) => (option ? option.presentation.suggestionTitle : "")}
      open={!loading && isOpen}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          fullWidth
          onChange={(e) => {
            handleInput(e);
            handleShouldOpen(e);
          }}
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment: icon,
              endAdornment: null,
            },
          }}
        />
      )}
    />
  );
};
