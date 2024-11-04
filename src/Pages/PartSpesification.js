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
import AccountTreeIcon from '@mui/icons-material/AccountTree';
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

const PartSpecification = () => {
    const specifications = [
        {
            id: 1,
            category: 'Winding',
            name: 'SHAFT',
            model: '#LP51UP'
        }, {
            id: 2,
            category: 'Winding',
            name: 'TAIL STOCK',
            model: '#LP51SP'
        }, {
            id: 3,
            category: 'Winding',
            name: 'COIL HOLDER',
            model: '#LP51UD'
        }, {
            id: 4,
            category: 'Welding',
            name: 'COIL RETAINER',
            model: '#L5EU ( L, R )'
        }, {
            id: 5,
            category: 'Welding',
            name: 'LEAD CUTTING',
            model: '#L5E5 ( L, R )'
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

    const filteredSpecifications = specifications.filter(
        spec => spec.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                    <AccountTreeIcon
                        sx={{
                            mr: 1
                        }}/>
                    Part Specification Management
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
                            placeholder="Search by specification name"
                            value={searchTerm}
                            onChange={handleSearchChange}/>
                    </Box>

                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: '#005DB8',
                            color: 'white'
                        }}>
                        + New Part Specification
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
                                <StyledTableCell>Category</StyledTableCell>
                                <StyledTableCell>Specification Name</StyledTableCell>
                                <StyledTableCell>Model Running</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                filteredSpecifications.length > 0
                                    ? (
                                        filteredSpecifications.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((spec, index) => (
                                            <TableRow key={spec.id}>
                                                <StyledTableCell>{index + 1 + page * rowsPerPage}</StyledTableCell>
                                                <StyledTableCell>{spec.category}</StyledTableCell>
                                                <StyledTableCell>{spec.name}</StyledTableCell>
                                                <StyledTableCell>{spec.model}</StyledTableCell>
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
                                    )
                                    : (
                                        <TableRow>
                                            <StyledTableCell colSpan={5} align="center">
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        color: '#888'
                                                    }}>
                                                    No specifications found.
                                                </Typography>
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
                    count={filteredSpecifications.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}/>
            </Paper>
        </Box>
    );
};

export default PartSpecification;
