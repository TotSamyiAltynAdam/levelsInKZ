import './company-information.scss';
import { useState, useEffect } from 'react';
import CompanyOverview from '../company-overview/company-overview';
import { getCompaniesBySpecialization,getCompanies} from '../../api/api';
import { useAuthContext } from '../../context/AuthContextProvider';

export default function CompanyInfo() {
    const [showCompanyInfoState, setShowCompanyInfoState] = useState(true);
    const {token} = useAuthContext();
    const [specializations, setSpecializations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        updateCompanyList();
        updateSpecializationList();
    }, []);

    const updateCompanyList = async () => {
      try{
          onCompanyLoading();
          const response = await getCompanies(token);
          onContainersLoaded(response);
      }catch(error){
          console.log(error)
          onError(error);
      }
    };


    const updateSpecializationList = async () => {
        try {
            onSpecializationLoading();
            const response = await getCompaniesBySpecialization(token);
            onSpecializationLoaded(response);
        } catch (error) {
            console.log(error)
            onError(error);
        }
    };

    const onContainersLoaded = (newCompanies) => {
        setCompanies(newCompanies);
        setLoading(false);
    }

    const onSpecializationLoaded = (newSpecializations) => {
        setSpecializations(newSpecializations);
        setLoading(false);
    };

    const onCompanyLoading = () => {
        setLoading(true);
    };

    const onSpecializationLoading = () => {
        setLoading(true);
    };

    const onError = () => {
        setLoading(false);
        setError(true);
    };

    const handleInfoClick = () => {
        setShowCompanyInfoState(false);
    };

    return (
        <div className='asd'>
            {showCompanyInfoState && (
                <div className="container">
                    <h2 className="info__title">Google</h2>
                    <p className="info__text">
                        Google's salary ranges from $97,496 in total compensation per year for an Administrative Assistant at the low-end to $2,595,038 for a Software Engineer at the high-end. Levels.fyi collects anonymous and verified salaries from current and former employees of Google. Last updated: 3/18/2024
                    </p>
                    {specializations.length > 0 ? (
                        specializations.map((specialization, index) => (
                            <div key={index}>
                                <div className="info__salary" onClick={handleInfoClick}>
                                    <p className="info__salary__special">{specialization.name}</p>
                                    <div className="level__price">
                                        <p>{specialization.salary}$</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No specializations available</p>
                    )}
                </div>
            )}

            {!showCompanyInfoState && <CompanyOverview />}
        </div>
    );
}