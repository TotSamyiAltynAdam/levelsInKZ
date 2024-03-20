import { Paper, Grid, Box, Typography } from "@mui/material";
import companyIcon from './../resources/icons/brand-twitter.svg';

const BtnLinkToCompany = ({name}) => {
    return (
        <Grid item xs="auto">
            <Paper 
                elevation={0} 
                sx={{
                    border: '1px solid #8E8E93',
                    borderRadius: 5,
                    cursor: 'pointer'
                }}
            >
                <Box 
                    sx = {{
                        padding: '4px 8px',
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}
                >
                    <img src={companyIcon} alt="companyIcon" />
                    <Typography variant="body2" sx={{marginLeft: '2px'}}>
                        {name}
                    </Typography>
                </Box>
            </Paper>
        </Grid>
    );
}

export default BtnLinkToCompany;