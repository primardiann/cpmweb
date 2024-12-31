import { useState } from 'react';
import { Box, AppBar, Toolbar, IconButton, Drawer, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, Button } from '@mui/material';
import { Menu as MenuIcon, Person as PersonIcon, Logout as LogoutIcon, Dashboard as DashboardIcon, AlignHorizontalRight as AlignHorizontalRightIcon, Category as CategoryIcon, Construction as ConstructionIcon, AccountTree as AccountTreeIcon, Assignment as AssignmentIcon, Settings as SettingsIcon, ManageAccounts as ManageAccountsIcon  } from '@mui/icons-material'; 
import { Link, Routes, Route, useNavigate, Outlet } from 'react-router-dom';  // Import Outlet
import DashboardContent from './Pages/DashboardContent'; 
import UserManagement from './Pages/UserManagement'; 
import LineManagement from './Pages/LineManagement';
import CategoriesManagement from './Pages/CatagoriesManagement';
import MachineManagement from './Pages/MachineManagement';
import PartSpecification from './Pages/PartSpesification';
import CpmReports from './Pages/Cpm';
import Settings from './Pages/Settings';

const Dashboard = () => {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("isLoggedIn");
        navigate('/');
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f0f2f5', p: 3 }}>
            {/* AppBar */}
            <AppBar position="fixed" sx={{ zIndex: 1200, bgcolor: '#FFFFFF', top: 0 }}>
                <Toolbar>
                    <IconButton edge="start" color="primary" aria-label="open drawer" onClick={() => setOpen(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }} />
                    <IconButton color="action" onClick={() => navigate('Settings')}>
                        <ManageAccountsIcon  />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Drawer */}
            <Drawer
                variant="persistent"
                open={open}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 240,
                        bgcolor: '#0055A8',
                        color: 'white',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                        zIndex: 1300,
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100vh'
                    }
                }}
            >
                <Box sx={{ p: 2 }}>
                    <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', mb: 1, textAlign: 'center' }}>
                        Panasonic
                    </Typography>
                    <Divider sx={{ bgcolor: 'white', marginBottom: 1 }} />
                </Box>
                <List>
                    {[ 
                        { text: 'Dashboard', icon: <DashboardIcon />, path: 'content' },
                        { text: 'User Management', icon: <PersonIcon />, path: 'user_management' },
                        { text: 'Line Management', icon: <AlignHorizontalRightIcon />, path: 'line_management' },
                        { text: 'Process Management', icon: <CategoryIcon />, path: 'categories_management' },
                        { text: 'Machines Management', icon: <ConstructionIcon />, path: 'machine_management' },
                        { text: 'Part Specification', icon: <AccountTreeIcon />, path: 'part_specification' },
                        { text: 'CPM Reports', icon: <AssignmentIcon />, path: 'cpm_reports' },
                        { text: 'Profile', icon: <ManageAccountsIcon />, path: 'settings' }
                    ].map((item, index) => (
                        <ListItem button key={index} component={Link} to={item.path}>
                            <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} sx={{ color: 'white' }} />
                        </ListItem>
                    ))}
                </List>
                <Box sx={{ position: 'absolute', bottom: 0, width: '100%' }}>
                    <Button fullWidth onClick={handleLogout} sx={{ color: 'white' }}>
                        <LogoutIcon sx={{ mr: 1 }} />
                        Logout
                    </Button>
                </Box>
            </Drawer>

            {/* Konten Utama */}
            <Box sx={{ flexGrow: 1, bgcolor: '#f0f2f5', p: 3, ml: 25 }}>
                <Routes>
                    {/* Default Route - Dashboard Content */}
                    <Route path="content" element={<DashboardContent />} />

                    {/* Routes untuk halaman lain */}
                    <Route path="user_management" element={<UserManagement />} />
                    <Route path="line_management" element={<LineManagement />} />
                    <Route path="categories_management" element={<CategoriesManagement />} />
                    <Route path="machine_management" element={<MachineManagement />} />
                    <Route path="part_specification" element={<PartSpecification />} />
                    <Route path="cpm_reports" element={<CpmReports />} />
                    <Route path="settings" element={<Settings />} />
                </Routes>
                {/* Use Outlet for child routes */}
                <Outlet />
            </Box>
        </Box>
    );
};

export default Dashboard;
