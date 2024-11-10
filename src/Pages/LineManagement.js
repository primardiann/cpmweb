import React, {useState, useEffect} from 'react';
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
    Divider
} from '@mui/material';
import AlignHorizontalRightIcon from '@mui/icons-material/AlignHorizontalRight';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import {styled} from '@mui/material/styles';

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

const LineManagement = () => {
    const [lines, setLines] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/line')
            .then(response => response.json())
            .then(data => {
                setLines(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleSearchChange = event => setSearchTerm(event.target.value);

    const filteredLines = lines.filter(
        line => line.kode_line && line.kode_line.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                    <AlignHorizontalRightIcon
                        sx={{
                            mr: 1
                        }}/>
                    Line Management
                </Typography>
                <Divider sx={{
                        mb: 2
                    }}/>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 2,
                        alignItems: 'center'
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
                            placeholder="Search by line name"
                            value={searchTerm}
                            onChange={handleSearchChange}/>
                    </Box>
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: '#005DB8',
                            color: 'white'
                        }}>
                        + New Line
                    </Button>
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
                                <StyledTableCell>Line Name</StyledTableCell>
                                <StyledTableCell>Location</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                loading
                                    ? (
                                        <TableRow>
                                            <TableCell colSpan={4} align="center">
                                                Loading...
                                            </TableCell>
                                        </TableRow>
                                    )
                                    : filteredLines.length === 0
                                        ? (
                                            <TableRow>
                                                <TableCell colSpan={4} align="center">
                                                    No Line found
                                                </TableCell>
                                            </TableRow>
                                        )
                                        : (
                                            filteredLines.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((line, index) => (
                                                <TableRow key={line.id}>
                                                    <StyledTableCell>{index + 1 + page * rowsPerPage}</StyledTableCell>
                                                    <StyledTableCell>{line.kode_line}</StyledTableCell>
                                                    <StyledTableCell>{line.lokasi}</StyledTableCell>
                                                    <StyledTableCell>
                                                        <Button
                                                            variant="contained"
                                                            sx={{
                                                                bgcolor: '#FF9707',
                                                                color: 'white',
                                                                borderRadius: '8px',
                                                                '&:hover' : {
                                                                    bgcolor: '#FFA500'
                                                                }
                                                            }}
                                                            startIcon={<EditIcon />
                                                            }
                                                        />
                                                        <Button
                                                            variant="contained"
                                                            sx={{
                                                                bgcolor: '#FF1707',
                                                                color: 'white',
                                                                borderRadius: '8px',
                                                                ml: 1,
                                                                '&:hover' : {
                                                                    bgcolor: '#FF4500'
                                                                }
                                                            }}
                                                            startIcon={<DeleteIcon />
                                                            }
                                                        />
                                                    </StyledTableCell>
                                                </TableRow>
                                            ))
                                        )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredLines.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}/>
            </Paper>
        </Box>
    );
};

export default LineManagement;
