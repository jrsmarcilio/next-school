import React from "react";
import { Button, Container, Divider, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

import FormActiveAccount from "../../components/FormActiveAccount";
import { HeaderContent } from "../../styles/Students";

export default function ActivateAccount() {
  const [show, setShow] = React.useState(false);

  const handleModal = () => (show ? setShow(false) : setShow(true));

  return (
    <Container maxWidth="xl">
      <HeaderContent>
        <Typography variant="h1" component="h2">
          Account activator
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleModal}>
          <CheckIcon style={{ marginRight: 10 }} />
          Activate account form
        </Button>
      </HeaderContent>
      <Divider variant="fullWidth" />
      <FormActiveAccount show={show} />
    </Container>
  );
}
