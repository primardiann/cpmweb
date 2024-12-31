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
    Divider,
    Card,
    Select,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SearchIcon from '@mui/icons-material/Search';
import AssessmentIcon from '@mui/icons-material/Assessment';

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

const ChangePartManagementReportsEmployee = () => {
    const reports = [
        {
            id: 1,
            line: 'Line 1',
            category: 'Winding',
            machineName: 'Machine A',
            date: '2024-10-01',
            status: 'Approved'
        }, {
            id: 2,
            line: 'Line 2',
            category: 'Welding',
            machineName: 'Machine B',
            date: '2024-10-02',
            status: 'Pending'
        }, {
            id: 3,
            line: 'Line 3',
            category: 'Assembly',
            machineName: 'Machine C',
            date: '2024-10-03',
            status: 'Rejected'
        }, {
            id: 4,
            line: 'Line 1',
            category: 'Winding',
            machineName: 'Machine D',
            date: '2024-10-04',
            status: 'Approved'
        }, {
            id: 5,
            line: 'Line 2',
            category: 'Welding',
            machineName: 'Machine E',
            date: '2024-10-05',
            status: 'Pending'
        }, {
            id: 6,
            line: 'Line 3',
            category: 'Assembly',
            machineName: 'Machine F',
            date: '2024-10-06',
            status: 'Rejected'
        }, {
            id: 7,
            line: 'Line 1',
            category: 'Winding',
            machineName: 'Machine G',
            date: '2024-10-07',
            status: 'Approved'
        }, {
            id: 8,
            line: 'Line 2',
            category: 'Welding',
            machineName: 'Machine H',
            date: '2024-10-08',
            status: 'Pending'
        }, {
            id: 9,
            line: 'Line 3',
            category: 'Assembly',
            machineName: 'Machine I',
            date: '2024-10-09',
            status: 'Rejected'
        }, {
            id: 10,
            line: 'Line 1',
            category: 'Winding',
            machineName: 'Machine J',
            date: '2024-10-10',
            status: 'Approved'
        }
    ];

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [open, setOpen] = useState(false);
    const [openDetailModal, setOpenDetailModal] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenDetailModal = (report) => {
        setSelectedReport(report);
        setOpenDetailModal(true);
    };

    const handleCloseDetailModal = () => {
        setOpenDetailModal(false);
        setSelectedReport(null);
    };

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

    const filteredReports = reports.filter(report => {
        return (
            (report.machineName.toLowerCase().includes(searchTerm.toLowerCase()) || report.line.toLowerCase().includes(searchTerm.toLowerCase())) && (
                categoryFilter ? report.category === categoryFilter : true
            ) && (
                dateFilter ? report.date === dateFilter : true
            )
        );
    });

    return (
        <Box sx={{ p: 2 }}>
            <Paper elevation={3} sx={{ borderRadius: '8px', p: 3, mt: 5, ml: 2}}>
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
                                <em>All Categories</em>
                            </MenuItem>
                            <MenuItem value="Winding">Winding</MenuItem>
                            <MenuItem value="Welding">Welding</MenuItem>
                            <MenuItem value="Assembly">Assembly</MenuItem>
                        </Select>
                        <Button variant="contained" onClick={handleOpen} sx={{ bgcolor: '#005DB8', color: 'white' }}>
                            + Input
                        </Button>
                        
                        {/* Modal/Form Input CPM */}
                        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                        <DialogTitle  sx={{ textAlign: 'center', fontWeight: 'bold' }}>CPM Reports Input</DialogTitle>
                        <DialogContent>
                        {/* Lines */}
                        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body1" sx={{ width: '167px',height: '30px', padding: '5px 8px' }}>Lines:</Typography>
                              <Select fullWidth defaultValue="" sx={{ flex: 1 }}>
                                <MenuItem value="Line 1">PCL Line#01</MenuItem>
                                <MenuItem value="Line 2">PCL Line#02</MenuItem>
                             </Select>
                        </Box>

                     {/* Machine Category */}
                     <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                         <Typography variant="body1" sx={{ width: '185px',height: '30px', padding: '5px 8px', whiteSpace: 'nowrap' }}>Machine Category:</Typography>
                           <Select fullWidth defaultValue="">
                              <MenuItem value="Winding">Winding</MenuItem>
                              <MenuItem value="Welding">Welding</MenuItem>
                              <MenuItem value="Assembly">Assembly</MenuItem>
                          </Select>
                    </Box>  

                     {/* Machine Name/ID */}
                     <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                         <Typography variant="body1" sx={{ width: '185px',height: '30px', padding: '5px 8px', whiteSpace: 'nowrap' }}>Machine Name/ID:</Typography>
                           <Select fullWidth defaultValue="">
                              <MenuItem value="Machine A">Machine A</MenuItem>
                              <MenuItem value="Machine B">Machine B</MenuItem>
                              <MenuItem value="Machine C">Machine C</MenuItem>
                          </Select>
                     </Box>

                     <TableContainer component={Paper} sx={{ mt: 2 }}>
                            <Table>
                                <TableHead sx={{ backgroundColor: '#EBEBEB' }}>
                                    <TableRow>
                                        <TableCell sx={{ fontSize: '16px' }}>Specification</TableCell>
                                        <TableCell sx={{ fontSize: '16px' }}>Model Running</TableCell>
                                        <TableCell sx={{ fontSize: '16px' }}>Actual Part</TableCell>
                                        <TableCell sx={{ fontSize: '16px' }}>Qty</TableCell>
                                        <TableCell sx={{ fontSize: '16px' }}>Judgment</TableCell>
                                    </TableRow>
                                </TableHead>
                    <TableBody>
                      {Array.from({ length: 3 }).map((_, index) => (
                      <TableRow key={index}>
                         <TableCell>Specification {index + 1}</TableCell>
                        <TableCell>Model Running</TableCell>
                        <TableCell><TextField size="small" /></TableCell>
                        <TableCell><TextField size="small" /></TableCell>
                        <TableCell>
                     <Typography
                        sx={{
                               color: index === 0 ? '#4BCE97' : 
                               index === 1 ? '#FF1707' : 
                               '#FFCC01', fontSize:'14px'
                            }}>
                            #AUTO
                  </Typography>
            </TableCell>
        </TableRow>
                  ))}
                      </TableBody>
                             </Table>
                                </TableContainer>
                               {/* Verifikasi */}
                               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 3 }}>
                               <Typography variant="body1">Verifikasi:</Typography>
                               <TextField
                               placeholder="Enter Verification"
                               multiline
                               rows={3} 
                               sx={{
                               flex: 1,
                               minHeight: '80px', 
                               width: '300px',
                               }}
                               />
                                </Box>
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={handleClose}  
                            sx={{
                            bgcolor: '#7F7F7F',
                            color: 'white',
                            '&:hover' : {
                            bgcolor: '#7F7F7F'
                            },
                            width: '100px',
                            }}>Cancel</Button>
                           <Button sx={{ bgcolor: '#0055A8', color: 'white' }}>Submit</Button>
                           </DialogActions>
                        </Dialog>
                    </Box>
                </Box>

                <TableContainer component={Paper} sx={{ borderRadius: '8px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>No</StyledTableCell>
                                <StyledTableCell>Lines</StyledTableCell>
                                <StyledTableCell>Machine Category</StyledTableCell>
                                <StyledTableCell>Machine Name</StyledTableCell>
                                <StyledTableCell>Date</StyledTableCell>
                                <StyledTableCell>Status</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredReports.length > 0
                                ? filteredReports
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((report, index) => (
                                        <TableRow key={report.id}>
                                            <StyledTableCell>{index + 1 + page * rowsPerPage}</StyledTableCell>
                                            <StyledTableCell>{report.line}</StyledTableCell>
                                            <StyledTableCell>{report.category}</StyledTableCell>
                                            <StyledTableCell>{report.machineName}</StyledTableCell>
                                            <StyledTableCell>{report.date}</StyledTableCell>
                                            <StyledTableCell>
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        bgcolor: report.status === 'Approved'
                                                            ? '#4BCE97'
                                                            : report.status === 'Rejected'
                                                                ? '#FF1707'
                                                                : '#FFCC01',
                                                        color: 'white',
                                                        fontWeight: 'bold'
                                                    }}
                                                >
                                                    {report.status}
                                                </Button>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                            <Card
                                            onClick={() => handleOpenDetailModal(report)}
                                                        sx={{
                                                            width: '80px',
                                                            height: '40px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            bgcolor: '#1B80E3',
                                                            boxShadow: 1,
                                                            transition: '0.3s',
                                                            '&:hover' : {
                                                                transform: 'scale(1.05)'
                                                            }
                                                        }}>
                                                        <AssessmentIcon
                                                            sx={{
                                                                color: 'white'
                                                            }}/>
                                                    </Card>
                                                </StyledTableCell>
                                        </TableRow>
                                    ))
                                : (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center">
                                            <Typography color="textSecondary">No records found</Typography>
                                        </TableCell>
                                    </TableRow>
                                )
                            }
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

  {/* Detail Modal CPM */}
  <Dialog open={openDetailModal} onClose={handleCloseDetailModal} maxWidth="md" fullWidth>
    <DialogTitle  sx={{ textAlign: 'center', fontWeight: 'bold' }}>Detail CPM Reports</DialogTitle>
    <DialogContent>
        {/* Report ID */}
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body1" sx={{ width: '185px', height: '30px', padding: '5px 8px', whiteSpace: 'nowrap' }}>Report ID:</Typography>
            <TextField fullWidth value={`#${selectedReport?.id || ''}`} />
        </Box>

        {/* Line */}
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body1" sx={{ width: '185px', height: '30px', padding: '5px 8px', whiteSpace: 'nowrap' }}>Line:</Typography>
            <TextField fullWidth value={`#${selectedReport?.line || ''}`} />
        </Box>

        {/* Machine Category */}
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body1" sx={{ width: '182px', height: '30px', padding: '5px 8px', whiteSpace: 'nowrap' }}>Machine Category:</Typography>
            <TextField fullWidth value={selectedReport?.category || ''} />
        </Box>

        {/* Machine Name/ID */}
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body1" sx={{ width: '185px', height: '30px', padding: '5px 8px', whiteSpace: 'nowrap' }}>Machine Name/ID:</Typography>
            <TextField fullWidth value={selectedReport?.machineName || ''} />
        </Box>

        {/* Specifications Table */}
        <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
                <TableHead sx={{ backgroundColor: '#EBEBEB' }}>
                    <TableRow>
                        <TableCell sx={{ fontSize: '16px' }}>Specification</TableCell>
                        <TableCell sx={{ fontSize: '16px' }}>Model Running</TableCell>
                        <TableCell sx={{ fontSize: '16px' }}>Actual Part</TableCell>
                        <TableCell sx={{ fontSize: '16px' }}>Qty</TableCell>
                        <TableCell sx={{ fontSize: '16px' }}>Judgment</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                        <TableRow>
                            <TableCell>Specification 1</TableCell>
                            <TableCell>Model Running 1</TableCell>
                            <TableCell>
                                <TextField size="small" value="Actual Part 1" sx={{ color: 'black', fontSize:'14px' }} />
                            </TableCell>
                            <TableCell>
                                <TextField size="small" value="10" sx={{ color: 'black', fontSize:'14px'}} />
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ color: 'green', fontSize: '14px' }}>#OK</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Specification 2</TableCell>
                            <TableCell>Model Running 2</TableCell>
                            <TableCell>
                                <TextField size="small" value="Actual Part 2" sx={{ color: 'black', fontSize:'14px' }} />
                            </TableCell>
                            <TableCell>
                                <TextField size="small" value="15" sx={{ color: 'black', fontSize:'14px' }} />
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ color: 'red', fontSize: '14px' }}>#NO</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Specification 3</TableCell>
                            <TableCell>Model Running 3</TableCell>
                            <TableCell>
                                <TextField size="small" value="Actual Part 3" sx={{ color: 'black', fontSize:'14px' }} />
                            </TableCell>
                            <TableCell>
                                <TextField size="small" value="20" sx={{ color: 'black', fontSize:'14px' }} />
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ color: '#FFCC01', fontSize: '14px' }}>#NG</Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
            </Table>
        </TableContainer>
        
        {/* Verifikasi */}
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 3 }}>
      <Typography variant="body1">Verifikasi:</Typography>
      <TextField
        multiline
        rows={3} 
        sx={{
          flex: 1,
          minHeight: '80px', 
          width: '300px',
        }}
      />

      {/* Status */}
      <Typography variant="body1">Status:</Typography>
      <Typography
        sx={{
          padding: '5px 10px',
          backgroundColor:
            selectedReport?.status === 'Approved' ? '#4BCE97' :
            selectedReport?.status === 'Pending' ? '#FFCC01' :
            selectedReport?.status === 'Rejected' ? '#FF1707' : '#EBEBEB',
          color: 'white',
          borderRadius: '4px',
          textAlign: 'center',
          minWidth: '100px',
        }}
      >
        {selectedReport?.status || 'Unknown'}
      </Typography>
    </Box>
    </DialogContent>
    <DialogActions>
    <Button
    onClick={handleCloseDetailModal}
    sx={{
      bgcolor: '#f44336', // Warna merah untuk tombol
      color: 'white', // Warna teks tombol putih
      '&:hover': {
        bgcolor: '#FF1707', // Warna merah lebih gelap saat hover
      },
      width: '100px',
    }}
  >
    Close
  </Button>
    </DialogActions>
</Dialog>
</Box>
                
    );
};

export default ChangePartManagementReportsEmployee;
