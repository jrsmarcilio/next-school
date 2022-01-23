import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Container, Divider, Typography } from "@mui/material";

import nodejs from "../../../public/node-js.png";
import { HeaderContent } from "../../styles/Students";
import Listing from "../../components/Listing";
import { api } from "../../service/api";
import { IStudent } from "../../interfaces/Students";
import Cookie from "js-cookie";

export default function Students() {
  const [students, setStudents] = React.useState<IStudent[]>([]);

  React.useEffect(() => {
    async function fetchStudents() {
      const token = Cookie.get("token");
      console.log(token);

      await api
        .get("/students", {
          headers: {
            Cookie:
              "connect.sid=s%3AxQMAGruQJDPL6A6EGY9uXU88y3NH0MZW.%2FL6fW%2FpqGNmWZfxEQuR8snrG%2FpQYyjePITsT5EPsrrU",
          },
        })
        .then((response) => {
          setStudents(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    fetchStudents();
  }, []);

  return (
    <Container maxWidth="xl">
      <HeaderContent>
        <Image
          alt="Logo Node.js"
          src={nodejs}
          layout="intrinsic"
          width={175}
          height={113}
        />
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
      {students && <Listing students={students} />}
    </Container>
  );
}
