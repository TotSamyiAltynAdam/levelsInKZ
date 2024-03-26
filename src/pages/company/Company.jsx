import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

import CompanyHeader from "../../components/company-header/company-header";
import CompanyInfo from "../../components/company-information/company-information";
import CompanyJobs from "../../components/company-jobs/company-jobs";
import CompanyRelated from "../../components/company-related/company-related";
import './company-page.scss';

import {getCompanyById} from "../../api/api";
import {useAuthContext} from "../../context/AuthContextProvider";


const Company = () => {
    let {companyID} = useParams();
    const {token} = useAuthContext();
    const [company, setCompany] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(()=>{
        if(token != null) {
            updateCompany();
        }
    }, [companyID]);

    const updateCompany = async () => {
        try {
            onCompanyLoading();
            const response = await getCompanyById(token, companyID);
            onCompanyLoaded(response);
        } catch (error) {
            onError(error);
        }
    };

    const onCompanyLoading = () => {
        setLoading(true);
    };
    const onCompanyLoaded = (newCompany) => {
        setCompany(newCompany);
        setLoading(false);
    }
    const onError = () => {
        setLoading(false);
        setError(true);
    };

    return (
        <div className="main">
            <div className="company__header">
                <CompanyHeader companyName={company.name} companyId={companyID}/>
            </div>

            <div className="company__information">
                <CompanyInfo company={company}/>
                <div className="company__jobs">
                    <CompanyJobs />
                    <CompanyRelated />
                </div>
            </div>
        </div>
    );
}

export default Company;