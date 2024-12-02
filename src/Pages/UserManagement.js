import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
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
    Modal,
    CircularProgress,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import AlignHorizontalRightIcon from '@mui/icons-material/AlignHorizontalRight';

// Styled TableCell for table styling
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    '&.MuiTableCell-head': {
        backgroundColor: '#EEEEEE',
        color: theme.palette.common.black,
        fontWeight: 'bold',
        fontSize: '1rem'
    },
    '&.MuiTableCell-body': {
        fontSize: 14,
        padding: '8px'
    }
}));

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        user_id: '',
        nama: '',
        email: '',
        role: 'pegawai',
        no_hp: '',
        kata_sandi: ''
    });
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = isEditing ? 'PUT' : 'POST';
        const url = isEditing
            ? `http://localhost:5000/api/users/${formData.user_id}`
            : 'http://localhost:5000/api/users';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                if (isEditing) {
                    setUsers(users.map(item => item.user_id === formData.user_id ? formData : item));
                } else {
                    setUsers([...users, data]);
                }
                handleCloseModal();
            })
            .catch(error => {
                console.error('Error:', error);
                alert("An error occurred while saving the data.");
            });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/users');
                const data = await response.json();
                const formattedData = data.map(user => ({
                    user_id: user.user_id,
                    nama: user.nama,
                    email: user.email,
                    role: user.role,
                    no_hp: user.no_hp
                }));
                setUsers(formattedData);
            } catch (error) {
                console.error('Error fetching data:', error);
                alert("An error occurred while fetching users.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleCancel = () => {
        setFormData({ user_id: '', nama: '', email: '', role: 'pegawai', no_hp: '', kata_sandi: '' });
        handleCloseModal();
    };

    const handleTambahData = () => {
        setIsEditing(false);
        setFormData({ user_id: '', nama: '', email: '', role: 'pegawai', no_hp: '', kata_sandi: '' });
        setOpenModal(true);
    };

    const handleEditData = (data) => {
        setIsEditing(true);
        setFormData(data);
        setOpenModal(true);
    };

    const handleDeleteData = (user_id) => {
        fetch(`http://localhost:5000/api/users/${user_id}`, { method: 'DELETE' })
            .then(() => {
                setUsers(users.filter(item => item.user_id !== user_id));
            })
            .catch(error => {
                console.error('Error:', error);
                alert("An error occurred while deleting the user.");
            });
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setFormData({ user_id: '', nama: '', email: '', role: 'pegawai', no_hp: '', kata_sandi: '' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchChange = (event) => setSearchTerm(event.target.value);

    const filteredUsers = users.filter(
        user =>
            user.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box sx={{ p: 2 }}>
            <Paper elevation={3} sx={{ borderRadius: '8px', p: 3 }}>
                <Typography
                    variant="h5"
                    sx={{ mb: 1, display: 'flex', alignItems: 'center', color: '#0055A8', fontWeight: 'bold' }}
                >
                    <AlignHorizontalRightIcon sx={{ mr: 1 }} />
                    User Management
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <SearchIcon sx={{ mr: 1 }} />
                        <TextField
                            variant="outlined"
                            size="small"
                            placeholder="Search by name or email"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </Box>
                    <Button
                        variant="contained"
                        onClick={handleTambahData}
                        sx={{ bgcolor: '#005DB8', color: 'white' }}
                    >
                        + New User
                    </Button>
                </Box>

                <TableContainer component={Paper} sx={{ borderRadius: '8px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>No</StyledTableCell>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Email</StyledTableCell>
                                <StyledTableCell>Phone</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : filteredUsers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        No User found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
                                    <TableRow key={user.user_id}>
                                        <StyledTableCell>{index + 1 + page * rowsPerPage}</StyledTableCell>
                                        <StyledTableCell>{user.nama}</StyledTableCell>
                                        <StyledTableCell>{user.email}</StyledTableCell>
                                        <StyledTableCell>{user.no_hp}</StyledTableCell>
                                        <StyledTableCell>
                                            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                                <Button
                                                    onClick={() => handleEditData(user)}
                                                    variant="contained"
                                                    sx={{
                                                        bgcolor: '#FF9707',
                                                        color: 'white',
                                                        borderRadius: '8px',
                                                        '&:hover': { bgcolor: '#FFA500' }
                                                    }}
                                                    startIcon={<EditIcon />}
                                                />
                                                <Button
                                                    onClick={() => handleDeleteData(user.user_id)}
                                                    variant="contained"
                                                    sx={{
                                                        bgcolor: '#FF1707',
                                                        color: 'white',
                                                        borderRadius: '8px',
                                                        ml: 1,
                                                        '&:hover': { bgcolor: '#FF4500' }
                                                    }}
                                                    startIcon={<DeleteIcon />}
                                                />
                                            </Box>
                                        </StyledTableCell>
                                    </TableRow>
                                ))
                            )}
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
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

                {/* Modal for Adding/Editing User */}
                <Modal open={openModal} onClose={handleCloseModal}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 550,
                            height: 500,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            borderRadius: 4,
                            p: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            {isEditing ? 'Edit User' : 'Add New User'}
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Name"
                                fullWidth
                                margin="normal"
                                name="nama"
                                value={formData.nama}
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                label="Email"
                                fullWidth
                                margin="normal"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            {!isEditing && (
                                <TextField
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    margin="normal"
                                    name="kata_sandi"
                                    value={formData.kata_sandi}
                                    onChange={handleChange}
                                    required
                                />
                            )}
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Role</InputLabel>
                                <Select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    label="Role"
                                    disabled={isEditing}
                                >
                                    <MenuItem value="pegawai">pegawai</MenuItem>
                                    <MenuItem value="admin">admin</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                label="Phone"
                                fullWidth
                                margin="normal"
                                name="no_hp"
                                value={formData.no_hp}
                                onChange={handleChange}
                                required
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                <Button variant="outlined" onClick={handleCancel}>
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    sx={{ bgcolor: '#005DB8', color: 'white' }}
                                >
                                    {isEditing ? 'Update' : 'Add'}
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Modal>
            </Paper>
        </Box>
    );
}

export default UserManagement;
