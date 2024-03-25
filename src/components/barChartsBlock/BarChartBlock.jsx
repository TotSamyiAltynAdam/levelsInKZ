import { Box } from '@mui/material';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    ArcElement
} from "chart.js";
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    ArcElement
);

const BarChartBlock = ({selectedCompanies}) => {
    const companyNames = selectedCompanies.map((company)=>company.companyName);
    const companyAverage = selectedCompanies.map((company)=>company.averageBase);
    function generateColorsFromValues(values) {
        const colors = [];
        const baseHue = 200;
        const saturation = 80;
        const min = Math.min(...values);
        const max = Math.max(...values);
        const range = max - min;

        values.forEach(value => {
            const normalizedValue = (value - min) / range;
            const lightness = 50 - (normalizedValue * 40); // Decrease lightness to get darker shades, adjust 40 as needed
            const color = `hsl(${baseHue}, ${saturation}%, ${lightness}%)`;
            colors.push(color);
        });

        return colors;
    }

    const data = {
        labels: companyNames,
        datasets: [{
            label: 'Average Salary',
            data: companyAverage,
            borderColor: 'white',
            backgroundColor: generateColorsFromValues(companyAverage),
            borderWidth: 1
        }]
    };
    const options = {

    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}
        >
            <div style={{width: '50%'}}>
                <Bar
                    data={data} options={options}
                ></Bar>
            </div>
            <div style={{width: '50%'}}>
                    <Doughnut
                        data={data} options={options}
                    >
                    </Doughnut>
            </div>
        </Box>
)
}

export default BarChartBlock;