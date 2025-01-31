import { DatePicker } from "@mui/x-date-pickers";
import type { Dayjs } from "dayjs";

type Props = {
  label: string;
  value: Dayjs | null;
  onSelectDate: (value: Dayjs | null) => void;
};

export const FlightDatePicker = ({ label, value, onSelectDate }: Props) => {
  return (
    <DatePicker
      label={label}
      value={value}
      onChange={onSelectDate}
      slotProps={{
        textField: {
          fullWidth: true,
        },
      }}
    />
  );
};
