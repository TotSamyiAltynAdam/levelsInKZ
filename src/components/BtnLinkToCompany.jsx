import { Paper, Grid, Box, Typography } from "@mui/material";
import { useState, useEffect } from 'react';

import companyIcon from './../resources/icons/brand-twitter.svg';

const BtnLinkToCompany = ({company, onClick, chosenSpecialization}) => {
    const [selected, setSelected] = useState(false);

    useEffect(()=>{
        setSelected(false);
    }, [chosenSpecialization]);

    const handleClick = () => {
        setSelected(!selected);
        onClick(company);
    };

    return (
        <Grid item xs="auto">
            <Paper 
                elevation={0} 
                sx={{
                    border: '1px solid #8E8E93',
                    borderRadius: 5,
                    cursor: 'pointer',
                    backgroundColor: selected ? '#2F599C' : 'transparent',
                    color: selected ? 'white' : 'inherit'
                }}
                onClick={handleClick}
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
                        {company.companyName}
                    </Typography>
                </Box>
            </Paper>
        </Grid>
    );
}

export default BtnLinkToCompany;