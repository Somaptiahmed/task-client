
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div>
            <Navbar>

            </Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayout;