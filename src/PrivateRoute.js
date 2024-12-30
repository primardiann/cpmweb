import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ role, children }) => {
    const userRole = localStorage.getItem('role');  // Mengambil role dari localStorage

    // Jika role tidak sesuai, arahkan ke halaman login
    if (!userRole || userRole !== role) {
        return <Navigate to="/" replace />;
    }

    return children;  // Jika role sesuai, render children (halaman yang sesuai)
};

export default PrivateRoute;
