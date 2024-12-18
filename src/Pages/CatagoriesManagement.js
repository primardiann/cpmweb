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
        fontSize: '1rem'
    },
    [`&.MuiTableCell-body`]: {
        fontSize: 14,
        padding: '8px'
    }
}));

const CategoriesManagement = () => {
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [newCategory, setNewCategory] = useState({ nama_kategori: '' });
    const [editingCategory, setEditingCategory] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/kategori');
            setCategories(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching process:', error);
            setLoading(false);
        }
    };

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleSearchChange = (event) => setSearchTerm(event.target.value);

    const filteredCategories = categories.filter(
        (category) => category.nama_kategori.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDialogOpen = (category = null) => {
        if (category) {
            setEditingCategory(category);
            setNewCategory({ nama_kategori: category.nama_kategori });
        } else {
            setEditingCategory(null);
            setNewCategory({ nama_kategori: '' });
        }
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setEditingCategory(null);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewCategory((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const addCategory = async () => {
        if (!newCategory.nama_kategori) {
            alert('Category name is required!');
            return;
        }

        try {
            await axios.post(
                'http://localhost:5000/api/kategori',
                newCategory
            );
            alert('Process added successfully');
            fetchCategories();
            handleDialogClose();
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const updateCategory = async () => {
        if (!newCategory.nama_kategori) {
            alert('Category name is required!');
            return;
        }

        try {
            await axios.put(
                `http://localhost:5000/api/kategori/${editingCategory.kategori_id}`,
                newCategory
            );
            alert('Process updated successfully');
            fetchCategories();
            handleDialogClose();
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const deleteCategory = async (kategori_id) => {
        try {
            await axios.delete(
                `http://localhost:5000/api/kategori/${kategori_id}`
            );
            alert('Process deleted successfully');
            fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
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
                        fontWeight: 'bold'
                    }}
                >
                    <AlignHorizontalRightIcon sx={{ mr: 1 }} />
                    Process Management
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <SearchIcon sx={{ mr: 1 }} />
                        <TextField
                            variant="outlined"
                            size="small"
                            placeholder="Search by category name"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </Box>
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: '#005DB8',
                            color: 'white',
                            
                            padding: '6px 12px',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        onClick={() => handleDialogOpen()}
                    >
                        + New Process
                    </Button>
                </Box>

                <TableContainer component={Paper} sx={{ borderRadius: '8px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>No</StyledTableCell>
                                <StyledTableCell>Process Name</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        Loading...
                                    </TableCell>
                                </TableRow>
                            ) : filteredCategories.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        No Process found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredCategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category, index) => (
                                    <TableRow key={category.kategori_id}>
                                        <StyledTableCell>
                                            {index + 1 + page * rowsPerPage}
                                        </StyledTableCell>
                                        <StyledTableCell>{category.nama_kategori}</StyledTableCell>
                                        <StyledTableCell>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    bgcolor: '#FF9707',
                                                    color: 'white',
                                                    borderRadius: '8px'
                                                }}
                                                startIcon={<EditIcon />}
                                                onClick={() => handleDialogOpen(category)}
                                            />
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    bgcolor: '#FF1707',
                                                    color: 'white',
                                                    borderRadius: '8px',
                                                    ml: 1
                                                }}
                                                startIcon={<DeleteIcon />}
                                                onClick={() => deleteCategory(category.kategori_id)}
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
                    count={filteredCategories.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            <Dialog open={openDialog} onClose={handleDialogClose}  sx={{
                '& .MuiDialog-paper': {
                    width: '550px',     
                    height: '240px',    
                    maxWidth: 'none',   
                    },
                    }}>
                <DialogTitle  sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                    {editingCategory ? 'Edit Process' : 'Add New Process'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body1" sx={{ width: '185px', height: '30px', padding: '5px 8px' }}>
                            Process :
                        </Typography>
                        <TextField
                        fullWidth
                        value={newCategory.nama_kategori|| ''}
                        onChange={handleInputChange}
                        name="nama_kategori"
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                <Button variant="contained" onClick={handleDialogClose}
                        sx={{
                            bgcolor: '#7F7F7F',
                            color: 'white',
                            '&:hover' : {
                            bgcolor: '#7F7F7F'
                            },
                            width: '100px',
                            }}>
                            Cancel
                    </Button>
                    <Button
                        onClick={editingCategory ? updateCategory : addCategory}
                        sx={{ bgcolor: '#0055A8', color: 'white' }}
                    >
                        {editingCategory ? 'Save Changes' : 'Add Category'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CategoriesManagement;
