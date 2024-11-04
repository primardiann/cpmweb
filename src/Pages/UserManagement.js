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
    Grid,
    Divider
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
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

const UserManagement = () => {
    const users = [
        {
            id: 112,
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '1234567890',
            role: 'Admin'
        }, {
            id: 222,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            phone: '0987654321',
            role: 'User'
        }, {
            id: 321,
            name: 'Michael Johnson',
            email: 'michael.johnson@example.com',
            phone: '1122334455',
            role: 'Moderator'
        }, {
            id: 421,
            name: 'Emily Davis',
            email: 'emily.davis@example.com',
            phone: '2233445566',
            role: 'User'
        }, {
            id: 521,
            name: 'David Brown',
            email: 'david.brown@example.com',
            phone: '3344556677',
            role: 'Admin'
        }, {
            id: 6,
            name: 'Sarah Wilson',
            email: 'sarah.wilson@example.com',
            phone: '4455667788',
            role: 'Moderator'
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

    const filteredUsers = users.filter(
        user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase())
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
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: 'bold',
                        color: '#0055A8'
                    }}>
                    <PersonIcon sx={{
                            mr: 1
                        }}/>
                    User Management
                </Typography>

                <Divider sx={{
                        mb: 2
                    }}/>

                <Grid
                    container="container"
                    spacing={2}
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                        mb: 2
                    }}>
                    <Grid item="item" xs={12} sm={8} md={6}>
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
                                placeholder="Search by name or email"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                fullWidth="fullWidth"/>
                        </Box>
                    </Grid>
                    <Grid item="item" xs={12} sm={4} md={6} textAlign="right">
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: '#005DB8',
                                color: 'white',
                                '&:hover' : {
                                    bgcolor: '#0076A8'
                                }
                            }}>
                            +New Users
                        </Button>
                    </Grid>
                </Grid>

                <TableContainer
                    component={Paper}
                    sx={{
                        borderRadius: '8px'
                    }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>No</StyledTableCell>
                                <StyledTableCell>ID</StyledTableCell>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Email</StyledTableCell>
                                <StyledTableCell>No Hp</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                filteredUsers.length > 0
                                    ? (
                                        filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
                                            <TableRow key={user.id}>
                                                <StyledTableCell>{index + 1 + page * rowsPerPage}</StyledTableCell>
                                                <StyledTableCell>{user.id}</StyledTableCell>
                                                <StyledTableCell>{user.name}</StyledTableCell>
                                                <StyledTableCell>{user.email}</StyledTableCell>
                                                <StyledTableCell>{user.phone}</StyledTableCell>
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
                                            <StyledTableCell colSpan={6} align="center">
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        color: '#888'
                                                    }}>
                                                    No User found.
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
                    count={filteredUsers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}/>
            </Paper>
        </Box>
    );
};

export default UserManagement;
