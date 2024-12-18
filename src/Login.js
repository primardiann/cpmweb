import { useState } from 'react';
import {
    Button,
    TextField,
    Typography,
    Box,
    Container,
    Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Untuk request API
import backgroundImage from './Picture/gambar1.jpg';

function Login() {
    const [email, setEmail] = useState(''); // Diganti ke email
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Kirim request login ke backend
            const response = await axios.post('http://localhost:5000/api/login', {
                email,
                kata_sandi: password,
            });

            // Simpan token dan data user ke localStorage
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            // Redirect berdasarkan role
            if (user.role === 'admin') {
                navigate('/Dashboard'); // Halaman admin
            } else if (user.role === 'employee') {
                navigate('/EmployeeDashboard'); // Halaman employee
            }
        } catch (err) {
            // Tangani error dari API
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <Container
            component="main"
            maxWidth={false}
            sx={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'top center',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    p: 4,
                    width: '85%',
                    maxWidth: '400px',
                    borderRadius: 3,
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    marginTop: '50px',
                    height: '450px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                <Typography
                    component="h1"
                    align="center"
                    sx={{
                        mb: 3,
                        fontWeight: '900',
                        fontSize: '2rem',
                        color: '#005eb8'
                    }}
                >
                    Panasonic
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        mt: 1,
                        flexGrow: 1
                    }}
                >
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        Email Address/ID
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{
                            mb: 3,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '10px'
                            },
                            width: '100%'
                        }}
                    />
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        Password
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{
                            mb: 3,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '10px'
                            },
                            width: '100%',
                        }}
                    />
                    {error && (
                        <Typography color="error" align="center" sx={{ mb: 2 }}>
                            {error}
                        </Typography>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                mt: 2,
                                backgroundColor: '#005eb8',
                                '&:hover': {
                                    backgroundColor: '#004494'
                                },
                                width: '230px',
                                height: '60px',
                                fontSize: '1rem',
                                borderRadius: '10px',
                            }}
                        >
                            Login
                        </Button>
                    </div>
                </Box>
            </Paper>
        </Container>
    );
}

export default Login;
