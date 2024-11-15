import {useState} from 'react';
import {
    Box,
    Typography,
    Paper,
    Divider,
    TextField,
    Button,
    Grid,
    IconButton
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';

const SettingsEmployee = () => {
    const [name, setName] = useState('Name');
    const [mobileNumber, setMobileNumber] = useState('0123456788');
    const [role, setRole] = useState('Pegawai');
    const [email, setEmail] = useState('pegawai@gmail.com');
    const [password, setPassword] = useState('******');

    const handleSave = () => {

        console.log({name, mobileNumber, role, email, password});
    };

    return (
        <Box sx={{
                p: 2
            }}>
            <Paper
                elevation={3}
                sx={{
                    borderRadius: '8px',
                    p: 3
                }}>
                <Typography
                    variant="h5"
                    sx={{
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: 'bold',
                        color: '#0055A8'
                    }}>
                    <SettingsIcon
                        sx={{
                            mr: 1
                        }}/>
                    Settings
                </Typography>

                <Divider sx={{
                        mb: 2
                    }}/>

                <Grid container="container" spacing={2}>
                    <Grid item="item" xs={12} sm={2}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%'
                            }}>
                            <PersonIcon
                                sx={{
                                    fontSize: 100
                                }}/>
                        </Box>
                    </Grid>
                    <Grid item="item" xs={12} sm={10}>
                        <Grid container="container" spacing={2}>
                            <Grid item="item" xs={12} sm={6}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        mb: 2
                                    }}>
                                    <TextField
                                        label="Name"
                                        variant="outlined"
                                        fullWidth="fullWidth"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        sx={{
                                            borderRadius: '5px'
                                        }}/>
                                    <IconButton>
                                        <EditIcon/>
                                    </IconButton>
                                </Box>
                            </Grid>
                            <Grid item="item" xs={12} sm={6}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        mb: 2
                                    }}>
                                    <TextField
                                        label="Mobile Number"
                                        variant="outlined"
                                        fullWidth="fullWidth"
                                        value={mobileNumber}
                                        onChange={(e) => setMobileNumber(e.target.value)}
                                        sx={{
                                            borderRadius: '5px'
                                        }}/>
                                    <IconButton>
                                        <EditIcon/>
                                    </IconButton>
                                </Box>
                            </Grid>
                            <Grid item="item" xs={12} sm={6}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        mb: 2
                                    }}>
                                    <TextField
                                        label="Role"
                                        variant="outlined"
                                        fullWidth="fullWidth"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        sx={{
                                            borderRadius: '5px'
                                        }}/>
                                    <IconButton>
                                        <EditIcon/>
                                    </IconButton>
                                </Box>
                            </Grid>
                            <Grid item="item" xs={12} sm={6}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        mb: 2
                                    }}>
                                    <TextField
                                        label="Email"
                                        variant="outlined"
                                        fullWidth="fullWidth"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        sx={{
                                            borderRadius: '5px'
                                        }}/>
                                    <IconButton>
                                        <EditIcon/>
                                    </IconButton>
                                </Box>
                            </Grid>
                            <Grid item="item" xs={12} sm={6}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        mb: 2
                                    }}>
                                    <TextField
                                        label="Password"
                                        variant="outlined"
                                        type="password"
                                        fullWidth="fullWidth"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        sx={{
                                            borderRadius: '5px'
                                        }}/>
                                    <IconButton>
                                        <EditIcon/>
                                    </IconButton>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        mt: 3
                    }}>
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: '#005DB8',
                            color: 'white',
                            '&:hover' : {
                                bgcolor: '#0076A8'
                            }
                        }}
                        onClick={handleSave}>
                        Save Changes
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default SettingsEmployee;
