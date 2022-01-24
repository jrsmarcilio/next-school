import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Box, Grid, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { api } from "../service/api";
import { useRouter } from "next/router";

import { IUserLogin } from "../interfaces/Students";

export default function FormLogin() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserLogin>();

  const onSubmit: SubmitHandler<IUserLogin> = async (data) => {
    await api
      .post("/sessions", data)
      .then((response) => {
        toast.success("Login Successful");
        router.push("/students");
        return localStorage.setItem("token", response.data.token);
      })
      .catch((error) => {
        toast.error("Login Failed. ");
        console.error(error.message);
      });
  };

  return (
    <Box
      component="form"
      sx={{ padding: "0 100px" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container spacing={1} direction="row">
        <Grid item xs={12}>
          <TextField
            type="text"
            placeholder="Student name"
            autoComplete="current-username"
            fullWidth
            {...register("username", { required: true })}
          />
          <Typography variant="caption" component="span" color="error.main">
            {errors.username && "Username is required"}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            fullWidth
            {...register("password", { required: true })}
          />
          <Typography variant="caption" component="span" color="error.main">
            {errors.password && "Password email is required"}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            fullWidth
            sx={{ padding: 2 }}
          >
            Log in
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
