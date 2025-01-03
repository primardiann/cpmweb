import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Select,
    MenuItem,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';

const ModalInput = ({ open, handleClose, setReports }) => {
    const [lines, setLines] = useState([]);
    const [machines, setMachines] = useState([]);
    const [categories, setCategories] = useState([]);
    const [specifications, setSpecifications] = useState([]);
    const [newReport, setNewReport] = useState({
        line_id: '',
        mesin_id: '',
        kategori_id: '',
        spesifikasi_id: '',
        actual_part: '',
        judgment: '', // Judgment added here
        user_id: 1, // User ID (change if needed)
    });

    const [selectedSpec, setSelectedSpec] = useState({
        nama_spesifikasi: '',
        nilai_standar: '',
    });

    useEffect(() => {
        // Fetch available lines, machines, categories, and specifications
        const fetchData = async () => {
            try {
                const linesData = await axios.get('http://localhost:5000/api/line');
                const machinesData = await axios.get('http://localhost:5000/api/mesin');
                const categoriesData = await axios.get('http://localhost:5000/api/kategori');
                const specificationsData = await axios.get('http://localhost:5000/api/spesifikasi');
                
                setLines(linesData.data);
                setMachines(machinesData.data);
                setCategories(categoriesData.data);
                setSpecifications(specificationsData.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewReport((prev) => {
            const updatedReport = {
                ...prev,
                [name]: value,
            };
    
            // If specification is selected, update the selectedSpec state
            if (name === "spesifikasi_id") {
                const selected = specifications.find(spec => spec.spesifikasi_id === value);
                if (selected) {
                    setSelectedSpec({
                        nama_spesifikasi: selected.nama_spesifikasi,
                        nilai_standar: selected.nilai_standar,
                    });
                }
            }
    
            // Calculate judgment based on actual_part value
            if (name === "actual_part") {
                const spec = specifications.find(spec => spec.spesifikasi_id === updatedReport.spesifikasi_id);
                const nilai_standar = spec ? spec.nilai_standar : null;
    
                if (!updatedReport.actual_part) {
                    updatedReport.judgment = 'NO'; // If actual_part is empty, set judgment to 'NO'
                } else if (nilai_standar !== null) {
                    // If actual_part matches nilai_standar, set judgment to 'OK', else 'NG'
                    updatedReport.judgment = updatedReport.actual_part === nilai_standar ? 'OK' : 'NG';
                }
            }
    
            return updatedReport;
        });
    };

    const handleSubmit = async () => {
        // Check if the selected category is "Core Pre Press"
        const selectedCategory = categories.find(category => category.kategori_id === newReport.kategori_id);
        
        if (!selectedCategory || selectedCategory.nama_kategori !== "Core Pre Press") {
            alert("This action can only be performed for the 'Core Pre Press' process.");
            return; // Stop execution if the condition is not met
        }

        try {
            // Submit the report with judgment
            const response = await axios.post('http://localhost:5000/api/cpm', newReport);
            
            // Notify success
            alert('Process added successfully');
            
            // Add new report to the list
            setReports((prevReports) => [...prevReports, response.data]);
            
            // Close modal after submission
            handleClose(); 
        } catch (error) {
            console.error("There was an error submitting the data!", error);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add New Report</DialogTitle>
            <DialogContent>
                {/* Line Select */}
                <Select
                    name="line_id"
                    value={newReport.line_id}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 2 }}
                >
                    <MenuItem value="">
                        <em>Select Line</em>
                    </MenuItem>
                    {lines.map((line) => (
                        <MenuItem key={line.line_id} value={line.line_id}>
                            {line.kode_line}
                        </MenuItem>
                    ))}
                </Select>

                {/* Category Select */}
                <Select
                    name="kategori_id"
                    value={newReport.kategori_id}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 2 }}
                >
                    <MenuItem value="">
                        <em>Select Process</em>
                    </MenuItem>
                    {categories.map((category) => (
                        <MenuItem key={category.kategori_id} value={category.kategori_id}>
                            {category.nama_kategori}
                        </MenuItem>
                    ))}
                </Select>

                {/* Machine Select */}
                <Select
                    name="mesin_id"
                    value={newReport.mesin_id}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 2 }}
                >
                    <MenuItem value="">
                        <em>Select Machine</em>
                    </MenuItem>
                    {machines.map((machine) => (
                        <MenuItem key={machine.mesin_id} value={machine.mesin_id}>
                            {machine.nama_mesin}
                        </MenuItem>
                    ))}
                </Select>
                
                {/* Specification Select */}
                <Select
                    name="spesifikasi_id"
                    value={newReport.spesifikasi_id}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 2 }}
                >
                    <MenuItem value="">
                        <em>Select Specification</em>
                    </MenuItem>
                    {specifications.map((spec) => (
                        <MenuItem key={spec.spesifikasi_id} value={spec.spesifikasi_id}>
                            {spec.nama_spesifikasi}
                        </MenuItem>
                    ))}
                </Select>

                {/* Display Selected Specification Name and Standard Value */}
                {selectedSpec.nama_spesifikasi && (
                    <>
                        <TableContainer component={Paper} sx={{ mb: 2 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Specification</TableCell>
                                        <TableCell>Model Running</TableCell>
                                        <TableCell>Actual Part</TableCell>
                                        <TableCell>Judgment</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{selectedSpec.nama_spesifikasi}</TableCell>
                                        <TableCell>{selectedSpec.nilai_standar}</TableCell>
                                        <TableCell>
                                            <TextField
                                                name="actual_part"
                                                label="Actual Part"
                                                variant="outlined"
                                                fullWidth
                                                value={newReport.actual_part}
                                                onChange={handleChange}
                                                sx={{ mb: 2 }}
                                            />
                                        </TableCell>
                                        <TableCell>{newReport.judgment}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Cancel</Button>
                <Button onClick={handleSubmit} color="primary">Submit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalInput;
