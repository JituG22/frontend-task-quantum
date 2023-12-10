import React, { useState, useEffect } from "react";
import {
  Snackbar,
  AlertColor,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  CircularProgress,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import { useFormik } from "formik";
import userService from "../../api/userService";
import * as Yup from "yup";
import { boldStyle, textFieldStyle, textFieldStyle2 } from "../style/style";

import CellTable from "./table-cell";
import EditTable from "./edit-table";
import { NewUser, User } from "../../api/models/User";
import NewRow from "./new-row";
import "./curd-table.css";

interface SnackbarState {
  open: boolean;
  message: string;
  severity: AlertColor;
}
const CrudTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [isAddingNewRow, setIsAddingNewRow] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [userDeleteIdx, setUserDeleteIdx] = useState<string | null>(null);
  const [newRow, setNewRow] = useState<NewUser>({
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
    setIsAddingNewRow(!isAddingNewRow);
    stopEditing();
    formik.resetForm();
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
        setEditIdx(null);
      } else {
        setNewRow({
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
    setIsAddingNewRow(false);
    formik.resetForm();
  };
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const fetchedUsers: User[] = await userService.getAllUsers();
      setUsers(fetchedUsers.reverse());
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const addNewRowSave = async () => {
    await formik.submitForm();
    const errors = await formik.validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        const userData: NewUser = { ...formik.values };
        await userService.addUser(userData);
        setSnackbar({
          open: true,
          message: "Row added successfully!",
          severity: "success",
        });
        fetchUsers();
      } catch (error) {
        setSnackbar({
          open: true,
          message: `Error adding user:${error}`,
          severity: "error",
        });
      }
      formik.resetForm();
      setIsAddingNewRow(false);
    } else {
      setSnackbar({
        open: true,
        message: "Error: Form contains invalid data!",
        severity: "error",
      });
    }
  };

  const filteredData = users.filter((row) => {
    const searchLower = searchInput.toLowerCase();
    return (
      row.firstname.toLowerCase().includes(searchLower) ||
      row.lastname.toLowerCase().includes(searchLower) ||
      row.age.toString().includes(searchLower) ||
      row.gender.toLowerCase().includes(searchLower) ||
      row.country.toLowerCase().includes(searchLower)
    );
  });

  const startEditing = (index: number) => {
    handleCancelAdd();
    setEditIdx(index);
    const row: NewUser = {
      firstname: users[index].firstname,
      lastname: users[index].lastname,
      age: users[index].age,
      gender: users[index].gender,
      country: users[index].country,
    };
    formik.setValues(row);
  };

  const handleDelete = (userDeleteId: string) => {
    setUserDeleteIdx(userDeleteId);
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    if (userDeleteIdx !== null) {
      await userService.deleteUser(userDeleteIdx);
      setSnackbar({
        open: true,
        message: "Row deleted successfully!",
        severity: "success",
      });
    }
    setOpenDialog(false);
    setUserDeleteIdx(null);
    fetchUsers();
  };

  const stopEditing = () => {
    setEditIdx(null);
  };

  const handleSaveEdit = async () => {
    await formik.submitForm();
    const errors = await formik.validateForm();
    if (Object.keys(errors).length === 0 && editIdx !== null) {
      let updatedUser: NewUser = {
        firstname: "",
        lastname: "",
        age: "",
        gender: "",
        country: "",
      };
      updatedUser = formik.values;
      await userService.updateUser(users[editIdx]._id, updatedUser);
      fetchUsers();
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

  useEffect(() => {
    fetchUsers();
  }, []);

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
            InputProps={textFieldStyle}
            InputLabelProps={textFieldStyle2}
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
            {isLoading && <CircularProgress />}
            {isAddingNewRow && (
              <NewRow
                formik={formik}
                handleCancelAdd={handleCancelAdd}
                addNewRowSave={addNewRowSave}
              />
            )}

            {filteredData.length === 0 && !isAddingNewRow && (
              <div className="no-data">Please add a user</div>
            )}

            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <>
                  {editIdx !== index ? (
                    <TableRow key={row._id}>
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
                        stopEditing={stopEditing}
                        handleSaveEdit={handleSaveEdit}
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
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
      />
    </div>
  );
};

export default CrudTable;
