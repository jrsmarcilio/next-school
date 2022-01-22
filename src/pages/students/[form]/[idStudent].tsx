import { Container, Divider, Typography } from "@mui/material";
import { useRouter } from "next/router";

import { HeaderContent } from "../../../styles/Students";
import Form from "../../../components/Form";

export default function StudentsForm() {
  const routes = useRouter();
  const { idStudent } = routes.query;

  return (
    <Container maxWidth="xl">
      <HeaderContent>
        <Typography variant="h1" component="h2">
          Student registration
        </Typography>
      </HeaderContent>
      <Divider variant="fullWidth" />
      <Form id={Number(idStudent)} />
    </Container>
  );
}
