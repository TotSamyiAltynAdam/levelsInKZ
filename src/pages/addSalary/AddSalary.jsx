import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContextProvider";
import {
  AddingSalary,
  getGrades,
  getLocations,
  getSpecializations,
} from "../../api/api";

const AddSalary = () => {
  const { token } = useAuthContext();
  const [location, setLocations] = useState([]);
  const [grades, setGrades] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [yoe, setYoe] = useState("");
  const [yac, setYac] = useState("");
  const [salaryBase, setSalaryBase] = useState("");
  const [salaryBonus, setSalaryBonus] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSpecialization, SetSelectedSpecialization] = useState("");

  useEffect(() => {
    if (token != null) {
      // updateCompanyList();
      updateLocationList();
      updateGradeList();
      updateSpecializationList();
    }
  }, []);

  const updateLocationList = async () => {
    try {
      onLocationLoading();
      const response = await getLocations(token);
      onLocationLoaded(response);
    } catch (error) {
      console.log(error);
      onError(error);
    }
  };

  const updateGradeList = async () => {
    try {
      onGradeLoading();
      const response = await getGrades(token);
      onGradeLoaded(response);
    } catch (error) {
      console.log(error);
      onError(error);
    }
  };

  const onLocationLoaded = (newSpecializations) => {
    setLocations(newSpecializations);
    setLoading(false);
  };

  const onLocationLoading = () => {
    setLoading(true);
  };

  const onError = () => {
    setLoading(false);
    setError(true);
  };
  const onGradeLoaded = (newSpecializations) => {
    setGrades(newSpecializations);
    setLoading(false);
  };

  const onGradeLoading = () => {
    setLoading(true);
  };
  const updateSpecializationList = async () => {
    try {
      onSpecializationLoading();
      const response = await getSpecializations(token);
      onSpecializationLoaded(response);
    } catch (error) {
      console.log(error);
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

  const handleSalaryBaseChange = (e) => {
    setSalaryBase(e.target.value);
  };

  const handleSalaryBonusChange = (e) => {
    setSalaryBonus(e.target.value);
  };

  const handleYOEChange = (e) => {
    setYoe(e.target.value);
  };

  const handleYACChange = (e) => {
    setYac(e.target.value);
  };
  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleSpecializationChange = (e) => {
    SetSelectedSpecialization(e.target.value);
  };

  const handleGradeChange = (e) => {
    setSelectedGrade(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const data = {
        email: "fgfgfg@gmail.com",
        salary: { base: salaryBase, bonus: salaryBonus },
        location: { name: selectedLocation },
        specialization: {
          name: selectedSpecialization,
        },
        grade: selectedGrade,
      };
      await AddingSalary(token, data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to add a salary", error);
      setLoading(false);
      setError(true);
    }
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log("Salary Base:", salaryBase);
  //   console.log("Salary Bonus:", salaryBonus);
  //   console.log("Yoe:", yoe);
  //   console.log("Yac:", yac);
  // };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "45px" }}>Add Page</h1>
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="location">Location: </label>
        <select
          name="location"
          id="location"
          value={selectedLocation}
          onChange={handleLocationChange}
        >
          {location.map((location, index) => (
            <option key={index} value={location.name}>
              {location.name}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="specializations">Specialization: </label>
        <select
          name="specializations"
          id="specializations"
          value={selectedSpecialization}
          onChange={handleSpecializationChange}
        >
          {specializations.map((specialization, index) => (
            <option key={index} value={specialization.name}>
              {specialization.name}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="grade">Grade: </label>
        <select
          name="grade"
          id="grade"
          value={selectedGrade}
          onChange={handleGradeChange}
        >
          {grades.map((grade, index) => (
            <option key={index} value={grade}>
              {grade}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="salaryBase">Salary Base: </label>
        <input
          type="text"
          id="salaryBase"
          value={salaryBase}
          onChange={handleSalaryBaseChange}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="salaryBonus">Salary Bonus: </label>
        <input
          type="text"
          id="salaryBonus"
          value={salaryBonus}
          onChange={handleSalaryBonusChange}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="yoe">Year of experience: </label>
        <input type="text" id="yoe" value={yoe} onChange={handleYOEChange} />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="yac">Year at company: </label>
        <input type="text" id="yac" value={yac} onChange={handleYACChange} />
      </div>
      <button onClick={handleSubmit}>Send</button>
    </div>
  );
};

export default AddSalary;
