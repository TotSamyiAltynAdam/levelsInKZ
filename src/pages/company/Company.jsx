import React, { useState } from 'react';
import CompanyHeader from "../../components/company-header/company-header";
import CompanyInfo from "../../components/company-information/company-information";
import CompanyJobs from "../../components/company-jobs/company-jobs";
import CompanyRelated from "../../components/company-related/company-related";
import CompanyOverview from "../../components/company-overview/company-overview";
import './company-page.scss';


const Company = () => {
  const [selectedTab, setSelectedTab] = useState('Overview');

    return (
        <div className="main">
            <div className="company__header">
                <CompanyHeader onTabSelect={setSelectedTab} />
            </div>

            <div className="company__information">
                {selectedTab === 'Overview' ? <CompanyOverview /> : null}
                {selectedTab === 'Salaries' ? <CompanyInfo /> : null}
                <div className="company__jobs">
                    <CompanyJobs />
                    <CompanyRelated />
                </div>
            </div>
        </div>
    );
}

export default Company;