import axios from "axios";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { FormControl } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuthContext } from "../../context/AuthContextProvider";

export default function AddSalary() {
  const [data, setData] = useState(null);
  const [specialization, setSpecialization] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salaryBase, setSalaryBase] = useState("");
  const [salaryBonus, setSalaryBonus] = useState("");
  const [grade, setGrade] = useState("");
  const [experience, setExperience] = useState("");
  const [experienceCompany, setExperienceCompany] = useState("");

  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWY4M2NhMzRlNTUzZWU3ZDcyNzg4MjciLCJpYXQiOjE3MTExNDExOTIsImV4cCI6MTcxMTE0NDc5Mn0.lpNQyqweBvo4VwDfAGtf-eovCoVNIBYNiOcGsFrjFTA";

  const { token, setToken } = useAuthContext();

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const navigateTo = useNavigate();

  function fetchDataFromAPI() {
    return Promise.all([
      axios.get("https://onelab-levels-api.vercel.app/api/specializations", {
        headers,
      }),
      axios.get("https://onelab-levels-api.vercel.app/api/locations", {
        headers,
      }),
      axios.get("https://onelab-levels-api.vercel.app/api/companies", {
        headers,
      }),
      axios.get("https://onelab-levels-api.vercel.app/api/grades", {
        headers,
      }),
    ])
      .then((responses) => {
        const specializations = responses[0].data.map((spec) => spec.name);
        const locations = responses[1].data.map((loc) => loc.name);
        const companies = responses[2].data;
        const grades = responses[3].data;

        return {
          specializations,
          locations,
          companies,
          grades,
        };
      })
      .catch((error) => {
        console.error("Error fetching data:" + error);
        throw error;
      });
  }

  useEffect(() => {
    fetchDataFromAPI()
      .then((responses) => setData(responses))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleClick = () => {
    if (
      !specialization ||
      !company ||
      !location ||
      !salaryBase ||
      !salaryBonus ||
      !grade ||
      !experience ||
      !experienceCompany
    ) {
      alert("Please fill in all the fields ");
      return;
    }

    const formData = {
      specialization: { name: specialization },
      location: { name: location },
      salary: { base: parseInt(salaryBase), bonus: parseInt(salaryBonus) },
      grade: grade,
      company: { name: company },
      yoe: experience,
      yac: experienceCompany,
    };

    console.log(formData);

    axios
      .post("https://onelab-levels-api.vercel.app/api/salaries", formData, {
        headers,
      })
      .then((response) => {
        console.log("Data sent succesfully: ", response.data);
      })
      .catch((error) => {
        console.log("Error sending data: ", error);
      });

    navigateTo("/");
  };

  if (!data) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <FormControl sx={{ width: "450px", p: 3 }}>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "25px",
            marginTop: "15px",
            color: "#163A4E",
          }}
        >
          Add A Salary
        </h1>
        <Select
          labelId="selectSpecialization"
          id="selectSpecialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          sx={{ mb: 2 }}
        >
          {data.specializations.map((job, id) => (
            <MenuItem key={id} value={job}>
              {job}
            </MenuItem>
          ))}
        </Select>
        <Select
          labelId="selectCompany"
          id="selectCompany"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          sx={{ mb: 2 }}
        >
          {data.companies.map((company, id) => (
            <MenuItem key={id} value={company.name}>
              {company.name}
            </MenuItem>
          ))}
        </Select>
        <Select
          labelId="selectLocation"
          id="selectLocation"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          sx={{ mb: 2 }}
        >
          {data.locations.map((location, id) => (
            <MenuItem key={id} value={location}>
              {location}
            </MenuItem>
          ))}
        </Select>
        <Select
          labelId="selectGrade"
          id="selectGrade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          sx={{ mb: 2 }}
        >
          {data.grades.map((grade, id) => (
            <MenuItem key={id} value={grade}>
              {grade}
            </MenuItem>
          ))}
        </Select>
        <TextField
          id="salary-base"
          label="Salary Base"
          value={salaryBase}
          onChange={(e) => setSalaryBase(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          id="salary-bonus"
          label="Salary Bonus"
          value={salaryBonus}
          onChange={(e) => setSalaryBonus(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          id="yoe"
          label="Year Of Experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          id="yac"
          label="Year At Company"
          value={experienceCompany}
          onChange={(e) => setExperienceCompany(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          sx={{ backgroundColor: "#285975" }}
          onClick={handleClick}
        >
          Send
        </Button>
      </FormControl>
    </Box>
  );
}
