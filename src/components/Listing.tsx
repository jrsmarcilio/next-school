import React from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { StyledTableCell, StyledTableRow } from "../styles/MaterialUI";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IStudent } from "../interfaces/Students";
import { api } from "../service/api";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function Listing({ students }: { students: IStudent[] | null }) {
  const router = useRouter();

  const deleteStudent = (id: number) => {
    return (event: React.MouseEvent) => {
      event.preventDefault();
      api
        .delete(`/students/${id}`)
        .then((response) => {
          if (response.status === 200) {
            toast.success("Student deleted successfully!", { autoClose: 1000 });
            router.push("/students");
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("Error deleting student!");
        });
    };
  };

  const editStudent = (id: number) => {
    return (event: React.MouseEvent) => {
      event.preventDefault();
      router.push(`/students/form/${id}`);
    };
  };
  console.log(students);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell># </StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Course</StyledTableCell>
              <StyledTableCell align="right">Options</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students ? (
              students?.map((student) => (
                <StyledTableRow key={student.id}>
                  <StyledTableCell component="th" scope="row">
                    {student.id}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {student.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {student.email}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {student.course}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button onClick={editStudent(student?.id || 0)}>
                      <EditIcon />
                    </Button>
                    <Button onClick={deleteStudent(student?.id || 0)}>
                      <DeleteIcon />
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <Typography variant="h4">No students found!</Typography>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
