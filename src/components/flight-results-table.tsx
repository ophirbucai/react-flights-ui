import {
  Badge,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { MdFlightLand, MdFlightTakeoff } from "react-icons/md";
import type { FlightResult } from "../types";
import { formatFlightTags } from "../utils/format-flight-tags";

export const FlightResultsTable = ({ result }: { result: FlightResult }) => {
  return (
    <TableContainer component={Paper} elevation={3}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Flight</TableCell>
            <TableCell align="center">Departure</TableCell>
            <TableCell align="center">Arrival</TableCell>
            <TableCell align="center">Duration</TableCell>
            <TableCell align="center">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {result.itineraries.map((flight) => {
            const firstLeg = flight.legs[0];
            const carrier = firstLeg.carriers.marketing[0];
            return (
              <TableRow key={flight.id}>
                <TableCell sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    component="img"
                    src={carrier.logoUrl}
                    alt={carrier.name}
                    sx={{ borderRadius: "50%", maxWidth: 24 }}
                  />
                  <Typography variant="body2">{carrier.name}</Typography>
                  {flight.tags && flight.tags?.length > 0 && (
                    <Tooltip title={formatFlightTags(flight.tags)} sx={{ textTransform: "" }}>
                      <Badge variant="dot" color="primary" />
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell align="center">
                  <Box display="flex" alignItems="center" gap={1} justifyContent="center">
                    <MdFlightTakeoff size={18} color="gray" />
                    {dayjs(firstLeg.departure).format("MMM DD, h:mm A")}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box display="flex" alignItems="center" gap={1} justifyContent="center">
                    <MdFlightLand size={18} color="gray" />
                    {dayjs(firstLeg.arrival).format("MMM DD, h:mm A")}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  {Math.floor(firstLeg.durationInMinutes / 60)}h {firstLeg.durationInMinutes % 60}m
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body1" fontWeight="bold">
                    {flight.price.formatted}
                  </Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
