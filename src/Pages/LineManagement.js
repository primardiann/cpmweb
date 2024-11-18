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

const LineManagement = () => {
    const [lines, setLines] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [newLine, setNewLine] = useState({ kode_line: '', lokasi: '' });
    const [editingLine, setEditingLine] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        fetchLines();
    }, []);

    const fetchLines = async () => {
        try {
            const response = await axios.get('http://localhost:5000/line');
            setLines(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleSearchChange = (event) => setSearchTerm(event.target.value);

    const filteredLines = lines.filter(
        (line) => line.kode_line && line.kode_line.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDialogOpen = (line = null) => {
        if (line) {
            setEditingLine(line);
            setNewLine({ kode_line: line.kode_line, lokasi: line.lokasi });
        } else {
            setEditingLine(null);
            setNewLine({ kode_line: '', lokasi: '' });
        }
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setEditingLine(null);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewLine((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const addLine = async () => {
        if (!newLine.kode_line || !newLine.lokasi) {
            alert('Kode Line dan Lokasi wajib diisi!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/line', newLine);
            alert(response.data.message);
            fetchLines();
            handleDialogClose();
        } catch (error) {
            console.error('Error adding line:', error);
        }
    };

    const updateLine = async () => {
        if (!newLine.kode_line || !newLine.lokasi) {
            alert('Kode Line dan Lokasi wajib diisi!');
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:5000/line/${editingLine.line_id}`, // Menggunakan line_id
                newLine
            );
            alert(response.data.message);
            fetchLines();
            handleDialogClose();
        } catch (error) {
            console.error('Error updating line:', error);
        }
    };

    const deleteLine = async (line_id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/line/${line_id}`);
            alert(response.data.message);
            fetchLines();
        } catch (error) {
            console.error('Error deleting line:', error);
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            <Paper elevation={3} sx={{ borderRadius: '8px', p: 3 }}>
                <Typography variant="h5" sx={{ mb: 1, display: 'flex', alignItems: 'center', color: '#0055A8', fontWeight: 'bold' }}>
                    <AlignHorizontalRightIcon sx={{ mr: 1 }} />
                    Line Management
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <SearchIcon sx={{ mr: 1 }} />
                        <TextField variant="outlined" size="small" placeholder="Search by line name" value={searchTerm} onChange={handleSearchChange} />
                    </Box>
                    <Button variant="contained" sx={{ bgcolor: '#005DB8', color: 'white' }} onClick={() => handleDialogOpen()}>
                        + New Line
                    </Button>
                </Box>

                <TableContainer component={Paper} sx={{ borderRadius: '8px' }}>
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
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">Loading...</TableCell>
                                </TableRow>
                            ) : filteredLines.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">No Line found</TableCell>
                                </TableRow>
                            ) : (
                                filteredLines.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((line, index) => (
                                    <TableRow key={line.line_id}> {/* Menggunakan line_id */}
                                        <StyledTableCell>{index + 1 + page * rowsPerPage}</StyledTableCell>
                                        <StyledTableCell>{line.kode_line}</StyledTableCell>
                                        <StyledTableCell>{line.lokasi}</StyledTableCell>
                                        <StyledTableCell>
                                            <Button variant="contained" sx={{ bgcolor: '#FF9707', color: 'white', borderRadius: '8px' }} startIcon={<EditIcon />} onClick={() => handleDialogOpen(line)} />
                                            <Button variant="contained" sx={{ bgcolor: '#FF1707', color: 'white', borderRadius: '8px', ml: 1 }} startIcon={<DeleteIcon />} onClick={() => deleteLine(line.line_id)} />
                                        </StyledTableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={filteredLines.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
            </Paper>

            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>{editingLine ? 'Edit Line' : 'Add New Line'}</DialogTitle>
                <DialogContent>
                    <TextField label="Line Name" name="kode_line" fullWidth value={newLine.kode_line} onChange={handleInputChange} sx={{ mb: 2 }} />
                    <TextField label="Location" name="lokasi" fullWidth value={newLine.lokasi} onChange={handleInputChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button variant="contained" sx={{ bgcolor: '#005DB8', color: 'white' }} onClick={editingLine ? updateLine : addLine}>
                        {editingLine ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default LineManagement;
