import React from "react";
import { TableCell, Button, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { FormikProps } from "formik";
import { NewUser } from "../../api/models/User";
import { cellStyle, textFieldStyle, textFieldStyle2 } from "../style/style";

interface UserEditRowProps {
  stopEditing: () => void;
  handleSaveEdit: () => void;
  formik: FormikProps<NewUser>;
}
const EditTable: React.FC<UserEditRowProps> = ({
  stopEditing,
  handleSaveEdit,
  formik: { values, handleChange, handleBlur, touched, errors },
}) => {
  return (
    <>
      <TableCell style={cellStyle}>
        <TextField
          name="firstname"
          value={values.firstname}
          onChange={handleChange}
          onBlur={handleBlur}
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
          onBlur={handleBlur}
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
          onBlur={handleBlur}
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
          onBlur={handleBlur}
          error={touched.gender && Boolean(errors.gender)}
          helperText={touched.age && errors.gender}
          InputProps={textFieldStyle}
          InputLabelProps={textFieldStyle2}
        />
      </TableCell>

      <TableCell style={cellStyle}>
        <TextField
          name="country"
          value={values.country}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.country && Boolean(errors.country)}
          helperText={touched.age && errors.country}
          InputProps={textFieldStyle}
          InputLabelProps={textFieldStyle2}
        />
      </TableCell>
      <TableCell style={cellStyle}>
        <div>
          <Button onClick={stopEditing}>
            <CloseIcon />
          </Button>
          <Button onClick={handleSaveEdit}>
            <SaveIcon />
          </Button>
        </div>
      </TableCell>
    </>
  );
};
export default EditTable;
