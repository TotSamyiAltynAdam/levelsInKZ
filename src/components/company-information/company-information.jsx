import { useState, useEffect } from 'react';

import './company-information.scss';

import { getSpecializationsByCompany } from '../../api/api';
import { useAuthContext } from '../../context/AuthContextProvider';
import CompanyOverview from "../company-overview/company-overview";

export default function CompanyInfo({company}) {
    const {token} = useAuthContext();
    const [specializations, setSpecializations] = useState([]);
    const [selectedSpecialization, setSelectedSpecialization] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if(company._id){
            updateSpecializationList();
        }
    }, [company, selectedSpecialization]);

    const updateSpecializationList = async () => {
        try {
            onSpecializationLoading();
            const response = await getSpecializationsByCompany(token, company.name);
            onSpecializationLoaded(response);
        } catch (error) {
            onError(error);
        }
    };

    const onSpecializationLoaded = (newSpecializations) => {
        setSpecializations(newSpecializations);
        setLoading(false);
    };

    const onSpecializationLoading = () => {
        setLoading(true);
    };

    const onError = () => {
        setLoading(false);
        setError(true);
    };

    const handleSpecializationClick = (specialization) => {
        setSelectedSpecialization(specialization);
    };

    return (
        <div>
            {selectedSpecialization ? (
                <CompanyOverview companyName={company.name} specializationName={selectedSpecialization.specialization.name}/>
            ) : (
                <div className="container">
                    <h2 className="info__title">{company.name} Salaries</h2>

                    <p className="info__text">
                        Google's salary ranges from $97,496 in total compensation per year for an Administrative Assistant at the low-end to $2,595,038 for a Software Engineer at the high-end. Levels.fyi collects anonymous and verified salaries from current and former employees of Google. Last updated: 3/18/2024
                    </p>

                    {specializations.length > 0 ? (
                        specializations.map((specialization, index) => (
                            <div key={index} onClick={() => handleSpecializationClick(specialization)}>
                                <div className="info__salary">
                                    <p className="info__salary__special">{specialization.specialization.name}</p>
                                    <div className="level__price">
                                        <p>Base: {specialization.salary.base}$</p>
                                    </div>
                                    <div className="level__price">
                                        <p>Bonus: {specialization.salary.bonus}$</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No specializations available</p>
                    )}
                </div>
            )}
        </div>
    );
}