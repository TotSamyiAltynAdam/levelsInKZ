import './company-overview.scss';
import { useState, useEffect } from 'react';
import CompanyInfo from '../company-information/company-information';

const jsonData = {
  "require": [
    {
      "level": "L3",
      "levelName": "Junior",
      "base": 50000,
      "bonus": 10000,
      "total": 60000
    },
    {
      "level": "L4",
      "levelName": "Middle",
      "base": 70000,
      "bonus": 15000,
      "total": 85000
    },
    {
      "level": "L5",
      "levelName": "Middle-S",
      "base": 90000,
      "bonus": 20000,
      "total": 110000
    },
    {
      "level": "L6",
      "levelName": "Senior",
      "base": 120000,
      "bonus": 50000,
      "total": 170000
    }
  ]
};

export default function CompanyOverview() {
    const [data, setData] = useState([]);
    const [showCompanyInfo, setShowCompanyInfo] = useState(false);

    useEffect(() => {
        setData(jsonData.require);
    }, []);

    const handleBackButtonClick = () => {
        setShowCompanyInfo(true);
    };

    if (showCompanyInfo) {
        return <CompanyInfo />;
    }

    return (
        <div className="container__overview">
            <h2 className="info__title">Google Software Engineer Salaries</h2>
            <p className="info__text">Software Engineer compensation in United States at Google ranges from $194K 
            per year for L3 to $2.6M per year for L9. The median compensation in United States package totals $314K. 
            View the base salary, stock, and bonus breakdowns for Google's total compensation packages. Last updated: 3/18/2024</p>
            <h3 className="table__title">Average Compensation By Level</h3>
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Level</th>
                            <th>Name</th>
                            <th>Base</th>
                            <th>Bonus</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((d,i) => {
                                return <tr key={i}>
                                    <td className='level'>{d.level}</td>
                                    <td>{d.levelName}</td>
                                    <td>${d.base}K</td>
                                    <td>${d.bonus}K</td>
                                    <td className='total'>${d.total}K</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                <button className="back" onClick={handleBackButtonClick}>Back</button>
            </div>
        </div>
    )
}

