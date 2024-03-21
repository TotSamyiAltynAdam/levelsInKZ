import * as React from "react";
import { NavLink } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

export default function Header() {
    // const updateCompanyList = async () => {
    //   try{
    //       onCompanyLoading();
    //       const response = await getCompanies(token);
    //       onContainersLoaded(response);
    //   }catch(error){
    //       console.log(error)
    //       onError(error);
    //   }
    // };

    // const onCompaniesLoaded = (newCompanies) => {
    //     setCompanies(newCompanies);
    //     setLoading(false);
    // }

    // const onCompanyLoading = () => {
    //     setLoading(true);
    // };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ backgroundColor: "#285975" }}>
                <Toolbar>
                    <NavLink
                        to="/"
                        style={{
                            textDecoration: "none",
                            color: "white",
                            marginRight: "85px",
                        }}
                    >
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M4 18H8V14H12V10H16V6H20"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Levels.fyi
                        </Typography>
                    </NavLink>
                    <Paper
                        component="form"
                        sx={{
                            p: "2px 4px",
                            display: "flex",
                            alignItems: "center",
                            width: 400,
                            marginRight: "700px",
                            borderRadius: "13px",
                        }}
                    >
                        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search By Company, Title, or City"
                            inputProps={{ "aria-label": "search google maps" }}
                        />
                    </Paper>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <NavLink to="/auth/signin">
                            <Button
                                sx={{
                                    backgroundColor: "#163A4E",
                                    marginRight: "13px",
                                    borderRadius: "5px",
                                    color: "white",
                                }}
                                color="inherit"
                            >
                                Sign In
                            </Button>
                        </NavLink>
                        <NavLink to="/auth/signup">
                            <Button
                                sx={{
                                    backgroundColor: "#D9D9D9",
                                    color: "#6D6D6D",
                                    borderRadius: "5px",
                                }}
                                color="inherit"
                            >
                                Sign Up
                            </Button>
                        </NavLink>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}