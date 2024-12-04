import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Typography,
    Paper,
    Divider,
    TextField,
    Button,
    Grid,
    IconButton,
    Alert
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';

const Settings = () => {
    const userId = 11; // ID pengguna yang ingin diedit
    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // State untuk pesan

    // Mengambil data pengguna ketika komponen dimuat
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/settings/${userId}`);
                const user = response.data;
                setName(user.nama);
                setMobileNumber(user.no_hp);
                setRole(user.role);
                setEmail(user.email);
                setPassword(user.kata_sandi);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setMessage('Error fetching user data'); // Menampilkan error
            }
        };

        fetchUserData();
    }, [userId]);

    // Fungsi untuk menyimpan perubahan
    const handleSave = async () => {
        const updatedUser = {
            nama: name,
            no_hp: mobileNumber,
            role: role,
            email: email,
            kata_sandi: password,
        };

        try {
            const response = await axios.put(`http://localhost:5000/api/settings/${userId}`, updatedUser);
            console.log('User data updated successfully:', response.data);
            setMessage(response.data.message); // Menyimpan pesan dari backend
        } catch (error) {
            console.error('Error updating user data:', error);
            setMessage('Error updating user data'); // Menampilkan error
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            <Paper elevation={3} sx={{ borderRadius: '8px', p: 3 }}>
                <Typography
                    variant="h5"
                    sx={{
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: 'bold',
                        color: '#0055A8'
                    }}
                >
                    <SettingsIcon sx={{ mr: 1 }} />
                    Settings
                </Typography>

                <Divider sx={{ mb: 2 }} />

                {/* Menampilkan pesan sukses atau error jika ada */}
                {message && (
                    <Alert severity={message === 'Error updating user data' ? 'error' : 'success'} sx={{ mb: 2 }}>
                        {message}
                    </Alert>
                )}

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={2}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                            <PersonIcon sx={{ fontSize: 100 }} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <TextField
                                        label="Name"
                                        variant="outlined"
                                        fullWidth
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        sx={{ borderRadius: '5px' }}
                                    />
                                    <IconButton>
                                        <EditIcon />
                                    </IconButton>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <TextField
                                        label="Mobile Number"
                                        variant="outlined"
                                        fullWidth
                                        value={mobileNumber}
                                        onChange={(e) => setMobileNumber(e.target.value)}
                                        sx={{ borderRadius: '5px' }}
                                    />
                                    <IconButton>
                                        <EditIcon />
                                    </IconButton>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <TextField
                                        label="Role"
                                        variant="outlined"
                                        fullWidth
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        sx={{ borderRadius: '5px' }}
                                    />
                                    <IconButton>
                                        <EditIcon />
                                    </IconButton>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <TextField
                                        label="Email"
                                        variant="outlined"
                                        fullWidth
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        sx={{ borderRadius: '5px' }}
                                    />
                                    <IconButton>
                                        <EditIcon />
                                    </IconButton>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <TextField
                                        label="Password"
                                        variant="outlined"
                                        type="password"
                                        fullWidth
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        sx={{ borderRadius: '5px' }}
                                    />
                                    <IconButton>
                                        <EditIcon />
                                    </IconButton>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: '#005DB8',
                            color: 'white',
                            '&:hover': { bgcolor: '#0076A8' }
                        }}
                        onClick={handleSave}
                    >
                        Save Changes
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default Settings;
