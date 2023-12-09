import { Button, TableCell } from "@mui/material";
import { UserDataFC } from "../../interface/interface";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  row: UserDataFC;
  index: number;
  startEditing: (index: number) => void;
  handleDelete: (index: number) => void;
}

const CellTable: React.FC<Props> = ({
  row,
  index,
  startEditing,
  handleDelete,
}) => {
  return (
    <>
      <TableCell> {row.firstname} </TableCell>
      <TableCell> {row.lastname} </TableCell>
      <TableCell> {row.age} </TableCell>
      <TableCell> {row.gender} </TableCell>
      <TableCell> {row.country} </TableCell>
      <TableCell>
        <Button onClick={() => startEditing(index)}>
          <EditIcon />
        </Button>
        <Button onClick={() => handleDelete(index)}>
          <DeleteIcon />
        </Button>
      </TableCell>
    </>
  );
};

export default CellTable;
