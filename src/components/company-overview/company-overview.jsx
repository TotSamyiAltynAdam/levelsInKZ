import { useState, useEffect } from 'react';

import './company-overview.scss';

import { getStatisticsByCompanyAndSpecialization } from '../../api/api';
import { useAuthContext } from '../../context/AuthContextProvider';

export default function CompanyOverview({ companyName, specializationName }) {
    const { token } = useAuthContext();
    const [statistics, setStatistics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        updateStatisticsList();
    }, [companyName]);


    const updateStatisticsList = async () => {
        try {
            onStatisticsLoading();
            const response = await getStatisticsByCompanyAndSpecialization(token, companyName, specializationName);
            onStatisticsLoaded(response);
        } catch (error) {
            onError(error);
        }
    };

    const onStatisticsLoading = () => {
        setLoading(true);
    };
    const onStatisticsLoaded = (newStatistics) => {
        setStatistics(newStatistics);
        setLoading(false);
    };

    const onError = () => {
        setLoading(false);
        setError(true);
    };

    return (
        <div className="container__overview">
            <h2 className="info__title">{specializationName} Salaries</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Level</th>
                        <th>Average Base</th>
                        <th>Average Bonus</th>
                    </tr>
                </thead>
                <tbody>
                {statistics.map((statistic, index) => (
                    <tr key={index}>
                        <td>{statistic.grade}</td>
                        <td>{statistic.averageBaseSalary.toFixed(3)}K</td>
                        <td>{statistic.averageBonusSalary.toFixed(3)}K</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
