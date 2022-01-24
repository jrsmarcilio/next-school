import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button, Container, Divider, Typography } from "@mui/material";

import { HeaderContent } from "../../styles/Students";
import Listing from "../../components/Listing";
import { IStudent } from "../../interfaces/Students";
import { api } from "../../service/api";

export default function Students() {
  const [studentData, setStudentData] = React.useState<IStudent[]>([]);
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

  return (
    <Container maxWidth="xl">
      <HeaderContent>
        <Link href="/">
          <a>
            <Image
              src="https://cdn-icons-png.flaticon.com/512/2038/2038157.png"
              alt="logo"
              width={100}
              height={100}
            />
          </a>
        </Link>
        <Typography variant="h1" component="h2">
          Students Listing
        </Typography>
        <Button variant="outlined">
          <Link href="/students/form">
            <a style={{ textDecoration: "none" }}>Add new student</a>
          </Link>
        </Button>
      </HeaderContent>
      <Divider variant="fullWidth" />
      {studentData && <Listing students={studentData} />}
    </Container>
  );
}
