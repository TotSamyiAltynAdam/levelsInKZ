import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

import {Container} from "@mui/material";
import StairsIcon from '@mui/icons-material/Stairs';

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

import ModalWindow from '../modalWindow/ModalWindow';

import { getCompanies } from '../../api/api';
import { useAuthContext } from '../../context/AuthContextProvider';

export default function Header() {
    const { token } = useAuthContext();
    const navigate = useNavigate();
    const [companies, setCompanies] = useState([]);
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalSearchCompanyActive, setModalSearchCompanyActive] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if(token) {
            updateCompanyList();
        }
    }, []);

    useEffect(() => {
        const filtered = companies.filter(company =>
            company.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCompanies(filtered);
    }, [searchQuery, companies]);

    const updateCompanyList = async () => {
      try{
          onCompanyLoading();
          const response = await getCompanies(token);
          onCompaniesLoaded(response);
      }catch(error){
          console.log(error)
          onError(error);
      }
    };
    const onCompanyLoading = () => {
        setLoading(true);
    };

    const onCompaniesLoaded = (newCompanies) => {
        setCompanies(newCompanies);
        setLoading(false);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ backgroundColor: "#285975" }}>
               <Container>
                   <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                       <Box sx={{display: 'flex', height: '80px', alignItems: 'center'}}>
                           <NavLink to="/" style={{textDecoration: "none", color: "white"}}>
                               <Box sx={{display: 'flex', justifyContent: 'space-between', width: '90px', alignItems: 'center'}}>
                                   <StairsIcon/>
                                   Levels.fyi
                               </Box>
                           </NavLink>
                           <Paper
                               component="form"
                               sx={{
                                   marginLeft: '158px',
                                   width: 376,
                                   padding: "0 20px",
                                   display: "flex",
                                   justifyContent : "space-between",
                                   alignItems: "center",
                                   borderRadius: "10px"
                               }}
                           >
                               <IconButton type="button" sx={{p: "8px"}} aria-label="search">
                                   <SearchIcon/>
                               </IconButton>
                               <InputBase
                                   type="text"
                                   placeholder="Search By Company, Title, or City"
                                   style={{marginLeft: '7px', flex: 1, border: 'none'}}
                                   value={searchQuery}
                                   onChange={handleSearchChange}
                                   onClick={() => setModalSearchCompanyActive(true)}
                               />
                               <ModalWindow
                                   active={modalSearchCompanyActive}
                                   setActive={setModalSearchCompanyActive}
                                   position="bottom">
                                   <Box sx={{ maxHeight: '200px', width: '376px', overflowY: 'auto' }}>
                                       {filteredCompanies.map(company => (
                                           <NavLink
                                               key={company._id}
                                               to={`/company/${company._id}`}
                                               onClick={() => setModalSearchCompanyActive(false)}
                                           >
                                               <div>
                                                   {company.name}
                                               </div>
                                           </NavLink>
                                       ))}
                                   </Box>
                               </ModalWindow>
                           </Paper>
                       </Box>
                       <Box
                           sx={{
                               width: '192px',
                               display: "flex",
                               alignItems: "center",
                               justifyContent: 'space-between'
                           }}
                       >
                           <NavLink to="/auth/signin">
                               <Button
                                   sx={{
                                       width: '88px',
                                       backgroundColor: "#163A4E",
                                       color: "white",
                                       borderRadius: "10px"
                                   }}
                                   color="inherit"
                               >
                                   Sign In
                               </Button>
                           </NavLink>
                           <NavLink to="/auth/signup">
                               <Button
                                   sx={{
                                       width: '88px',
                                       backgroundColor: "#E7E7E7",
                                       color: "#8E8E93",
                                       borderRadius: "10px",
                                   }}
                                   color="inherit"
                               >
                                   Sign Up
                               </Button>
                           </NavLink>
                       </Box>
                   </Box>
               </Container>
            </AppBar>
        </Box>
    );
}