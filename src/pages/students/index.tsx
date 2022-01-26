import React from "react";
import { useRouter } from "next/router";
import {
  Button,
  Container,
  Divider,
  Typography,
  TextField,
  Stack,
  Autocomplete,
} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";

import Listing from "../../components/Listing";
import AppBar from "../../components/AppBar";

import { HeaderContent } from "../../styles/Students";
import { IStudentDTO } from "../../interfaces/Students";

import { api } from "../../service/api";
import FormCourse from "../../components/FormCourse";

export default function Students() {
  const [studentData, setStudentData] = React.useState<IStudentDTO[]>([]);
  const [studentFilter, setStudentFilter] = React.useState<IStudentDTO[]>([]);

  const [isSearch, setIsSearch] = React.useState<boolean>(false);
  const [modalCourse, setModalCourse] = React.useState<boolean>(false);
  const router = useRouter();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    async function fetchStudent() {
      await api
        .get("/students", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => setStudentData(response.data))
        .catch((error) => console.log(error));
    }
    token ? fetchStudent() : router.push("/");
  }, []);

  const handleSearchChange = (event: React.SyntheticEvent) => {
    const search = (event.target as HTMLInputElement).value;
    const filter = studentData.filter((student) =>
      student.name.toLowerCase().includes(search.toLowerCase())
    );
    setStudentFilter(filter);
    search.length > 0 ? setIsSearch(true) : setIsSearch(false);
  };

  const handleModal = () =>
    modalCourse ? setModalCourse(false) : setModalCourse(true);

  return (
    <>
      <AppBar />
      <Container maxWidth="xl">
        <HeaderContent>
          <Typography variant="h1" component="h2">
            Students Listing
          </Typography>

          <section>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => router.push("/students/form")}
              style={{ marginRight: 20 }}
            >
              <SchoolIcon style={{ marginRight: 10 }} /> Add new student
            </Button>
            <Button variant="contained" color="secondary" onClick={handleModal}>
              <HistoryEduIcon style={{ marginRight: 10 }} />
              Add new course
            </Button>
          </section>
        </HeaderContent>

        <Stack spacing={2} sx={{ margin: "40px 0" }}>
          <Autocomplete
            freeSolo
            color="secondary"
            options={studentData.map((student) => student.name)}
            renderInput={(params) => (
              <TextField
                color="secondary"
                {...params}
                label="Search Student Name"
                onChange={handleSearchChange}
              />
            )}
          />
        </Stack>

        <Divider variant="fullWidth" />

        {studentData && (
          <Listing students={!isSearch ? studentData : studentFilter} />
        )}

        <FormCourse show={modalCourse} />
      </Container>
    </>
  );
}
