import { useState, useEffect } from 'react';
import { Grid, Typography, Button } from '@mui/material';

import NewSalaryCard from '../../components/salaryBlock/NewSalaryCard'; 
import AddSalaryCard from '../../components/salaryBlock/AddSalaryCard';
import BtnLinkToCompany from '../../components/BtnLinkToCompany';
import BarChartBlock from '../../components/barChartsBlock/BarChartBlock';
import './home.scss';

import {getFiveSpecializations, getSalariesBySpecialization, getCompaniesBySpecialization} from '../../api/api';
import { useAuthContext } from '../../context/AuthContextProvider';


const Home = () => {
    const {token} = useAuthContext();
    const [companies, setCompanies] = useState([]);
    const [specializations, setSpecializations] = useState([]);
    const [salaries, setSalaries] = useState([]);
    const [chosenSpecialization, setChosenSpecialization] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if(token != null) {
            // updateCompanyList();
            updateSpecializationList();
        }
    }, []);

    useEffect(() => {
       if(chosenSpecialization){
           updateSalaryList();
       }
    },[chosenSpecialization]);

    useEffect(() => {
        if(chosenSpecialization){
            updateCompanyList();
        }
    },[chosenSpecialization]);

    useEffect(() => {
        if (specializations.length > 0) {
            setChosenSpecialization(specializations[0]);
        }
    }, [specializations]);

    const updateSpecializationList = async () => {
        try {
            onSpecializationLoading();
            const response = await getFiveSpecializations(token);
            onSpecializationLoaded(response);
        } catch (error) {
            console.log(error)
            onError(error);
        }
    };
    const updateSalaryList = async () => {
        try {
            setLoading(true);
            const response = await getSalariesBySpecialization(token, chosenSpecialization.name);
            setSalaries(response);

            setLoading(false);
        } catch (error){
            console.log(error);
            onError(error);
        }
    }

    const updateCompanyList = async () => {
        try {
            setLoading(true);
            const response = await getCompaniesBySpecialization(token, chosenSpecialization.name);
            setCompanies(response);

            setLoading(false);
        } catch (error){
            console.log(error);
            onError(error);
        }
    }

    const onSpecializationLoaded = (newSpecializations) => {
        setSpecializations(newSpecializations);
        setLoading(false);
    }

    const onSpecializationLoading = () => {
        setLoading(true);
    };

    const onError = () => {
        setLoading(false);
        setError(true);
    };

    const handleSpecializationSelect = (specialization) => {
        setChosenSpecialization(specialization);
    };

    return (
        <>
            <Grid container spacing={2} sx={{marginTop: '40px'}}>
                {specializations.map((specialization, index) => (
                    <Grid item xs={2} md={2} key={index}>
                        <Button
                            onClick={() => handleSpecializationSelect(specialization)}
                        >
                            <Typography
                                sx={{
                                    fontWeight: '600',
                                    color: chosenSpecialization === specialization ? '#2F599C' : '#8E8E93',
                                    textDecoration: chosenSpecialization === specialization ? 'underline' : 'none'
                                }}
                            >
                                {specialization.name}
                            </Typography>
                        </Button>
                    </Grid>
                ))}
            </Grid>

            <div className="salaries_related_to_specialization">
                <Typography
                    sx={{
                        marginTop: '30px',
                        marginBottom: '10px'
                    }}
                    variant="body1"
                    color="text.secondary"
                >
                    {chosenSpecialization ? chosenSpecialization.name : "No specialization selected"} Salaries
                </Typography>

                <Grid container spacing={2}>
                    <AddSalaryCard/>
                    {salaries.map((salary) => (
                        <NewSalaryCard salary={salary} key={salary._id}/>
                    ))}
                </Grid>
            </div>

            <div className="companies_related_to_specialization">
                <Typography
                    sx={{
                        marginTop: '50px',
                        marginBottom: '20px'
                    }}
                    variant="body1"
                    color="text.secondary"
                >
                    {chosenSpecialization ? chosenSpecialization.name : "No specialization selected"} Levels
                </Typography>
                <Grid container spacing={2}>
                    {companies.map((company, index) => (
                        <BtnLinkToCompany key={index} name={company.companyName}/>
                    ))}
                </Grid>
            </div>

            <div className="barChartBlock">
                <BarChartBlock/>
            </div>
        </>
    )
}

export default Home;