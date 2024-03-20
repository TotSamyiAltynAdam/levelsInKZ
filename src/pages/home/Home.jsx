import { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';

import NewSalaryCard from '../../components/salaryBlock/NewSalaryCard'; 
import AddSalaryCard from '../../components/salaryBlock/AddSalaryCard';
import BtnLinkToCompany from '../../components/BtnLinkToCompany';
import BarChartBlock from '../../components/barChartsBlock/BarChartBlock';
import './home.scss';

import fields_and_salaries from '../../api/salariesByField.json';
import fields_and_companies from '../../api/companiesByField.json';

import {getCompanies, getSpecializations} from '../../api/api';
import { useAuthContext } from '../../context/AuthContextProvider';


const Home = () => {
    const {token} = useAuthContext();
    const [companies, setCompanies] = useState([]);
    const [specializations, setSpecializations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        // updateCompanyList();
        updateSpecializationList();
    }, []);

    // const updateCompanyList = async () => {
    //   try{
    //       onCompanyLoading();
    //       const response = await getCompanies(token);
    //       onContainersLoaded(response);
    //   }catch(error){
    //       console.log(error)
    //       onError(error);
    //   }
    // };
    const updateSpecializationList = async () => {
        try {
            onSpecializationLoading();
            const response = await getSpecializations(token);
            onSpecializationLoaded(response);
        } catch (error) {
            console.log(error)
            onError(error);
        }
    };

    // const onContainersLoaded = (newCompanies) => {
    //     setCompanies(newCompanies);
    //     setLoading(false);
    // }
    const onSpecializationLoaded = (newSpecializations) => {
        setSpecializations(newSpecializations);
        setLoading(false);
    }

    // const onCompanyLoading = () => {
    //     setLoading(true);
    // };
    const onSpecializationLoading = () => {
        setLoading(true);
    };


    const onError = () => {
        setLoading(false);
        setError(true);
    };

    return (
        <>
            <Grid container spacing={2} sx={{marginTop: '40px'}}>
                {specializations.map((specialization, index) => (
                    <Grid item xs={2} md={2} key={index}>
                        <Typography sx={{fontWeight: '600', color: '#8E8E93'}}>
                            {specialization.name}
                        </Typography>
                    </Grid>
                ))}
            </Grid>

            {fields_and_salaries.map((field) => (
                <div key={field.id}>
                    <Typography
                        sx={{
                            marginTop: '30px',
                            marginBottom: '10px'
                        }}
                        variant="body1"
                        color="text.secondary"
                        key={field.id}
                    >
                        {field.name} Salaries
                    </Typography>

                    <Grid container spacing={2}>
                        <AddSalaryCard/>
                        {field.salaries.map((salary) => (
                            <NewSalaryCard salary={salary} key={salary.id}/>
                        ))}
                    </Grid>
                </div>
            ))}

            {fields_and_companies.map((field) => (
                <div key={field.id}>
                    <Typography
                        sx={{
                            marginTop: '50px',
                            marginBottom: '20px'
                        }}
                        variant="body1"
                        color="text.secondary"
                        key={field.id}
                    >
                        {field.name} Salaries
                    </Typography>
                    <Grid container spacing={2}>
                        {field.companies.map((company) => (
                            <BtnLinkToCompany key={company.id} name={company.name}/>
                        ))}
                    </Grid>
                </div>
            ))}

            <div className="barChartBlock">
                <BarChartBlock/>
            </div>
        </>
    )
}

export default Home;