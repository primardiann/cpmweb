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
    Alert,
    Tooltip,
    LinearProgress
} from '@mui/material';
import { Dashboard as DashboardIcon } from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as ChartTooltip, Legend } from 'recharts';

const DashboardEmployee = () => {
    const [okCount, setOkCount] = useState(0);
    const [ngCount, setNgCount] = useState(0);
    const [noCount, setNoCount] = useState(0);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    // Data for the pie chart based on judgment counts
    const chartData = [
        { name: 'OK', value: okCount },
        { name: 'NG', value: ngCount },
        { name: 'NO', value: noCount }
    ];

    // Define colors for the pie chart segments
    const COLORS = ['#28a745', '#dc3545', '#ffc107'];

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/api/cpm');
                const data = response.data;

                // Count the number of OK, NG, and NO judgments
                const ok = data.filter(item => item.judgment === 'OK').length;
                const ng = data.filter(item => item.judgment === 'NG').length;
                const no = data.filter(item => item.judgment === 'NO').length;

                setOkCount(ok);
                setNgCount(ng);
                setNoCount(no);
            } catch (error) {
                console.error('Error fetching data:', error);
                setMessage('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Box sx={{ p: 2, backgroundColor: '#f4f4f9' }}>
            {/* Paper for dashboard content */}
            <Paper elevation={3} sx={{ borderRadius: '8px', p: 3, mt: 5, ml: 2, backgroundColor: '#ffffff' }}>
                <Typography
                    variant="h5"
                    sx={{
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: 'bold',
                        color: '#0055A8',
                    }}
                >
                    <DashboardIcon sx={{ mr: 1 }} />
                    Dashboard
                </Typography>
                <Divider sx={{ mb: 2 }} />

                {/* Show alert message if any */}
                {message && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {message}
                    </Alert>
                )}

                {/* Display a loading bar if fetching data */}
                {loading && <LinearProgress sx={{ mb: 2 }} />}

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Tooltip title="Total number of production lines" arrow>
                            <Card sx={{ bgcolor: '#2CABE3', color: 'white', '&:hover': { boxShadow: 6 }, height: '100%' }}>
                                <CardContent>
                                    <Typography variant="h6">Total Line</Typography>
                                    <Typography variant="h4">10</Typography> {/* Update with real data */}
                                </CardContent>
                            </Card>
                        </Tooltip>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Tooltip title="Total number of machines" arrow>
                            <Card sx={{ bgcolor: '#F95454', color: 'white', '&:hover': { boxShadow: 6 }, height: '100%' }}>
                                <CardContent>
                                    <Typography variant="h6">Total Machine</Typography>
                                    <Typography variant="h4">8</Typography> {/* Update with real data */}
                                </CardContent>
                            </Card>
                        </Tooltip>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Tooltip title="Total number of categories" arrow>
                            <Card sx={{ bgcolor: '#EFB614', color: 'white', '&:hover': { boxShadow: 6 }, height: '100%' }}>
                                <CardContent>
                                    <Typography variant="h6">Total Categories</Typography>
                                    <Typography variant="h4">5</Typography> {/* Update with real data */}
                                </CardContent>
                            </Card>
                        </Tooltip>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Tooltip title="Total number of part specifications" arrow>
                            <Card sx={{ bgcolor: '#7B5EBE', color: 'white', '&:hover': { boxShadow: 6 }, height: '100%' }}>
                                <CardContent>
                                    <Typography variant="h6">Part Specifications</Typography>
                                    <Typography variant="h4">12</Typography> {/* Update with real data */}
                                </CardContent>
                            </Card>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Paper>

            {/* Recharts PieChart for Judgment data */}
            <Paper elevation={3} sx={{ borderRadius: '8px', p: 3, mt: 5, ml: 2, backgroundColor: '#ffffff' }}>
                <Typography
                    variant="h5"
                    sx={{
                        mb: 2,
                        fontWeight: 'bold',
                        color: '#0055A8',
                    }}
                >
                    Judgment Overview
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={100}
                            fill="#8884d8"
                            label
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <ChartTooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </Paper>
        </Box>
    );
};

export default DashboardEmployee;
