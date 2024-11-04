import {useState} from 'react';
import {styled} from '@mui/material/styles';
import {
    Box,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    TextField,
    Divider,
    Card,
    Select,
    MenuItem
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SearchIcon from '@mui/icons-material/Search';
import AssessmentIcon from '@mui/icons-material/Assessment';

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.MuiTableCell-head`]: {
        backgroundColor: '#EEEEEE',
        color: theme.palette.common.black,
        fontWeight: 'bold',
        fontSize: '1rem'
    },
    [`&.MuiTableCell-body`]: {
        fontSize: 14,
        padding: '8px'
    }
}));

const ChangePartManagementReports = () => {
    const reports = [
        {
            id: 1,
            line: 'Line 1',
            category: 'Winding',
            machineName: 'Machine A',
            date: '2024-10-01',
            status: 'Approved'
        }, {
            id: 2,
            line: 'Line 2',
            category: 'Welding',
            machineName: 'Machine B',
            date: '2024-10-02',
            status: 'Pending'
        }, {
            id: 3,
            line: 'Line 3',
            category: 'Assembly',
            machineName: 'Machine C',
            date: '2024-10-03',
            status: 'Rejected'
        }, {
            id: 4,
            line: 'Line 1',
            category: 'Winding',
            machineName: 'Machine D',
            date: '2024-10-04',
            status: 'Approved'
        }, {
            id: 5,
            line: 'Line 2',
            category: 'Welding',
            machineName: 'Machine E',
            date: '2024-10-05',
            status: 'Pending'
        }, {
            id: 6,
            line: 'Line 3',
            category: 'Assembly',
            machineName: 'Machine F',
            date: '2024-10-06',
            status: 'Rejected'
        }, {
            id: 7,
            line: 'Line 1',
            category: 'Winding',
            machineName: 'Machine G',
            date: '2024-10-07',
            status: 'Approved'
        }, {
            id: 8,
            line: 'Line 2',
            category: 'Welding',
            machineName: 'Machine H',
            date: '2024-10-08',
            status: 'Pending'
        }, {
            id: 9,
            line: 'Line 3',
            category: 'Assembly',
            machineName: 'Machine I',
            date: '2024-10-09',
            status: 'Rejected'
        }, {
            id: 10,
            line: 'Line 1',
            category: 'Winding',
            machineName: 'Machine J',
            date: '2024-10-10',
            status: 'Approved'
        }
    ];

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleDateFilterChange = (event) => {
        setDateFilter(event.target.value);
    };

    const handleCategoryFilterChange = (event) => {
        setCategoryFilter(event.target.value);
    };

    const filteredReports = reports.filter(report => {
        return (
            (report.machineName.toLowerCase().includes(searchTerm.toLowerCase()) || report.line.toLowerCase().includes(searchTerm.toLowerCase())) && (
                categoryFilter
                    ? report.category === categoryFilter
                    : true
            ) && (
                dateFilter
                    ? report.date === dateFilter
                    : true
            )
        );
    });

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
                        mb: 1,
                        display: 'flex',
                        alignItems: 'center',
                        color: '#0055A8',
                        fontWeight: 'bold'
                    }}>
                    <AssignmentIcon
                        sx={{
                            mr: 1
                        }}/>
                    Change Part Management Reports
                </Typography>
                <Divider sx={{
                        mb: 2
                    }}/>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 2
                    }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                        <SearchIcon
                            sx={{
                                mr: 1
                            }}/>
                        <TextField
                            variant="outlined"
                            size="small"
                            placeholder="Search by line or machine name"
                            value={searchTerm}
                            onChange={handleSearchChange}/>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                        <TextField
                            type="date"
                            variant="outlined"
                            size="small"
                            value={dateFilter}
                            onChange={handleDateFilterChange}
                            sx={{
                                mr: 2
                            }}/>
                        <Select
                            value={categoryFilter}
                            onChange={handleCategoryFilterChange}
                            displayEmpty="displayEmpty"
                            inputProps={{
                                'aria-label' : 'Without label'
                            }}
                            variant="outlined"
                            size="small"
                            sx={{
                                mr: 2
                            }}>
                            <MenuItem value="">
                                <em>All Categories</em>
                            </MenuItem>
                            <MenuItem value="Winding">Winding</MenuItem>
                            <MenuItem value="Welding">Welding</MenuItem>
                            <MenuItem value="Assembly">Assembly</MenuItem>
                        </Select>

                    </Box>
                </Box>

                <TableContainer
                    component={Paper}
                    sx={{
                        borderRadius: '8px'
                    }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>No</StyledTableCell>
                                <StyledTableCell>Lines</StyledTableCell>
                                <StyledTableCell>Machine Category</StyledTableCell>
                                <StyledTableCell>Machine Name</StyledTableCell>
                                <StyledTableCell>Date</StyledTableCell>
                                <StyledTableCell>Status</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                filteredReports.length > 0
                                    ? filteredReports
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((report, index) => (
                                            <TableRow key={report.id}>
                                                <StyledTableCell>{index + 1 + page * rowsPerPage}</StyledTableCell>
                                                <StyledTableCell>{report.line}</StyledTableCell>
                                                <StyledTableCell>{report.category}</StyledTableCell>
                                                <StyledTableCell>{report.machineName}</StyledTableCell>
                                                <StyledTableCell>{report.date}</StyledTableCell>
                                                <StyledTableCell>
                                                    <Button
                                                        variant="contained"
                                                        sx={{
                                                            bgcolor: report.status === 'Approved'
                                                                ? '#4BCE97'
                                                                : report.status === 'Rejected'
                                                                    ? '#FF1707'
                                                                    : '#FFCC01',
                                                            color: 'white',
                                                            borderRadius: '8px',
                                                            '&:hover' : {
                                                                bgcolor: report.status === 'Approved'
                                                                    ? '#4BCE97'
                                                                    : report.status === 'Rejected'
                                                                        ? '#FF1707'
                                                                        : '#FFCC01'
                                                            },
                                                            mr: 1
                                                        }}>
                                                        {report.status}
                                                    </Button>
                                                </StyledTableCell>

                                                <StyledTableCell>
                                                    <Card
                                                        sx={{
                                                            width: '80px',
                                                            height: '40px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            bgcolor: '#1B80E3',
                                                            boxShadow: 1,
                                                            transition: '0.3s',
                                                            '&:hover' : {
                                                                transform: 'scale(1.05)'
                                                            }
                                                        }}>
                                                        <AssessmentIcon
                                                            sx={{
                                                                color: 'white'
                                                            }}/>
                                                    </Card>
                                                </StyledTableCell>
                                            </TableRow>
                                        ))
                                    : (
                                        <TableRow>
                                            <StyledTableCell colSpan={7} align="center">
                                                No reports found.
                                            </StyledTableCell>
                                        </TableRow>
                                    )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredReports.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}/>
            </Paper>
        </Box>
    );
};

export default ChangePartManagementReports;
