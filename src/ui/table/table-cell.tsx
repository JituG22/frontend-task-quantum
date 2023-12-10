import { Button, TableCell } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { User } from "../../api/models/User";

interface Props {
  row: User;
  index: number;
  startEditing: (index: number) => void;
  handleDelete: (_id: string) => void;
}

const CellTable: React.FC<Props> = ({
  row,
  index,
  startEditing,
  handleDelete,
}) => {
  const { _id, firstname, lastname, age, gender, country } = row;

  return (
    <>
      <TableCell> {firstname} </TableCell>
      <TableCell> {lastname} </TableCell>
      <TableCell> {age} </TableCell>
      <TableCell> {gender} </TableCell>
      <TableCell> {country} </TableCell>
      <TableCell>
        <Button onClick={() => startEditing(index)} aria-label="Edit">
          <EditIcon />
        </Button>
        <Button onClick={() => handleDelete(_id)} aria-label="Delete">
          <DeleteIcon />
        </Button>
      </TableCell>
    </>
  );
};

export default CellTable;
