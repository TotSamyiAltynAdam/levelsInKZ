import { Paper, Grid, Box, Typography, ThemeProvider } from "@mui/material";

import LocationOnIcon  from "@mui/icons-material/LocationOn";
import HistoryIcon from '@mui/icons-material/History';
import Theme from '../additional/Theme';


const NewSalaryCard = ({salary}) => {
    return (
        <Grid item xs={2}>
            <ThemeProvider theme={Theme}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px"
                    }}
                >
                    <HistoryIcon sx={{width: 17}}/>
                    <Typography variant="body1" color="text.secondary" marginLeft={0.5}>
                        {salary.time} minutes ago
                    </Typography>
                </Box>
                <Paper elevation={3} sx={{borderRadius: 3, backgroundColor: '#E7E7E7', cursor: 'pointer'}}>
                    <Box paddingX={2} paddingY={1.3}>
                        <Typography variant="body2">
                            {salary.company}
                        </Typography>

                        <Typography variant="blackBold">
                            {salary.price}$
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: "7px"
                            }}
                        >
                            <LocationOnIcon sx={{width: 17}}/>
                            <Typography variant="body2" component="p" marginLeft={0.2}>
                                {salary.location}
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </ThemeProvider>
        </Grid>
    );
}

export default NewSalaryCard;