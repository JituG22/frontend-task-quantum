import React, { Dispatch, SetStateAction } from "react";
import { TableCell, Button, TextField } from "@mui/material";
import { FormikProps } from "formik";
import { cellStyle, textFildStyle, textFildStyle2 } from "../style/style";
import { UserDataFC } from "../../interface/interface";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

interface Props {
  newRow: UserDataFC;
  editIdx: number;
  data: UserDataFC[];
  setData: Dispatch<SetStateAction<UserDataFC[]>>;
  setNewRow: Dispatch<SetStateAction<UserDataFC>>;
  setEditIdx: Dispatch<SetStateAction<null | number>>;
  stopEditing: () => void;
  handleSaveEdit: () => void;
  formik: FormikProps<UserDataFC>;
}

// Modify TextField components in the edit row to use Formik
const EditTable: React.FC<Props> = ({
  newRow,
  editIdx,
  data,
  setData,
  setEditIdx,
  stopEditing,
  handleSaveEdit,
  setNewRow,
  formik,
}) => {
  return (
    <>
      <TableCell style={cellStyle}>
        <TextField
          name="firstname"
          value={formik.values.firstname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstname && Boolean(formik.errors.firstname)}
          helperText={formik.touched.firstname && formik.errors.firstname}
          InputProps={textFildStyle}
          InputLabelProps={textFildStyle2}
        />
      </TableCell>

      <TableCell style={cellStyle}>
        <TextField
          name="lastname"
          value={formik.values.lastname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastname && Boolean(formik.errors.lastname)}
          helperText={formik.touched.lastname && formik.errors.lastname}
          InputProps={textFildStyle}
          InputLabelProps={textFildStyle2}
        />
      </TableCell>

      <TableCell style={cellStyle}>
        <TextField
          name="age"
          value={formik.values.age}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.age && Boolean(formik.errors.age)}
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
          onBlur={formik.handleBlur}
          error={formik.touched.gender && Boolean(formik.errors.gender)}
          helperText={formik.touched.age && formik.errors.gender}
          InputProps={textFildStyle}
          InputLabelProps={textFildStyle2}
        />
      </TableCell>

      <TableCell style={cellStyle}>
        <TextField
          name="country"
          value={formik.values.country}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.country && Boolean(formik.errors.country)}
          helperText={formik.touched.age && formik.errors.country}
          InputProps={textFildStyle}
          InputLabelProps={textFildStyle2}
        />
      </TableCell>
      <TableCell style={cellStyle}>
        <div>
          <Button onClick={() => stopEditing()}>
            <CloseIcon />
          </Button>
          <Button onClick={() => handleSaveEdit()}>
            <SaveIcon />
          </Button>
        </div>
      </TableCell>
    </>
  );
};
export default EditTable;
