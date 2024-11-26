import React, { useState, useEffect } from 'react';
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
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@mui/material';
import AlignHorizontalRightIcon from '@mui/icons-material/AlignHorizontalRight';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.MuiTableCell-head`]: {
        backgroundColor: '#EEEEEE',
        color: theme.palette.common.black,
        fontWeight: 'bold',
        fontSize: '1rem',
    },
    [`&.MuiTableCell-body`]: {
        fontSize: 14,
        padding: '8px',
    },
}));

const MachineManagement = () => {
    const [machines, setMachines] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [newMachine, setNewMachine] = useState({ nama_mesin: '', kode_mesin: '', line_id: '', kategori_id: '' });
    const [editingMachine, setEditingMachine] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        fetchMachines();
    }, []);

    const fetchMachines = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/mesin');
            setMachines(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching machines:', error);
            setLoading(false);
        }
    };

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleSearchChange = (event) => setSearchTerm(event.target.value);

    const filteredMachines = machines.filter((machine) =>
        machine.nama_mesin.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDialogOpen = (machine = null) => {
        if (machine) {
            setEditingMachine(machine);
            setNewMachine({ nama_mesin: machine.nama_mesin, kode_mesin: machine.kode_mesin, line_id: machine.line_id, kategori_id: machine.kategori_id });
        } else {
            setEditingMachine(null);
            setNewMachine({ nama_mesin: '', kode_mesin: '', line_id: '', kategori_id: '' });
        }
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setEditingMachine(null);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewMachine((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const addMachine = async () => {
        if (!newMachine.nama_mesin || !newMachine.kode_mesin || !newMachine.line_id || !newMachine.kategori_id) {
            alert('All fields are required!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/mesin', newMachine);
            alert('Machine added successfully');
            fetchMachines();
            handleDialogClose();
        } catch (error) {
            console.error('Error adding machine:', error);
        }
    };

    const updateMachine = async () => {
        if (!newMachine.nama_mesin || !newMachine.kode_mesin || !newMachine.line_id || !newMachine.kategori_id) {
            alert('All fields are required!');
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:5000/api/mesin/${editingMachine.mesin_id}`,
                newMachine
            );
            alert('Machine updated successfully');
            fetchMachines();
            handleDialogClose();
        } catch (error) {
            console.error('Error updating machine:', error);
        }
    };

    const deleteMachine = async (mesin_id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/mesin/${mesin_id}`);
            alert('Machine deleted successfully');
            fetchMachines();
        } catch (error) {
            console.error('Error deleting machine:', error);
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            <Paper elevation={3} sx={{ borderRadius: '8px', p: 3 }}>
                <Typography
                    variant="h5"
                    sx={{
                        mb: 1,
                        display: 'flex',
                        alignItems: 'center',
                        color: '#0055A8',
                        fontWeight: 'bold',
                    }}
                >
                    <AlignHorizontalRightIcon sx={{ mr: 1 }} />
                    Machine Management
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 2,
                        alignItems: 'center',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <SearchIcon sx={{ mr: 1 }} />
                        <TextField
                            variant="outlined"
                            size="small"
                            placeholder="Search by machine name"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </Box>
                    <Button
                        variant="contained"
                        sx={{ bgcolor: '#005DB8', color: 'white' }}
                        onClick={() => handleDialogOpen()}
                    >
                        + New Machine
                    </Button>
                </Box>

                <TableContainer component={Paper} sx={{ borderRadius: '8px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>No</StyledTableCell>
                                <StyledTableCell>Machine Name</StyledTableCell>
                                <StyledTableCell>Machine Code</StyledTableCell>
                                <StyledTableCell>Line</StyledTableCell>
                                <StyledTableCell>Category</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        Loading...
                                    </TableCell>
                                </TableRow>
                            ) : filteredMachines.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        No Machines found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredMachines
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((machine, index) => (
                                        <TableRow key={machine.mesin_id}>
                                            <StyledTableCell>
                                                {index + 1 + page * rowsPerPage}
                                            </StyledTableCell>
                                            <StyledTableCell>{machine.nama_mesin}</StyledTableCell>
                                            <StyledTableCell>{machine.kode_mesin}</StyledTableCell>
                                            <StyledTableCell>{machine.kode_line}</StyledTableCell>
                                            <StyledTableCell>{machine.nama_kategori}</StyledTableCell>
                                            <StyledTableCell>
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        bgcolor: '#FF9707',
                                                        color: 'white',
                                                        borderRadius: '8px',
                                                    }}
                                                    startIcon={<EditIcon />}
                                                    onClick={() => handleDialogOpen(machine)}
                                                />
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        bgcolor: '#FF1707',
                                                        color: 'white',
                                                        borderRadius: '8px',
                                                        ml: 1,
                                                    }}
                                                    startIcon={<DeleteIcon />}
                                                    onClick={() => deleteMachine(machine.mesin_id)}
                                                />
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
                    count={filteredMachines.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>{editingMachine ? 'Edit Machine' : 'Add New Machine'}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Machine Name"
                        name="nama_mesin"
                        value={newMachine.nama_mesin}
                        onChange={handleInputChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Machine Code"
                        name="kode_mesin"
                        value={newMachine.kode_mesin}
                        onChange={handleInputChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Line ID"
                        name="line_id"
                        value={newMachine.line_id}
                        onChange={handleInputChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Category ID"
                        name="kategori_id"
                        value={newMachine.kategori_id}
                        onChange={handleInputChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={editingMachine ? updateMachine : addMachine} color="primary">
                        {editingMachine ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default MachineManagement;
