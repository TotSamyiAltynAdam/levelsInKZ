import { Grid, Typography } from '@mui/material';

import NewSalaryCard from '../../components/NewSalaryCard'; 
import AddSalaryCard from '../../components/AddSalaryCard';
import BtnLinkToCompany from '../../components/BtnLinkToCompany';

import fields_and_salaries from '../../api/salariesByField.json';
import fields_and_companies from '../../api/companiesByField.json';

const Home = () => {
  return (
    <>
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
              <BtnLinkToCompany key={company.id} company={company}/>
            ))}
          </Grid>
        </div>
      ))}

    </>
  )
}

export default Home;