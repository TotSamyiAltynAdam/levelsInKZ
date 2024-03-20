import { Grid, Typography } from '@mui/material';

import NewSalaryCard from '../../components/salaryBlock/NewSalaryCard'; 
import AddSalaryCard from '../../components/salaryBlock/AddSalaryCard';
import BtnLinkToCompany from '../../components/BtnLinkToCompany';
import BarChartBlock from '../../components/barChartsBlock/BarChartBlock';
import './home.scss';

import fields_and_salaries from '../../api/salariesByField.json';
import fields_and_companies from '../../api/companiesByField.json';
import fields from '../../api/fields.json';


const Home = () => {
  return (
    <>
      <Grid container spacing={2} sx={{marginTop: '40px'}}>
        {fields.map((field) => (
          <Grid item xs={2} md={2} key={field.id}>
            <Typography sx={{fontWeight: '600', color: '#8E8E93'}}>
              {field.name}
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
        <BarChartBlock />
      </div>
    </>
  )
}

export default Home;