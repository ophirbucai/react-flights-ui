import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { MdAdd, MdArrowDropDown, MdPerson, MdRemove } from "react-icons/md";
import type { SearchFlightOptions } from "../types";

type Props = {
  setPassengers: React.Dispatch<React.SetStateAction<SearchFlightOptions["passengers"]>>;
  passengers: SearchFlightOptions["passengers"];
};

const PassengerCountPicker = ({ setPassengers, passengers }: Props) => {
  const originalValue = useRef<typeof passengers | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    originalValue.current = passengers;
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.dataset.cancel && originalValue.current) {
      setPassengers(originalValue.current);
    }
    setAnchorEl(null);
    originalValue.current = null;
  };

  const handleIncrement = (type: keyof typeof passengers) => {
    setPassengers((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  const handleDecrement = (type: keyof typeof passengers) => {
    if (passengers[type] > (type === "adults" ? 1 : 0)) {
      setPassengers((prev) => ({
        ...prev,
        [type]: prev[type] - 1,
      }));
    }
  };

  const open = Boolean(anchorEl);

  const totalPassengers = Object.values(passengers).reduce((a, b) => a + b, 0);

  return (
    <>
      <TextField
        onClick={handleClick}
        type="button"
        variant="filled"
        focused={open}
        value={totalPassengers}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <MdPerson size={20} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                position="start"
                sx={{ transform: open ? "rotate(180deg)" : undefined }}
              >
                <MdArrowDropDown size={24} />
              </InputAdornment>
            ),
          },
        }}
      />

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        slotProps={{
          paper: {
            sx: {
              width: 300,
              padding: 2,
            },
          },
        }}
      >
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Typography variant="subtitle1">Adults</Typography>
            <Typography variant="caption" color="text.secondary">
              Age 13+
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton
              size="small"
              onClick={() => handleDecrement("adults")}
              disabled={passengers.adults <= 1}
              sx={{
                bgcolor: "action.hover",
                "&:hover": { bgcolor: "action.selected" },
              }}
            >
              <MdRemove size={20} />
            </IconButton>
            <Typography minWidth={24} textAlign="center">
              {passengers.adults}
            </Typography>
            <IconButton
              size="small"
              onClick={() => handleIncrement("adults")}
              sx={{
                bgcolor: "action.hover",
                "&:hover": { bgcolor: "action.selected" },
              }}
            >
              <MdAdd size={20} />
            </IconButton>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 1,
            mt: 3,
            borderTop: "1px solid",
            borderColor: "divider",
            pt: 2,
          }}
        >
          <Button onClick={handleClose} data-cancel color="inherit">
            Cancel
          </Button>
          <Button onClick={handleClose} variant="text">
            Done
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default PassengerCountPicker;
