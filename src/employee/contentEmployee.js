import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Paper,
    Divider,
    Alert
} from '@mui/material';
import { Dashboard as DashboardIcon } from '@mui/icons-material';

const DashboardContent = () => {
    // State untuk menyimpan data dari API
    const [lineCount, setLineCount] = useState(0);
    const [mesinCount, setMesinCount] = useState(0);
    const [kategoriCount, setKategoriCount] = useState(0);
    const [spesifikasiCount, setSpesifikasiCount] = useState(0);
    const [message, setMessage] = useState('');

    // Mengambil data dari API
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Melakukan request GET ke masing-masing API
                const [lineRes, mesinRes, kategoriRes, spesifikasiRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/line'),
                    axios.get('http://localhost:5000/api/mesin'),
                    axios.get('http://localhost:5000/api/kategori'),
                    axios.get('http://localhost:5000/api/spesifikasi')
                ]);
                
                // Menyimpan jumlah data yang diterima dari masing-masing API
                setLineCount(lineRes.data.length); // Sesuaikan dengan struktur data yang dikembalikan oleh API
                setMesinCount(mesinRes.data.length); // Sesuaikan dengan struktur data yang dikembalikan oleh API
                setKategoriCount(kategoriRes.data.length); // Sesuaikan dengan struktur data yang dikembalikan oleh API
                setSpesifikasiCount(spesifikasiRes.data.length); // Sesuaikan dengan struktur data yang dikembalikan oleh API
            } catch (error) {
                console.error('Error fetching data:', error);
                setMessage('Error fetching data'); // Pesan error jika gagal mengambil data
            }
        };

        fetchData();
    }, []);

    return (
        <Box sx={{ p: 2 }}>
            {/* Card for Dashboard Header */}
            <Paper elevation={3} sx={{ borderRadius: '8px', p: 3, mt: 5, ml: 2 }}>
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
                    <DashboardIcon sx={{ mr: 1 }} />
                    Dashboard
                </Typography>
                <Divider sx={{ mb: 2 }} />

                {/* Menampilkan pesan sukses atau error jika ada */}
                {message && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {message}
                    </Alert>
                )}

                {/* Grid for Total Data Cards */}
                <Grid container spacing={2}>
                    {/* Card for Total Line */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ bgcolor: '#2CABE3', color: 'white' }}>
                            <CardContent>
                                <Typography variant="h6">Total Line</Typography>
                                <Typography variant="h4">{lineCount}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Card for Total Mesin */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ bgcolor: '#F95454', color: 'white' }}>
                            <CardContent>
                                <Typography variant="h6">Total Machine</Typography>
                                <Typography variant="h4">{mesinCount}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Card for Total Categories */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ bgcolor: '#EFB614', color: 'white' }}>
                            <CardContent>
                                <Typography variant="h6">Total Categories</Typography>
                                <Typography variant="h4">{kategoriCount}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Card for Part Specification */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ bgcolor: '#7B5EBE', color: 'white' }}>
                            <CardContent>
                                <Typography variant="h6">Part Specification</Typography>
                                <Typography variant="h4">{spesifikasiCount}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default DashboardContent;
