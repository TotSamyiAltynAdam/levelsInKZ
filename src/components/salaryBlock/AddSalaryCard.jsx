import { Paper, Grid, Box, Typography, ThemeProvider } from "@mui/material";

import HistoryIcon from "@mui/icons-material/History";
import Theme from "../additional/Theme";
import { NavLink } from "react-router-dom";

const AddSalaryCard = () => {
  return (
    <Grid item xs={2}>
      <ThemeProvider theme={Theme}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <HistoryIcon sx={{ width: 17 }} />
          <Typography variant="body1" color="text.secondary" marginLeft={0.5}>
            Now
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            border: "2px dashed #2F599C",
            cursor: "pointer",
          }}
        >
          <NavLink to={"/addsalary"} style={{ textDecoration: "none" }}>
            <Box
              sx={{
                height: "90px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "#2F599C", fontWeight: "bold" }}
              >
                + Add your salary
              </Typography>
            </Box>
          </NavLink>
        </Paper>
      </ThemeProvider>
    </Grid>
  );
};

export default AddSalaryCard;
