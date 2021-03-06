import { Container, Divider, Typography } from '@mui/material';

import { HeaderContent } from '../../../styles/Students'
import FormStudent from '../../../components/FormStudent';


export default function StudentsForm() {
  return (
    <Container maxWidth="xl">
      <HeaderContent>
        <Typography variant="h1" component="h2">
          Student registration
        </Typography>
      </HeaderContent>
      <Divider variant="fullWidth" />
      <FormStudent />
    </Container>
  );
}