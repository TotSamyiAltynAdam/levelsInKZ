import './company-information.scss';
import { useState } from 'react';
import CompanyOverview from '../company-overview/company-overview';

export default function CompanyInfo() {
    const [showCompanyInfo, setShowCompanyInfo] = useState(true);

    const handleInfoClick = () => {
        setShowCompanyInfo(false);
    };

    return (
        <div className='asd'>
            {showCompanyInfo && (
                <div className="container">
                    <h2 className="info__title">Google Salaries</h2>
                    <p className="info__text">
                        Google's salary ranges from $97,496 in total compensation per year for an Administrative Assistant at the low-end to $2,595,038 for a Software Engineer at the high-end. Levels.fyi collects anonymous and verified salaries from current and former employees of Google. Last updated: 3/18/2024
                    </p>

                    <div className="info__salary" onClick={handleInfoClick}>
                        <p className="info__salary__special">Software Engineer</p>
                        <div className="level__price">
                            <p>L3 - $195k</p>
                            <p>L3 - $195k</p>
                            <p>L3 - $195k</p>
                            <p>L3 - $195k</p>
                            <p>L3 - $195k</p>
                            <p>L3 - $195k</p>
                            <p>L3 - $195k</p>
                            <p>L3 - $195k</p>
                            <p>L3 - $195k</p>
                        </div>
                    </div>

                    {/* Add other info_salary blocks as needed */}
                </div>
            )}

            {!showCompanyInfo && 

            <CompanyOverview/>
            }
        </div>
    );
}
