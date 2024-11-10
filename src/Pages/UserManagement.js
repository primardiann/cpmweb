import React, {useState, useEffect} from 'react';
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import AlignHorizontalRightIcon from '@mui/icons-material/AlignHorizontalRight';

// Styled TableCell untuk styling tabel
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
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
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

    const filteredUsers = users.filter(
        user => user.nama && user.nama.toLowerCase().includes(searchTerm.toLowerCase())
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
                    User Management
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
                            placeholder="Search by name"
                            value={searchTerm}
                            onChange={handleSearchChange}/>
                    </Box>
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: '#005DB8',
                            color: 'white'
                        }}>
                        + New User
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
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Email</StyledTableCell>
                                <StyledTableCell>Role</StyledTableCell>
                                <StyledTableCell>Phone</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                loading
                                    ? (
                                        <TableRow>
                                            <TableCell colSpan={6} align="center">
                                                Loading...
                                            </TableCell>
                                        </TableRow>
                                    )
                                    : filteredUsers.length === 0
                                        ? (
                                            <TableRow>
                                                <TableCell colSpan={6} align="center">
                                                    No User found
                                                </TableCell>
                                            </TableRow>
                                        )
                                        : (
                                            filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
                                                <TableRow key={user.user_id}>
                                                    <StyledTableCell>{index + 1 + page * rowsPerPage}</StyledTableCell>
                                                    <StyledTableCell>{user.nama}</StyledTableCell>
                                                    <StyledTableCell>{user.email}</StyledTableCell>
                                                    <StyledTableCell>{user.role}</StyledTableCell>
                                                    <StyledTableCell>{user.no_hp}</StyledTableCell>
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
