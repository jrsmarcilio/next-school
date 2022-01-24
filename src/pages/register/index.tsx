import { Container, Divider, Typography } from '@mui/material';

import { HeaderContent } from "../../styles/Students"
import FormRegister from '../../components/FormRegister';

export default function StudentsForm() {
  return (
    <Container maxWidth="xl">
      <HeaderContent>
        <Typography variant="h1" component="h2">
          User registration
        </Typography>
      </HeaderContent>
      <Divider variant="fullWidth" />
      <FormRegister />
    </Container>
  );
}