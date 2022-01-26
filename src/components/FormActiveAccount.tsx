import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { api } from "../service/api";
import { toast } from "react-toastify";
import router from "next/router";

interface IActiveAccount {
  email: string;
}

export default function FormActiveAccount({ show }: { show?: boolean }) {
  const [open, setOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IActiveAccount>({ defaultValues: { email: "" } });

  const onSubmit: SubmitHandler<IActiveAccount> = (data) => {
    setOpen(false);
    api
      .get(`/active-mail/${data.email}`)
      .then(() => {
        toast.success("Account activated successfully.");
        router.push("/");
      })
      .catch((error) => {
        toast.error(error.response.data.error || "Error.");
      });
  };

  const handleClose = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    if (show) setOpen(show);
  }, [show]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Register course</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{ marginBottom: 8, marginTop: 8, width: "400px" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2} direction="row">
            <Grid item xs={12}>
              <TextField
                label="E-mail"
                type="text"
                placeholder="E-mail"
                fullWidth
                color="secondary"
                {...register("email", { required: true })}
              />
              <Typography variant="caption" component="span" color="error.main">
                {errors.email && "Email is required"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                type="submit"
                onClick={handleClose}
                color="secondary"
                fullWidth
                sx={{ padding: 2 }}
              >
                Activate
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
