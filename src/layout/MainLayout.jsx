import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

import AppBar from './../components/header/AppBar';

const MainLayout = () => {
    return (
        <div>
            <AppBar/> 
            <Container>
                <Outlet/>
            </Container>
        </div>
    )
}

export default MainLayout;