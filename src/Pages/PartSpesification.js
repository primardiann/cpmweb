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
    DialogTitle,
    MenuItem,
} from '@mui/material';
import { Select } from '@mui/material';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
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

const ResponsiveButtonContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(1),
    flexWrap: 'wrap',
}));

const PartSpecification = () => {
    const [specifications, setSpecifications] = useState([]);
    const [mesin, setMachines] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [loading, setLoading] = useState(true);
    const [newSpecification, setNewSpecification] = useState({
        kategori_id: '',
        nama_spesifikasi: '',
        nilai_standar: '',
    });
    const [editingSpecification, setEditingSpecification] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        fetchSpecifications();
        fetchMachines();
    }, []);

    const fetchSpecifications = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/spesifikasi');
            setSpecifications(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching specifications:', error);
            setLoading(false);
        }
    };

    const fetchMachines = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/mesin');
            setMachines(data);
        } catch (error) {
            console.error('Error fetching machines:', error);
        }
    };

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleSearchChange = (event) => setSearchTerm(event.target.value);
    const handleCategoryFilterChange = (event) => setCategoryFilter(event.target.value);

    const filteredSpecifications = specifications.filter((specification) =>
        specification.nama_spesifikasi.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (categoryFilter === '' || specification.kategori_id === categoryFilter)
    );

    const handleDialogOpen = (specification = null) => {
        if (specification) {
            setEditingSpecification(specification);
            setNewSpecification({
                mesin_id: specification.mesin_id,
                nama_spesifikasi: specification.nama_spesifikasi,
                nilai_standar: specification.nilai_standar,
            });
        } else {
            setEditingSpecification(null);
            setNewSpecification({ mesin_id: '', nama_spesifikasi: '', nilai_standar: '' });
        }
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setEditingSpecification(null);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewSpecification((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const addSpecification = async () => {
        if (!newSpecification.mesin_id || !newSpecification.nama_spesifikasi || !newSpecification.nilai_standar) {
            alert('All fields are required!');
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/spesifikasi', newSpecification);
            alert('Specification added successfully');
            fetchSpecifications();
            handleDialogClose();
        } catch (error) {
            console.error('Error adding specification:', error);
        }
    };

    const updateSpecification = async () => {
        if (!newSpecification.mesin_id || !newSpecification.nama_spesifikasi || !newSpecification.nilai_standar) {
            alert('All fields are required!');
            return;
        }

        try {
            await axios.put(
                `http://localhost:5000/api/spesifikasi/${editingSpecification.spesifikasi_id}`,
                newSpecification
            );
            alert('Specification updated successfully');
            fetchSpecifications();
            handleDialogClose();
        } catch (error) {
            console.error('Error updating specification:', error);
        }
    };

    const deleteSpecification = async (spesifikasi_id) => {
        try {
            await axios.delete(`http://localhost:5000/api/spesifikasi/${spesifikasi_id}`);
            alert('Specification deleted successfully');
            fetchSpecifications();
        } catch (error) {
            console.error('Error deleting specification:', error);
        }
    };

    return (
        <Box sx={{ p: 1 }}>
            <Paper elevation={3} sx={{ borderRadius: '8px', p: 3, mt: 5, ml: 2}}>
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
                    <AccountTreeIcon sx={{ mr: 1 }} />
                    Part Specification Management
                </Typography>
                <Divider sx={{ mb: 2 }} />

                {/* Filters */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <SearchIcon sx={{ mr: 1 }} />
                        <TextField
                            variant="outlined"
                            size="small"
                            placeholder="Search by specification name"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Select
                            value={categoryFilter}
                            onChange={handleCategoryFilterChange}
                            displayEmpty
                            variant="outlined"
                            size="small"
                            sx={{ mr: 2 }}
                        >
                            <MenuItem value="">
                                <em>All Process</em>
                            </MenuItem>
                            {mesin.map((category) => (
                                <MenuItem key={mesin.mesn_id} value={mesin.mesin_id}>
                                    {mesin.nama_mesin}
                                </MenuItem>
                            ))}
                        </Select>
                        <Button
                            variant="contained"
                            sx={{ bgcolor: '#005DB8', color: 'white' }}
                            onClick={() => handleDialogOpen()}
                        >
                            + New Specification
                        </Button>
                    </Box>
                </Box>

                <TableContainer component={Paper} sx={{ borderRadius: '8px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>No</StyledTableCell>
                                <StyledTableCell>Machine</StyledTableCell>
                                <StyledTableCell>Specification Name</StyledTableCell>
                                <StyledTableCell>Model Running</StyledTableCell>
                                <StyledTableCell>Stock</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        Loading...
                                    </TableCell>
                                </TableRow>
                            ) : filteredSpecifications.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        No Specifications found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredSpecifications
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((specification, index) => (
                                        <TableRow key={specification.spesifikasi_id}>
                                            <StyledTableCell>
                                                {index + 1 + page * rowsPerPage}
                                            </StyledTableCell>
                                            <StyledTableCell>{specification.nama_mesin}</StyledTableCell>
                                            <StyledTableCell>{specification.nama_spesifikasi}</StyledTableCell>
                                            <StyledTableCell>{specification.nilai_standar}</StyledTableCell>
                                            <StyledTableCell>{specification.stok}</StyledTableCell> {/* masimenggunakan data dummy*/}
                                            <StyledTableCell>
                                                <ResponsiveButtonContainer>
                                                    <Button
                                                        variant="contained"
                                                        sx={{
                                                            bgcolor: '#FF9707',
                                                            color: 'white',
                                                            borderRadius: '8px',
                                                        }}
                                                        startIcon={<EditIcon />}
                                                        onClick={() => handleDialogOpen(specification)}
                                                    />
                                                    <Button
                                                        variant="contained"
                                                        sx={{
                                                            bgcolor: '#FF1707',
                                                            color: 'white',
                                                            borderRadius: '8px',
                                                        }}
                                                        startIcon={<DeleteIcon />}
                                                        onClick={() => deleteSpecification(specification.spesifikasi_id)}
                                                    />
                                                </ResponsiveButtonContainer>
                                            </StyledTableCell>
                                        </TableRow>
                                    ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[10, 25, 50, 75, 100]}
                    component="div"
                    count={filteredSpecifications.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            {/* Dialog for Add/Edit */}
<Dialog open={openDialog} onClose={handleDialogClose} fullWidth maxWidth="sm"
    sx={{
        '& .MuiDialog-paper': {
            width: '550px',
            height: '460px',
            maxWidth: 'none',
        },
    }}
>
    <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        {editingSpecification ? 'Edit Specification' : 'Add New Specification'}
    </DialogTitle>
    <DialogContent>
        {/* Specification Name */}
        <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body1" sx={{ width: '185px', height: '30px', padding: '5px 8px' }}>
                Specification Name:
            </Typography>
            <TextField
                margin="dense"
                fullWidth
                value={newSpecification.nama_spesifikasi || ''}
                onChange={handleInputChange}
                name="nama_spesifikasi"
            />
        </Box>
        {/* Category */}
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body1" sx={{ width: '185px', height: '30px', padding: '5px 8px' }}>
                Process:
            </Typography>
            <Select
                margin="dense"
                fullWidth
                name="mesin_id"
                value={newSpecification.mesin_id || ''}
                onChange={handleInputChange}
            >
                {mesin.map((mesin) => (
                    <MenuItem key={mesin.mesin_id} value={mesin.mesin_id}>
                        {mesin.nama_mesin}
                    </MenuItem>
                ))}
            </Select>
        </Box>
        {/* Standard Value */}
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body1" sx={{ width: '185px', height: '30px', padding: '5px 8px' }}>
                Model Running:
            </Typography>
            <TextField
                margin="dense"
                fullWidth
                value={newSpecification.nilai_standar || ''}
                onChange={handleInputChange}
                name="nilai_standar"
            />
        </Box>
    </DialogContent>
    <DialogActions>
        <Button
            variant="contained"
            onClick={handleDialogClose}
            sx={{
                bgcolor: '#7F7F7F',
                color: 'white',
                '&:hover': {
                    bgcolor: '#7F7F7F',
                },
                width: '100px',
            }}
        >
            Cancel
        </Button>
        <Button
            onClick={editingSpecification ? updateSpecification : addSpecification}
            sx={{
                bgcolor: '#0055A8',
                color: 'white',
            }}
        >
            {editingSpecification ? 'Save Changes' : 'Add Specification'}
        </Button>
    </DialogActions>
</Dialog>

        </Box>
    );
};

export default PartSpecification;
