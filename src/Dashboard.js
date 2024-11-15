import {useState, useEffect} from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    List,
    Button,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Grid,
    Card,
    CardContent
} from '@mui/material';
import {
    Menu as MenuIcon,
    Logout as LogoutIcon,
    Settings as SettingsIcon,
    Person as PersonIcon,
    Category as CategoryIcon,
    AlignHorizontalRight as AlignHorizontalRightIcon,
    Construction as ConstructionIcon,
    AccountTree as AccountTreeIcon,
    Dashboard as DashboardIcon,
    Assignment as AssignmentIcon
} from '@mui/icons-material';
import {PieChart, Pie, Cell} from 'recharts';
import {Link, Routes, Route, useNavigate} from 'react-router-dom';
import UserManagement from './Pages/UserManagement.js';
import LineManagement from './Pages/LineManagement.js';
import CategoriesManagement from './Pages/CatagoriesManagement.js';
import MachineManagement from './Pages/MachineManagement.js';
import PartSpecification from './Pages/PartSpesification.js';
import ChangePartManagementReports from './Pages/Cpm.js';
import Settings from './Pages/Settings.js';

const Dashboard = () => {
    const [open, setOpen] = useState(true);
    const [animationKey, setAnimationKey] = useState(0);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("isLoggedIn");
        navigate('/');
    };

    const pieChartData = [
        {
            name: 'OK',
            value: 25,
            color: '#4BCE97'
        }, {
            name: 'NG',
            value: 70,
            color: '#604AFC'
        }, {
            name: 'NO',
            value: 5,
            color: '#EDBA00'
        }
    ];

    useEffect(() => {
        setAnimationKey(prev => prev + 1);
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '100vh',
                bgcolor: '#f0f2f5',
                p: 3
            }}>
            {/* AppBar */}
            <AppBar
                position="fixed"
                sx={{
                    zIndex: 1200,
                    bgcolor: '#FFFFFF',
                    top: 0
                }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="primary"
                        aria-label="open drawer"
                        onClick={() => setOpen(true)}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        variant="h6"
                        sx={{
                            flexGrow: 1
                        }}/>
                    <IconButton color="action" onClick={handleLogout}>
                        <PersonIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Drawer */}
            <Drawer
                variant="persistent"
                open={open}
                sx={{
                    '& .MuiDrawer-paper' : {
                        width: 240,
                        bgcolor: '#0055A8',
                        color: 'white',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                        zIndex: 1300,
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100vh'
                    }
                }}>
                <Box sx={{
                        p: 2
                    }}>
                    <Typography
                        variant="h4"
                        sx={{
                            color: 'white',
                            fontWeight: 'bold',
                            mb: 1,
                            textAlign: 'center'
                        }}>
                        Panasonic
                    </Typography>
                    <Divider
                        sx={{
                            bgcolor: 'white',
                            marginBottom: 1
                        }}/>
                </Box>
                <List>
                    {
                        [
                            {
                                text: 'Dashboard',
                                icon: <DashboardIcon/>,
                                path: '/dashboard'
                            }, {
                                text: 'User Management',
                                icon: <PersonIcon/>,
                                path: '/user_management'
                            }, {
                                text: 'Line Management',
                                icon: <AlignHorizontalRightIcon/>,
                                path: '/line_management'
                            }, {
                                text: 'Categories Management',
                                icon: <CategoryIcon/>,
                                path: '/categories_management'
                            }, {
                                text: 'Machine Management',
                                icon: <ConstructionIcon/>,
                                path: '/machine_management'
                            }, {
                                text: 'Part Specification',
                                icon: <AccountTreeIcon/>,
                                path: '/part_specification'
                            }, {
                                text: 'CPM Reports',
                                icon: <AssignmentIcon/>,
                                path: '/cpm_reports'
                            }, {
                                text: 'Settings',
                                icon: <SettingsIcon/>,
                                path: '/settings'
                            }
                        ].map((item, index) => (
                            <ListItem button="button" key={index} component={Link} to={item.path}>
                                <ListItemIcon
                                    sx={{
                                        color: 'white'
                                    }}>{item.icon}</ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    sx={{
                                        color: 'white'
                                    }}/>
                            </ListItem>
                        ))
                    }
                </List>
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        p: 1
                    }}>
                    <Button
                        onClick={handleLogout}
                        fullWidth="fullWidth"
                        variant="contained"
                        sx={{
                            bgcolor: '#0055A8',
                            '&:hover' : {
                                bgcolor: '#0055A8'
                            }
                        }}
                        startIcon={<LogoutIcon />}>
                        Logout
                    </Button>
                </Box>
            </Drawer>

            {/* Konten Utama */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    mt: 8, // Memberikan ruang untuk AppBar yang fixed
                    transition: 'margin-left 0.3s',
                    ml: open
                        ? '240px'
                        : '0px',
                    bgcolor: '#E8E8E8'
                }}>
                <Toolbar/>
                <Routes>
                    <Route
                        path="/dashboard"
                        element={<Box > <Typography
                                variant="h5"
                                sx={{
                                    mb: 3,
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: '#0055A8',
                                    fontWeight: 'bold'
                                }}>
                                <DashboardIcon
                                    sx={{
                                        mr: 1
                                    }}/>
                                Dashboard
                            </Typography>
                            <Divider
                                sx={{
                                    mb: 2
                                }}/>
                            <Grid container="container" spacing={3}>
                                {/* Kartu Total Lines */}
                                <Grid item="item" xs={12} sm={6} md={3}>
                                    <Card
                                        sx={{
                                            bgcolor: '#2CABE3',
                                            color: 'white'
                                        }}>
                                        <CardContent>
                                            <Typography variant="h6">Total Lines</Typography>
                                            <Typography variant="h4">2</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                {/* Kartu Total Kategori */}
                                <Grid item="item" xs={12} sm={6} md={3}>
                                    <Card
                                        sx={{
                                            bgcolor: '#F95454',
                                            color: 'white'
                                        }}>
                                        <CardContent>
                                            <Typography variant="h6">Total Kategori</Typography>
                                            <Typography variant="h4">2</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                {/* Kartu Total Mesin */}
                                <Grid item="item" xs={12} sm={6} md={3}>
                                    <Card
                                        sx={{
                                            bgcolor: '#EFB614',
                                            color: 'white'
                                        }}>
                                        <CardContent>
                                            <Typography variant="h6">Total Mesin</Typography>
                                            <Typography variant="h4">5</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                {/* Kartu Part Specification */}
                                <Grid item="item" xs={12} sm={6} md={3}>
                                    <Card
                                        sx={{
                                            bgcolor: '#7B5EBE',
                                            color: 'white'
                                        }}>
                                        <CardContent>
                                            <Typography variant="h6">Part Specification</Typography>
                                            <Typography variant="h4">3</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                            <Box
                                sx={{
                                    mt: 4
                                }}/>
                            {/* Kartu untuk Pie Chart */
                        }
                        <Card
                            sx={{
                                bgcolor: '#8FB9E3',
                                color: 'white',
                                p: 2,
                                height: '450px',
                                width: '550px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    mb: 2
                                }}>
                                % Judgment
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{
                                    mb: 2,
                                    textAlign: 'center'
                                }}>
                                OK: 25% | NG: 70% | NO: 5%
                            </Typography>
                            <Box>
                                <PieChart width={200} height={200}>
                                    <Pie
                                        data={pieChartData}
                                        dataKey="value"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        fill="#8884d8"
                                        animationDuration={3000}
                                        key={animationKey}>
                                        {
                                            pieChartData.map(
                                                (entry, index) => (<Cell key={`cell-${index}`} fill={entry.color}/>)
                                            )
                                        }
                                    </Pie>
                                </PieChart>
                            </Box>
                        </Card>
                    </Box>
}/>
                    <Route path="/user_management" element={<UserManagement />}/>
                    <Route path="/line_management" element={<LineManagement />}/>
                    <Route path="/categories_management" element={<CategoriesManagement />}/>
                    <Route path="/machine_management" element={<MachineManagement />}/>
                    <Route path="/part_specification" element={<PartSpecification />}/>
                    <Route path="/cpm_reports" element={<ChangePartManagementReports />}/>
                    <Route path="/settings" element={<Settings />}/>
                </Routes>
            </Box>
        </Box>
    );
};

export default Dashboard;
