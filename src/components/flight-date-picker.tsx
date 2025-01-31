import { DatePicker, type DatePickerProps } from "@mui/x-date-pickers";
import type { Dayjs } from "dayjs";

interface Props extends DatePickerProps<Dayjs> {
  label: string;
  value: Dayjs | null;
  onSelectDate: (value: Dayjs | null) => void;
}

export const FlightDatePicker = ({ label, value, onSelectDate, ...props }: Props) => {
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
      {...props}
    />
  );
};
