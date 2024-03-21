import './company-overview.scss';
import { useState, useEffect } from 'react';
import { getSalaries } from '../../api/api';
import { useAuthContext } from '../../context/AuthContextProvider';

export default function CompanyOverview({ companyId }) {
    const [salaries, setSalaries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { token } = useAuthContext();

    useEffect(() => {
        fetchSalaries();
    }, []);

    const fetchSalaries = async () => {
        try {
            setLoading(true);
            const response = await getSalaries(companyId, token); // Assuming getSalaries retrieves salaries for the given company ID
            setSalaries(response);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setError(true);
            setLoading(false);
        }
    };

    // Function to calculate average salary based on type (base or bonus)
    const calculateAverage = (grade, type) => {
        const filteredSalaries = salaries.filter(salary => salary.grade && salary.grade.toLowerCase() === grade.toLowerCase());
        const total = filteredSalaries.reduce((acc, curr) => acc + curr.salary[type], 0);
        return total / (filteredSalaries.length || 1); // If filteredSalaries.length is 0, return 1 to avoid division by zero
    };

    return (
        <div className="container__overview">
            <h2 className="info__title">Software Engineer Salaries</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error occurred while loading data</p>
            ) : (
                <>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Level</th>
                                <th>Average Base</th>
                                <th>Average Bonus</th>
                                <th>Average Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Intern</td>
                                <td>{calculateAverage('intern', 'base').toFixed(0)}K</td>
                                <td>{calculateAverage('intern', 'bonus').toFixed(0)}K</td>
                                <td>{(calculateAverage('intern', 'base') + calculateAverage('intern', 'bonus')).toFixed(0)}K</td>
                            </tr>
                            <tr>
                                <td>Junior</td>
                                <td>{calculateAverage('junior', 'base').toFixed(0)}K</td>
                                <td>{calculateAverage('junior', 'bonus').toFixed(0)}K</td>
                                <td>{(calculateAverage('junior', 'base') + calculateAverage('junior', 'bonus')).toFixed(0)}K</td>
                            </tr>
                            <tr>
                                <td>Middle</td>
                                <td>{calculateAverage('middle', 'base').toFixed(0)}K</td>
                                <td>{calculateAverage('middle', 'bonus').toFixed(0)}K</td>
                                <td>{(calculateAverage('middle', 'base') + calculateAverage('middle', 'bonus')).toFixed(0)}K</td>
                            </tr>
                            <tr>
                                <td>Senior</td>
                                <td>{calculateAverage('senior', 'base').toFixed(0)}K</td>
                                <td>{calculateAverage('senior', 'bonus').toFixed(0)}K</td>
                                <td>{(calculateAverage('senior', 'base') + calculateAverage('senior', 'bonus')).toFixed(0)}K</td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="back" onClick={() => window.history.back()}>Back</button>
                </>
            )}
        </div>
    );
}
