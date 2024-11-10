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
import {Menu as MenuIcon, Logout as LogoutIcon, Person as PersonIcon, Dashboard as DashboardIcon} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';

const UserDashboard = () => {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("isLoggedIn");
        navigate('/');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '100vh',
                bgcolor: '#f0f2f5',
                p: 3
            }}>
            <AppBar
                position="fixed"
                sx={{
                    zIndex: 1200,
                    bgcolor: '#FFFFFF'
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

            <Drawer
                variant="persistent"
                open={open}
                sx={{
                    '& .MuiDrawer-paper' : {
                        width: 240,
                        bgcolor: '#0055A8',
                        color: 'white',
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
                    <ListItem button="button" component="a" href="/employee_dashboard">
                        <ListItemIcon
                            sx={{
                                color: 'white'
                            }}>
                            <DashboardIcon/>
                        </ListItemIcon>
                        <ListItemText
                            primary="Dashboard"
                            sx={{
                                color: 'white'
                            }}/>
                    </ListItem>
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

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    mt: 8,
                    transition: 'margin-left 0.3s',
                    ml: open
                        ? '240px'
                        : '0px',
                    bgcolor: '#E8E8E8'
                }}>
                <Toolbar/>
                <Typography
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
                    Employee Dashboard
                </Typography>
                <Divider sx={{
                        mb: 2
                    }}/>
                <Grid container="container" spacing={3}>
                    {/* Contoh kartu dengan informasi */}
                    <Grid item="item" xs={12} sm={6} md={3}>
                        <Card
                            sx={{
                                bgcolor: '#2CABE3',
                                color: 'white'
                            }}>
                            <CardContent>
                                <Typography variant="h6">Total Tasks</Typography>
                                <Typography variant="h4">5</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    {/* Tambahkan konten lain sesuai kebutuhan */}
                </Grid>
            </Box>
        </Box>
    );
};

export default UserDashboard;
