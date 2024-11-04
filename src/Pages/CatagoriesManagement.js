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
import CategoryIcon from '@mui/icons-material/Category';
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

const CategoriesManagement = () => {
    const categories = [
        {
            id: 1,
            name: 'Winding',
            location: 'Location 1'
        }, {
            id: 2,
            name: 'Welding',
            location: 'Location 2'
        }, {
            id: 3,
            name: 'Core Press',
            location: 'Location 3'
        }, {
            id: 4,
            name: 'Core Pre Press',
            location: 'Location 4'
        }, {
            id: 5,
            name: 'Welding',
            location: 'Location 5'
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

    const filteredCategories = categories.filter(
        category => category.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                    <CategoryIcon
                        sx={{
                            mr: 1
                        }}/>
                    Categories Management
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
                            placeholder="Search by category name"
                            value={searchTerm}
                            onChange={handleSearchChange}/>
                    </Box>

                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: '#005DB8',
                            color: 'white'
                        }}>
                        + New Category
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
                                <StyledTableCell>Category Name</StyledTableCell>
                                <StyledTableCell>Location</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                filteredCategories.length > 0
                                    ? filteredCategories
                                        .slice(
                                            page * rowsPerPage,
                                            page * rowsPerPage + rowsPerPage
                                        )
                                        .map((category, index) => (
                                            <TableRow key={category.id}>
                                                <StyledTableCell>{index + 1 + page * rowsPerPage}</StyledTableCell>
                                                <StyledTableCell>{category.name}</StyledTableCell>
                                                <StyledTableCell>{category.location}</StyledTableCell>
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
                                            <StyledTableCell colSpan={4} align="center">
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        color: '#888'
                                                    }}>
                                                    No categories found.
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
                    count={filteredCategories.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}/>
            </Paper>
        </Box>
    );
};

export default CategoriesManagement;
