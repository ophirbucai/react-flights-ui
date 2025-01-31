import { ThemeProvider, createTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiInputAdornment: {
      styleOverrides: {
        root: ({ theme }) => ({
          marginTop: "0 !important",
          color: theme.palette.grey[500],
          cursor: "pointer",
          transition: `transform ${theme.transitions.duration.short}ms ease !important`,
        }),
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiFilledInput-root.MuiFilledInput-underline:not(.Mui-disabled, .Mui-error)": {
            "&:hover, &::before": {
              borderBottomWidth: 0,
            },
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
            ".MuiFilledInput-input": {
              paddingBlock: "12px",
            },
            backgroundColor: "transparent",
            borderRadius: "8px",
            overflow: "hidden",
            cursor: "pointer",
            "& .MuiSvgIcon-root": {
              fill: theme.palette.grey[500],
              transition: `transform ${theme.transitions.duration.short}ms ease`,
            },
          },
        }),
      },
      defaultProps: {
        slotProps: {
          select: {
            onClose() {
              /* Removes focus style when a select component has closed */
              setTimeout(() => (document.activeElement as HTMLElement)?.blur(), 0);
            },
          },
        },
      },
    },
  },
});

export const MuiProvider = ({ children }: { children: React.ReactNode }) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </LocalizationProvider>
);
