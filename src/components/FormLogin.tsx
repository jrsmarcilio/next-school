import { TextField, Button, Box, Grid, Typography } from "@mui/material";

import { useForm, SubmitHandler } from "react-hook-form";

import { IUserLogin } from "../interfaces/Students";
import { api } from "../service/api";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function FormLogin() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserLogin>();

  const onSubmit: SubmitHandler<IUserLogin> = (data) => {
    api
      .post("/login", data)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Access successfully!");
          router.push("/students");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error accessing the system!");
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
