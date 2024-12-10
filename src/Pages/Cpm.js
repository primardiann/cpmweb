import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import axios from 'axios';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SearchIcon from '@mui/icons-material/Search';

// Styled components for table cells
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

const ChangePartManagementReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/cpm');
        setReports(response.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch reports');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Event Handlers
  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const handleCategoryFilterChange = (event) => setCategoryFilter(event.target.value);

  const handleDateFilterChange = (event) => setDateFilter(event.target.value);

  const handleOpenDetailModal = (report) => {
    setSelectedReport(report);
    setOpenDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setOpenDetailModal(false);
    setSelectedReport(null);
  };

  // Filtering data
  const filteredReports = reports.filter((report) => {
    return (
      (report.nama_mesin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.kode_line.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (categoryFilter ? report.nama_kategori === categoryFilter : true) &&
      (dateFilter ? report.created_at.startsWith(dateFilter) : true)
    );
  });

  // Render loading or error state
  if (loading) {
    return (
      <Typography variant="h6" align="center" color="textSecondary">
        Loading...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" align="center" color="error">
        {error}
      </Typography>
    );
  }

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
          <AssignmentIcon sx={{ mr: 1 }} /> Change Part Management Reports
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {/* Filters */}
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
          </Box>
        </Box>

        {/* Table */}
        <TableContainer component={Paper} sx={{ borderRadius: '8px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>No</StyledTableCell>
                <StyledTableCell>Lines</StyledTableCell>
                <StyledTableCell>Machine Category</StyledTableCell>
                <StyledTableCell>Machine Name</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredReports.length > 0 ? (
                filteredReports
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((report, index) => (
                    <TableRow key={report.id}>
                      <StyledTableCell>{index + 1 + page * rowsPerPage}</StyledTableCell>
                      <StyledTableCell>{report.kode_line}</StyledTableCell>
                      <StyledTableCell>{report.nama_kategori}</StyledTableCell>
                      <StyledTableCell>{report.nama_mesin}</StyledTableCell>
                      <StyledTableCell>{report.created_at}</StyledTableCell>
                      <StyledTableCell>
                        <AssignmentIcon
                          sx={{ cursor: 'pointer', color: '#0055A8' }}
                          onClick={() => handleOpenDetailModal(report)}
                        />
                      </StyledTableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography color="textSecondary">No records found</Typography>
                  </TableCell>
                </TableRow>
              )}
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
  <DialogTitle>Detail CPM Reports</DialogTitle>
  <DialogContent>
    {/* Line */}
    {/* Line */}
<Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
  <Typography variant="body1" sx={{ width: '185px', height: '30px', padding: '5px 8px', whiteSpace: 'nowrap' }}>Line:</Typography>
  <TextField
    fullWidth
    value={selectedReport?.kode_line || ''}
    disabled // Tidak bisa diedit
  />
</Box>

{/* Report ID */}
<Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
  <Typography variant="body1" sx={{ width: '185px', height: '30px', padding: '5px 8px', whiteSpace: 'nowrap' }}>Report ID:</Typography>
  <TextField
    fullWidth
    value={`#${selectedReport?.id || ''}`}
    disabled // Tidak bisa diedit
  />
</Box>

{/* Machine Name/ID */}
<Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
  <Typography variant="body1" sx={{ width: '185px', height: '30px', padding: '5px 8px', whiteSpace: 'nowrap' }}>Machine Name/ID:</Typography>
  <TextField
    fullWidth
    value={selectedReport?.nama_mesin || ''}
    disabled // Tidak bisa diedit
  />
</Box>

{/* Machine Category */}
<Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
  <Typography variant="body1" sx={{ width: '185px', height: '30px', padding: '5px 8px', whiteSpace: 'nowrap' }}>Machine Category:</Typography>
  <TextField
    fullWidth
    value={selectedReport?.nama_kategori || ''}
    disabled // Tidak bisa diedit
  />
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
              <TextField size="small" value="Actual Part 1" sx={{ color: 'black', fontSize: '14px' }} />
            </TableCell>
            <TableCell>
              <TextField size="small" value="10" sx={{ color: 'black', fontSize: '14px'}} />
            </TableCell>
            <TableCell>
              <Typography sx={{ color: 'green', fontSize: '14px' }}>#OK</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Specification 2</TableCell>
            <TableCell>Model Running 2</TableCell>
            <TableCell>
              <TextField size="small" value="Actual Part 2" sx={{ color: 'black', fontSize: '14px' }} />
            </TableCell>
            <TableCell>
              <TextField size="small" value="15" sx={{ color: 'black', fontSize: '14px' }} />
            </TableCell>
            <TableCell>
              <Typography sx={{ color: 'red', fontSize: '14px' }}>#NO</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Specification 3</TableCell>
            <TableCell>Model Running 3</TableCell>
            <TableCell>
              <TextField size="small" value="Actual Part 3" sx={{ color: 'black', fontSize: '14px' }} />
            </TableCell>
            <TableCell>
              <TextField size="small" value="20" sx={{ color: 'black', fontSize: '14px' }} />
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
    </Box>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseDetailModal}  
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
  );
};

export default ChangePartManagementReports;
