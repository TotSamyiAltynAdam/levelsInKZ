import {ApiError, deleteRequest, getRequest, jwtHeader, patchRequest, postRequest} from "./baseApi";

export async function signIn({email, password}){
    const response = await postRequest('/api/auth/signin', {
        body: {email, password}
    });
    if(response.status === 404) {
        throw new ApiError('User not found', response.status);
    }
    return await response.json();
}

export async function getCompanies(token){
    const response = await getRequest('/api/companies', {
        headers: jwtHeader(token)
    });
    if(!response.ok){
        throw new ApiError('Not found', response.status);
    }
    return await response.json();
}
export async function getCompaniesBySpecialization(token, specializationName) {
    const response = await getRequest('/api/salaries', {
        header: jwtHeader(token)
    });
    if(!response.ok){
        throw new ApiError('Not Found', response.status);
    }

    const data = await response.json();
    const groupedSalariesByCompanyName = {};
    data.forEach(salary => {
        if (
            salary &&
            salary.salary &&
            salary.company &&
            salary.specialization &&
            salary.specialization.name === specializationName &&
            typeof salary.salary.base === 'number' &&
            typeof salary.specialization.name === 'string' &&
            typeof salary.company.name === 'string'
        ) {
            const companyName = salary.company.name;
            const baseSalary = salary.salary.base;

            if (!groupedSalariesByCompanyName[companyName]) {
                groupedSalariesByCompanyName[companyName] = {
                    totalBase: baseSalary,
                    count: 1
                }
            } else {
                groupedSalariesByCompanyName[companyName].totalBase += baseSalary;
                groupedSalariesByCompanyName[companyName].count++;
            }
        }
    })
    for (const companyName in groupedSalariesByCompanyName) {
        const { totalBase, count } = groupedSalariesByCompanyName[companyName];
        groupedSalariesByCompanyName[companyName].averageBase = totalBase / count;
    }

    const result = [];
    for (const companyName in groupedSalariesByCompanyName) {
        const { averageBase } = groupedSalariesByCompanyName[companyName];
        result.push({ companyName, averageBase });
    }
    result.sort((a, b) => b.averageBase - a.averageBase);
    return result.slice(0, 5);
}
export async function getFiveSpecializations(token){
    const response = await getRequest('/api/specializations', {
        headers: jwtHeader(token)
    });
    if(!response.ok){
        throw new ApiError('Not found', response.status);
    }
    const data = await response.json();
    return data.slice(0, 5);
}

export async function getSalariesBySpecialization(token, specializationName){
    const response = await getRequest('/api/salaries', {
        header: jwtHeader(token)
    });
    if(!response.ok){
        throw new ApiError('Not Found', response.status);
    }

    const data = await response.json();
    const validData = data.filter(salary => {
        return (
            salary &&
            salary.salary &&
            salary.company &&
            salary.specialization &&
            salary.specialization.name === specializationName &&
            typeof salary.salary.base === 'number' &&
            typeof salary.specialization.name === 'string' &&
            typeof salary.company.name === 'string'
    );
    });

    return validData.slice(0, 5);
}

export async function getSpecializationById(token, id){
    const response = await getRequest(`/api/containers/${id}`, {
        headers: jwtHeader(token),
        credentials: 'include',
    });
    if(!response.ok){
        throw new ApiError('Unknown error', response.status);
    }
    return await response.json();
}