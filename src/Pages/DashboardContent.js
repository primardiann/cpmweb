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
    LinearProgress,
    CircularProgress
} from '@mui/material';
import { Dashboard as DashboardIcon } from '@mui/icons-material';
import { AlignHorizontalRight as AlignHorizontalRightIcon, Category as CategoryIcon, Construction as ConstructionIcon, AccountTree as AccountTreeIcon } from '@mui/icons-material'; // Add the icons here
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as ChartTooltip, Legend } from 'recharts';

const DashboardContent = () => {
    const [okCount, setOkCount] = useState(0);
    const [ngCount, setNgCount] = useState(0);
    const [noCount, setNoCount] = useState(0);
    const [lineCount, setLineCount] = useState(0);
    const [machineCount, setMachineCount] = useState(0);
    const [categoryCount, setCategoryCount] = useState(0);
    const [specificationCount, setSpecificationCount] = useState(0);
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
                // Fetch data for total counts (Line, Machine, Category, Specification)
                const [lineRes, machineRes, categoryRes, specificationRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/line'),
                    axios.get('http://localhost:5000/api/mesin'),
                    axios.get('http://localhost:5000/api/kategori'),
                    axios.get('http://localhost:5000/api/spesifikasi')
                ]);

                setLineCount(lineRes.data.length);
                setMachineCount(machineRes.data.length);
                setCategoryCount(categoryRes.data.length);
                setSpecificationCount(specificationRes.data.length);

                // Fetch cpm data for judgment counts (OK, NG, NO)
                const cpmRes = await axios.get('http://localhost:5000/api/cpm');
                const cpmData = cpmRes.data;

                const ok = cpmData.filter(item => item.judgment === 'OK').length;
                const ng = cpmData.filter(item => item.judgment === 'NG').length;
                const no = cpmData.filter(item => item.judgment === 'NO').length;

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
                    {/* Total Line Card */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Tooltip title="Total number of production lines" arrow>
                            <Card
                                sx={{
                                    backgroundColor: '#2CABE3', // Custom color for Total Line
                                    color: 'white',
                                    '&:hover': { boxShadow: 8 },
                                    height: 'auto',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 2,
                                    borderRadius: 2, // Adding border radius
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': { transform: 'scale(1.05)' }
                                }}
                            >
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <AlignHorizontalRightIcon sx={{ fontSize: 30, mb: 1 }} />
                                    <Typography variant="h6" sx={{ fontSize: 14 }}>Total Line</Typography>
                                    <Typography variant="h4">{loading ? <CircularProgress size={30} color="inherit" /> : lineCount}</Typography>
                                </CardContent>
                            </Card>
                        </Tooltip>
                    </Grid>

                    {/* Total Machine Card */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Tooltip title="Total number of machines" arrow>
                            <Card
                                sx={{
                                    backgroundColor: '#F95454', // Custom color for Total Machine
                                    color: 'white',
                                    '&:hover': { boxShadow: 8 },
                                    height: 'auto',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 2,
                                    borderRadius: 2, // Adding border radius
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': { transform: 'scale(1.05)' }
                                }}
                            >
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <ConstructionIcon sx={{ fontSize: 30, mb: 1 }} />
                                    <Typography variant="h6" sx={{ fontSize: 14 }}>Total Machines</Typography>
                                    <Typography variant="h4">{loading ? <CircularProgress size={30} color="inherit" /> : machineCount}</Typography>
                                </CardContent>
                            </Card>
                        </Tooltip>
                    </Grid>

                    {/* Total Categories Card */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Tooltip title="Total number of categories" arrow>
                            <Card
                                sx={{
                                    backgroundColor: '#EFB614', // Custom color for Total Categories
                                    color: 'white',
                                    '&:hover': { boxShadow: 8 },
                                    height: 'auto',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 2,
                                    borderRadius: 2, // Adding border radius
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': { transform: 'scale(1.05)' }
                                }}
                            >
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <CategoryIcon sx={{ fontSize: 30, mb: 1 }} />
                                    <Typography variant="h6" sx={{ fontSize: 14 }}>Total Process</Typography>
                                    <Typography variant="h4">{loading ? <CircularProgress size={30} color="inherit" /> : categoryCount}</Typography>
                                </CardContent>
                            </Card>
                        </Tooltip>
                    </Grid>

                    {/* Part Specifications Card */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Tooltip title="Total number of part specifications" arrow>
                            <Card
                                sx={{
                                    backgroundColor: '#00A55A', // Custom color for Part Specifications
                                    color: 'white',
                                    '&:hover': { boxShadow: 8 },
                                    height: 'auto',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 2,
                                    borderRadius: 2, // Adding border radius
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': { transform: 'scale(1.05)' }
                                }}
                            >
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <AccountTreeIcon sx={{ fontSize: 30, mb: 1 }} />
                                    <Typography variant="h6" sx={{ fontSize: 14 }}>Part Specifications</Typography>
                                    <Typography variant="h4">{loading ? <CircularProgress size={30} color="inherit" /> : specificationCount}</Typography>
                                </CardContent>
                            </Card>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Paper>

            {/* Judgment Overview Card with Gradient */}
            <Paper
                elevation={3}
                sx={{
                    borderRadius: '8px',
                    p: 3,
                    mt: 5,
                    ml: 2,
                    background: 'linear-gradient(to bottom, rgba(0, 85, 168, 0.22), rgba(0, 85, 168, 1))', // Gradient background from 22% opacity to 100%
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        mb: 2,
                        fontWeight: 'bold',
                        color: 'white',
                    }}
                >
                    %Judgment 
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

export default DashboardContent;
