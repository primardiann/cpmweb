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
    Divider
} from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

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

const MachineManagement = () => {
    const machines = [
        {
            id: 1,
            line: 'Line 1',
            name: 'Machine A',
            code: 'MA001',
            category: 'Winding'
        }, {
            id: 2,
            line: 'Line 2',
            name: 'Machine B',
            code: 'MB002',
            category: 'Welding'
        }, {
            id: 3,
            line: 'Line 3',
            name: 'Machine C',
            code: 'MC003',
            category: 'Core Press'
        }, {
            id: 4,
            line: 'Line 4',
            name: 'Machine D',
            code: 'MD004',
            category: 'Core Pre Press'
        }, {
            id: 5,
            line: 'Line 5',
            name: 'Machine E',
            code: 'ME005',
            category: 'Welding'
        }
    ];

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');

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

    const filteredMachines = machines.filter(
        machine => machine.code.toLowerCase().includes(searchTerm.toLowerCase())
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
                    <ConstructionIcon
                        sx={{
                            mr: 1
                        }}/>
                    Machine Management
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
                            placeholder="Search by machine code"
                            value={searchTerm}
                            onChange={handleSearchChange}/>
                    </Box>

                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: '#005DB8',
                            color: 'white'
                        }}>
                        + New Machine
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
                                <StyledTableCell>Lines</StyledTableCell>
                                <StyledTableCell>Machine Name</StyledTableCell>
                                <StyledTableCell>Kode</StyledTableCell>
                                <StyledTableCell>Category</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                filteredMachines.length > 0
                                    ? filteredMachines
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((machine, index) => (
                                            <TableRow key={machine.id}>
                                                <StyledTableCell>{index + 1 + page * rowsPerPage}</StyledTableCell>
                                                <StyledTableCell>{machine.line}</StyledTableCell>
                                                <StyledTableCell>{machine.name}</StyledTableCell>
                                                <StyledTableCell>{machine.code}</StyledTableCell>
                                                <StyledTableCell>{machine.category}</StyledTableCell>
                                                <StyledTableCell>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent: 'flex-start'
                                                        }}>
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
}/>
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
}/>
                                                    </Box>
                                                </StyledTableCell>
                                            </TableRow>
                                        ))
                                    : <TableRow>
                                            <StyledTableCell colSpan={6} align="center">
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        color: '#888'
                                                    }}>
                                                    No machines found.
                                                </Typography>
                                            </StyledTableCell>
                                        </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredMachines.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}/>
            </Paper>
        </Box>
    );
};

export default MachineManagement;
