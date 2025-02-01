import { Box, Grid2, Paper, Typography } from "@mui/material";
import type { FlightResult } from "../types";

export const FlightResultsEmpty = ({ result }: { result: FlightResult }) => {
  return (
    <Paper sx={{ borderRadius: "0.75rem" }} elevation={5}>
      <Grid2 container>
        <Grid2 size={12} sx={{ p: 2 }}>
          <Typography variant="h6" color="error.light" fontSize="1rem" textAlign="center">
            No flights found. Please adjust your search criteria and try again.
          </Typography>
        </Grid2>
        <Grid2 size={12}>
          <Box
            component="img"
            src={result.destinationImageUrl}
            alt="No flights found"
            width="100%"
            sx={{
              borderRadius: "0.75rem",
              objectFit: "cover",
              objectPosition: "top",
              maxHeight: "300px",
            }}
          />
        </Grid2>
      </Grid2>
    </Paper>
  );
};
