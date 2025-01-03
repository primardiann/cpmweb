import { useState, useEffect } from 'react'; 
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
    Select,
    MenuItem,
    Modal,
    IconButton,
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';

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

const ChangePartManagementReports = () => {
    const [reports, setReports] = useState([]);
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);

    // Ambil data CPM
    useEffect(() => {
        axios.get('http://localhost:5000/api/cpm')
            .then((response) => {
                setReports(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);

    // Ambil data kategori
    useEffect(() => {
        axios.get('http://localhost:5000/api/kategori')
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching categories!", error);
            });
    }, []);

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

    const handleDateFilterChange = (event) => {
        setDateFilter(event.target.value);
    };

    const handleCategoryFilterChange = (event) => {
        setCategoryFilter(event.target.value);
    };

    const handleOpenModal = (report) => {
        setSelectedReport(report);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedReport(null);
    };

    const filteredReports = reports.filter(report => {
        return (
            (report.kode_line.toLowerCase().includes(searchTerm.toLowerCase()) || report.nama_mesin.toLowerCase().includes(searchTerm.toLowerCase())) && (
                categoryFilter ? report.nama_kategori === categoryFilter : true
            ) && (
                dateFilter ? report.created_at.slice(0, 10) === dateFilter : true
            )
        );
    });

    return (
        <Box sx={{ p: 2 }}>
            <Paper elevation={3} sx={{ borderRadius: '8px', p: 3, mt: 5, ml: 2 }}>
                <Typography variant="h5" sx={{ mb: 1, display: 'flex', alignItems: 'center', color: '#0055A8', fontWeight: 'bold' }}>
                    <AssignmentIcon sx={{ mr: 1 }} /> Change Part Management Reports
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <SearchIcon sx={{ mr: 1 }} />
                        <TextField
                            variant="outlined"
                            size="small"
                            placeholder="Search by line or machine name"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                            type="date"
                            variant="outlined"
                            size="small"
                            value={dateFilter}
                            onChange={handleDateFilterChange}
                            sx={{ mr: 2 }}
                        />
                        <Select
                            value={categoryFilter}
                            onChange={handleCategoryFilterChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            variant="outlined"
                            size="small"
                            sx={{ mr: 2 }}
                        >
                            <MenuItem value="">
                                <em>All Process</em>
                            </MenuItem>
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.nama_kategori}>
                                    {category.nama_kategori}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                </Box>

                <TableContainer component={Paper} sx={{ mt: 2 }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#EBEBEB' }}>
                            <TableRow>
                                <StyledTableCell>No</StyledTableCell>
                                <StyledTableCell>Lines</StyledTableCell>
                                <StyledTableCell>Process</StyledTableCell>
                                <StyledTableCell>Machine Name</StyledTableCell>
                                <StyledTableCell>Specification</StyledTableCell>
                                <StyledTableCell>Nilai Standard</StyledTableCell>
                                <StyledTableCell>Actual Part</StyledTableCell>
                                <StyledTableCell>Judgment</StyledTableCell>
                                <StyledTableCell>Date</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredReports.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((report, index) => (
                                <TableRow key={report.id}>
                                    <StyledTableCell>{index + 1 + page * rowsPerPage}</StyledTableCell>
                                    <StyledTableCell>{report.kode_line}</StyledTableCell>
                                    <StyledTableCell>{report.nama_kategori}</StyledTableCell>
                                    <StyledTableCell>{report.nama_mesin}</StyledTableCell>
                                    <StyledTableCell>{report.nama_spesifikasi}</StyledTableCell>
                                    <StyledTableCell>{report.nilai_standar}</StyledTableCell>
                                    <StyledTableCell>{report.actual_part}</StyledTableCell>
                                    <StyledTableCell>
                                        <Typography
                                            sx={{
                                                color: report.judgment === 'OK' ? '#4BCE97' :
                                                    report.judgment === 'NG' ? '#FF1707' :
                                                        '#FFCC01', fontSize: '14px'
                                            }}
                                        >
                                            {report.judgment}
                                        </Typography>
                                    </StyledTableCell>
                                    <StyledTableCell>{report.created_at.slice(0, 10)}</StyledTableCell>
                                    <StyledTableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            onClick={() => handleOpenModal(report)}
                                        >
                                            View
                                        </Button>
                                    </StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredReports.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            {/* Modal Detail */}
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '60%',
                    bgcolor: 'white',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 3
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6" id="modal-title" sx={{ fontWeight: 'bold', color: '#0055A8' }}>
                            Detail Change Part Management Report
                        </Typography>
                        <IconButton onClick={handleCloseModal}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <Box>
                        {selectedReport && (
                            <>
                                <Typography><strong>Machine Name:</strong> {selectedReport.nama_mesin}</Typography>
                                <Typography><strong>Specification:</strong> {selectedReport.nama_spesifikasi}</Typography>
                                <Typography><strong>Model Running:</strong> {selectedReport.nilai_standar}</Typography>
                                <Typography><strong>Actual Part:</strong> {selectedReport.actual_part}</Typography>
                                <Typography><strong>Judgment:</strong> {selectedReport.judgment}</Typography>
                                <Typography><strong>Date:</strong> {selectedReport.created_at}</Typography>
                                
                            </>
                        )}
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default ChangePartManagementReports;
