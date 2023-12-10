import React from "react";
import { cellStyle, textFieldStyle, textFieldStyle2 } from "../style/style";
import { Button, TableCell, TableRow, TextField } from "@mui/material";
import { FormikProps } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { NewUser } from "../../api/models/User";

interface Props {
  formik: FormikProps<NewUser>;
  handleCancelAdd: () => void;
  addNewRowSave: () => void;
}
const NewRow: React.FC<Props> = ({
  formik,
  handleCancelAdd,
  addNewRowSave,
}) => {
  const { values, errors, touched, handleChange } = formik;
  return (
    <TableRow>
      <TableCell style={cellStyle}>
        <TextField
          name="firstname"
          value={values.firstname}
          onChange={handleChange}
          error={touched.firstname && Boolean(errors.firstname)}
          helperText={touched.firstname && errors.firstname}
          InputProps={textFieldStyle}
          InputLabelProps={textFieldStyle2}
        />
      </TableCell>
      <TableCell style={cellStyle}>
        <TextField
          name="lastname"
          value={values.lastname}
          onChange={handleChange}
          error={touched.lastname && Boolean(errors.lastname)}
          helperText={touched.lastname && errors.lastname}
          InputProps={textFieldStyle}
          InputLabelProps={textFieldStyle2}
        />
      </TableCell>
      <TableCell style={cellStyle}>
        <TextField
          name="age"
          value={values.age}
          onChange={handleChange}
          error={touched.age && Boolean(errors.age)}
          helperText={touched.age && errors.age}
          InputProps={textFieldStyle}
          InputLabelProps={textFieldStyle2}
        />
      </TableCell>
      <TableCell style={cellStyle}>
        <TextField
          name="gender"
          value={values.gender}
          onChange={handleChange}
          error={touched.gender && Boolean(errors.gender)}
          helperText={touched.gender && errors.gender}
          InputProps={textFieldStyle}
          InputLabelProps={textFieldStyle2}
        />
      </TableCell>
      <TableCell style={cellStyle}>
        <TextField
          name="country"
          value={values.country}
          onChange={handleChange}
          error={touched.country && Boolean(errors.country)}
          helperText={touched.country && errors.country}
          InputProps={textFieldStyle}
          InputLabelProps={textFieldStyle2}
        />
      </TableCell>
      <TableCell style={cellStyle}>
        <Button onClick={handleCancelAdd}>
          <CloseIcon />
        </Button>
        <Button onClick={addNewRowSave}>
          <SaveIcon />
        </Button>
      </TableCell>
    </TableRow>
  );
};
export default NewRow;
