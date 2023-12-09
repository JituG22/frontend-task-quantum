import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { AlertColor } from "@mui/material/Alert";
import Alert from "@mui/material/Alert";
import AddIcon from "@mui/icons-material/Add";
import { useFormik } from "formik";
import * as Yup from "yup";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  boldStyle,
  cellStyle,
  textFildStyle,
  textFildStyle2,
} from "../style/style";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  TablePagination,
} from "@mui/material";
import { UserDataFC } from "../../interface/interface";
import { initialData } from "../../dummyData/data";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import CellTable from "./table-cell";
import EditTable from "./edite-table";
import "./curd-table.css";
interface SnackbarState {
  open: boolean;
  message: string;
  severity: AlertColor;
}
const CurdTable: React.FC = () => {
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [addNewRow, setAddNewRow] = useState(false);
  const [data, setData] = useState<UserDataFC[]>(initialData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [newRow, setNewRow] = useState<UserDataFC>({
    id: String(Date.now()),
    firstname: "",
    lastname: "",
    age: "",
    gender: "",
    country: "",
  });
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });
  const handleAdd = () => {
    setAddNewRow(!addNewRow);
  };

  const validationSchema = Yup.object({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    age: Yup.number()
      .required("Age is required")
      .positive("Age must be positive")
      .integer("Age must be an integer"),
    gender: Yup.string().required("Gender is required"),
    country: Yup.string().required("Country is required"),
  });

  const formik = useFormik({
    initialValues: newRow,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (editIdx !== null) {
        const updatedData = [...data];
        updatedData[editIdx] = values;
        setData(updatedData);
        setEditIdx(null);
      } else {
        setData([...data, { ...values, id: String(Date.now()) }]);
        setNewRow({
          id: "",
          firstname: "",
          lastname: "",
          age: "",
          gender: "",
          country: "",
        });
      }
    },
  });

  const handleCancelAdd = () => {
    setAddNewRow(false);
    formik.resetForm();
  };

  const addNewRowSave = async () => {
    await formik.submitForm();
    const errors = await formik.validateForm();
    if (Object.keys(errors).length === 0) {
      setData([{ ...formik.values, id: String(Date.now()) }, ...data]);
      formik.resetForm();
      setAddNewRow(false);
      setSnackbar({
        open: true,
        message: "Row added successfully!",
        severity: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message: "Error: Form contains invalid data!",
        severity: "error",
      });
      console.log("Form has errors:", errors);
    }
  };

  const filteredData = data.filter((row) => {
    const searchLower = searchInput.toLowerCase();
    return (
      row.firstname.toLowerCase().includes(searchLower) ||
      row.lastname.toLowerCase().includes(searchLower) ||
      row.age.toLowerCase().includes(searchLower) ||
      row.gender.toLowerCase().includes(searchLower) ||
      row.country.toLowerCase().includes(searchLower)
    );
  });

  const startEditing = (index: number) => {
    setEditIdx(index);
    const row = data[index];
    formik.setValues(row);
  };

  const handleDelete = (index: number) => {
    setDeleteIndex(index);
    setOpenDialog(true);
  };

  const confirmDelete = () => {
    if (deleteIndex !== null) {
      const newData = [...data];
      newData.splice(deleteIndex, 1);
      setData(newData);
      setSnackbar({
        open: true,
        message: "Row deleted successfully!",
        severity: "success",
      });
    }
    setOpenDialog(false);
    setDeleteIndex(null);
  };

  const stopEditing = () => {
    setEditIdx(null);
  };

  const handleSaveEdit = async () => {
    await formik.submitForm();
    const errors = await formik.validateForm();
    if (Object.keys(errors).length === 0 && editIdx !== null) {
      const updatedData = [...data];
      updatedData[editIdx] = formik.values;
      setData(updatedData);
      setEditIdx(null);
      setSnackbar({
        open: true,
        message: "Row edited successfully!",
        severity: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message:
          "Error: Form contains invalid data or no row selected for edit!",
        severity: "error",
      });
      console.log("Form has errors or no row selected for edit:", errors);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <div>
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this row?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>No</Button>
            <Button onClick={confirmDelete} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={1500}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            variant="filled"
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
      <div className="table-action-wrp">
        <div>
          <Button onClick={handleAdd} variant="contained" color="primary">
            <AddIcon />
          </Button>
        </div>
        <div>
          <TextField
            value={searchInput}
            InputProps={textFildStyle}
            InputLabelProps={textFildStyle2}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search"
          />
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={boldStyle}>First Name</TableCell>
              <TableCell style={boldStyle}>Last Name</TableCell>
              <TableCell style={boldStyle}>Age</TableCell>
              <TableCell style={boldStyle}>Gender</TableCell>
              <TableCell style={boldStyle}>Country</TableCell>
              <TableCell style={boldStyle}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {addNewRow && (
              <TableRow>
                <TableCell style={cellStyle}>
                  <TextField
                    name="firstname"
                    value={formik.values.firstname}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.firstname &&
                      Boolean(formik.errors.firstname)
                    }
                    helperText={
                      formik.touched.firstname && formik.errors.firstname
                    }
                    InputProps={textFildStyle}
                    InputLabelProps={textFildStyle2}
                  />
                </TableCell>
                <TableCell style={cellStyle}>
                  <TextField
                    name="lastname"
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.lastname && Boolean(formik.errors.lastname)
                    }
                    helperText={
                      formik.touched.lastname && formik.errors.lastname
                    }
                    InputProps={textFildStyle}
                    InputLabelProps={textFildStyle2}
                  />
                </TableCell>
                <TableCell style={cellStyle}>
                  <TextField
                    name="age"
                    value={formik.values.age}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.lastname && Boolean(formik.errors.age)
                    }
                    helperText={formik.touched.age && formik.errors.age}
                    InputProps={textFildStyle}
                    InputLabelProps={textFildStyle2}
                  />
                </TableCell>
                <TableCell style={cellStyle}>
                  <TextField
                    name="gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.gender && Boolean(formik.errors.gender)
                    }
                    helperText={formik.touched.gender && formik.errors.gender}
                    InputProps={textFildStyle}
                    InputLabelProps={textFildStyle2}
                  />
                </TableCell>
                <TableCell style={cellStyle}>
                  <TextField
                    name="country"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.country && Boolean(formik.errors.country)
                    }
                    helperText={formik.touched.country && formik.errors.country}
                    InputProps={textFildStyle}
                    InputLabelProps={textFildStyle2}
                  />
                </TableCell>
                <TableCell style={cellStyle}>
                  <Button onClick={() => handleCancelAdd()}>
                    <CloseIcon />
                  </Button>
                  <Button onClick={addNewRowSave}>
                    <SaveIcon />
                  </Button>
                </TableCell>
              </TableRow>
            )}

            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <>
                  {editIdx !== index ? (
                    <TableRow key={row.id}>
                      <CellTable
                        row={row}
                        index={index}
                        startEditing={startEditing}
                        handleDelete={handleDelete}
                      />
                    </TableRow>
                  ) : (
                    <TableRow key="edit-row">
                      <EditTable
                        newRow={newRow}
                        editIdx={editIdx}
                        data={data}
                        setData={setData}
                        setEditIdx={setEditIdx}
                        stopEditing={stopEditing}
                        handleSaveEdit={handleSaveEdit}
                        setNewRow={setNewRow}
                        formik={formik}
                      />
                    </TableRow>
                  )}
                </>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
      />
    </div>
  );
};

export default CurdTable;
