import { useState } from 'react';
import { Button, TextField, Typography, Box, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import backgroundImage from './Picture/gambar.jpg';

function Login() {
  const [email, setEmail] = useState('');
  const [kataSandi, setKataSandi] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mengirim request login ke backend
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        kata_sandi: kataSandi,
      }),
    });

    const data = await response.json();

    if (data.success) {
      // Simpan token dan role ke localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.user.role);

      // Arahkan pengguna sesuai dengan role
      if (data.user.role === 'admin') {
        navigate('/dashboard/content');
      } else if (data.user.role === 'employee') {
        navigate('/DashboardEmployee/content_employee');
      }
    } else {
      setError(data.message || 'Login failed');
    }
  };

  return (
    <Container
      component="main"
      maxWidth={false}
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
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

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, flexGrow: 1 }}>
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
            value={kataSandi}
            onChange={(e) => setKataSandi(e.target.value)}
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
